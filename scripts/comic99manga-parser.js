// Because the parser may be created frequently,
// use nested function for private members may cause low performance
// so use a single underscore to indicate private members instead
function Comic99mangaParser() {
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

Comic99mangaParser.prototype._checkUrl = function(url) {
        return /^http:\/\/dm\.99manga\.com\/comic\/[0-9]+\/$/.test(url);
};

Comic99mangaParser.prototype._parseComicName = function(page) {
        var match = page.match(/<title>(.+?) /);

        if (match) {
                this._comicName = match[1];
                return true;
        } else {
                this._logger.log('get comic name fail!');
                return false;
        }

        return true;
};

Comic99mangaParser.prototype._parseChapters = function(page) {
        var match;
        var pattern = /target=_blank[^>]*>(.+?)<\/a>/g;

        this._comicChapters = [];
        var count = 0;
        while (match = pattern.exec(page))
                this._comicChapters.push(match[1]);
        
        this._comicChapterUrls = page.match(/page\/[\w\/\.]+\?s=[\d]+/g);
        for (var i = 0; i < this._comicChapterUrls.length; i++)
                this._comicChapterUrls[i] = 'http://dm.99manga.com/' + this._comicChapterUrls[i];

        if (this._comicChapterUrls.length != this._comicChapters.length) {
                this._logger.log('number of chapters  != number of changer names');
                return false;
        }

        return true;
};

Comic99mangaParser.prototype.startParse = function(url) {
        this._parseSucceed = false;

        if (!this._checkUrl(url)) return false;

        var mainPage = this._getPage(url, 'gb2312');
        if (null == mainPage) return false;
        if (!this._parseComicName(mainPage)) return false;
        if (!this._parseChapters(mainPage)) return false;

        // We don't need to check if we can find the cover image url or not,
        // because some comics doesn't have cover image.
        this._coverUrl = mainPage.match(/http:\/\/img\.99mh\.com[\w\/\d]+\.jpg/i);

        this._url          = url;
        this._parseSucceed = true;

        return true;
};

Comic99mangaParser.prototype.getPicUrls = function(chapter) {
        if (!this._parseSucceed) return null;

        var index  = $.inArray(chapter, this._comicChapters);
        var volUrl = this._comicChapterUrls[index];
        var page   = this._getPageByType(volUrl, 'body');
        
        if (null == page) return null;
        page = changeCharset(page, 'gb2312');
        
        this._referer = volUrl;

        // Use a local static variable to store the server list,
        // so we don't need to query the web server every time.
        if (!Comic99mangaParser.prototype.getPicUrls.serverList) {
                var jsContent                                      = this._getPageByType('http://dm.99manga.com/d/i.js', 'text');
                Comic99mangaParser.prototype.getPicUrls.serverList = jsContent.match(/http:\/\/[\d\.:]+\/dm[\d]+/g);
        }

        var picBaseUrls = page.match(/\/ok-comic.+?\.(jpg|png)/ig);

        if (!Comic99mangaParser.prototype.getPicUrls.serverList) return null;
        if (!picBaseUrls) return null;

        var urls     = [];
        var serverNo = volUrl.substr(volUrl.indexOf('s=') + 2) - 1;

        for (var i = 0; i < picBaseUrls.length; i++)
                urls.push(Comic99mangaParser.prototype.getPicUrls.serverList[serverNo] + picBaseUrls[i]);
        
        return urls;
};

Comic99mangaParser.prototype.getParserName = function() {
        return 'Comic99mangaParser';
};

Comic99mangaParser.prototype._getPageByType = CommonParserInterfaces.getPageByType;
Comic99mangaParser.prototype._getPage       = CommonParserInterfaces.getPage;
Comic99mangaParser.prototype.getComicName   = CommonParserInterfaces.getComicName;
Comic99mangaParser.prototype.getChapters    = CommonParserInterfaces.getChapters;
Comic99mangaParser.prototype.headersNeeded  = CommonParserInterfaces.headersNeeded;    // Must call getPicUrls before calling this method
Comic99mangaParser.prototype.getComicUrl    = CommonParserInterfaces.getComicUrl;
Comic99mangaParser.prototype.setLogger      = CommonParserInterfaces.setLogger;
Comic99mangaParser.prototype.getCoverUrl    = CommonParserInterfaces.getCoverUrl;

// var o = new Comic99mangaParser();
// o.startParse('http://dm.99manga.com/comic/14254/');
// o.getPicUrls(o.getChapters()[0]);
