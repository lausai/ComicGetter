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
        return /^http:\/\/(dm\.)?99manga\.com\/comic\/[0-9]+\/$/i.test(url);
};

Comic99mangaParser.prototype._parseComicName = function(page) {
        var match = page.match(/<title>(.+?) /);

        if (match) {
                this._comicName = match[1];
                return true;
        } else {
                this.log('get comic name fail!');
                return false;
        }

        return true;
};

Comic99mangaParser.prototype._parseChapters = function(url, page) {
        var match;
        var pattern = /target=_blank[^>]*>(.+?)<\/a>/g;

        this._comicChapters = [];
        var count = 0;
        while (match = pattern.exec(page))
                this._comicChapters.push(match[1]);
        
        this._comicChapterUrls = page.match(/(manga|page)\/[\w\/\.]+\?s=[\d]+/g);

        var baseUrl = (-1 == url.indexOf('dm.99manga')) ?
                        'http://99manga.com/' : 'http://dm.99manga.com/';

        for (var i = 0; i < this._comicChapterUrls.length; i++)
                this._comicChapterUrls[i] = baseUrl + this._comicChapterUrls[i];

        if (this._comicChapterUrls.length != this._comicChapters.length) {
                this.log('number of chapters  != number of changer names');
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
        if (!this._parseChapters(url, mainPage)) return false;

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

        if (null == page) {
                this.log('get web content fail!');
                return null;
        }

        page = changeCharset(page, 'gb2312');
        this._referer = volUrl;

        // Use a local static variable to store the server list,
        // so we don't need to query the web server every time.
        var serverList = Comic99mangaParser.prototype.getPicUrls.serverList;
        if (!serverList) {
                var jsAddress = (-1 == this._url.indexOf('dm.99manga')) ?
                                'http://99manga.com/d/i.js' : 'http://dm.99manga.com/d/i.js';
                var jsContent = this._getPageByType(jsAddress, 'text');

                serverList    = jsContent.match(/http:\/\/[\d\.:]+\/dm[\d]+/g);
                Comic99mangaParser.prototype.getPicUrls.serverList = serverList;
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

Comic99mangaParser.prototype.getParserName = function() {
        return 'Comic99mangaParser';
};

addParserInterfaces(Comic99mangaParser);
