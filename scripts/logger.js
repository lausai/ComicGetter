function Logger() {
        var fso      = new ActiveXObject("Scripting.FileSystemObject");
        var fileName = "log.txt";

        this.setLogName = function(logName) {
                fileName = logName;
        };

        this.log = function(errorMsg) {
                alert('in log');
                var file        = fso.OpenTextFile(fileName, 8, true, -1);
                var date        = new Date();
                var errorString = date.getFullYear() + "/" + 
                                  date.getDay() + "/" + 
                                  date.getMonth() + " " + 
                                  date.getHours() + ":" + 
                                  date.getMinutes() + ":" + 
                                  date.getSeconds() + "    " + 
                                  errorMsg;
                
                file.WriteLine(errorString);
                file.Close();
        };

        this.deleteLog = function() {
                if (fso.FileExists(fileName))
                        fso.DeleteFile(fileName);
        };
}
