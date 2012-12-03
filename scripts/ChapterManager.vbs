Class ChapterManager
        ' private declare

        Private select_chaps
        Private comic_chaps
        
        Private Sub Class_Initialize
                Set select_chaps = getElm("id", "select_chaps")
                Set comic_chaps  = getElm("id", "comic_chaps")
        End Sub
                        
       
        ' public declare
        
        ' show the chapters that user selected, and set the attributes of selected_chaps
        Public Sub showSelectChaps
                Dim opt
                
                For Each opt In comic_chaps.options
                        If opt.selected Then
                                select_chaps.add createNode("option", opt.text)
                        End If
                Next
        End Sub
        
        ' show all the chapters contained in the chaps parameter in the left area
        Public Sub showComicChaps(chaps)
                Dim chap
                
                For Each chap In chaps
                        comic_chaps.add createNode("option", chap)
                Next
        End Sub
        
        ' return an array, which contains all the chapters that user want to download
        Public Function getSelectedChaps
                Dim arr(), opt
                
                ReDim arr(0)
                For Each opt In select_chaps.options
                        push arr, opt.text
                Next
                getSelectedChaps = arr
        End Function
        
        Public Sub clearComicChaps
                comic_chaps.options.length = 0
        End Sub
        
        Public Sub clearSelectChaps
                select_chaps.options.length = 0
        End Sub
End Class
