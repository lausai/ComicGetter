var CommonParserInterfaces = {
        getPage : function(url, encode) {
                this._whrObj.Open('GET', url, true);
                this._whrObj.Send();
        
                try {
                        this._whrObj.WaitForResponse();
                        return changeCharset(this._whrObj.ResponseBody(), encode);
                } catch (e) {
                        this._logger.log('getPage fail. Error: ' + e.message);
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
                        this.logger.log('getPageByType fail. Error: ' + e.message);
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

        setLogger : function() {
                this._logger = logger;
        },

        getCoverUrl : function() {
                if (!this._parseSucceed) return null;
                
                return this._coverUrl;
        }
};
