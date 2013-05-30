// Because the parser may be created frequently,
// use nested function for private members may cause low performance
// so use a single underscore to indicate private members instead
function MangaHereParser() {
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

MangaHereParser.prototype._checkUrl = function(url) {
        return /^http:\/\/www\.mangahere\.com\/manga\/[\w]+\/?$/i.test(url);
};

MangaHereParser.prototype._parseComicName = function(page) {
        var match = page.match(/<\/span>(.+?)<\/h1>/);
        
        if (match) {
                this._comicName = match[1];
                return true;
        } else {
                this.log('get comic name fail!');
                return false;
        }
};

MangaHereParser.prototype._parseChapters = function(page) {
        var match;
        var pattern = new RegExp(this._comicName + '\\s*\\d+', 'ig');
        
        this._comicChapters = [];
        while (match = pattern.exec(page))
                this._comicChapters.push(match[0]);
        
        pattern = new RegExp('http://www.mangahere.com/manga/' + this._comicName + '/c\\d+/?', 'ig');
        this._comicChapterUrls = [];
        while (match = pattern.exec(page))
                this._comicChapterUrls.push(match[0]);
        
        if (this._comicChapterUrls.length != this._comicChapters.length) {
                this.log('number of chapters  != number of changer names');
                return false;
        }

        return true;
};

MangaHereParser.prototype.startParse = function(url) {
        this._parseSucceed = false;

        if (!this._checkUrl(url)) return false;
        
        var mainPage = this._getPage(url, 'utf-8');
        if (null == mainPage) return false;
        if (!this._parseComicName(mainPage)) return false;
        if (!this._parseChapters(mainPage)) return false;
        
        // We don't need to check if we can find the cover image url or not,
        // because some comics doesn't have cover image.
        this._coverUrl = mainPage.match(/http:\/\/[\.\w\/\d]+cover.jpg/i);

        this._url          = url;
        this._parseSucceed = true;

        return true;
};

MangaHereParser.prototype.getPicUrls = function(chapter) {
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

        var pattern  = /option value="([\w\d\/\.:]+?)"/g;
        var end_loop = false;
        var urls     = [];
        var match;

        while (match = pattern.exec(page)) {
                if (match[1] == volUrl) {
                        if (end_loop) break;

                        end_loop = true;
                }
                
                url_page = this._getPage(match[1], 'utf-8');
                var url  = url_page.match(/http:\/\/z\.mhcdn[\w\.\/\d-]+jpg/);
                urls.push(url);
        }
       
        return urls;
};

MangaHereParser.prototype.getParserName = function() {
        return 'MangaHereParser';
};

addParserInterfaces(MangaHereParser);
