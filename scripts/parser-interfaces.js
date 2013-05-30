var CommonParserInterfaces = {
        getPage : function(url, encode) {
                this._whrObj.Open('GET', url, true);
                this._whrObj.Send();
        
                try {
                        this._whrObj.WaitForResponse();
                        return changeCharset(this._whrObj.ResponseBody(), encode);
                } catch (e) {
                        this.log('getPage fail. Error: ' + e.message);
                        return null;
                }
        },

        getPageByType : function(url, type) {
                this._whrObj.Open('GET', url, true);
                this._whrObj.Send();
        
                try {
                        this._whrObj.WaitForResponse();
        
                        if ('body' == type)
                                return this._whrObj.ResponseBody();
                        else
                                return this._whrObj.ResponseText();
                } catch (e) {
                        this.log('getPageByType fail. Error: ' + e.message);
                        return null;
                }
        },

        getComicName : function() {
                if (!this._parseSucceed) return null;

                return this._comicName;
        },

        getChapters : function() {
                if (!this._parseSucceed) return null;

                return this._comicChapters;
        },
        
        headersNeeded : function() {
                if (!this._parseSucceed) return null;

                var res = {'Referer' : this._referer};
                return res;
        },

        getComicUrl : function() {
                if (!this._parseSucceed) return null; 

                return this._url;
        },

        setLogger : function(logger) {
                this._logger = logger;
        },

        getCoverUrl : function() {
                if (!this._parseSucceed) return null;
                
                return this._coverUrl;
        },

        log : function(str) {
                if (this._logger)
                        this._logger.log(str);
        }
};

function addParserInterfaces(func)
{
        func.prototype._getPageByType = CommonParserInterfaces.getPageByType;
        func.prototype._getPage       = CommonParserInterfaces.getPage;
        func.prototype.getComicName   = CommonParserInterfaces.getComicName;
        func.prototype.getChapters    = CommonParserInterfaces.getChapters;
        func.prototype.headersNeeded  = CommonParserInterfaces.headersNeeded;    // Must call getPicUrls before calling this method
        func.prototype.getComicUrl    = CommonParserInterfaces.getComicUrl;
        func.prototype.setLogger      = CommonParserInterfaces.setLogger;
        func.prototype.getCoverUrl    = CommonParserInterfaces.getCoverUrl;
        func.prototype.log            = CommonParserInterfaces.log;
}
