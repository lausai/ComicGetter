' 99770 的網頁剖析器 負責取得漫畫的名稱 集數 漫畫圖片網址等等.. 

Class Comic99770Parser
        Private whr                         ' WinHttpRequest 物件
        Private logger                      ' 發生錯誤時紀錄錯誤訊息
        Private parse_succeed               ' boolean 值 表示 parse 成功或是失敗
        Private main_page                   ' 漫畫頁面的 HTML code
        Private comic_name                  ' 漫畫名稱
        Private comic_chaps                 ' 漫畫集數 是一個 dictionary (key,value) pair 為 (chapter name, chapter url)
        Private ServerList(11)              ' 99770 使用的 server list
        Private domain_99770                ' 99770 的 domain name
        Private comic_url                   ' 漫畫網址
        Private cover_domain                ' 漫畫封面網址的 domain name
        
        Private Sub Class_Initialize
                Set whr         = CreateObject("WinHttp.WinHttpRequest.5.1")
                Set comic_chaps = CreateObject("Scripting.Dictionary")
                domain_99770    = "http://mh.99770.cc/"
                cover_domain    = "http://img.99mh.com/"
                ' 初始化 server list
                ServerList(0)="http://39.comicservers.com/dm01/"  
                ServerList(1)="http://202.comicservers.com/dm02/" 
                ServerList(2)="http://202.comicservers.com/dm03/" 
                ServerList(3)="http://202.comicservers.com/dm04/" 
                ServerList(4)="http://39.comicservers.com/dm05/"  
                ServerList(5)="http://202.comicservers.com/dm06/" 
                ServerList(6)="http://39.comicservers.com/dm07/"  
                ServerList(7)="http://135.comicservers.com/dm08/" 
                ServerList(8)="http://162.comicservers.com/dm09/"    
                ServerList(9)="http://135.comicservers.com/dm10/" 
                ServerList(10)="http://135.comicservers.com/dm11/"
                ServerList(11)="http://39.comicservers.com/dm12/" 
        End Sub

        ' 檢查 url 是否符合 99770 的網址格式
        Private Function checkURL(url)
                Dim regex : Set regex = New RegExp
                regex.IgnoreCase          = True
                regex.Global              = True
                regex.Pattern = "^http:\/\/mh\.99770\.cc\/comic\/[0-9]+\/$"
                checkURL = regex.Test(url)
        End Function
        
        ' 取得 99770 上的頁面
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
                        ' 因為 99770 網站是用 "gb2312" 編碼 所以要做編碼轉換 否則只會看到亂碼
                        getPage = changeCharset(whr.ResponseBody, "gb2312")
                End If
                On Error GoTo 0
        End Function
                
        ' 取得漫畫名稱
        Private Function comicName
                comicName = False
                Dim matches
                ' SubMatches (.+?)
                Set matches = getStr(main_page, "alt=""(.+?)""")
                If matches.Count = 0 Or matches.Count < 2 Then
                        logger.log "error in " & Me.parserName() & " function: comicName"
                        Exit Function
                End If
                
                ' 符合這個 pattern 的 字串有兩個 取第二個: matches(1)
                comic_name = matches(1).SubMatches(0)
                comicName = True
        End Function
        
        ' 取得漫畫集數
        Private Function chapters
                chapters = False
                Dim url_matches, chap_matches, match, index
                ' 抓取漫畫集數的網址
                Set url_matches = getStr(main_page, "manhua\/[0-9]+\/[0-9]+\/\?s=[0-9]+")
                ' 抓取漫畫集數
                Set chap_matches = getStr(main_page, "target=_blank>(.+?)<\/a>")
                
                ' 如果漫畫集數或集數網址數量為 0 或是漫畫集數跟集數網址數量不符合 結束函式
                If url_matches.Count=0 Or chap_matches.Count=0 Or url_matches.Count<>chap_matches.Count Then
                        logger.log "error in " & Me.parserName() & " function: chapters"
                        Exit Function
                End If
                
                ' 儲存漫畫集數與漫畫網址
                comic_chaps.RemoveAll
                For index = chap_matches.Count-1 To 0 Step -1
                        ' 99770 上竟然有漫畫集數重複的狀況 必須先判斷集數是否存在才儲存
                        If Not comic_chaps.Exists(chap_matches(index).SubMatches(0)) Then
                                comic_chaps.Add chap_matches(index).SubMatches(0), domain_99770 & url_matches(index).Value
                        End If
                Next
                
                chapters = True
        End Function

        '*******************
        '   public field   *
        '*******************
        
        Public Function startParse(url)
                startParse    = False
                parse_succeed = False
                
                If Not checkURL(url) Then Exit Function
                main_page = getPage(url)
                
                If main_page = False Then Exit Function
                If comicName = False Then Exit Function
                If chapters  = False Then Exit Function
                
                comic_url     = url
                startParse    = True
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
                Set matches = getStr(page, "\/ok-comic.+?\.(jpg|png)")
                If matches.Count = 0 Then
                        logger.log "error in " & Me.parserName() & " function: getPicURLs "
                        Exit Function
                End If
                ' 漫畫集數網址尾端是 s=x, x-1就是 server list 中的 index
                server = ServerList(Right(url, 1) - 1)
                Set dict = CreateObject("Scripting.Dictionary")
                For index = 0 To matches.Count-1
                        dict.Add index, server & matches(index).Value
                Next
                getPicUrls = dict.Items()
        End Function
        
        ' 讓使用者取得下載 99770 的圖片需要的 header  目前測試只需要 referer: domain name 就可以
        Public Function headersNeeded
                headersNeeded = Null
                If parse_succeed <> True Then Exit Function
                
                Set headersNeeded = CreateObject("Scripting.Dictionary")
                headersNeeded.Add "Referer", domain_99770
        End Function
        
        Public Function parserName
                parserName = "Comic99770Parser"
        End Function
        
        Public Function getCoverURL
                getCoverURL = ""
                
                If parse_succeed <> True Then Exit Function
                
                Dim prefix, matches
                Set matches = getStr(main_page, "upload\/[\w\/]+\.jpg")
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
