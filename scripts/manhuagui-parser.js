// Because the parser may be created frequently,
// use nested function for private members may cause low performance
// so use a single underscore to indicate private members instead
function ManhuaguiParser() {
        this._url;                        // Comic web site address
        this._parseSucceed;               // Indicate parse success or not
        this._referer;                    // Referer that should send to 8comic web site
        this._logger;                     // To log the messages if some error occur
        this._comicName;
        this._comicChapters;
        this._comicChapterUrls;
        this._coverUrl;
        this._whrObj = new ActiveXObject('WinHttp.WinHttpRequest.5.1');
}

ManhuaguiParser.prototype._checkUrl = function(url) {
    return (url.indexOf("https://www.manhuagui.com/") == 0 ||
            url.indexOf("https://tw.manhuagui.com/") == 0 ||
            url.indexOf("https://www.mhgui.com/") == 0)
};

ManhuaguiParser.prototype._parseComicName = function(page) {
    var bookTitleIndex = page.indexOf("book-title");
    if (bookTitleIndex == -1) {
        this.log('get comic name fail!');
        return false;
    }

    var h1StartIndex = page.indexOf("<h1>", bookTitleIndex);
    var h1EndIndex = page.indexOf("</h1>", bookTitleIndex);
    this._comicName = page.slice(h1StartIndex + 4, h1EndIndex);
    return true;
};

ManhuaguiParser.prototype._parseChapters = function(url, page) {
    this._comicChapters = [];
    this._comicChapterUrls = [];

    var idx = url.indexOf("/", 8);
    var baseUrl = url.slice(0, idx);

    var searchStart = 0;
    while ((chapterBlockIdx = page.indexOf("id='chapter-list-", searchStart)) != -1) {
        var chapterEndIdx = page.indexOf("</div>", chapterBlockIdx);
        var s = page.slice(chapterBlockIdx, chapterEndIdx);
        searchStart = chapterEndIdx;

        var match;
        var pattern = /href="(.+?)" title="(.+?)"/g;
        while (match = pattern.exec(s)) {
            this._comicChapters.push(match[2]);
            this._comicChapterUrls.push(baseUrl + match[1]);
        }
    }

    return this._comicChapters.length > 0;
};

ManhuaguiParser.prototype.startParse = function(url) {
        this._parseSucceed = false;

        if (!this._checkUrl(url)) return false;

        var mainPage = this._getPage(url, 'utf-8');
        if (null == mainPage) return false;
        if (!this._parseComicName(mainPage)) return false;
        if (!this._parseChapters(url, mainPage)) return false;

        this._url          = url;
        this._parseSucceed = true;

        // We don't need to check if we can find the cover image url or not,
        // because some comics doesn't have cover image.
        var start = mainPage.indexOf("hcover\">");
        if (start == -1)
            return true;

        var end = mainPage.indexOf("alt", start);
        if (end == -1)
            return true;

        var s = mainPage.slice(start, end);
        start = s.indexOf("http");
        end = s.indexOf("\"", start);
        this._coverUrl = s.slice(start, end);

        return true;
};

ManhuaguiParser.prototype.getPicUrls = function(chapter) {
        if (!this._parseSucceed) return null;

        var index  = $.inArray(chapter, this._comicChapters);
        var volUrl = this._comicChapterUrls[index];
        var page   = this._getPageByType(volUrl, 'body');

        if (null == page) {
                this.log('get web content fail!');
                return null;
        }

        page = changeCharset(page, 'gb2312');
        this._referer = volUrl;

        // Use a local static variable to store the server list,
        // so we don't need to query the web server every time.
        var serverList = ManhuaguiParser.prototype.getPicUrls.serverList;
        if (!serverList) {
                var jsAddress = (-1 == this._url.indexOf('dm.99manga')) ?
                                'http://99manga.com/d/i.js' : 'http://dm.99manga.com/d/i.js';
                var jsContent = this._getPageByType(jsAddress, 'text');

                serverList    = jsContent.match(/http:\/\/[\d\.:]+\/dm[\d]+/g);
                ManhuaguiParser.prototype.getPicUrls.serverList = serverList;
        }
        
        var picBaseUrls = page.match(/\/ok-comic.+?\.(jpg|png)/ig);

        if (!serverList) {
                this.log('get server list fail!');
                return null;
        }
        if (!picBaseUrls) {
                this.log('get pic base urls fail!');
                return null;
        }

        var urls     = [];
        var serverNo = volUrl.substr(volUrl.indexOf('s=') + 2) - 1;

        for (var i = 0; i < picBaseUrls.length; i++)
                urls.push(serverList[serverNo] + picBaseUrls[i]);
        
        return urls;
};

ManhuaguiParser.prototype.getParserName = function() {
        return 'ManhuaguiParser';
};

addParserInterfaces(ManhuaguiParser);
