// Save and load the user preference

function Preference() {
        var data     = {};
        var fileName = 'preference';

        (function() {
                var fso = new ActiveXObject('Scripting.FileSystemObject');

                if (fso.FileExists(fileName)) {
                        var file = fso.OpenTextFile(fileName, 1, false, -1);

                        while (!file.AtEndOfStream) {
                                var arr = file.ReadLine().split('$');
                                data[arr[0]] = arr[1];
                        }

                        file.Close();
                }
        })();

        this.save = function() {
                var fso = new ActiveXObject('Scripting.FileSystemObject');
                var file = fso.OpenTextFile(fileName, 2, true, -1)      // Set to unicode mode

                for (var key in data)
                        file.WriteLine(key + '$' + data[key]);
                
                file.Close();
        };

        this.setSavePath = function(value) {
                data['save_path'] = value;
        };

        this.getSavePath = function() {
                // The default save path is the current directory
                return data['save_path'] ? data['save_path'] : '.';
        };
}
