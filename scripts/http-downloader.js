function HttpDownloader() {
        var maxThreadsAllowed = 5;
        var httpObjs          = new Array(maxThreadsAllowed);
        var headers           = {};
        var requestTimes      = {};
        var savedFileUrls     = {};
        var progressListeners = [];
        var savePath;
        var fileUrls;
        var savedFiles;
        
        for (var i = 0; i < httpObjs.length; i++)
                httpObjs[i] = new ActiveXObject('WinHttp.WinHttpRequest.5.1');

        function log(message) {
                if (this.logger)
                        this.logger.log(message);
        }

        function notifyProgress(progress) {
                for (var i = 0; i < progressListeners.length; i++)
                        progressListeners[i].onDwProgressChanged(progress);
        }
        
        // Send http request to url
        function sendRequest(whr, url) {
                whr.Open('GET', url, true);     // set to asynchronous mode
                for (var key in headers)
                        whr.setRequestHeader(key, headers[key]);
                
                whr.Send();
        }

        function requestNextFile(index) {
                if (fileUrls.length != 0) 
                        sendRequest(httpObjs[index], fileUrls.pop());
        }

        this.addProgressListener = function(listener) {
                progressListeners.push(listener);
        };

        this.setSavePath = function(path) {
                savePath = path;
        };
        
        // The urls is an array which contains the address 
        // of files that should be downloaded.
        this.setFileUrls = function(urls) {
                fileUrls = urls;
                fileUrls.reverse();
        };
        
        // Let client can add the http header that should be
        // sent to website during the download.
        this.addHeader = function(field, content) {
                headers[field] = content;
        };
        
        this.setLogger = function(logger) {
                this.logger = logger;
        };

        // Start download files
        this.getFiles = function() {
                var numFiles          = fileUrls.length;
                var index             = 0;
                var fileRequestTimes  = {};
                var filesAlreadySaved = [];
                
                for (var i = 0; i < httpObjs.length && i < numFiles; i++)
                        sendRequest(httpObjs[i], fileUrls.pop());
                
                while (filesAlreadySaved.length < numFiles) {
                        var url             = httpObjs[index].Option(1);
                        var fileName        = url.substr(url.lastIndexOf('/') + 1);
                        var downloadSuccess = false;

                        try {
                                // WaitForResponse may occur errors which donsn't know the reason
                                if (-1 == $.inArray(fileName, filesAlreadySaved)) {
                                        httpObjs[index].WaitForResponse();
                                
                                        var fileSavePath = savePath + '\\' + fileName;
                                        // If the server return a header with 200 status but did not send
                                        // file back, an error will occur in saveFileToDisk
                                        if (200 == httpObjs[index].Status)
                                                saveFileToDisk(httpObjs[index].ResponseBody, fileSavePath);
                                        
                                        downloadSuccess = true;
                                }
                        } catch (e) {
                                log(fileName + ' error: ' + e.message);

                                if (fileRequestTimes[fileName]) {
                                        fileRequestTimes[fileName]++;
                                        
                                        // Set the max retry times to 3
                                        if (fileRequestTimes[fileName] > 3) {
                                                writeMessage(fileName + ' 下載超過限制次數，無法下載！');
                                                log(fileName + ' failed 3 times, stop to download it!');
                                                downloadSuccess = true;
                                        }
                                } else {
                                        fileRequestTimes[fileName] = 1;
                                }
                        }

                        if (downloadSuccess) {
                                        requestNextFile(index);
                                        filesAlreadySaved.push(fileName);
                                        notifyProgress(Math.round(filesAlreadySaved.length / numFiles * 100));
                        }
                        index = (index + 1) % httpObjs.length;
                }
        };
}

// Test code
// 
// var o = new HttpDownloader;
// var file = ['http://lh4.ggpht.com/totorojack/SACWPp0Z9EI/AAAAAAAACXI/62i3xP2wJA4/tn_lf87982342.jpg',
//             'http://s1.djyimg.com/i6/90717223906910.jpg',
//             'http://photocdn.sohu.com/20080425/Img256520726.jpg',
//             'http://zz.yy.xx/dfg.jpg',
//             'http://ext.pimg.tw/cocococo/4b2a457060d62.jpg',
//             'http://ext.pimg.tw/zx3267/1185620683.jpg',
//             'http://image.wangchao.net.cn/nvxing/1269598062255.jpg'];
// o.setFileUrls(file);
// o.setSavePath('.');
// o.getFiles();
