' 這個 class 核心功能是以 PTT 小軟體版的 Comic吧VBS 的 code 所完成
' Comic吧VBS 的作者為: arthurs21, hpo14

Class Comic8Parser
        ' 我定義的變數
        Private url                     ' 漫畫網址
        Private whr_obj                 ' whr 物件
        Private parse_succeed           ' 表示 parse 是否成功
        Private referer                 ' 要送給 8comic 的 referer
        Private logger                  ' 發生錯誤時紀錄錯誤訊息
       
        ' Comic8.vbs 作者定義的變數
        Private Reg
        Private SubPage_Names       ' 放Vol.01 .....    
        Private SubPage_cmIDs       ' 放識別碼          
        Private SubPage_URLs        ' 放網址檔名        
        Private ttSubPage           ' n 個子頁面
        Private BaseURL
        Private title(1)            ' 漫畫名稱標題（中,英）
        
        Private Sub Class_Initialize
                ' 正規表示式的屬性設定
                Set Reg        = New RegExp
                Reg.IgnoreCase = True
                Reg.Global     = True

                Set whr_obj = CreateObject("WinHttp.WinHttpRequest.5.1")
                Set BaseURL = CreateObject("Scripting.Dictionary")
        End Sub
        
        Private Function full_3(num, ch)
                If Len(num) >= 1 then
                        If CInt(ch) = 2 then
                                full_3 = string( 3 - Len(num), "0") & CInt(num)
                        Else
                                full_3 = string( 3 - Len(num), " ") & CInt(num) & "→"
                        End IF
                End IF
        End Function
        
        Function ReadFile(file)        ' 讀檔用 hpo14
                Dim objFSO : Set objFSO = CreateObject("Scripting.FileSystemObject")
                Dim objFile : Set objFile = objFSO.OpenTextFile(file, 1)
                ReadFile = objFile.ReadAll
                objFile.Close
        End Function
        
        ' 搜尋頁面資訊
        ' 尋找字串回傳：集數名, ID, 檔名        hpo14.20100214: 重新改用 RegExp 寫過
        Private Function FindMark(FileData)        
                Dim v, mark
                ' 設定 Reg 的參數
                Reg.Pattern    = "([\d]{3,})-(\d+).html',(\d+).+[\n\r]{1}(.+)</a>"
                Set mark = Reg.Execute(FileData)
                ReDim Preserve SubPage_Name(mark.Count - 1)       ' Ex: Vol.01 ,  集數
                ReDim Preserve SubPage_cmID(mark.Count - 1)       ' Ex: 14 ,  用於決定基底位址
                ReDim Preserve SubPage_URL(mark.Count - 1)        ' Ex: 3635-1.html ,  子頁面檔名

                For v = 0 to mark.Count - 1
                        ' hpo14.20100214: a-b.html -> a.html?ch=b 這個動作直接在這邊處理, 所以 GetBaseURL() 那邊就不做了
                        SubPage_URL(v) = mark.Item(v).SubMatches(0) & ".html?ch=" & mark.Item(v).SubMatches(1)
                        SubPage_cmID(v) = mark.Item(v).SubMatches(2)
                        SubPage_Name(v) = mark.Item(v).SubMatches(3)
                Next
        
                FindMark = v
                SubPage_Names = SubPage_Name
                SubPage_cmIDs = SubPage_cmID
                SubPage_URLs = SubPage_URL
        End Function
        
        Private Sub GetRBaseURL
                Dim str, u, c, urls, catid
                Str = getPage("http://www.8comic.com/js/comicview.js", "text")

                Reg.Pattern = "if\(([^""]+)\)\s?\s?baseurl=""([\w\d./:_~-]+)"";"
                Set urls = Reg.Execute( str )
                Reg.Pattern = "catid==(\d+)"
                
                BaseURL.RemoveAll
                For Each u in urls
                        For Each c in Reg.Execute( u.SubMatches(0) )
                                BaseURL.Add c.SubMatches(0), u.SubMatches(1)
                        Next
                Next
        End Sub
        
        Private Function DspTitleMsg(FileData, TtPage)
                Dim amsg, atMsg, n
        '                                      SubMatches(0)       SubMatches(1)
                Reg.Pattern = "font:12pt;font-weight:bold;"">(.+?)</font>.+?"">(.+?)?</font>"
                title(0) = Reg.Execute( FileData ).Item(0).SubMatches(0)        ' 中文
                title(1) = Reg.Execute( FileData ).Item(0).SubMatches(1)        ' 英文

                'Call SaveHistory()
        
                'atMsg = "書名：" & title(0)
                'If Not (title(1) = "") Then
                '       atMsg = atMsg & " / " & title(1)  & vbCrLf & "發現以下書目：" 
                'End If

                'MsgBox join(BaseURL.Items(), vbNewLine)
                aMsg = ""
                ReDim Preserve Real_SubURL(TtPage - 1)
                For n = 0 To TtPage - 1
                        Real_SubURL(n) = BaseURL(SubPage_cmIDs(n)) & SubPage_URLs(n)
                        If (n Mod 5) = 0 Then
                                aMsg = aMsg & vbCrLf & SubPage_Names(n)
                        Else
                                aMsg = aMsg & Chr(9) & SubPage_Names(n)
                        End If
                        If n <= 79 Then
                                If (n Mod 2) = 0 Then
                                        bMsg = bMsg & vbCrLf & full_3(n + 1, 1) & SubPage_Names(n)
                                Else
                                        bMsg = bMsg & Chr(9) & full_3(n + 1, 1) & SubPage_Names(n)
                                End If
                        End If
                Next
                If n > 79 Then bMsg = bMsg & vbCrLf & "總編號到 " & n & " 止。" & vbCrLf & "集數過多！請參照原始網頁。"
                atMsg = atMsg & aMsg
                SubPage_URLs = Real_SubURL
                'DspTitleMsg = MsgBox(atMsg & vbCrLf & "確定要下載？(""是""→可選集數/""否""→取消)", 4, title(0))
        End Function
        
        Private Function DL_and_open_Sub_File(dl_type, file_url)
                Dim Open_file, SubFileData, PicBaseURL, Pic_Name, Pic_URL, Dir, n, m
                Dim VolNum, para, RandWord, itemid
                Dim objShell : Set objShell = CreateObject("WScript.Shell")

                Open_file = "tmp\" & Replace(Mid(file_url, InStrRev(file_url, "/") + 1), "?", "@")
                objShell.Run ".\wget.exe -N -O""" & Open_file & """ " & file_url, 0, True
                'MsgBox open_file & " " & file_url
                SubFileData = ReadFile(Open_file)

                VolNum = CInt(Mid(Open_file, InStr(Open_file, "ch=") + 3))
                ' hpo14.20100214: 以 RegExp 擷取編碼字串, 只會有一個符合
                ' Match:1 4 3 97 39q82c7waprtkh9429x85fc822dybmn97dc9d25b
                ' Sub Match 0: 4
                ' Sub Match 1: 3
                ' Sub Match 2: 97
                ' Sub Match 3: 39q82c7waprtkh9429x85fc822dybmn97dc9d25b
                Reg.Pattern = "[""|]{1}" & VolNum & " (\d+) (\d+) (\d+) ([\d\w]+[^|""]+?)"
                Set para = Reg.Execute(SubFileData)
                Page = para.Item(0).SubMatches(2)
                RandWord = para.Item(0).SubMatches(3)

                ' 1. 取出 TheImg").src="...."; 存在 SubMatches 裡面
                ' http://img"+sid+".8comic.com/"+did+"/"+itemid+"/"+num+"/"+img+".jpg
                Reg.Pattern = "TheImg""\).src=""(.+?)"";"
                PicBaseURL = Reg.Execute(SubFileData).Item(0).SubMatches(0)

                ' 2. 取得 itemid
                Reg.Pattern = "var itemid=(\d+)"
                itemid = Reg.Execute(SubFileData).Item(0).SubMatches(0)

                ' 3. 拼湊網址
                PicBaseURL = Replace(PicBaseURL, """+sid+""",    CStr(para.Item(0).SubMatches(0)))
                PicBaseURL = Replace(PicBaseURL, """+did+""",    CStr(para.Item(0).SubMatches(1)))
                PicBaseURL = Replace(PicBaseURL, """+itemid+""", itemid)
                PicBaseURL = Replace(PicBaseURL, """+num+""",    CStr(VolNum))
        
                If dl_type = 1 Then
                        ReDim Preserve PicArray(page - 1)
                
                        For n = 1 To page
                                m = (Int((n - 1) / 10) Mod 10) + (((n - 1) Mod 10) * 3)
                                Pic_URL = Replace(PicBaseURL, """+img+""", full_3(n, 2) & "_" & Mid(RandWord, m + 1, 3))
                                Pic_name = full_3(n, 2) & Mid(PicBaseURL, InStrRev(PicBaseURL, "."))
                                Dir = CreateSubDir & "\" & Pic_name
                                'PicArray(n - 1) = ".\wget.exe --referer=""" & file_url & """ -O""" & Dir & """ " & Pic_URL
                                PicArray(n - 1) = Pic_URL
                        Next
                        DL_and_open_Sub_File = PicArray
                ElseIf dl_type = 2 Then
                        Dim smgList : smgList = ""      
                        For n = 1 To page
                                m = (Int((n - 1) / 10) Mod 10) + (((n - 1) Mod 10) * 3)
                                Pic_URL = Replace(PicBaseURL, """+img+""", full_3(n, 2) & "_" & Mid(RandWord, m + 1, 3))
                                Pic_name = full_3(n, 2) & Mid(PicBaseURL, InStrRev(PicBaseURL, "."))
                                smgList = smgList & "/ref:" & file_url & " " & Pic_URL & "|" & Pic_Name & vbCrLf
                        Next
                        Dir = myPath & CreateSubDir & "\" 
                        ObjSMG.DownloadSelection smgList, 3, "", 1, true, 0, true, Dir
                        'sleep 700
                End If
        End Function

        Private Function getPage(url_, type_)
                whr_obj.Open "GET", url_, True
                whr_obj.Send
                
                On Error Resume Next
                whr_obj.WaitForResponse
                If Err.Number <> 0 Then
                        getPage = False
                        Err.clear
                        Exit Function
                Else
                        If type_ = "body" Then
                                getPage = whr_obj.ResponseBody
                        Else
                                getPage = whr_obj.ResponseText
                        End If
                End If
                On Error GoTo 0
        End Function
        
        Private Function getMainPage
                getMainPage = getPage(url, "body")
                ' 因為 8comic 網站是用 big5 編碼 所以要做編碼轉換 否則只會看到亂碼
                If IsArray(getMainPage) Then getMainPage = changeCharset(getMainPage, "Big5")           
        End Function
        
        ' 檢查使用者輸入的網址是否符合 8comic 的格式
        Private Function checkURL
                Reg.Pattern = "^http:\/\/www\.8comic\.com\/(html\/)?[0-9]+\.html$"
                checkURL = Reg.Test(url)
        End Function
        
        '****************************
        '               public field            *
        '****************************
                
        ' 開始分析網址為 url 的漫畫 剖析出漫畫的資訊 包括集數 名稱...
        ' 分析成功回傳 true 否則回傳 false
        Public Function startParse(url_)
                parse_succeed = False
                startParse    = False
                
                url = url_
                If Not checkURL() Then Exit Function
                
                Dim main_page : main_page = getMainPage()
                If main_page = False Then Exit Function
                
                ttSubPage = FindMark(main_page)
                GetRBaseURL
                DspTitleMsg main_page, ttSubPage
                
                startParse    = True
                parse_succeed = True
        End Function
        
        ' 回傳該漫畫的名稱
        Public Function getComicName
                getComicName = ""
                
                If parse_succeed <> True Then Exit Function
                
                getComicName = title(0)
        End Function
        
        ' 回傳一個陣列 內容為該漫畫的集數
        Public Function getChapters
                getChapters = Array()
                
                If parse_succeed <> True Then Exit Function
                        
                getChapters = SubPage_Names
        End Function
        
        Public Function getPicURLs(chap)
                getPicURLs = Array()
                
                If parse_succeed <> True Then Exit Function
                
                Dim index, limit, fso
                ' 找出 chap 在該漫畫所有集數中的 index 是多少
                limit = UBound(SubPage_Names)
                For index = 0 To limit
                        If SubPage_Names(index) = chap Then
                                referer    = SubPage_URLs(index)
                                getPicURLs = DL_and_open_Sub_File(1, SubPage_URLs(index))
                                Set fso = CreateObject("Scripting.FileSystemObject")
                                fso.DeleteFile("tmp\*html@ch*")
                                Exit Function
                        End If
                Next
        End Function
        
        ' 讓使用者知道從 8comic 下載漫畫要附加什麼 request header
        ' 實做為告訴使用者要加 referer 而且隨著要下載的不同集數 referer 也會不同
        Public Function headersNeeded
                headersNeeded = Null
                If parse_succeed <> True Then Exit Function
                
                Set headersNeeded = CreateObject("Scripting.Dictionary")
                headersNeeded.Add "Referer", referer
        End Function
        
        ' 讓使用者知道這個 parser 的名字
        Public Function parserName()
                parserName = "Comic8Parser"
        End Function
        
        ' 讓使用者取得 8comic 上的漫畫封面
        Public Function getCoverURL
                getCoverURL = ""
                
                If parse_succeed <> True Then Exit Function
                
                Dim arr, arr2
                arr = Split(url, "/", -1)
                arr2 = Split(arr(UBound(arr)), ".", -1)
                getCoverURL = "http://www.8comic.com/pics/0/" & arr2(0) & ".jpg"
        End Function
        
        ' 讓使用者可以取得漫畫網址
        Public Function getComicURL
                getComicURL = ""
                If parse_succeed <> True Then Exit Function
                getComicURL = url
        End Function

        Public Sub setLogger(logger_)
                Set logger = logger_
        End Sub 
End Class
