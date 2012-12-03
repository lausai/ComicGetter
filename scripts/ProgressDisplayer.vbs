' 顯示下載進度

Class ProgressDisplayer
    Public Sub onDwProgressChanged(progress)
        getElm("id", "progress_bar").style.width = progress & "%"
    End Sub
End Class
