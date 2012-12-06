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
