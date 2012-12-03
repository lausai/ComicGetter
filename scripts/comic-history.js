// Maintain the history list of downloaded comics.
// It Can load the comic history from disk and save back to disk.
// And Can provide some infomation to client such as url of comic.

function ComicHistory() {
        // The element of list should be like this
        // {
        //      'name'  : name,
        //      'url'   : url, 
        //      'parser': parser
        // }
        var comicInfoList     = [];     
        var fileName          = 'history';
       
        this.getDownloadedComics = function() {
                var res = [];
                
                for (var i = 0; i < comicInfoList.length; i++)
                        res.push(comicInfoList[i]['name']);

                return res;
        };

        this.getComicUrl = function(comicName) {
                var res = null;
                
                for (var i = 0; i < comicInfoList.length; i++) {
                        if (comicInfoList[i]['name'] == comicName) {
                                res = comicInfoList[i]['url'];
                                break;
                        }
                }
                return res;
        };

        this.addComicInfo = function(name, url, parser) {
                var maxHistoryAllowed = 15;

                for (var i = 0; i < comicInfoList.length; i++) {
                        if (name == comicInfoList[i]['name'])
                                return;
                }
                
                if (comicInfoList.length >= maxHistoryAllowed)
                        comicInfoList.shift();

                comicInfoList.push({
                        'name'  : name,
                        'url'   : url,
                        'parser': parser
                });
        };
        
        this.save = function() {
                var fso = new ActiveXObject('Scripting.FileSystemObject');
                var f   = fso.OpenTextFile(fileName, 2, true, -1);      // set to unicode mode
                
                for (var i = 0; i < comicInfoList.length; i++) {
                        var info = comicInfoList[i]['name'] + '$' +
                                   comicInfoList[i]['url'] + '$' +
                                   comicInfoList[i]['parser']

                        f.WriteLine(info);
                }
                f.Close();
        };

        // Load the downloaded comic history from disk.
        // Use anonymous function to save memory usage.
        // The local variables within this function will freed after it exit.
        (function() {
                var fso = new ActiveXObject('Scripting.FileSystemObject');

                if (fso.FileExists(fileName)) {
                        var f = fso.OpenTextFile(fileName, 1, false, -1);       // unicode mode
                        var arr;

                        while (!f.AtEndOfStream) {
                                arr = f.ReadLine().split('$');
                                this.addComicInfo(arr[0], arr[1], arr[2]);
                        }
                        f.Close();
                }
        }).call(this);
}
