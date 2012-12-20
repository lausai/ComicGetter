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

                // The default save path is the current directory
                if (!data['save_path'])
                        data['save_path'] = new ActiveXObject('Wscript.Shell').CurrentDirectory;
        })();

        this.save = function() {
                var fso = new ActiveXObject('Scripting.FileSystemObject');
                var file = fso.OpenTextFile(fileName, 2, true, -1)      // Set to unicode mode
                
                // If the save path is the same as the current directory,
                // means user did not select a save path.
                // So we should not save the save path to disk.
                if (data['save_path'] == new ActiveXObject('Wscript.Shell').CurrentDirectory)
                        delete data['save_path'];

                for (var key in data)
                        file.WriteLine(key + '$' + data[key]);
                
                file.Close();
        };

        this.setSavePath = function(value) {
                data['save_path'] = value;
        };

        this.getSavePath = function() {
                return data['save_path'];
        };

        this.setProxy = function(value) {
                data['proxy'] = value;
        };

        this.getProxy = function() {
                return data['proxy'];
        };

        this.isUseProxy = function() {
                // We need also compare to string 'true' because after we store the value
                // in a file and read it back, the value will become a string.
                return ('true' == data['use_proxy'] || true == data['use_proxy']) ? true : false;
        };

        this.setUseProxy = function(isUse) {
                data['use_proxy'] = isUse;
        };
}
