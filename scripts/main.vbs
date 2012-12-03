'***********************
'      main start      *
'***********************

' ' move the window to the middle of screen
' windowToMiddle
' 
' ' initialize the global objects
' Dim msg                : Set msg                = New MsgBlock
' Dim chap               : Set chap               = New ChapterManager
' Dim downloader         : Set downloader         = New HttpDownloader
' Dim flow               : Set flow               = New FlowControl
' Dim parser             : Set parser             = New Comic8Parser                   ' default set to 8comic parser
' Dim his                : Set his                = New ComicHistory
' Dim winhttp            : Set winhttp            = CreateObject("MSXML2.XMLHTTP.3.0") ' used to download the cover of comics
' Dim prefer             : Set prefer             = New Preference
' Dim progress_displayer : Set progress_displayer = New ProgressDisplayer
' Dim my_logger          : Set my_logger          = New Logger
' 
' downloader.setProgressListener progress_displayer
' downloader.setLogger my_logger
' 
' ' set the event handler
' Set getElm("id", "search").OnClick                 = GetRef("search")
' Set getElm("id", "url").OnKeyUp                    = GetRef("userPressEnter")
' Set getElm("id", "download").OnClick               = GetRef("download")
' Set getElm("id", "show_select").OnClick            = GetRef("selectChap")
' Set getElm("id", "downloaded_comics").OnChange     = GetRef("showSelectedUrl")
' Set getElm("id", "dw_to").OnClick                  = GetRef("setDownloadLocation")
' Set getElm("id", "url").OnFocus                    = GetRef("highlightURL")
' Set getElm("id", "open_dw_folder").OnClick         = GetRef("openDownloadFolder")
' 
' ' let user can multiple select the comic chapters
' getElm("id", "comic_chaps").multiple = True
' getElm("id", "select_chaps").multiple = True
' 
' ' now is the start of prorgram, 
' ' inform the flow object and let it set the actions which user can perform now.
' flow.statusNow "program_start"
' 
' ' show the comics which user already downloaded before
' showDownloadedComics
' 
' 
' '**********************
' '   event handlers    *
' '**********************
' 
' Sub window_OnBeforeUnload
'         ' write data back to disk when program exit
'         Set his = Nothing
'         Set prefer = Nothing
' End Sub
' 
' Sub userPressEnter
'         If window.Event.KeyCode = 13 Then search
' End Sub
' 
' ' show the url when user select a comic in the downloaded comic history list
' Sub showSelectedUrl
'         Dim sel : Set sel = getElm("id", "downloaded_comics")
'         
'         If sel.options(sel.selectedIndex).text <> "" Then
'                 getElm("id", "url").value = his.getDownloadedComicInfo(sel.options(sel.selectedIndex).text).Item("url")
'         End If
' End Sub
' 
' ' 當使用者點到 url 輸入框時反白輸入框的文字
' Sub highlightURL
'         getElm("id", "url").select
' End Sub
' 
' ' 讓使用者選擇他想將漫畫下載到哪裡
' Sub setDownloadLocation
'         Dim shell_obj, folder, path
'         Const WINDOW_HANDLE = 0     ' script 中應該使用 0
'         Const OPTIONS       = 0     ' 設定選擇框為最簡單類型 若設為 &H10& 則可讓使用者以文字輸入資料夾路徑
'         
'         Set shell_obj = CreateObject("Shell.Application")
'         Set folder    = shell_obj.BrowseForFolder(WINDOW_HANDLE, "您要將漫畫下載到哪", OPTIONS)
'         
'         If folder Is Nothing Then Exit Sub      ' 使用者沒有選擇資料夾則立刻結束涵式
'         
'         prefer.setPreference "save_location", folder.Self.Path
' End Sub
' 
' ' 當使用者按下搜尋鍵 開始搜尋漫畫
' Sub search
'         flow.statusNow "start_search"
'         ' 偵測使用者輸入的 url 應該要用哪個 parser
'         If detectParser(getElm("id", "url").value) <> "" Then Set parser = createParser(detectParser(getElm("id", "url").value))
' 
'         parser.setLogger my_logger
'                 
'         If parser.startParse(getElm("id", "url").value) Then
'                 ' 如果有封面網址就下載封面 使用非同步的方式下載並顯示 因為下載封面需要時間頗長
'                 If parser.getCoverURL() <> "" Then sendRequest parser.getCoverURL(), GetRef("showCover"), Empty, True
'                 chap.clearSelectChaps                                           ' 清空使用者選擇的漫畫集數選項
'                 chap.clearComicChaps                                            ' 清空漫畫集數選項
'                 chap.showComicChaps parser.getChapters()                        ' 顯示該漫畫的所有集數
'                 getElm("id", "comic_name").innerHTML = parser.getComicName()    ' 顯示該漫畫名稱
'                 flow.statusNow "after_search"
'         Else
'                 ' 該網頁 parse 失敗了 通知使用者
'                 msg.writeLine "網頁分析失敗，請檢查您輸入網址是否正確、網路是否連通！"
'                 flow.statusNow "program_start"
'         End If
' End Sub
' 
' ' 將使用者選擇的要下載的漫畫集數顯示出來
' Sub selectChap
'         chap.clearSelectChaps                   ' 清空使用者選擇的漫畫集數選項
'         chap.showSelectChaps                    ' 顯示使用者選擇的漫畫集數
'         flow.statusNow "after_select"
' End Sub
' 
' ' 使用者按下下載時 開始下載
' Sub download
'         flow.statusNow "start_download"
'         msg.clearBlock
' 
'         my_logger.delete
'         
'         Dim fso, valid_comic_name
'         Set fso = CreateObject("Scripting.FileSystemObject")
'         ' 漫畫名稱或是集數名稱可能會有 windows 檔名不能接受的字元 所以需要先去除這些字元
'         valid_comic_name = prefer.getPreference("save_location") & "\" & stripInvalidFileNameChars(parser.getComicName())
'         ' 如果該漫畫的資料夾不存在 則建立一個新的
'         If Not fso.FolderExists(valid_comic_name) Then fso.CreateFolder valid_comic_name
' 
'         Dim selected_chap, headers, key, just_download_it, valid_chap
'         For Each selected_chap In chap.getSelectedChaps()
'                 just_download_it = vbOK
'                 valid_chap               = stripInvalidFileNameChars(selected_chap)
'                 ' 如果漫畫的集數已存在 詢問使用者是否要下載 否則建立資料夾並直接下載
'                 If fso.FolderExists(valid_comic_name & "\" & valid_chap) Then
'                         just_download_it = MsgBox(valid_chap & "已存在, 若確定下載則會覆蓋舊檔案", vbOkCancel, "目錄已存在")
'                 Else
'                         fso.CreateFolder valid_comic_name & "\" & valid_chap
'                 End If
'                 
'                 If just_download_it = vbOK Then
'                         downloader.setFileURLs parser.getPicURLs(selected_chap)
'                         downloader.setSavePath valid_comic_name & "\" & valid_chap
'                         ' 設定執行下載工作所需要的 header 最常見是 referer 漫畫網站常用它來防盜連
'                         Set headers = parser.headersNeeded()
'                         For Each key In headers.Keys()
'                                 downloader.addHeader key, headers.Item(key)
'                         Next
'                         downloader.getFiles
'                         
'                         msg.writeLine selected_chap & "下載完畢！"
'                 End If
'         Next
'         ' 只要下載過一個漫畫 就將漫畫存入歷史資訊
'         his.saveComicInfo parser.getComicName(), parser.getComicURL(), parser.parserName()
'         
'         ' 更新歷史資訊
'         showDownloadedComics
'         flow.statusNow "after_download"
' End Sub
' 
' 將封面垂直置中
' Sub valignCover(cover)
'        Dim length
'        If getElm("id", "cover_block").ClientHeight > cover.height Then
'                length = (getElm("id", "cover_block").ClientHeight-cover.height) / 2
'                cover.style.marginTop = length & "px"
'        End If  
' End Sub
' 
' Sub openFolder(path)
'         Dim shell : Set shell = CreateObject("Shell.Application")
'         shell.Open(path)
' End Sub
' 
' Sub openDownloadFolder()
'         Dim path
'         path = prefer.getPreference("save_location")
' 
'         If path = "" Then
'                 Exit Sub
'         End IF
' 
'         openFolder path
' End Sub
' 
' '***********************
' '      functions       *
' '***********************        
' 
' ' 將視窗移到螢幕正中央
' Sub windowToMiddle
'         Dim window_width  : window_width  = 700
'         Dim window_height : window_height = 650
'         Dim to_x                  : to_x                  = (Screen.availWidth-window_width)/2
'         Dim to_y                  : to_y                  = (Screen.availHeight-window_height)/2
' 
'         window.resizeTo window_width, window_height     ' 調整視窗大小
'         window.moveTo to_x, to_y                        ' 調整視窗出現的位置 設定為螢幕正中央
' End Sub
' 
' ' 顯示下載過的漫畫
' Sub showDownloadedComics
'         Dim dw_comics, comic_name, node
'         
'         Set dw_comics = getElm("id", "downloaded_comics")
'         ' 先清除所有子節點
'         removeChildren dw_comics
'         ' 先加入一個空白的選項 讓只有一個下載過漫畫時可以選擇
'         dw_comics.add createNode("option", "")
'         For Each comic_name In his.getDownloadedComics()
'                 dw_comics.add createNode("option", comic_name)
'         Next
' End Sub
' 
' ' 將漫畫封面顯示出來
' Sub showCover
'         If Not winhttp.readyState = 4 Then Exit Sub
'         
'         If winhttp.Status = 200 Then
'                 saveFileToDisk winhttp.ResponseBody, "tmp\cover.jpg"
'                 getElm("id", "cover_block").innerHTML = "<img src=""tmp\cover.jpg"" onload=""valignCover(Me)"" />"
'         End If
' End Sub
' 
' ' 給定 parser 名稱 就將 parser create 出來
' Function createParser(parser_name)
'         Set createParser = eval("New " & parser_name)
' End Function
' 
' ' 偵測網址需要用到哪個 parser 並回傳該 parser name
' Function detectParser(url)
'         Dim regex
'         Set regex                = New RegExp
'         regex.global     = True                 '設定這個旗標來找出 Str 中所有符合 pattern 的子字串
'         regex.ignorecase = True                 '設定這個旗標來讓比對字串時忽略大小寫
' 
'         regex.Pattern = "8comic"
'         If regex.Test(url) Then
'                 detectParser = "Comic8Parser"
'                 Exit Function
'         End If
' 
'         regex.Pattern = "99770"
'         If regex.Test(url) Then
'                 detectParser = "Comic99770Parser"
'                 Exit Function
'         End If
'         
'         regex.Pattern = "99manga"
'         If regex.Test(url) Then
'                 detectParser = "Comic99mangaParser"
'                 Exit Function
'         End If  
' End Function
' 
' '********************
' '    DOM helper     *
' '********************
' 
' '獲取單一 DOM 節點(by id) 或是節點列表(by name or tagname)
' Function getElm(by_what, iden)
'         Select Case by_what
'                 Case "id"
'                         Set getElm = document.getElementById(iden)
'                 Case "tag"
'                         Set getElm = document.getElementsByTagName(iden)
'                 Case "name"
'                         Set getElm = document.getElementsByName(iden)
'                 Case Else
'                         Set getElm = Nothing
'         End Select
' End Function
' 
' '創建一個含有文本子節點的節點
' Function createNode(Name, text)
'         Dim elm : Set elm = document.createElement(Name)
'         
'         elm.text = text
'         Set createNode = elm
' End Function
' 
' '將一個節點下的所有子節點刪除
' Sub removeChildren(node)
'         'node.childNodes 是一個 NodeList 結構 它會自我更新
'         '每刪除一個 child length 屬性就會減一
'         Do While Not node.childNodes.length = 0
'                 node.removeChild node.firstChild
'         Loop
' End Sub
' 
' '********************
' '      IO helper    *
' '********************
' 
' ' Sub saveFileToDisk(data, file_name)
' '         Dim ado : Set ado  = CreateObject("ADODB.Stream")
' '         
' '         ado.Type =  1                 '設定為二進位模式
' '         ado.Open
' '         ado.Write data                '將二進位資料寫入物件
' '         ado.SaveToFile file_name, 2   '將二進位資料寫入硬碟, 如果該檔案已存在則複寫
' '         ado.Close
' ' End Sub
' 
' '****************************
' '   data structure helper   *
' '****************************
' 
' '將陣列順序反轉 TODO
' ' Sub reverse(arr)
' '         Dim i, last, half
' '         
' '         last = UBound(arr)
' '         half = last / 2
' '         For i = 0 To half
' '                 Dim tmp : tmp = arr(i)
' '                 arr(i) = arr(last - i)
' '                 arr(last - i) = tmp
' '         Next
' ' End Sub
' ' 
' '將一個變數從陣列中 pop 出來
' ' Function pop(arr)
' '         Dim uba, var
' '    
' '         uba = UBound(arr)
' '         If uba < 0 Then
' '                 var = Null
' '         Else
' '                 var = arr(uba)
' '                 ReDim preserve arr(uba-1)
' '         End If
' '         pop = var
' ' End Function
' 
' Sub push(arr, Var)
'         Dim uba : uba = UBound(arr)
'         
'         If uba = 0 And IsEmpty(arr(0)) Then
'                 arr(uba) = Var
'         Else
'                 ReDim preserve arr(uba+1)
'                 arr(uba+1) = Var
'         End If
' End Sub
' 
' '**********************
' '   internet helper   *
' '**********************
' 
' '送出 http request 至 url 位置
' Sub sendRequest(url, callback, post_data, asyn)
'         If winhttp Is Nothing Then Exit Sub
'         
'         Dim method : method = "GET"
'         If Not IsEmpty(post_data) Then method = "POST"
' 
'         winhttp.Open method, url, asyn
'         If Not IsEmpty(post_data) Then winhttp.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
'                 
'         winhttp.onReadyStateChange = callback
'         
'         winhttp.Send post_data
' End Sub
' 
' '*********************
' '   string helper    *
' '*********************
' 
' ' 在 windows 下 檔案名稱不可以有 /\:?"*<>| 這些字元 
' ' 這個函式將 f_name 中這些字元去掉並回傳
' Function stripInvalidFileNameChars(f_name)
'         Dim invalid_chars, char
'         stripInvalidFileNameChars = f_name
'         invalid_chars = Array("/", "\", ":", "?", """", "*", "<", ">", "|", ".")
'         
'         For Each char In invalid_chars
'                 stripInvalidFileNameChars = Replace(stripInvalidFileNameChars, char, "")
'         Next
' End Function
' 
' Function getStr(Str, pattern)
'         Dim regex
'         
'         Set regex        =      New regexp
'         regex.global     =      True    '設定這個旗標來找出 Str 中所有符合 pattern 的子字串
'         regex.ignorecase =      True    '設定這個旗標來讓比對字串時忽略大小寫
'         regex.pattern    =      pattern
'         
'         Set getStr = regex.execute(Str)
' End Function
' 
' ' 用來做編碼轉換
' Function changeCharset(binary, char_set)
'         Dim ado : Set ado = CreateObject("ADODB.Stream")
'         ado.Type = 1            ' 以二進位方式操作
'         ado.Mode = 3            ' 可同時進行讀寫
'         ado.Open                ' 開啟物件
'         ado.Write binary        ' 將資料寫入物件內
'         ado.Position = 0        ' 從頭開始
'         ado.Type = 2            ' 以文字模式操作
'         ado.Charset = char_set  ' 設定編碼方式
'         changeCharset = ado.ReadText()
' End Function
