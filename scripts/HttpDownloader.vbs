'下載網路上的檔案 只能用 http 協定

Sub saveFileToDisk(data, file_name)
        Dim ado : Set ado  = CreateObject("ADODB.Stream")
        
        ado.Type =  1                 '設定為二進位模式
        ado.Open
        ado.Write data                '將二進位資料寫入物件
        ado.SaveToFile file_name, 2   '將二進位資料寫入硬碟, 如果該檔案已存在則複寫
        ado.Close
End Sub

Function pop(arr)
        Dim uba, var
   
        uba = UBound(arr)
        If uba < 0 Then
                var = Null
        Else
                var = arr(uba)
                ReDim preserve arr(uba-1)
        End If
        pop = var
End Function

Sub push(arr, Var)
        Dim uba : uba = UBound(arr)
        
        If uba = 0 And IsEmpty(arr(0)) Then
                arr(uba) = Var
        Else
                ReDim preserve arr(uba+1)
                arr(uba+1) = Var
        End If
End Sub

Sub reverse(arr)
        Dim i, last, half
        
        last = UBound(arr)
        half = last / 2
        For i = 0 To half
                Dim tmp : tmp = arr(i)
                arr(i) = arr(last - i)
                arr(last - i) = tmp
        Next
End Sub

Class HttpDownloader
        '**********************
        '    private field    *
        '**********************
        
        Private num_threads             ' 進行一次下載工作的最大緒程數
        Private save_path               ' 下載的檔案要存到哪個目錄
        Private file_urls               ' 動態陣列 儲存要下載的檔案網址
        Private whrs()                  ' 動態陣列 儲存 whr 物件
        Private num_files               ' 應該要下載的檔案數量
        Private saved_files             ' 已經完成下載的檔案數量
        Private headers                 ' 發出 http request 時加入的 header
        Private request_times           ' 紀錄著對同一個 file 發出多少次 request
        Private saved_file_urls         ' 儲存完畢的檔案的 url 會記錄在這裡
        Private dw_progress_listeners   ' 儲存下載進度的觀察者
        private logger
        
        '物件建立時作的初始化動作
        Private Sub Class_Initialize
                num_threads = 5                 '預設 thread 為 5
                ReDim whrs(num_threads - 1)
                ReDim file_names(num_threads - 1)
                Set headers               = CreateObject("Scripting.Dictionary")
                Set request_times         = CreateObject("Scripting.Dictionary")
                Set saved_file_urls       = CreateObject("Scripting.Dictionary")
                Set dw_progress_listeners = CreateObject("Scripting.Dictionary")
                initWinHttpObjs
        End Sub
                
        '初始化 whrs 陣列
        Private Sub initWinHttpObjs
                Dim index, limit
                
                limit = UBound(whrs)
                For index = 0 To limit
                        Set whrs(index) = CreateObject("WinHttp.WinHttpRequest.5.1")
                Next
        End Sub
        
        '從 file_urls 中取出檔案 url 並向 server 要求該檔案
        Private Sub requestNextFile(whr_obj)
                Dim url : url = pop(file_urls)
                
                If Not IsNull(url) Then 
                        request whr_obj, url
                End If
        End Sub
        
        ' 開始執行下載工作之初 每個 whr 物件都是閒置的 所以必須為每一個 whr 物件設定下載工作
        Private Sub initWHRTask
                Dim whr_obj, url
                For Each whr_obj In whrs
                        url = pop(file_urls)
                        If Not IsNull(url) Then         '檢查是否 file_urls 已經空了
                                request whr_obj, url
                        End If
                Next
        End Sub
        
        Private Sub errorMsg(error_msg)
                If Not logger is Nothing Then logger.log error_msg
        End Sub
        
        Private Sub request(whr, url)
                Dim key
                whr.Open "GET", url, True               '用非同步模式發出請求
                ' 設定 header
                For Each key In headers
                        whr.setRequestHeader key, headers.Item(key)
                Next
                whr.Send
        End Sub
        
        Private Function getFileNameFromURL(url)
                Dim arr : arr = Split(url, "/", -1)
                getFileNameFromURL = arr(UBound(arr))
        End Function
        
        ' 取得對 url 發起要求的次數
        Private Function getRequestTimes(url)
            ' 第一次發出請求時 url 的資料還不存在於 request_times 中
            If request_times.Exists(url) Then
                request_times.Item(url) = request_times.Item(url) + 1
            Else
                request_times.Item(url) = 1
            End If
            getRequestTimes = request_times.Item(url)
        End Function
    
        ' 下載時發生錯誤的處理
        Private Sub errorOccur(whr)
            Dim file_path : file_path = save_path & "\" & getFileNameFromURL(whr.Option(1))
            msgbox Err.Description & " " & Err.Source
            If getRequestTimes(whr.Option(1)) > 3 Then 
                ' 若是該檔案要求次數已超過限制 當作已經下載成功了 忽略該檔案
                saved_files = saved_files + 1
                msgbox file_path & " 下載超過限制次數，無法下載！"
'                msg.writeLine file_path & " 下載超過限制次數，無法下載！"
                requestNextFile whr
            Else
                ' 檔案下載次數未超過限制 重新下載
                errorMsg "重新下載 " & file_path & "  " & Err.Description                      ' 紀錄錯誤訊息
                request whr, whr.Option(1)
            End If
            Err.Clear
        End Sub
        
        ' 通知所有觀察者下載進度改變了
        Private Sub notifyProgressListeners(progress)
            Dim listener
            For Each listener In dw_progress_listeners
                listener.onDwProgressChanged(progress)
            Next
        End Sub
    
        '************************
        '       public field    *
        '************************
        
        ' 設定下載進度觀察者
        Public Sub setProgressListener(listener)
            dw_progress_listeners.Add listener, 0
        End Sub
       
        ' 讓使用者設定檔案要下載到哪裡
        Public Sub setSavePath(path)
                save_path = path
        End Sub
        
        ' 讓使用者設定要下載的檔案網址
        Public Sub setFileURLs(urls)
                file_urls = urls
                num_files = UBound(file_urls) + 1       '紀錄檔案總數量
                reverse file_urls
        End Sub
        
        ' 讓使用者可以設定他想加入的 header
        Public Sub addHeader(field, content)
                If headers.Exists(field) Then headers.Remove field
                
                headers.Add field, content
        End Sub
                
        '下載 file_urls 中的所有檔案
        Public Sub getFiles
                initWHRTask
                
                Dim whr, index, fso, file_path
                index       = 0
                saved_files = 0
                Set fso     = CreateObject("Scripting.FileSystemObject")
                On Error Resume Next
                Do While saved_files < num_files                        ' 迴圈直到下載完所有檔案為止
                        Set whr = whrs(index)
                        whr.WaitForResponse
                        file_path = save_path & "\" & getFileNameFromURL(whr.Option(1))
                        msgbox whr.Status & " " & Err.Number & " " & index
                        ' windows 的 whr 物件的 waitForResponse method 有可能會出現 error 原因不明 所以在此作錯誤處理
                        If Err.Number=0 And whr.Status=200 Then
                            ' 如果檔案還沒下載過
                            msgbox "yes" & " " & whr.Option(1)
                            If Not saved_file_urls.Exists(whr.Option(1)) Then
                                ' 若是 server 回傳的 header 是 OK 但是並沒有回傳檔案 則在這裡會發生錯誤
                                msgbox "save" & " " & file_path
                                saveFileToDisk whr.ResponseBody, file_path
                                If fso.FileExists(file_path) Then
                                        saved_files = saved_files + 1
                                        saved_file_urls.Add whr.Option(1), ""
                                        requestNextFile whr
                                Else
                                    errorOccur whr
                                End If
                            End If
                        Else
                            errorOccur whr
                        End If
                        notifyProgressListeners Round(saved_files / num_files * 100)
                        index = (index+1) Mod (UBound(whrs)+1)
                Loop
                On Error GoTo 0
        End Sub 

        Public Sub setLogger(logger_)
                Set logger = logger_
        End Sub 
End Class

' dim o
' set o = new HttpDownloader
' dim arr
' arr = Array("http://lh4.ggpht.com/totorojack/SACWPp0Z9EI/AAAAAAAACXI/62i3xP2wJA4/tn_lf87982342.jpg",_
'             "http://s1.djyimg.com/i6/90717223906910.jpg",_
'             "http://photocdn.sohu.com/20080425/Img256520726.jpg",_
'             "http://xxx.yy.xx/kerker.jpg",_
'             "http://ext.pimg.tw/cocococo/4b2a457060d62.jpg",_
'             "http://ext.pimg.tw/zx3267/1185620683.jpg",_
'             "http://image.wangchao.net.cn/nvxing/1269598062255.jpg")
' o.setFileUrls arr
' o.setSavePath "."
' o.getFiles
