function ChapterManager() {
        var $selectedChapters = $('#select_chaps');
        var $comicChapters    = $('#comic_chaps');
        
        // Show the chapters that user picked in the "comic_chaps" select box, 
        this.showSelectChapters = function() {
                $selectedChapters.append($comicChapters.find(':selected').clone());
        };

        this.showComicChapters = function(chapters) {
                for (var i = 0; i < chapters.length; i++)
                        $comicChapters.append('<option>' + chapters[i] + '</option>');
        };
        
        // Return an array that contained the selected comic chapters
        this.getSelectedChapters = function() {
                var arr = [];
                
                $selectedChapters.find('option').each(function(i, elm) {
                        arr[i] = elm.text;
                });

                return arr;
        };
        
        this.clearComicChapters = function() {
                $comicChapters[0].options.length = 0;
        };

        this.clearSelectChapters = function() {
                $selectedChapters[0].options.length = 0;
        };
}
