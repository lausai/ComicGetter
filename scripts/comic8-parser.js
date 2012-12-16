//------------------------------------------------
//      This class is based on Comic§aVBS,
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
        this._whrObj = new ActiveXObject('WinHttp.WinHttpRequest.5.1');
}

Comic8Parser.prototype._checkUrl = function(url) {
        return /^http:\/\/www\.8comic\.com\/(html\/)?[0-9]+\.html$/i.test(url);
}

// Return a table, the content should be 
// key  : catid
// value: baseurl
Comic8Parser.prototype._getBaseurlTable = function(catid) {
        var jsContent = this._getPageByType('http://www.8comic.com/js/comicview.js', 'text');

        if (!jsContent) return null;

        var table    = {};
        var pattern  = /if\(([^"]+)\)\s?\s?baseurl="([\w\d./:_~-]+)";/g;
        var pattern2 = /catid==(\d+)/g;
        var match;
        var match2;

        while (match = pattern.exec(jsContent)) {
                while (match2 = pattern2.exec(match[0]))
                        table[match2[1]] = match[2];
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
        
        this._parseSucceed = true;
        return true;
}

Comic8Parser.prototype.getPicUrls = function(chapter) {
        if (!this._parseSucceed) return null;

        var index  = $.inArray(chapter, this._comicChapters);
        var volUrl = this._comicChapterUrls[index];
        var page   = this._getPageByType(volUrl, 'body');
        
        if (null == page) return null;
        page = changeCharset(page, 'Big5');
        
        this._referer = volUrl;

        // The pic urls is like the following form
        // http://img"+sid+".8comic.com/"+did+"/"+itemid+"/"+num+"/"+img+".jpg
        // We retrieve the sid, did, itemid, num, and img from the page content here
        var volNum = volUrl.slice(volUrl.indexOf('ch=') + 3);
        var regex  = new RegExp('["|]{1}' + volNum + ' (\\d+) (\\d+) (\\d+) ([\\d\\w]+[^|"]+?)', 'g');
        var match  = regex.exec(page);
        var match2 = page.match(/var itemid=(\d+)/);    // Get itemid

        var picUrlBase = 'http://img' + match[1] + '.8comic.com/' + 
                         match[2] + '/' + match2[1] + '/' + volNum + '/';

        var urls = [];
        for (var i = 1; i <= match[3]; i++) {
                // The logic of code here are the same as the code on 8comic web site
                // 8comic use this algorithm to create their image name.
                var tmp = (parseInt((i-1)/10)%10)+(((i-1)%10)*3);
                var img;

                if(i < 10) 
                        img = '00' + i;
                else if(i < 100) 
                        img = '0' + i;
                else img = i;

                img += '_' + match[4].substring(tmp, tmp + 3);
                urls.push(picUrlBase + img + '.jpg');
        }

        return urls;
}

Comic8Parser.prototype.getCoverUrl = function() {
        if (!this._parseSucceed) return null;

        var arr = this._url.split('/');
        arr     = arr[arr.length - 1].split('.');

        return 'http://www.8comic.com/pics/0/' + arr[0] + '.jpg';
}

Comic8Parser.prototype.getParserName = function() {
        return 'Comic8Parser';
}

Comic8Parser.prototype._getPageByType = CommonParserInterfaces.getPageByType;
Comic8Parser.prototype.getComicName   = CommonParserInterfaces.getComicName;
Comic8Parser.prototype.getChapters    = CommonParserInterfaces.getChapters;
Comic8Parser.prototype.headersNeeded  = CommonParserInterfaces.headersNeeded;    // Must call getPicUrls before calling this method
Comic8Parser.prototype.getComicUrl    = CommonParserInterfaces.getComicUrl;
Comic8Parser.prototype.setLogger      = CommonParserInterfaces.setLogger;
