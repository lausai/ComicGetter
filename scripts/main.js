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

function getParserNameByUrl(parser, url) {
    // If the parser is already the correct one, then we don't need to create a new one.
    if (-1 != url.indexOf('8comic') || -1 != url.indexOf('comicvip'))
        return new Comic8Parser();

    if (-1 != url.indexOf('mh.99770'))
        return new Comic99770NewParser();

    if (-1 != url.indexOf('99770'))
        return new Comic99770Parser();

    if (-1 != url.indexOf('99manga'))
        return new Comic99mangaParser();

    if (-1 != url.indexOf('mangahere'))
        return new MangaHereParser();

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
        $('#search, #download, #show_select, #downloaded_comics, #settings').attr('disabled', true);
    }

    switch (theStatus) {
    case 'program_start':
        $('#url').attr('readonly', false);
        $('#search, #downloaded_comics, #settings').attr('disabled', false);
        $('#download, #show_select').attr('disabled', true);
        break;
    case 'start_search':
        disableAll();
        break;
    case 'after_search':
        $('#url').attr('readonly', false);
        $('#download').attr('disabled', true);
        $('#search, #show_select, #downloaded_comics, #settings').attr('disabled', false);
        break;
    case 'after_select':
        $('#download').attr('disabled', false);
        break;
    case 'before_push_task':
        disableAll();
        break;
    case 'after_push_task':
        $('#url').attr('readonly', false);
        $('#search, #download, #show_select, #downloaded_comics, #settings').attr('disabled', false);
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

            var fso = new ActiveXObject('Scripting.FileSystemObject');
            
            if (!fso.FolderExists('tmp'))
                fso.CreateFolder('tmp');

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
    var url          = $('#url').val();
    var parseSucceed = false;

    setUIByStatus('start_search');
    parser = getParserNameByUrl(parser, url);

    if (parser) {
        parser.setLogger(logger);
        parseSucceed = parser.startParse(url);
    }

    if (parseSucceed) {
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

function download(parser, comic_name, selectedChapters, proxy, token) {
    clearMessage();
    logger.deleteLog();
    $('#task_list .' + token + ' td').eq(2).html('下載中');

    var fso       = new ActiveXObject('Scripting.FileSystemObject');
    var comicPath = preference.getSavePath() + '\\' + stripInvalidFileNameChars(comic_name);

    // If the path contains some invalid characters, strip it.
    if (!fso.FolderExists(comicPath))
        fso.CreateFolder(comicPath);

    var downloadSuccess = false;

    for (var i = 0; i < selectedChapters.length; i++) {
        var justDownloadIt = true;
        var chapterName    = stripInvalidFileNameChars(selectedChapters[i]);
        // If the folder already exist, ask user if he still want to download it.
        if (fso.FolderExists(comicPath + '\\' + chapterName))
            justDownloadIt = confirm(chapterName + '已存在, 若確定下載則會覆蓋舊檔案');
        else
            fso.CreateFolder(comicPath + '\\' + chapterName);

        if (justDownloadIt) {
            var picUrls = parser.getPicUrls(selectedChapters[i]);

            if (!picUrls) {
                writeMessage('抓取圖片網址失敗！');
            break;
            }
            downloader.setFileUrls(picUrls);
            downloader.setSavePath(comicPath + '\\' + chapterName);
            // Add some headers, for example: referer, comic web site 
            // usually use it to prevent auto download.
            var headers = parser.headersNeeded();
            for (var key in headers)
                downloader.addHeader(key, headers[key]);

            downloader.setProxy(proxy);
            downloader.getFiles();
            writeMessage(comic_name + ' ' + chapterName + '下載完畢！');
            downloadSuccess = true;
        }
    }

    $('#task_list .' + token).remove();
    if (downloadSuccess) {
        history.addComicInfo(comic_name, parser.getComicUrl(), parser.getParserName());
        showDownloadedComics(history);
    }
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

        download(task['parser'], task['name'], task['chapters'], 
                task['proxy'], task['token']);
    }
}

function hideListMenu() {
    $('html').off('click', hideListMenu);
    $('html').off('contextmenu', hideListMenu);
    $('#list_menu').css('display', 'none');
}


//--------------------------------------
//              code start
//--------------------------------------
(function () {
    var windowWidth  = 700;
    var windowHeight = 650;
    var toX          = (screen.availWidth - windowWidth) / 2;
    var toY          = (screen.availHeight - windowHeight) / 2;

    window.resizeTo(windowWidth, windowHeight);

    // Move the window to the middle of the screen
    window.moveTo(toX, toY);

    // Do some necessary works for the tab UI
    $('#tabs li').addClass('tabs-default')
    .eq(0)
    .addClass('tabs-active');

    var $links = $('#tabs a');

    for (var i = 1; i < $links.length; i++) {
        var href = $links.eq(i).attr('href');

        $(href).css('display', 'none');
    }

    $links.on('click', function() {
        $('.tabs-active').removeClass('tabs-active');
        $(this).parent().addClass('tabs-active');
    
        var hrefToShow = $(this).attr('href');
        var $links     = $('#tabs a');
    
        for (var i = 0; i < $links.length; i++) {
            var href = $links.eq(i).attr('href');
    
            if (href != hrefToShow)
                $(href).hide();
        }
    
        $(hrefToShow).show();
    
        return false;
    });
})();

var parser; 
var logger     = new Logger();
var downloader = new HttpDownloader();
var history    = new ComicHistory();
var preference = new Preference();
var winhttp    = new ActiveXObject('MSXML2.XMLHTTP.3.0');
var taskQueue  = [];

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
        var $selectItems      = $('#comic_chaps').find(':selected');

        $selectedChapters[0].options.length = 0;

        for (var i = 0; i < $selectItems.length ; i++)
            $selectedChapters[0].add(new Option($selectItems[i].text));

        setUIByStatus('after_select');
    }
});

// Display the url if user select a comic in the comic download histroy list.
$('#downloaded_comics').on('change', function() {
    var comicName = this.options[this.selectedIndex].text;

    if (comicName)
        $('#url').val(history.getComicUrl(comicName));
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

    var token = new Date().getTime();
    var task = {
        'parser'   : parser,
        'name'     : parser.getComicName(),
        'chapters' : chapters,
        'proxy'    : (preference.isUseProxy() ? preference.getProxy() : null),
        'token'    : token
    };

    taskQueue.push(task);

    var row = '<tr class="' + token + '"><td>' + parser.getComicName() +
        '</td><td>' + chapters.length +
        '</td><td>等待中</td></tr>';

    $('#task_list').append(row);

    setUIByStatus('after_push_task');
});

$('#settings').on('click', function() {
    window.showModalDialog('Settings.hta', preference, 'dialogHeight:190px; dialogWidth:350px;');
});

$('#search').on('click', search);

$('#task_list').on('mouseover', 'td', function() {
    $(this).addClass('list-hover')
    .siblings()
    .addClass('list-hover');
});

$('#task_list').on('mouseout', 'td', function() {
    $(this).removeClass('list-hover')
    .siblings()
    .removeClass('list-hover');
});

$('#task_list').on('contextmenu', 'tr', function(e) {
    $('#list_menu').css('left', e.clientX + 'px')
    .css('top', e.clientY + 'px')
    .css('display', 'block');

    // After the list menu displayed, any right click 
    // or left click will hide the menu.
    $('html').on('click', hideListMenu);
    $('html').on('contextmenu', hideListMenu);
    
    $('#delete_task').data('token', $(this).attr('class'));
    return false;
});

$('#delete_task').on('click', function() {
    var token = $(this).data('token');

    $('#list_menu').css('display', 'none');

    if ($('#task_list .' + token + ' td').eq(2).html() != '下載中') {
        for (var i = 0; i < taskQueue.length; i++) {
            if (taskQueue[i]['token'] == token)
                taskQueue.splice(i, 1);
        }

        $('#task_list .' + token).remove();
    } else {
        alert('下載中任務無法刪除！');
    }
});

$('#comic_chaps').attr('multiple', true);
$('#select_chaps').attr('multiple', true);

setUIByStatus('program_start');
downloader.addProgressListener(new ProgressDisplayer());
downloader.setLogger(logger);
showDownloadedComics(history);

pasteIfUrlCopied();
setInterval(pasteIfUrlCopied, 200);
setInterval(downloadIfHasTask, 200);
