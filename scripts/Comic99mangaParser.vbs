' 99manga 的網頁剖析器 負責取得漫畫的名稱 集數 漫畫圖片網址等等.. 

Class Comic99mangaParser
        Private whr                         ' WinHttpRequest 物件
        Private logger                      ' 發生錯誤時紀錄錯誤訊息
        Private parse_succeed               ' boolean 值 表示 parse 成功或是失敗
        Private main_page                   ' 漫畫頁面的 HTML code
        Private comic_name                  ' 漫畫名稱
        Private comic_chaps                 ' 漫畫集數 是一個 dictionary (key,value) pair 為 (chapter name, chapter url)
        Private ServerList(15)              ' 99manga 使用的 server list
        Private domain_99manga              ' 99manga 的 domain name
        Private comic_url                   ' 漫畫網址
        Private cover_domain                ' 漫畫封面網址的 domain name
        
        Private Sub Class_Initialize
                Set whr         = CreateObject("WinHttp.WinHttpRequest.5.1")
                Set comic_chaps = CreateObject("Scripting.Dictionary")
                domain_99manga  = "http://99manga.com/"
                cover_domain    = "http://img.99mh.com/"
                ServerList(0)="http://112.85.42.98:99/dm01/"
                ServerList(1)="http://112.85.42.90:99/dm02/"
                ServerList(2)="http://112.85.42.90:99/dm03/"
                ServerList(3)="http://112.85.42.98:99/dm04/"
                ServerList(4)="http://221.4.182.218:99/dm05/"
                ServerList(5)="http://119.184.120.46:99/dm06/"
                ServerList(6)="http://112.85.42.90:99/dm07/"
                ServerList(7)="http://112.85.42.98:99/dm08/"
                ServerList(8)="http://119.184.120.46:99/dm09/"
                ServerList(9)="http://112.85.42.98:99/dm10/"
                ServerList(10)="http://221.4.182.219:99/dm11/"
                ServerList(11)="http://112.85.42.90:99/dm12/"
                ServerList(12)="http://173.231.57.234/dm13/"
                ServerList(13)="http://173.231.57.238/dm14/"
                ServerList(14)="http://112.85.42.98:99/dm15/"
                ServerList(15)="http://173.231.57.238/dm16/"
        End Sub

        ' 檢查 url 是否符合 99manga 的網址格式
        Private Function checkURL(url)
                Dim regex : Set regex = New RegExp
                regex.IgnoreCase        = True
                regex.Global            = True
                regex.Pattern           = "^http:\/\/dm\.99manga\.com\/comic\/[0-9]+\/$"
                checkURL = regex.Test(url)
        End Function
        
        ' 取得 99manga 上的頁面
        Private Function getPage(url_)
                whr.Open "GET", url_, True
                whr.Send
                
                On Error Resume Next
                whr.WaitForResponse
                If Err.Number <> 0  Or whr.Status <> 200 Then
                        logger.log "error in " & Me.parserName() & " function: getPage " & Err.Description
                        getPage = False
                        Err.clear
                        Exit Function
                Else
                        ' 因為 99manga 網站是用 "utf-8" 編碼 所以要做編碼轉換 否則只會看到亂碼
                        getPage = changeCharset(whr.ResponseBody, "utf-8")
                End If
                On Error GoTo 0
        End Function
                
        ' 取得漫畫名稱
        Private Function comicName
                comicName = False
                Dim matches
                ' SubMatches (.+?)
                Set matches = getStr(main_page, "<h1><a title='(.+?)'")
                If matches.Count <> 1 Then
                        logger.log "error in " & Me.parserName() & " function: comicName"
                        Exit Function
                End If

                comic_name = matches(0).SubMatches(0)
                comicName = True
        End Function
        
        ' 取得漫畫集數
        Private Function chapters
                chapters = False
                Dim url_matches, chap_matches, match, index
                ' 抓取漫畫集數的網址
                Set url_matches = getStr(main_page, "(\/page\/[0-9]+m[0-9]+\/)'>(.+?)<\/a>")

                ' 如果漫畫集數或集數網址數量為 0 或是漫畫集數跟集數網址數量不符合 結束函式
                If url_matches.Count=0 Then
                        logger.log "error in " & Me.parserName() & " function: chapters, can not get comic links"
                        Exit Function
                End If

                ' 儲存漫畫集數與漫畫網址
                comic_chaps.RemoveAll
                For index = url_matches.Count - 1 To 0 Step - 1
                        ' 99manga 上竟然有漫畫集數重複的狀況 必須先判斷集數是否存在才儲存
                        If Not comic_chaps.Exists(url_matches(index).SubMatches(1)) Then
                                comic_chaps.Add url_matches(index).SubMatches(1), domain_99manga & url_matches(index).SubMatches(0)
                        End If
                Next
                
                chapters = True
        End Function

        '***********************
        '       public field   *
        '***********************
        
        Public Function startParse(url)
                startParse    = False
                parse_succeed = False
                
                If Not checkURL(url) Then Exit Function
                main_page = getPage(url)
                
                If main_page = False Then Exit Function
                If comicName = False Then Exit Function
                If chapters  = False Then Exit Function
                
                comic_url         = url
                startParse        = True
                parse_succeed = True
        End Function
        
        Public Function getComicName
                getComicName = ""
                If parse_succeed <> True Then Exit Function
                getComicName = comic_name
        End Function
        
        Public Function getChapters
                getChapters = Array()
                If parse_succeed <> True Then Exit Function
                getChapters = comic_chaps.Keys()
        End Function
        
        Public Function getPicURLs(chap)
                getPicURLs = Array()
                If parse_succeed <> True Then Exit Function
                
                Dim url, page, matches, index, dict, server
                ' 取得漫畫集數的網頁
                url  = comic_chaps.Item(chap)
                page = getPage(url)
                If page = False Then Exit Function
                        
                ' 取得所有的圖片網址
                Set matches = getStr(page, "\/ok-comic([0-9]+).+?\.(jpg|png)")
                If matches.Count = 0 Then
                        logger.log "error in " & Me.parserName() & " function: getPicURLs "
                        Exit Function
                End If
                ' 漫畫集數網址尾端是 s=x, x-1就是 server list 中的 index
                server = ServerList(matches(0).SubMatches(0) - 1)
                Set dict = CreateObject("Scripting.Dictionary")
                For index = 0 To matches.Count-1
                        dict.Add index, server & matches(index).Value
                Next
                getPicUrls = dict.Items()
        End Function
        
        ' 讓使用者取得下載 99manga 的圖片需要的 header  目前測試只需要 referer: domain name 就可以
        Public Function headersNeeded
                headersNeeded = Null
                If parse_succeed <> True Then Exit Function
                
                Set headersNeeded = CreateObject("Scripting.Dictionary")
                headersNeeded.Add "Referer", domain_99manga
        End Function
        
        Public Function parserName
                parserName = "Comic99mangaParser"
        End Function
        
        Public Function getCoverURL
                getCoverURL = ""
                
                If parse_succeed <> True Then Exit Function
                
                Dim prefix, matches
                Set matches = getStr(main_page, "comicui\/[0-9]+\.jpg")
                ' 我猜測不是每本漫畫都有封面 所以在這裡如果取不到封面網址我不當作是錯誤發生 不紀錄log
                
                If matches.Count = 0 Then Exit Function
                
                getCoverURL = cover_domain & matches(0).Value
        End Function
        
        ' 讓使用者可以取得漫畫網址
        Public Function getComicURL
                getComicURL = ""
                If parse_succeed <> True Then Exit Function
                getComicURL = comic_url
        End Function

        Public Sub setLogger(logger_)
                Set logger = logger_
        End Sub 
End Class
