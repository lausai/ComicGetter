'在程式的各個運作狀態中 只讓使用者能夠點擊必要的按鈕

class FlowControl
        Private Sub buttonDisable(button_ids, disabled)
                Dim id
                For Each id In button_ids
                        getElm("id", id).disabled = disabled
                Next
        End Sub
        
        Private Sub disableAll
                getElm("id", "url").readOnly = True
                buttonDisable Array("search", "download", "show_select", "downloaded_comics", "dw_to"), True
        End Sub
        
        '********************
        '   public field    *
        '********************
        
        Public Sub statusNow(status)
                Select Case status
                        Case "program_start"
                                getElm("id", "url").readOnly = False
                                buttonDisable Array("search", "downloaded_comics", "dw_to"), False
                                buttonDisable Array("download", "show_select"), True
                        Case "start_search"
                                disableAll
                        Case "after_search"
                                getElm("id", "url").readOnly = False
                                buttonDisable Array("download"), True
                                buttonDisable Array("search", "show_select", "downloaded_comics", "dw_to"), False
                        Case "after_select"
                                buttonDisable Array("download"), False
                        Case "start_download"
                                disableAll
                        Case "after_download"
                                getElm("id", "url").readOnly = False
                                buttonDisable Array("search", "download", "show_select", "downloaded_comics", "dw_to"), False
                End Select
        End Sub
End class
