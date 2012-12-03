' 將使用者下載過的漫畫紀錄下來 包括: 漫畫網址, 漫畫名稱, 漫畫網站需要用到的 parser
' 並在需要時可以提供這些資訊 這些資料都存在一個純文字檔案裡
' 資料存放格式為 漫畫名稱$漫畫網址$漫畫網站需要的parser
 
' 此物件的實做依賴於 dictionary 物件未公開的特性
' 一個 dictionary 物件的 Items() 或 Keys() method 返回的陣列順序是依照元素加入物件的先後順序
' 但是並沒有任何文件說明 dictionary 物件有此特性

Class ComicHistory
        Private max_comics        ' 最多可以紀錄多少個漫畫資訊
        Private file_name         ' history 檔名
        Private comic_list        ' 一個 dictionary 存放曾經下載過的漫畫資訊
        
        Private Sub Class_Initialize
                file_name          = "history"
                max_comics         = 10         ' 預設紀錄最近 10 次下載的漫畫
                Set comic_list     = createDict()
                loadDownloadedComics
        End Sub
        
        ' 在物件銷毀前將資料存入硬碟
        Private Sub Class_Terminate
                Dim fso, f, key
                
                Set fso = CreateObject("Scripting.FileSystemObject")
                Set f   = fso.OpenTextFile(file_name, 2, True, -1)              ' unicode mode
                For Each key In comic_list.Keys()
                        f.WriteLine key & "$" & join(comic_list.Item(key).Items(), "$")
                Next
                f.Close
        End Sub
        
        Private Function createComicInfo(url, parser)
                Set createComicInfo = createDict()
                createComicInfo.Add "url", url
                createComicInfo.Add "parser", parser
        End Function
        
        ' 從檔案中讀取使用者下載過的漫畫
        Private Sub loadDownloadedComics
                Dim fso, f, arr
                
                Set fso = CreateObject("Scripting.FileSystemObject")
                If fso.FileExists(file_name) Then
                        Set f = fso.OpenTextFile(file_name, 1, False, -1)       ' unicode mode
                        Do While f.AtEndOfStream <> True
                                arr = Split(f.ReadLine(), "$")
                                saveComicInfo arr(0), arr(1), arr(2)
                        Loop
                        f.Close
                End If
        End Sub
        
        Private Function createDict
                Set createDict = CreateObject("Scripting.Dictionary")
        End Function
        
        '*******************
        '       public field   *
        '*******************
        
        ' 傳回一個陣列 內含曾經下載過的漫畫的名稱       
        Public Function getDownloadedComics
                getDownloadedComics = comic_list.Keys()
        End Function
        
        ' 讓使用者可以經由漫畫名稱 得到關於漫畫的資訊
        Public Function getDownloadedComicInfo(Name)
                Set getDownloadedComicInfo = createDict()
                
                getDownloadedComicInfo.Add "url", comic_list.Item(Name).Item("url")
                getDownloadedComicInfo.Add "parser", comic_list.Item(Name).Item("parser")
        End Function
        
        ' 讓使用者可以將漫畫的資訊儲存到歷史紀錄中
        Public Sub saveComicInfo(Name, url, parser)
                If comic_list.Exists(Name) Then comic_list.Remove Name
                        
                comic_list.Add Name, createComicInfo(url, parser)
                If comic_list.Count > max_comics Then comic_list.Remove comic_list.Keys()(0)
        End Sub
End Class
