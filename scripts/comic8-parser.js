//------------------------------------------------
//      The code is based on Comic§aVBS,
//      which is post on PTT Ezsoft
// 
//      Comic§aVBS Author: arthurs21.bbs@ptt.cc
//                         hpo14.bbs@ptt.cc
//------------------------------------------------

// Because the parser may be created frequently,
// use nested function for private members may cause low performance
// so use a single underscore to indicate private members instead
function Comic8Parser() {
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

Comic8Parser.prototype._checkUrl = function(url) {
        return /^http:\/\/www\.(8comic|comicbus|comicvip)\.com(:\d+)?\/(html\/)?[0-9]+\.html$/i.test(url);
}

// Return a table, the content should be 
// key  : catid
// value: baseurl
Comic8Parser.prototype._getBaseurlTable = function(catid) {
        var jsContent = this._getPageByType('http://www.8comic.com/js/comicview.js', 'text');

        if (!jsContent) return null;

        var table    = {};
        var pattern  = /if\(([^"]+)\)\s?\s?baseurl\+="([\w\d./:_~-]+)";/g;
        var pattern2 = /catid==(\d+)/g;
        var match;
        var match2;

        while (match = pattern.exec(jsContent)) {
                while (match2 = pattern2.exec(match[0]))
                        table[match2[1]] = 'http://www.comicvip.com' + match[2];
        }

        return table;
}

// Search the comic information from the content of mainPage string
// ex:  comic name
//      chapter names
Comic8Parser.prototype._parseComicInfo = function(mainPage) {
        // Get comic name
        var match = mainPage.match(/font:12pt;font-weight:bold;">(.+?)<\/font>/);

        if (!match) return false;
        this._comicName = match[1];

        // Get comic chapter and chapter urls
        var baseurlTable = this._getBaseurlTable();

        if (!baseurlTable) return false;

        var pattern            = /([\d]{3,})-(\d+).html',(\d+).+[\n\r]{1}(.+)<\/a>/g;
        this._comicChapters    = [];
        this._comicChapterUrls = [];

        while (match = pattern.exec(mainPage)) {
                this._comicChapters.push($.trim(match[4]))              // trim the space
                this._comicChapterUrls.push(baseurlTable[match[3]] + match[1] + 
                    '.html?ch=' + match[2]);
        }

        match = this._comicChapters[this._comicChapters.length - 1].match(/id=lch>(.+)<\/font>/);
        if (match)
                this._comicChapters[this._comicChapters.length - 1] = match[1];

        return true;
}

Comic8Parser.prototype.startParse = function(url) {
        this._parseSucceed = false;
        
        if (!this._checkUrl(url)) return false;

        this._url = url;
        var mainPage = this._getPageByType(url, 'body');

        // We use the "COM object" winhttp to get web page content.
        // The data returned from winhttp cannot be identified by jscript.
        // The (mainPage) statement will return false so we use (null == mainPage) instead.
        if (null == mainPage) return false;

        mainPage = changeCharset(mainPage, 'Big5');
        if (!this._parseComicInfo(mainPage)) return false;
        
        // Get cover image url
        var arr = this._url.split('/');
        arr     = arr[arr.length - 1].split('.');

        this._coverUrl = 'http://www.8comic.com/pics/0/' + arr[0] + '.jpg';
        
        this._parseSucceed = true;
        return true;
}

// Copied this from 8comic
Comic8Parser.prototype._ss = function(a, b, c, d) {
    var e = a.substring(b, b + c);
    return d == null ? e.replace(/[a-z]*/gi, "") : e;
}

Comic8Parser.prototype.getPicUrls = function(chapter) {
        if (!this._parseSucceed) return null;

        var index  = $.inArray(chapter, this._comicChapters);
        var volUrl = this._comicChapterUrls[index];
        var page   = this._getPageByType(volUrl, 'body');
        
        if (null == page) {
                this.log('get web content fail!');
                return null;
        }
        page = changeCharset(page, 'Big5');
        
        this._referer = volUrl;
        
        // This logic comes from 8comic
        var ch = volUrl.slice(volUrl.indexOf('ch=') + 3);
        var ti = page.match(/ti=(\d+)/)[1];                // Get ti number
        var cs = page.match(/cs='(\w+)'/)[1];
        var cc = cs.length;

        var f = 50;
        var c = '';

        for (var i = 0; i < cc / f; i++) {
            if (this._ss(cs, i * f, 4) == ch) {
                c = this._ss(cs, i * f, f, f);
                break;
            }
        }

        if (c == '')
           c = this._ss(cs, cc - f, f);
        
        var pageNum = this._ss(c, 7, 3);
        var urls = [];

        for (var p = 1; p <= pageNum; p++) {
            var nn = (p < 10 ? '00' + p : p < 100 ? '0' + p : p);
            var mm = (parseInt((p - 1) / 10) % 10) + (((p - 1) % 10) * 3);
            var pic_url = 'http://img' + this._ss(c, 4, 2) + '.8comic.com/' +
                          this._ss(c, 6, 1) + '/' + ti + '/' +
                          this._ss(c, 0, 4) + '/' + nn + '_' + this._ss(c, mm + 10, 3, f) + '.jpg';
            
            urls.push(pic_url);
        }

        return urls;
}

Comic8Parser.prototype.getParserName = function() {
        return 'Comic8Parser';
}

addParserInterfaces(Comic8Parser);
