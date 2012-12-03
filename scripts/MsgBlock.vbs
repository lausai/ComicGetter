'負責操作 msg_block 這個訊息輸出區塊
class MsgBlock
        Private node

        Private Sub Class_Initialize
                Set node = getElm("id", "msg_block")
        End Sub
        
        '*******************
        '   public field   *
        '*******************    
        
        ' 將參數 Line 顯示在 msg_block 區塊中並且換行
        Public Sub writeLine(Line)
                node.innerHTML = node.innerHTML & Line & "<br>"
                
                ' 顯示資訊的同時 確保滾輪永遠在最下面
                node.ScrollTop = node.ScrollHeight - node.ClientHeight
        End Sub
        
        Public Sub clearBlock
                node.innerHTML = ""
        End Sub 
End Class
