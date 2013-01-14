// Because the parser may be created frequently,
// use nested function for private members may cause low performance
// so use a single underscore to indicate private members instead
function Comic99770NewParser() {
        this._url;                        // Comic web site address
        this._parseSucceed;               // Indicate parse success or not
        this._referer;                    // Referer that should send to 8comic web site
        this._logger;                     // To log the messages if some error occur
        this._comicName;
        this._comicChapters;
        this._comicChapterUrls;
        this._whrObj = new ActiveXObject('WinHttp.WinHttpRequest.5.1');
}

Comic99770NewParser.prototype._checkUrl = function(url) {
        return /^http:\/\/mh\.99770\.cc\/comic\/[0-9]+\/$/.test(url);
}

Comic99770NewParser.prototype._parseComicName = function(page) {
        var match = page.match(/>\s*(.[^\r]+)\s*<input name="hdID"/);

        if (match) {
                this._comicName = match[1];
                return true;
        } else {
                this.log('get comic name fail!');
                return false;
        }
};

Comic99770NewParser.prototype._parseChapters = function(page) {
        var match;
        var pattern = /target=_blank>(.+?)(<img|<\/a)/g;

        this._comicChapters = [];
        while (match = pattern.exec(page))
                this._comicChapters.push(match[1]);

        this._comicChapterUrls = page.match(/http:\/\/mh\.99770\.cc\/comic\/\d+\/\d+\//g);

        if (this._comicChapterUrls.length != this._comicChapters.length) {
                alert(this._comicChapterUrls.length + ' ' + this._comicChapters.length);
                return false;
        }

        return true;
};

Comic99770NewParser.prototype.startParse = function(url) {
        this._parseSucceed = false;

        if (!this._checkUrl(url)) return false;
        
        var mainPage = this._getPage(url, 'utf-8');
        
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

Comic99770NewParser.prototype.getPicUrls = function(chapter) {
        if (!this._parseSucceed) return null;

        var index  = $.inArray(chapter, this._comicChapters);
        var volUrl = this._comicChapterUrls[index];
        var page   = this._getPageByType(volUrl, 'body');

        if (null == page) {
                this.log('get web content fail!');
                return null;
        }
        page = changeCharset(page, 'utf-8');

        this._referer = volUrl;
        
        // Use a local static variable to store the server list,
        // so we don't need to query the web server every time.
        var serverList = Comic99770NewParser.prototype.getPicUrls.serverList;
        if (!serverList) {
                var jsContent = this._getPageByType('http://mh.99770.cc/script/viewhtml.js', 'text');
                serverList    = jsContent.match(/http:\/\/[\d\.:]+\/dm[\d]+/g);
                Comic99770NewParser.prototype.getPicUrls.serverList = serverList;
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
        var serverNo = page.match(/sPath="([\d]+)"/)[1] - 1;

        for (var i = 0; i < picBaseUrls.length; i++)
                urls.push(serverList[serverNo] + picBaseUrls[i]);
        
        return urls;
};

Comic99770NewParser.prototype.getParserName = function() {
        return 'Comic99770NewParser';
};

addParserInterfaces(Comic99770NewParser);
