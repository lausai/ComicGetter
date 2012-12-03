' 程式發生錯誤時紀錄錯誤訊息

Class Logger
        Private fso
        Private file_name
        
        Private Sub Class_Initialize
                Set fso   = CreateObject("Scripting.FileSystemObject")
                file_name = "log.txt"
        End Sub
        
        '***************************
        '       public field       *
        '***************************
        
        Public Sub setLogName(f_name)
                file_name = f_name
        End Sub
        
        ' 將使用者提供的錯誤訊息寫入 log 檔案中 加上錯誤發生時間
        Public Sub log(error_msg)
                Dim file      : Set file  = fso.OpenTextFile(file_name, 8, True, -1)
                Dim error_str : error_str = ""
                
                error_str = error_str & Now() & "    " & error_msg
                
                file.WriteLine error_str
                file.Close
        End Sub

        Public Sub delete
                If fso.FileExists(file_name) Then fso.DeleteFile(file_name)
        End Sub
End Class
