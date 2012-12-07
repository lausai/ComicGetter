// Move the window to the middle of the screen
function windowToMiddle(windowWidth, windowHeight) {
        var toX          = (screen.availWidth - windowWidth) / 2;
        var toY          = (screen.availHeight - windowHeight) / 2;
        
        window.resizeTo(windowWidth, windowHeight);
        window.moveTo(toX, toY);
}

// Display the comics that already downloaded before
function showDownloadedComics(history) {
        var $node = $('#downloaded_comics');

        $node[0].options.length = 0;
        
        // Append a empty option first so the user can select
        // if only one comic in history list
        $node.append('<option></option>');
        
        var comics = history.getDownloadedComics();
        for (var i = 0; i < comics.length; i++)
                $node.append('<option>' + comics[i] + '</option');
}

function getParserNameByUrl(url) {
        if (-1 != url.indexOf('8comic')) return new Comic8Parser();
        if (-1 != url.indexOf('99770')) return new Comic99770Parser();
        if (-1 != url.indexOf('99manga')) return new Comic99mangaParser();

        return null;
}

function sendRequest(url, callback, postData) {
        if (!winhttp) return;

        var method = postData ? 'POST' : 'GET';
        
        winhttp.Open(method, url, true);
        if (postData)
                winhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        winhttp.onReadyStateChange = callback;
        winhttp.Send(postData);
}

function setUIByStatus(theStatus) {
        function disableAll() {
                $('#url').attr('readonly', true);
                $('#search, #download, #show_select, #downloaded_comics, #dw_to').attr('disabled', true);
        }

        switch (theStatus) {
                case 'program_start':
                        $('#url').attr('readonly', false);
                        $('#search, #downloaded_comics, #dw_to').attr('disabled', false);
                        $('#download, #show_select').attr('disabled', true);
                        break;
                case 'start_search':
                        disableAll();
                        break;
                case 'after_search':
                        $('#url').attr('readonly', false);
                        $('#download').attr('disabled', true);
                        $('#search, #show_select, #downloaded_comics, #dw_to').attr('disabled', false);
                        break;
                case 'after_select':
                        $('#download').attr('disabled', false);
                        break;
                case 'before_push_task':
                        disableAll();
                        break;
                case 'after_push_task':
                        $('#url').attr('readonly', false);
                        $('#search, #download, #show_select, #downloaded_comics, #dw_to').attr('disabled', false);
                        break;
                default:
                        ;
        }
}

function writeMessage(message) {
        $msg_block = $('#msg_block');
        $msg_block.html($msg_block.html() + message + '<br>');

        // Make sure the scroll bar always be the bottom
        $msg_block[0].scrollTop = $msg_block[0].scrollHeight - $msg_block[0].clientHeight;
}

function clearMessage() {
        $('#msg_block').html('');
}

// Display the cover of the comic
function showCover() {
        if (winhttp.readyState == 4) {
                if (winhttp.status == 200) {
                        // If use a fix cover image name, sometimes the image will not refresh itself
                        // for unknow reason.
                        // So use a suffix and change the cover image name every time to make sure 
                        // it will refresh.
                        showCover['img_suffix'] = showCover['img_suffix'] ? -1 * showCover['img_suffix'] : 1;

                        saveFileToDisk(winhttp.ResponseBody, 'tmp\\cover' + showCover['img_suffix'] + '.jpg');
                        $('#cover_block').html('<img src="tmp\\cover' + showCover['img_suffix'] + 
                                               '.jpg" onload="valignCover(this)" />');
                }
        }
}

// Align the comic cover image
function valignCover(obj) {
        var clientHeight = $('#cover_block')[0].clientHeight;
        
        if (clientHeight > obj.height) {
                var length = (clientHeight - obj.height) / 2;
                obj.style.marginTop = length + 'px';
        }
}

function search() {
        var url = $('#url').val();

        setUIByStatus('start_search');
        parser = getParserNameByUrl(url);
        
        if (parser && parser.startParse(url)) {
                var coverUrl = parser.getCoverUrl();
                // Send an asynchronous http request to get comic cover
                if (coverUrl)
                        sendRequest(coverUrl, showCover, null);
                
                $('#select_chaps')[0].options.length = 0;

                var $comicChapters = $('#comic_chaps');
                var chapters       = parser.getChapters();

                $comicChapters[0].options.length = 0;
                for (var i = 0; i < chapters.length; i++)
                        $comicChapters.append('<option>' + chapters[i] + '</option>');

                $('#comic_name').html(parser.getComicName());
                setUIByStatus('after_search');
        } else {
                writeMessage('網頁分析失敗，請檢查您輸入網址是否正確、網路是否連通！');
                setUIByStatus('program_start');
        }
}

function download(parser, selectedChapters) {
        clearMessage();
        logger.deleteLog();
        
        var fso       = new ActiveXObject('Scripting.FileSystemObject');
        var comicPath = preference.getSavePath() + '\\' + stripInvalidFileNameChars(parser.getComicName());
        
        // If the path contains some invalid characters, strip it.
        if (!fso.FolderExists(comicPath))
                fso.CreateFolder(comicPath);

        for (var i = 0; i < selectedChapters.length; i++) {
                var justDownloadIt = true;
                var chapterName    = stripInvalidFileNameChars(selectedChapters[i]);
                // If the folder already exist, ask user if he still want to download it.
                if (fso.FolderExists(comicPath + '\\' + chapterName))
                        justDownloadIt = confirm(chapterName + '已存在, 若確定下載則會覆蓋舊檔案');
                else
                        fso.CreateFolder(comicPath + '\\' + chapterName);

                if (justDownloadIt) {
                        downloader.setFileUrls(parser.getPicUrls(selectedChapters[i]));
                        downloader.setSavePath(comicPath + '\\' + chapterName);
                        // Add some headers, for example: referer, comic web site 
                        // usually use it to prevent auto download.
                        var headers = parser.headersNeeded();
                        for (var key in headers)
                                downloader.addHeader(key, headers[key]);
                        
                        downloader.setProxy(preference.isUseProxy() ? preference.getProxy() : null);
                        downloader.getFiles();
                        writeMessage(parser.getComicName() + ' ' + chapterName + '下載完畢！');
                }
        }

        history.addComicInfo(parser.getComicName(), parser.getComicUrl(), parser.getParserName());
        showDownloadedComics(history);
}

// If user copys http url, then paste it to url input box automatically
function pasteIfUrlCopied() {
        var data = window.clipboardData.getData('text');
        
        // Use a static variable to store http url instead of just call clearData.
        // If call clearData then the copied data will disappear and user cannot
        // use it in other applications.
        if (data && 0 == data.indexOf('http:\/\/') && data != pasteIfUrlCopied['previous_url']) {
                $('#url').val(data);
                pasteIfUrlCopied['previous_url'] = data;
        }
}

function downloadIfHasTask() {
        while (taskQueue.length > 0) {
                var task = taskQueue.shift();

                download(task['parser'], task['chapters']);
        }
}


//--------------------------------------
//              code start
//--------------------------------------
windowToMiddle(700, 650);

var parser; 
var logger         = new Logger();
var downloader     = new HttpDownloader();
var history        = new ComicHistory();
var preference     = new Preference();
var winhttp        = new ActiveXObject('MSXML2.XMLHTTP.3.0');
var taskQueue      = [];

$(window).on('beforeunload', function() {
        history.save();
        preference.save();
});

// Check if the user press enter key at url input box.
$('#url').on('keyup', function(e) {
        if (e.keyCode == 13)
                search();
                
});

// Display the comic chapters that user selected.
$('#show_select').on('click', function() {
        if ($('#comic_chaps option:selected').length > 0) {
                var $selectedChapters = $('#select_chaps');

                $selectedChapters[0].options.length = 0;
                $selectedChapters.append($('#comic_chaps').find(':selected').clone());
                setUIByStatus('after_select');
        }
});

// Display the url if user select a comic in the comic download histroy list.
$('#downloaded_comics').on('change', function() {
        var comicName = this.options[this.selectedIndex].text;
        
        if (comicName)
                $('#url').val(history.getComicUrl(comicName));
});

// Let user choose a folder to save comic
$('#dw_to').on('click', function() {
        var WINDOW_HANDLE = 0;  // This should be 0 if in script.
        var OPTIONS       = 0;  // Set to simplest mode, if set to &H10& then
                                // user can set the folder by typing the path manually
        var shell  = new ActiveXObject('Shell.Application');
        var folder = shell.BrowseForFolder(WINDOW_HANDLE, '您要將漫畫下載到哪', OPTIONS);
        
        if (folder)
                preference.setSavePath(folder.Self.Path);
});

$('#url').on('focus', function() {
        this.select();
});

$('#open_dw_folder').on('click', function() {
        var path = preference.getSavePath();
        
        if (path)
                new ActiveXObject('Shell.Application').Open(path);
});

$('#download').on('click', function() {
        setUIByStatus('before_push_task');
        
        var chapters = [];

        $('#select_chaps').find('option').each(function(i, elm) {
                chapters[i] = elm.text;
        });


        var task = {
                'parser'   : parser,
                'chapters' : chapters
        };

        taskQueue.push(task);
        setUIByStatus('after_push_task');
});

$('#proxy').on('click', function() {
        window.showModalDialog('Settings.hta', preference, 'dialogHeight:170px; dialogWidth:300px;');
});

$('#search').on('click', search);

$('#comic_chaps').attr('multiple', true);
$('#select_chaps').attr('multiple', true);

setUIByStatus('program_start');
downloader.addProgressListener(new ProgressDisplayer());
downloader.setLogger(logger);
showDownloadedComics(history);

pasteIfUrlCopied();
setInterval(pasteIfUrlCopied, 200);
setInterval(downloadIfHasTask, 200);
