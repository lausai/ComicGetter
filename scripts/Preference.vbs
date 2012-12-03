' 儲存與取得使用者的喜好設定

class Preference
    Private prefer_data                         ' 儲存使用者的喜好資料
    Private file_name
    
    Private Sub Class_Initialize
        file_name   = "preference"
        Set prefer_data = CreateObject("Scripting.Dictionary")
        loadPreference
    End Sub
    
    Private Sub Class_Terminate
        savePreference
    End Sub
    
    ' 從喜好設定檔讀取資料
    Private Sub loadPreference
        Dim fso, file, arr
        
        Set fso = CreateObject("Scripting.FileSystemObject")
        If fso.FileExists(file_name) Then
            Set file = fso.OpenTextFile(file_name, 1, False, -1)
            Do While file.AtEndOfStream <> True
                arr = Split(file.ReadLine(), "$")
                prefer_data.Add arr(0), arr(1)
            Loop
        End If
    End Sub
    
    Private Sub savePreference
        Dim fso, file, key
        
        Set fso  = CreateObject("Scripting.FileSystemObject")
        Set file = fso.OpenTextFile(file_name, 2, True, -1)     ' unicode mode
        For Each key In prefer_data.keys()
            file.WriteLine key & "$" & prefer_data.Item(key)
        Next
    End Sub
    
    ' 讓使用者設定某個喜好設定
    Public Sub setPreference(prefer, value)
        If prefer_data.Exists(prefer) Then prefer_data.Remove prefer
            
        prefer_data.Add prefer, value
    End Sub
    
    ' 讓使用者取得喜好設定的內容
    Public Function getPreference(prefer)
        getPreference = ""
        If Not prefer_data.Exists(prefer) Then Exit Function
            
        getPreference = prefer_data.Item(prefer)
    End Function
End class
