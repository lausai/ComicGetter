function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}
if (function() {
        var e;
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                var t = this.length >>> 0,
                    o = Number(arguments[1]) || 0;
                for ((o = o < 0 ? Math.ceil(o) : Math.floor(o)) < 0 && (o += t); o < t; o++)
                    if (o in this && this[o] === e) return o;
                return -1
            }), String.prototype.trim || (e = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, String.prototype.trim = function() {
                return this.replace(e, "")
            }), Array.isArray = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e) || "[object NodeList]" === Object.prototype.toString.call(e) || "[object HTMLCollection]" === Object.prototype.toString.call(e)
            },
            function() {
                function e() {}
                for (var t, o = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], n = o.length, i = window.console = window.console || {}; n--;) i[t = o[n]] || (i[t] = e)
            }()
    }(), void 0 === SD || !SD) var SD = {};
SD.common = SD.common || {}, SD.common.dom = SD.common.dom || {}, SD.common.dom.getClassRegEx = function(e) {
        return new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)")
    }, SD.common.dom.getElementsByClassName = function(e, t, o, n) {
        t = t || "*";
        var i, a = [],
            d = (o = o || document).getElementsByTagName(t),
            r = SD.common.dom.getClassRegEx(e),
            c = d.length;
        for (i = 0; i < c; i++) r.test(d[i].className) && (a[a.length] = d[i], n && n.call(d[i], d[i]));
        return a
    }, SD.common.checkDom = function(e) {
        for (var t = e.dom ? Array.isArray(e.dom) ? e.dom : [e.dom] : SD.common.dom.getElementsByClassName(e.class), o = [], n = 0, i = t.length; n < i; n++) {
            var a = t[n];
            if ("" === a.innerHTML) {
                var d = {
                        count: n,
                        dom: a
                    },
                    r = a.getAttribute("model");
                if (r) {
                    "300x50" === r && (r = "320x50");
                    var c = r.split("x"),
                        s = c[0],
                        m = c[1];
                    d.width = s, d.height = f(m), d.model = r
                }
                var l = a.getAttribute("data-width");
                if (!d.width && l && (d.width = l), e.attr && a.getAttribute(e.attr) && (d.attr = {}, d.attr[e.attr] = a.getAttribute(e.attr)), e.add)
                    for (var u in e.add) d[u] = e.add[u];
                o.push(d), a.innerHTML = " "
            }
        }
        return o;

        function f(e) {
            if (!e) return "";
            var t = e.match(/^\d+/g);
            return t ? t[0] : ""
        }
    }, SD.common.createEl = SD.common.createEl || {}, SD.common.createEl.append = function(e, t) {
        var o = document.getElementsByTagName("head")[0] || document.body;
        t ? t.appendChild(e) : o.appendChild(e)
    }, SD.common.dom.handleOnLoad = function(e, t) {
        void 0 !== e.onload ? e.onload = t : e.onreadystatechange = function() {
            "loaded" !== e.readyState && "complete" !== e.readyState || t()
        }
    }, SD.common.createEl.get = function(e) {
        var t, o, n = e.attr || {};
        if (!e.tag) return console.error("required set tag");
        for (t in o = document.createElement(e.tag), n) o.setAttribute(t, n[t]);
        return e.html && (o.innerHTML = e.html), e.handleOnLoad && SD.common.dom.handleOnLoad(o, e.handleOnLoad), e.handleError && (o.onerror = e.handleError), e.cssText && (o.style.cssText = e.cssText), !1 !== e.dom && (e.dom ? SD.common.createEl.append(o, e.dom) : SD.common.createEl.append(o)), o
    }, SD.common.dom.addEventListener = function(e, t, o) {
        if (e.addEventListener) return e.addEventListener(t, o, !1);
        if ("load" !== t || "SCRIPT" !== e.nodeName) return e.attachEvent("on" + t, o);
        var n, i = e.id;
        i || (i = (new Date).getTime() + Math.floor(10 * Math.random() + 1), e.id = i), n = setInterval(function() {
            document.getElementById(i) && (o(), clearInterval(n))
        }, 300)
    }, SD.common.createEl.iframe = function(e) {
        var t = e.cssText || "",
            o = {
                framespacing: "0",
                frameborder: "no",
                frameBorder: "no",
                scrolling: "no"
            };
        return e.width ? o.width = e.width : o.width = "0", e.height ? o.height = e.height : o.height = "0", e.src && (o.src = e.src), e.id && (o.id = e.id), e.class && (o.class = e.class), e.allowfullscreen && (o.allowfullscreen = "true"), e.srcdoc && (o.srcdoc = e.srcdoc), SD.common.createEl.get({
            tag: "iframe",
            attr: o,
            cssText: t,
            dom: e.dom
        })
    }, SD.common.createEl.js = function(e) {
        var t = e.attr || {};
        return t.type = "text/javascript", e.src && (t.src = e.src), e.id && (t.id = e.id), e.class && (t.class = e.class), e.async && (t.async = e.async), SD.common.createEl.get({
            tag: "script",
            attr: t,
            handleOnLoad: e.handleOnLoad,
            handleError: e.handleError,
            dom: e.dom
        })
    }, SD.common.iframeHtmlFoot = function(e) {
        return e + "</body></html>"
    }, SD.common.iframeHtmlHead = function(e) {
        return e + '<html style="height: 100%;"><head><meta http-equiv="content-type" content="text/html; charset=utf-8"><style> html, body { margin: 0; padding: 0; } </style></head><body style="height: 100%;">'
    }, SD.common.iframeInnerHtml = function(e, t) {
        (e = (e = e.contentWindow || e.contentDocument).document).open(), e.write(t), e.close()
    }, SD.common.timestamp = function(e) {
        return !1 === e ? (new Date).getTime() : (e || (e = 100), (new Date).getTime() % e + 1)
    }, SD.common.cookie = SD.common.cookie || {}, SD.common.cookie.getCookie = function(e) {
        for (var t = e + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
            for (var i = o[n];
                " " == i.charAt(0);) i = i.substring(1);
            if (0 === i.indexOf(t)) return i.substring(t.length, i.length)
        }
        return ""
    }, SD.common.cookie.setCookie = function(e) {
        var t, o, n, i = "",
            a = "",
            d = "";
        e.day && (t = new Date).setTime(t.getTime() + 24 * e.day * 60 * 60 * 1e3 + c(t)), e.hour && (t = new Date).setTime(t.getTime() + 60 * e.hour * 60 * 1e3 + c(t)), e.min && (n = 60 * e.min), e.time && (t = e.time), n && (o = ";max-age=" + n + ";"), t && (i = ";expires=" + t.toUTCString() + ";"), e.domain && (a = "domain=" + e.domain + ";"), e.path && (d = "path=" + e.path + ";");
        var r = "SameSite=" + (e.sameSite ? e.sameSite + ";" : "None; Secure;");

        function c(e) {
            return 60 * (0 - e.getTimezoneOffset() / 60) * 60 * 1e3
        }
        document.cookie = e.name + "=" + e.value + i + o + a + d + r
    }, SD.common.createEl.remove = function(e) {
        e.parentNode.removeChild(e)
    },
    function() {
        var e, t, o, n, i, a, d, r, c, s;
        t = window.device, e = {}, window.device = e, n = window.document.documentElement, s = window.navigator.userAgent.toLowerCase(), e.ios = function() {
            return e.iphone() || e.ipod() || e.ipad()
        }, e.iphone = function() {
            return !e.windows() && i("iphone")
        }, e.ipod = function() {
            return i("ipod")
        }, e.ipad = function() {
            return i("ipad")
        }, e.android = function() {
            return !e.windows() && i("android")
        }, e.androidPhone = function() {
            return e.android() && i("mobile")
        }, e.androidTablet = function() {
            return e.android() && !i("mobile")
        }, e.blackberry = function() {
            return i("blackberry") || i("bb10") || i("rim")
        }, e.blackberryPhone = function() {
            return e.blackberry() && !i("tablet")
        }, e.blackberryTablet = function() {
            return e.blackberry() && i("tablet")
        }, e.windows = function() {
            return i("windows")
        }, e.windowsPhone = function() {
            return e.windows() && i("phone")
        }, e.windowsTablet = function() {
            return e.windows() && i("touch") && !e.windowsPhone()
        }, e.fxos = function() {
            return (i("(mobile;") || i("(tablet;")) && i("; rv:")
        }, e.fxosPhone = function() {
            return e.fxos() && i("mobile")
        }, e.fxosTablet = function() {
            return e.fxos() && i("tablet")
        }, e.meego = function() {
            return i("meego")
        }, e.cordova = function() {
            return window.cordova && "file:" === location.protocol
        }, e.nodeWebkit = function() {
            return "object" === _typeof(window.process)
        }, e.mobile = function() {
            return e.androidPhone() || e.iphone() || e.ipod() || e.windowsPhone() || e.blackberryPhone() || e.fxosPhone() || e.meego()
        }, e.tablet = function() {
            return e.ipad() || e.androidTablet() || e.blackberryTablet() || e.windowsTablet() || e.fxosTablet()
        }, e.desktop = function() {
            return !e.tablet() && !e.mobile()
        }, e.television = function() {
            var e, t = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
            for (e = 0; e < t.length;) {
                if (i(t[e])) return !0;
                e++
            }
            return !1
        }, e.portrait = function() {
            return 1 < window.innerHeight / window.innerWidth
        }, e.landscape = function() {
            return window.innerHeight / window.innerWidth < 1
        }, e.line = function() {
            return i("line")
        }, e.noConflict = function() {
            return window.device = t, this
        }, i = function(e) {
            return -1 !== s.indexOf(e)
        }, d = function(e) {
            var t;
            return t = new RegExp(e, "i"), n.className.match(t)
        }, o = function(e) {
            var t = null;
            d(e) || (t = n.className.replace(/^\s+|\s+$/g, ""), n.className = t + " " + e)
        }, c = function(e) {
            d(e) && (n.className = n.className.replace(" " + e, ""))
        }, e.ios() ? e.ipad() ? o("ios ipad tablet") : e.iphone() ? o("ios iphone mobile") : e.ipod() && o("ios ipod mobile") : e.android() ? e.androidTablet() ? o("android tablet") : o("android mobile") : e.blackberry() ? e.blackberryTablet() ? o("blackberry tablet") : o("blackberry mobile") : e.windows() ? e.windowsTablet() ? o("windows tablet") : e.windowsPhone() ? o("windows mobile") : o("desktop") : e.fxos() ? e.fxosTablet() ? o("fxos tablet") : o("fxos mobile") : e.meego() ? o("meego mobile") : e.nodeWebkit() ? o("node-webkit") : e.television() ? o("television") : e.desktop() && o("desktop"), e.cordova() && o("cordova"), a = function() {
            e.landscape() ? (c("portrait"), o("landscape")) : (c("landscape"), o("portrait"))
        }, r = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(r, a, !1) : window.attachEvent ? window.attachEvent(r, a) : window[r] = a, a(), window.device = e
    }(), SD.common.device = {
        desktop: device.desktop(),
        mobile: device.mobile(),
        tablet: device.tablet(),
        ios: device.ios(),
        android: device.android(),
        androidTablet: device.androidTablet(),
        ipad: device.ipad(),
        line: device.line()
    }, SD.util = SD.util || {}, SD.util.turnTime = function(e) {
        var t, o = e.adConfig || "",
            n = e.rule,
            i = SD.common.timestamp();
        for (t in n)
            if (i <= Number(t)) return void(o ? n[t](o) : n[t]())
    }, SD.util.geoCache = SD.util.geoCache || {}, SD.util.geoCache.callbackCache = SD.util.geoCache.callbackCache || {
        arr: [],
        country: "",
        exe: !1
    }, SD.util.geoCache.callback = function(e) {
        var t, o;
        for (SD.util.geoCache.callbackCache.exe = !0, SD.util.geoCache.callbackCache.country = e.toLocaleLowerCase(), t = 0, o = SD.util.geoCache.callbackCache.arr.length; t < o; t++) SD.util.geoCache.callbackCache.arr[t]()
    }, SD.util.geo = function(e) {
        !0 === SD.util.geoCache.callbackCache.exe ? e() : (SD.util.geoCache.callbackCache.arr.push(e), document.getElementById("sitemaji_geo") || SD.common.createEl.js({
            src: "//ssl.sitemaji.com/geo/?callback=SD.util.geoCache.callback",
            id: "sitemaji_geo"
        }))
    }, SD.adModYsm = SD.adModYsm || {}, SD.adModYsm.addjunction = SD.adModYsm.addjunction || {}, SD.adModYsm.addjunction.newBlock = function(e) {
        for (var t = 0, o = e.length; t < o; t++) {
            var n = e[t],
                i = n.dom;
            if ("" !== i.innerHTML) {
                var a = n.attr || {},
                    d = "";
                for (var r in a) d = r;
                a.model = n.model;
                var c = SD.common.createEl.get({
                    tag: "div",
                    dom: i,
                    attr: a
                });
                e[t] = SD.common.checkDom({
                    dom: c,
                    attr: d
                })[0]
            }
        }
        return e
    }, SD.adModYsm.addjunction.action = function(e) {
        for (var t = e.action, o = 0, n = t.length; o < n; o++) {
            var i = t[o];
            if (Array.isArray(i.exeFn) || (i.exeFn = [i.exeFn]), i.domObj)
                for (var a = i.domObj(e.domObj), d = 0, r = i.exeFn.length; d < r; d++) i.exeFn[d](a);
            else
                for (var c = 0, s = i.exeFn.length; c < s; c++) i.exeFn[c](e.domObj)
        }
        return SD.adModYsm.addjunction.newBlock(e.domObj)
    }, SD.adModYsm.addjunction.closeButton = function() {
        var m = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            l = 1 < arguments.length ? arguments[1] : void 0,
            t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        return function(c) {
            function e() {
                for (var e = 0, t = c.length; e < t; e++) {
                    var o = c[e].dom,
                        n = SD.common.createEl.get({
                            tag: "div",
                            dom: o
                        });
                    n.setAttribute("class", "sitemaji-close-btn"), o.style.position && "static" !== o.style.position || (o.style.position = "relative");
                    var i = Object.assign({}, {
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "35px",
                        height: "35px",
                        zIndex: "3",
                        background: "url('//ad.sitemaji.com/static/close_circle.png') no-repeat",
                        backgroundSize: "contain",
                        backgroundOrigin: "content-box",
                        padding: "5px",
                        boxSizing: "border-box",
                        color: "#fff",
                        cursor: "pointer"
                    }, m);
                    for (var a in m.left || 0 === m.left || (i.left = null), m.top || 0 === m.top || (i.top = null), i) n.style[a] = i[a];
                    if (m && m.fakeIconStyle) {
                        var d = SD.common.createEl.get({
                            tag: "div",
                            dom: o
                        });
                        for (var r in m.fakeIconStyle) d.style[r] = m.fakeIconStyle[r]
                    }
                    l ? SD.common.dom.addEventListener(n, "click", s(o, l)) : SD.common.dom.addEventListener(n, "click", s(o))
                }
            }

            function s(e, t) {
                return function() {
                    e.style.display = "none", t && t(e)
                }
            }
            t.delayTime ? setTimeout(e, t.delayTime) : e()
        }
    }, SD.adModYsm.addjunction.fixed = function(a, d) {
        return a && d || console.log("sitemaji fixed addjunction variables should be defined!"),
            function(e) {
                for (var t = 0, o = e.length; t < o; t++) {
                    var n = e[t],
                        i = n.dom;
                    switch (i.style.position = "fixed", i.style.zIndex = "2147483647", a) {
                        case "left":
                            i.style.left = "0";
                            break;
                        case "center":
                            i.style.left = "50%", i.style.marginLeft = -1 * n.width / 2 + "px";
                            break;
                        case "right":
                            i.style.right = "0"
                    }
                    switch (d) {
                        case "top":
                            i.style.top = "0";
                            break;
                        case "middle":
                            i.style.top = "50%", i.style.marginTop = -1 * n.height / 2 + "px";
                            break;
                        case "bottom":
                            i.style.bottom = "0"
                    }
                }
            }
    }, SD.adModYsm.appierPrebidGen = function(e) {
        var t, o, n, i, a, d, r, c = e.appierPrebid || SD.config.appierPrebid,
            s = "sitemaji_appierPre",
            m = e.domObj;
        for (document.getElementById(s) || SD.common.createEl.js({
                src: c.header,
                id: s
            }), t = 0, o = m.length; t < o; t++) a = (i = c[(n = m[t]).model].id).split("_"), d = "", d = SD.common.iframeHtmlHead(d), d += '<div id="' + i + '"></div><script async src="//apn.c.appier.net/pb/0wHT9JDiP3SORJx/zone.js?hzid=' + a[1] + '"><\/script>', d = SD.common.iframeHtmlFoot(d), r = SD.common.createEl.iframe({
            width: n.width,
            height: n.height,
            dom: n.dom
        }), SD.common.iframeInnerHtml(r, d)
    }, SD.adModYsm.checkDom = function(e) {
        return SD.common.checkDom(e)
    }, SD.adModYsm.checkDomCss = function(e) {
        var t, o, n, i, a, d, r, c = e.domObj;
        for (t = 0; t < c.length; t++)
            for (r in o = c[t].dom, e.css)
                if ("attr" === r)
                    for (n in e.css[r])
                        for (d in i = o.getAttribute(n), a = e.css[r][n][i]) o.style[d] = a[d];
                else o.style[r] = e.css[r];
        return c
    }, SD.adModYsm.dableGen = function(e) {
        for (var t = e.domObj, o = e.dable || SD.config.dable, n = 0; n < t.length; n++) {
            var i = t[n],
                a = i.dom,
                d = o[i.model];
            if (!d) {
                console.error("Can not find dable Config for " + i.model);
                break
            }
            var r = document.createElement("div");
            r.id = "dablewidget_" + d.id, r.dataset.widget_id = d.id, a.appendChild(r),
                function(e, t, o, n, i, a) {
                    e[o] && e[o].q || (e[o] = function() {
                        (e[o].q = e[o].q || []).push(arguments)
                    }, (i = t.createElement("script")).async = 1, i.charset = "utf-8", i.src = "//static.dable.io/dist/plugin.min.js", (a = t.getElementsByTagName("script")[0]).parentNode.insertBefore(i, a))
                }(window, document, "dable"), dable("setService", o.service), dable("renderWidget", r.id, {
                    ignore_items: !0
                })
        }
    }, SD.adModYsm.iframeInnerGen = function(e) {
        var t, o, n, i, a, d = e.domObj,
            r = e.iframeInner || SD.config.iframeInner;
        for (t = 0, o = d.length; t < o; t++) a = d[t], n = "", n = SD.common.iframeHtmlHead(n), n += r[a.model], n = SD.common.iframeHtmlFoot(n), i = SD.common.createEl.iframe({
            width: a.width,
            height: a.height,
            dom: a.dom
        }), SD.common.iframeInnerHtml(i, n);
        return i
    }, SD.adModYsm.iframeSrcGen = function(e) {
        var t, o, n, i = e.iframeSrc || SD.config.iframeSrc,
            a = e.domObj;
        for (t = 0, o = a.length; t < o; t++) n = a[t], SD.common.createEl.iframe({
            width: i[n.model].width || n.width,
            height: i[n.model].height || n.height,
            src: i[n.model].src,
            dom: n.dom
        })
    }, SD.adModYsm.nativeIntersDesktopGen = function(t) {
        var o, e, n, i, a, d, r = t.domObj[0],
            c = "sitemaji_inters_d";
        r && !document.getElementById("sitemaji_inters_d") && SD.common.device.desktop && !SD.common.cookie.getCookie(c) && (o = r.dom, n = "", i = SD.common.createEl.get({
            tag: "div",
            dom: o
        }), a = SD.common.createEl.get({
            tag: "div",
            dom: o
        }), d = SD.common.createEl.get({
            tag: "span",
            dom: a
        }), o.style.display = "none", o.style.position = "fixed", o.style.top = "0", o.style.left = "0", o.style.width = "100%", o.style.height = "100%", o.style.zIndex = "9999999", i.style.position = "absolute", i.style.zIndex = "1", i.style.width = "100%", i.style.height = "100%", i.style.background = "rgba(0, 0, 0, 0.5)", a.style.position = "absolute", a.style.top = "50%", a.style.left = "50%", a.style.margin = "-150px 0 0 -325px", a.style.zIndex = "2", a.style.width = "650px", a.style.height = "300px", a.style.boxSizing = "border-box", a.style.cursor = "pointer", d.style.position = "absolute", d.style.top = "5px", d.style.right = "5px", d.style.width = "35px", d.style.height = "35px", d.style.zIndex = "3", d.style.background = "url('//ad.sitemaji.com/static/close_circle.png') no-repeat", d.style.backgroundSize = "contain", d.style.color = "#fff", SD.common.dom.addEventListener(d, "click", function() {
            SD.common.createEl.remove(o)
        }), SD.config.nativeIntersDesktop.src ? SD.common.createEl.iframe({
            width: "100%",
            height: "100%",
            src: SD.config.nativeIntersDesktop.src,
            dom: a
        }) : (n = SD.common.iframeHtmlHead(n), n += '<script> var apikey = "' + SD.config.nativeIntersDesktop.apikey + '";<\/script><script> var nativeConfig = "' + SD.config.nativeIntersDesktop.adId + '";<\/script><script> var adOutFn = function() {window.parent.postMessage("sitemaji_nativeIntersDesktop", "*");};<\/script><script>var adInFn = function(data) {var p = data.nAd.getElementsByTagName("p")[0];var a = data.nAd.getElementsByTagName("a")[0];var img = data.nAd.getElementsByTagName("img")[0];data.nAd.style.height = "295px";a.style.width = "100%";a.style.height = "100%";a.style.padding = "0";img.style.width = "100%";img.style.height = "100%";img.style.position = "relative";p.style.position = "absolute";p.style.top = "0";p.style.left = "0";p.style.width = "100%";p.style.backgroundColor = "rgba(0, 0, 0, 0.3)";};<\/script><script src="//ad.sitemaji.com/native/ad_ypa.js" type="text/javascript"><\/script>', n = SD.common.iframeHtmlFoot(n), e = SD.common.createEl.iframe({
            width: "100%",
            height: "100%",
            dom: a
        }), SD.common.iframeInnerHtml(e, n)), SD.common.dom.addEventListener(window, "message", function(e) {
            e && e.data && "string" == typeof e.data && 0 <= e.data.indexOf("sitemaji_nativeIntersDesktop") && (o.style.display = "block", t.intersCookieHour && SD.common.cookie.setCookie({
                name: c,
                value: !0,
                hour: t.intersCookieHour
            }))
        }))
    }, SD.adModYsm.runativeGen = function(a) {
        SD.common.createEl.js({
            src: "//cdn.run-syndicate.com/sdk/v1/n.js",
            class: "sitemaji_runative_api",
            handleOnLoad: function() {
                ! function() {
                    var e, t = a.domObj,
                        o = a.runative || SD.config.runative;
                    for (i = 0; i < t.length; i++) {
                        if (e = "", domObj = t[i], domObj.attr)
                            for (var n in domObj.attr) e = o[domObj.model + "-" + domObj.attr[n]];
                        if (e || (e = o[domObj.model]), !e) return console.error("model: ", domObj.model, " config must have element_id");
                        domObj.dom.setAttribute("id", e.element_id), NativeAd(e)
                    }
                }()
            }
        })
    }, SD.adModYsm.sitemajiGen = SD.adModYsm.sitemajiGen || {}, SD.adModYsm.sitemajiGen.backend = SD.adModYsm.sitemajiGen.backend || {}, SD.adModYsm.sitemajiGen.backend.api = function(t, e, o) {
        var n, i;
        n = t.sitemajiApp && !0 === t.sitemajiApp ? SD.common.device.ios ? "ai" : "aa" : SD.common.device.desktop ? "d" : "m", i = "//rd.sitemaji.com/ask.php?size=" + e + "&hosthash=" + SD.config.hosthash + "&device=" + n + "&rtb=0";
        var a = new XMLHttpRequest;
        a.open("GET", i, !0), a.onload = function() {
            if (200 <= this.status && this.status < 400) {
                try {
                    var e = JSON.parse(this.response)
                } catch (e) {}
                o(e, t)
            } else o("", t)
        }, a.onerror = function() {
            o("", t)
        }, a.send()
    }, SD.adModYsm.sitemajiGen.backend.map = {
        "300x250": 1,
        "728x90": 2,
        "300x100": 3,
        "240x400": 4,
        "120x120": 5,
        "160x600": 6,
        "425x300": 7,
        "425x600": 8,
        "234x60": 9,
        "120x600": 10,
        "160x160": 11,
        "400x49": 12,
        "300x50": 13,
        "320x50": 14,
        "300x600": 15,
        "320x100": 16,
        "468x60": 17,
        "336x280": 18,
        "320x480": 19,
        "320x101": 20,
        "250x80": 21,
        "970x250": 22,
        "250x250": 23,
        "960x90": 24,
        "150x150": 25
    }, SD.adModYsm.sitemajiGen.buildAd = function(e, o) {
        var t, n, i, a, d, r = o.domObj;
        if (!e) return console.warn("no content"), void D(r);
        for (var c = 0; c < r.length; c++) {
            var s = r[c].dom,
                m = r[c].model,
                l = m.split("x"),
                u = l[0],
                f = l[1];
            if ("320x101" === m && (f = "100"), !/^\d{3}x\d{2,3}$/.test(m)) {
                var h = /\d{3}x\d{2,3}/.exec(m);
                m = h.length && h[0]
            }
            var p = e["s" + m];
            if (p.ad_size === m && p.ad_list.length) {
                var g = p.ad_list[0];
                switch (g.ad_type) {
                    case "img":
                        t = s, n = g, i = u, a = f, d = o.sitemajiApp && !0 === o.sitemajiApp ? SD.config.hosthash : encodeURIComponent(location.href), t.innerHTML = '<a href="'.concat(n.ad_url + d, '" target="_blank"><img style="margin:0 auto;display:block;width:').concat(i, "px;height:").concat(a, 'px;" src="').concat(n.ad_img, '"></a>');
                        break;
                    case "html":
                        b(s, g, u, f)
                }
            } else D(r[c])
        }

        function b(e, t, o, n) {
            var i = "";
            i = SD.common.iframeHtmlHead(i), i += t.ad_content, i = SD.common.iframeHtmlFoot(i);
            var a = SD.common.createEl.iframe({
                width: o,
                height: n,
                dom: e
            });
            ! function(t, o) {
                var n = window.top;
                t.addEventListener("load", function() {
                    var e = !1;
                    n.addEventListener("blur", function() {
                        e = document.activeElement === t
                    }), n.addEventListener("visibilitychange", function() {
                        e && document.hidden && ((new Image).src = o, e = !1, document.activeElement.blur())
                    }, !1)
                })
            }(a, t.ad_url), SD.common.iframeInnerHtml(a, i)
        }

        function D(e) {
            var t = function(e) {
                return JSON.parse(JSON.stringify(e))
            }(o);
            t.domObj = e instanceof NodeList ? e : [e], o.sitemajiBackfill ? (t.sitemajiBackfill = function() {}, o.sitemajiBackfill(t)) : SD.config.sitemaji && SD.config.sitemaji.backfill && SD.config.sitemaji.backfill(t)
        }
    }, SD.adModYsm.sitemajiGen.backend.normalGen = function(e) {
        var t, o = "",
            n = {},
            i = e.domObj;
        for (t = 0; t < i.length; t++) {
            i[t].dom.innerHTML = " ";
            var a = i[t].model;
            if (!/^\d{3}x\d{2,3}$/.test(a)) {
                var d = /\d{3}x\d{2,3}/.exec(a);
                a = d.length && d[0]
            }
            var r = SD.adModYsm.sitemajiGen.backend.map[a];
            r ? n[r] = n[r] ? n[r] + 1 : 1 : console.error("sitemaji Ad", "model error: ", a)
        }
        for (t in n) o = o + t + "x" + n[t] + ",";
        o && SD.adModYsm.sitemajiGen.backend.api(e, o, SD.adModYsm.sitemajiGen.buildAd)
    }, SD.adModYsm.sitemajiGen.json = function(e) {
        var t, o, n, i, a, d, r, c = e.domObj;
        for (SD.adModYsm.sitemajiGen.jsonCache = SD.adModYsm.sitemajiGen.jsonCache ? SD.adModYsm.sitemajiGen.jsonCache : [], SD.adModYsm.sitemajiGen.jsonAdCache = SD.adModYsm.sitemajiGen.jsonAdCache ? SD.adModYsm.sitemajiGen.jsonAdCache : [], SD.adModYsm.sitemajiGen.jsonCache.push(e), o = 0, n = c.length; o < n; o++)
            if (c[o].dom.innerHTML = " ", document.getElementById("sitemaji_ad_json" + c[o].model))
                for (t = 0; t < SD.adModYsm.sitemajiGen.jsonAdCache.length; t++) SD.adModYsm.sitemajiGen.jsonAdCache[t]["s" + c[o].model] && ((r = e).domObj = [c[o]], SD.adModYsm.sitemajiGen.buildAd(SD.adModYsm.sitemajiGen.jsonAdCache[t], r));
            else a = (i = new Date).getYear() + "-" + i.getUTCMonth() + "-" + i.getUTCDate() + "-" + i.getUTCHours() + "-" + parseInt(i.getMinutes() / 5), d = e.sitemajiApp && !0 === e.sitemajiApp ? SD.common.device.ios ? "ai" : "aa" : SD.common.device.desktop ? "d" : "m", SD.common.createEl.js({
                src: "//ad.sitemaji.com/t/" + d + "_" + SD.config.hosthash + "_" + c[o].model + ".json?v=" + a,
                id: "sitemaji_ad_json" + c[o].model,
                handleError: e.sitemajiBackfill ? s(c[o]) : ""
            });

        function s(c) {
            return function() {
                var e, t, o, n, i, a, d, r;
                for (o = 0, n = SD.adModYsm.sitemajiGen.jsonCache.length; o < n; o++) {
                    for (r = [], e = 0, t = (i = (a = SD.adModYsm.sitemajiGen.jsonCache[o]).domObj).length; e < t; e++) c.model === i[e].model ? ((d = a).domObj = [i[e]], a.sitemajiBackfill(d)) : r.push(i[e]);
                    SD.adModYsm.sitemajiGen.jsonCache[o].domObj = r
                }
            }
        }
        getSitemajiad = function(e) {
            var t, o, n, i, a, d, r, c;
            for (SD.adModYsm.sitemajiGen.jsonAdCache.push(e), n = 0, i = SD.adModYsm.sitemajiGen.jsonCache.length; n < i; n++) {
                for (c = [], t = 0, o = (a = (d = SD.adModYsm.sitemajiGen.jsonCache[n]).domObj).length; t < o; t++) e["s" + a[t].model] ? ((r = d).domObj = [a[t]], SD.adModYsm.sitemajiGen.buildAd(e, r)) : c.push(a[t]);
                SD.adModYsm.sitemajiGen.jsonCache[n].domObj = c
            }
        }
    }, SD.adModYsm.turnAttr = function(e) {
        var t, o, n, i, a, d, r = e.turnTime,
            c = e.domObj,
            s = e.rule;
        for (n in s) {
            for (d = {}, t = 0, o = c.length; t < o; t++) s[n][c[t][n]] ? (d[c[t][n]] = d[c[t][n]] || [], d[c[t][n]].push(c[t])) : c[t].attr && s[n][c[t].attr[n]] ? (d[c[t].attr[n]] = d[c[t].attr[n]] || [], d[c[t].attr[n]].push(c[t])) : (d.other = d.other || [], d.other.push(c[t]));
            for (t in d) i = s[n][t].adConfig || {}, a = s[n][t].rule || {}, i.domObj = d[t], r({
                adConfig: i,
                rule: a
            })
        }
    }, SD.adModYsm.ucfunnelCallbackCache = SD.adModYsm.ucfunnelCallbackCache || {
        arr: [],
        exe: !1
    }, SD.adModYsm.ucfunnelGen = function(e) {
        var t, o, n, i, a, s, d, r, c, m, l, u = e.domObj,
            f = e.ucfunnel || SD.config.ucfunnel;
        for (o = 0; o < u.length; o++) {
            if (s = "", (i = u[o]).attr)
                for (n in i.attr) s = f[i.model + "-" + i.attr[n]];
            if (s || (s = f[i.model]), void 0 !== s)
                if (s.ad_width = i.width, s.ad_height = i.height, s.pbuid && s.pbuid.match(/(pbuid-[0-9A-Za-z]+)/)) l = void 0, r = (d = {
                    domObj: i,
                    dataCache: s
                }).domObj, c = d.dataCache, m = c.pbuid, (l = document.createElement("script")).src = "https://cdn.aralego.net/header_bidding/" + m + "-prebid.js", l.async = !0, document.head.appendChild(l), a = SD.common.createEl.get({
                    tag: "iframe",
                    attr: {
                        id: "postbid_iframe_" + c.ad_unit_id,
                        "data-ad_unit_id": c.ad_unit_id,
                        frameborder: 0,
                        scrolling: "no",
                        width: 0,
                        height: 0,
                        allowtransparency: !0
                    },
                    dom: r.dom
                });
                else {
                    if (a = SD.common.createEl.get({
                            tag: "ins",
                            attr: {
                                "data-ad_unit_id": s.ad_unit_id,
                                class: "ucfad_async"
                            },
                            dom: i.dom
                        }), s.ad_unit_id.match(/^ad-\w{30,32}/) || console.error("ucfunnel ad_unit_id ".concat(s.ad_unit_id, " is invalid, must start with ad-XXXXXX (30~32 characters) !")), f.insStyle && f.insStyle[i.model])
                        for (t in f.insStyle[i.model]) a.style[t] = [f.insStyle[i.model][t]];
                    if ("" === a.style.width || "" === a.style.height) {
                        var h = i.dom.getBoundingClientRect();
                        a.style.width = h.width + "px", a.style.height = h.height + "px", a.style.display = "none"
                    }
                    b(g(s, a, i))
                }
        }
        var p = window.pbjs || {};
        for (p.que = p.que || [], o = 0; o < u.length; o++) {
            if (s = "", (i = u[o]).attr)
                for (n in i.attr) s = f[i.model + "-" + i.attr[n]];
            s || (s = f[i.model]), void 0 !== s && (s.ad_width = i.width, s.ad_height = i.height, s.pbuid && s.pbuid.match(/(pbuid-[0-9A-Za-z]+)/) && p.que.push(function() {
                var e = {
                        provider: "ucfunnelAnalytics",
                        options: {
                            adid: s.ad_unit_id,
                            pbuid: s.pubid
                        }
                    },
                    r = 0,
                    t = new XMLHttpRequest,
                    o = "https://hbwa.aralego.com/analysis?pbuid=" + s.pubid;
                t.open("GET", o), t.timeout = 2e3, t.send(), t.onload = function() {
                    r = t.responseText
                }, p.enableAnalytics(e), p.addAdUnits(SD.config.ucfunnel.biddingUnits);
                var c = "postbid_iframe_" + s.ad_unit_id;
                p.requestBids({
                    timeout: 1e3,
                    bidsBackHandler: function() {
                        var e, t = '<script async src="https://ads.aralego.com/sdk"> <\/script>\n            <ins class="ucfad_async"\n                style="display:none;width: '.concat((e = s).ad_width, "px; height: ").concat(e.ad_height, 'px"\n                data-ad_unit_id="').concat(e.ad_unit_id, '">\n            </ins>\n            <script> (ucfad_async = window.ucfad_async||[]).push({}); <\/script>'),
                            o = p.getHighestCpmBids();
                        if (0 < o.length && o[0] && o[0].cpm) var n = o[0].cpm;
                        var i = document.getElementById(c),
                            a = i.contentWindow.document,
                            d = p.getAdserverTargetingForAdUnitCode(c);
                        r && (r = parseFloat(r)), d && d.hb_adid && r <= n ? p.renderAd(a, d.hb_adid) : (i.width = s.ad_width, i.height = s.ad_height, a.write("<head></head><body>" + t + "</body>"), a.close())
                    }
                })
            }))
        }

        function g(n, i, a) {
            return function() {
                var e, t, o;
                window.ucf.insertAd(n, i), "320x480" === a.model && SD.common.device.mobile && (e = setInterval(function() {
                    if (a.dom.childNodes[0].childNodes[0] && a.dom.childNodes[0].childNodes[0].childNodes[1]) {
                        if (SD.common.createEl.remove(a.dom.childNodes[0].childNodes[0].childNodes[1]), t = SD.common.createEl.get({
                                tag: "span",
                                dom: a.dom.childNodes[0].childNodes[0].childNodes[0]
                            }), f.intersCloseStyle)
                            for (o in f.intersCloseStyle) t.style[o] = f.intersCloseStyle[o];
                        else t.style.position = "absolute", t.style.top = "5px", t.style.right = "5px", t.style.width = "40px", t.style.height = "40px", t.style.zIndex = "99999", t.style.background = "url('//ad.sitemaji.com/static/close_circle.png') no-repeat", t.style.backgroundSize = "contain", t.style.color = "#fff", t.style.cursor = "pointer";
                        SD.common.dom.addEventListener(t, "click", function() {
                            a.dom.childNodes[0].style.display = "none"
                        }), clearInterval(e)
                    }
                }, 600), setTimeout(function() {
                    clearInterval(e)
                }, 1e4))
            }
        }

        function b(e) {
            var t, o, n;
            !0 === SD.adModYsm.ucfunnelCallbackCache.exe ? e() : (n = document.getElementById("sitemaji_ucfunnel_api"), SD.adModYsm.ucfunnelCallbackCache.arr.push(e), n || SD.common.createEl.js({
                id: "sitemaji_ucfunnel_api",
                src: "//agent.aralego.com/sdk",
                handleOnLoad: function() {
                    for (SD.adModYsm.ucfunnelCallbackCache.exe = !0, t = 0, o = SD.adModYsm.ucfunnelCallbackCache.arr.length; t < o; t++) SD.adModYsm.ucfunnelCallbackCache.arr[t]()
                }
            }))
        }
    },
    function() {
        function s(e) {
            SD.adModYsm.turnAttr({
                turnTime: SD.util.turnTime,
                domObj: SD.adModYsm.checkDomCss({
                    domObj: SD.adModYsm.checkDom({
                        dom: e
                    }),
                    css: {
                        attr: {
                            model: {
                                "728x90": {
                                    marginTop: "2px"
                                }
                            }
                        }
                    }
                }),
                rule: {
                    model: {
                        "250x250": {
                            rule: {
                                100: SD.adModYsm.iframeSrcGen
                            }
                        },
                        "728x90": {
                            adConfig: {
                                sitemajiBackfill: function(e) {
                                    SD.util.turnTime({
                                        adConfig: e,
                                        rule: {
                                            100: SD.adModYsm.ucfunnelGen
                                        }
                                    })
                                }
                            },
                            rule: {
                                100: SD.adModYsm.sitemajiGen.backend.normalGen
                            }
                        },
                        "160x600": {
                            adConfig: {
                                sitemajiBackfill: SD.adModYsm.ucfunnelGen
                            },
                            rule: {
                                100: SD.adModYsm.sitemajiGen.backend.normalGen
                            }
                        },
                        "300x250": {
                            adConfig: {
                                sitemajiBackfill: function(e) {
                                    SD.util.turnTime({
                                        adConfig: e,
                                        rule: {
                                            100: SD.adModYsm.ucfunnelGen
                                        }
                                    })
                                }
                            },
                            rule: {
                                100: SD.adModYsm.sitemajiGen.backend.normalGen
                            }
                        }
                    }
                }
            })
        }

        function m(e, t) {
            SD.util.turnTime({
                adConfig: {
                    domObj: SD.adModYsm.addjunction.action({
                        domObj: SD.adModYsm.checkDom({
                            dom: e
                        }),
                        action: [{
                            exeFn: [SD.adModYsm.addjunction.fixed("right", "bottom"), SD.adModYsm.addjunction.closeButton({
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                width: "32px",
                                height: "35px",
                                fontSize: "13px",
                                background: "url('https://ad.sitemaji.com/static/close_circle.png') no-repeat",
                                backgroundSize: "contain",
                                backgroundOrigin: "content-box",
                                zIndex: "3",
                                boxSizing: "border-box",
                                color: "#fff",
                                cursor: "pointer"
                            })]
                        }]
                    }),
                    sitemajiBackfill: t
                },
                rule: {
                    100: SD.adModYsm.sitemajiGen.backend.normalGen
                }
            })
        }
        SD.config = SD.config || {}, SD.config.sp = {
            "728x90": '<ins class="scupioadslot" style="display:inline-block;width:728px;height:90px;" data-sca-pub="lVMPGQ43Rg==" data-sca-web="1488" data-sca-category="29" data-sca-cid="14527" data-sca-width="728px" data-sca-height="90px" data-sca-background-color="#FFFFFF" data-sca-title-color="#0000ff" data-sca-title-font-family="Microsoft JhengHei" data-sca-title-font-size="16px" data-sca-description-color="#333333" data-sca-description-font-family="Microsoft JhengHei" data-sca-description-font-size="12px" data-sca-mobile-font-size="28px" data-sca-border-color="#d8d8d8"></ins><script async src="//img.scupio.com/js/ad.js"><\/script>'
        }, SD.config.hosthash = "5252c4bcb69f", SD.config.siteName = "8comic", 0 <= document.location.hostname.indexOf("www.2comic.com") ? (SD.config.ucfunnel = {
            "728x90-top": {
                ad_unit_id: "ad-EAA478E36B79ABB0B88EA6B8A2D829"
            },
            "728x90-bottom": {
                ad_unit_id: "ad-EAA478E36B79ABB0B88EA6B8A2D829"
            },
            "160x600": {
                ad_unit_id: "ad-6AAAAB939D864B91E3688A3D26B7836"
            }
        }, SD.config.nativeIntersDesktop = {
            src: "http://2comic.com/view/testad.html?s=top_top_top_top"
        }, SD.config.iframeSrc = {
            "250x250": {
                src: "http://2comic.com/view/testad.html?s=bottom_bottom_bottom_bottom"
            }
        }) : 0 <= document.location.hostname.indexOf("www.6comic.com") ? (SD.config.ucfunnel = {
            "728x90-top": {
                ad_unit_id: "ad-6AADE96BDD2DD2BF2BB6932B9ADB92"
            },
            "728x90-bottom": {
                ad_unit_id: "ad-6AADEB28AB28D62CE4778774A8D7BBE"
            },
            "160x600": {
                ad_unit_id: "ad-2EEEEB98982948418634426BD3E9472"
            }
        }, SD.config.nativeIntersDesktop = {
            src: "http://6comic.com/testad.html?s=top_top_top_top"
        }, SD.config.iframeSrc = {
            "250x250": {
                src: "http://6comic.com/testad.html?s=bottom_bottom_bottom_bottom"
            }
        }) : 0 <= document.location.hostname.indexOf("nowcomic.com") ? (SD.config.ucfunnel = {
            "728x90-top": {
                ad_unit_id: "ad-34BBBB826726BD4813A26B6ED89B8BB8"
            },
            "728x90-bottom": {
                ad_unit_id: "ad-D233334987E9426BCD43E2E7BA92A299"
            },
            "160x600": {
                ad_unit_id: "ad-9A2222944A23A28AC4BA9D9E673D79B7"
            }
        }, SD.config.nativeIntersDesktop = {
            src: "http://v.nowcomic.com/online/testad.html?s=top_top_top_top"
        }, SD.config.iframeSrc = {
            "250x250": {
                src: "http://v.nowcomic.com/online/testad.html?s=bottom_bottom_bottom_bottom"
            }
        }) : 0 <= document.location.hostname.indexOf("www.comicbus.com") ? (SD.config.ucfunnel = {
            "728x90-top": {
                ad_unit_id: "ad-7722243AD73B7B4ECB9796AAD637AE97"
            },
            "728x90-bottom": {
                ad_unit_id: "ad-D2333B9E8446D679CD7B7499243B9E2B"
            },
            "160x600": {
                ad_unit_id: "ad-62777964877742681E9793DD43A7D836"
            }
        }, SD.config.nativeIntersDesktop = {
            src: "http://www.comicbus.com/online/testad.html?s=top_top_top_top"
        }, SD.config.iframeSrc = {
            "250x250": {
                src: "http://www.comicbus.com/online/testad.html?s=bottom_bottom_bottom_bottom"
            }
        }) : (SD.config.ucfunnel = {
            "728x90-top": {
                ad_unit_id: "ad-D77428B4EA8A4B808B32929AB73B93"
            },
            "728x90-bottom": {
                ad_unit_id: "ad-D77428B463AE37BC8B32929AB73B9E"
            },
            "160x600": {
                ad_unit_id: "ad-33333E9DD4B626AC3A8662A9784D627"
            }
        }, SD.config.nativeIntersDesktop = {
            src: "http://v.comicbus.com/online/testad.html?s=top_top_top_top"
        }, SD.config.iframeSrc = {
            "250x250": {
                src: "https://www.lookit.tw/native.html?s=250x250_8co"
            }
        }), SD.config.criteoCdb = {
            checkDomRule: {
                attr: "position"
            },
            backfill: SD.adModYsm.ucfunnelGen
        }, SD.config.appierPrebid = {
            header: "//apn.c.appier.net/pb/0wHT9JDiP3SORJx/pb.js?haid=WtW9feNp&hzids=ma9o9ro-,ma9i9ro-,ma9e9ro-",
            "728x90": {
                id: "apxzone_ma9o9ro-"
            },
            "320x50": {
                id: "apxzone_ma9i9ro-"
            },
            "300x250": {
                id: "apxzone_ma9e9ro-"
            }
        }, SD.util.geo(function() {
            ! function() {
                SD.config.ucfunnel["300x250"] = {
                    ad_unit_id: "ad-27332EED746BE3EB0867D884AD2EA4A7"
                };
                for (var e = SD.common.dom.getElementsByClassName("sitemaji_banner"), t = 0; t < e.length; t++) {
                    var o = e[t],
                        n = o.getAttribute("model") || "",
                        i = o.getAttribute("type") || "",
                        a = o.getAttribute("source") || "",
                        d = o.getAttribute("position") || "";
                    switch (adUnitType = n + "|" + i + "|" + a + "|" + d, adUnitType) {
                        case "300x250|fixed||":
                            m(o, SD.adModYsm.ucfunnelGen);
                            break;
                        case "300x250|adult||":
                        case "728x90|adult||":
                            c = o, SD.adModYsm.runativeGen({
                                domObj: SD.adModYsm.checkDom({
                                    dom: c
                                }),
                                runative: {
                                    "728x90": {
                                        element_id: "rn_ad_native_8imuq",
                                        spot: "df2a0dd80b6a42528b4f62834e4eeb3b",
                                        type: "img-left",
                                        cols: 3,
                                        rows: 1,
                                        mobileEnabled: !1,
                                        title: "",
                                        titlePosition: "left",
                                        adsByPosition: "bottom-right",
                                        styles: {
                                            image: {
                                                "padding-bottom": "90px"
                                            },
                                            label: {
                                                height: "72px",
                                                "background-color": "#fff"
                                            },
                                            thumb: {
                                                "margin-bottom": 0
                                            },
                                            container: {
                                                width: "728px",
                                                height: "90px",
                                                overflow: "hidden",
                                                "background-color": "#fff"
                                            },
                                            headlineLink: {
                                                ":hover": {
                                                    color: "#1891c4"
                                                },
                                                "font-size": "12px",
                                                "font-weight": "bold"
                                            },
                                            brandnameLink: {
                                                "font-size": "9px"
                                            }
                                        }
                                    },
                                    "300x250": {
                                        element_id: "rn_ad_native_uxq2s",
                                        spot: "e54cbb824b3a405c8a4a0de7b4d174fe",
                                        type: "label-under",
                                        cols: 1,
                                        rows: 1,
                                        title: "",
                                        titlePosition: "left",
                                        adsByPosition: "bottom-right",
                                        breakpoints: [{
                                            cols: 1,
                                            width: 770
                                        }],
                                        showLogoInfo: !0,
                                        styles: {
                                            image: {
                                                "padding-bottom": "188px"
                                            },
                                            label: {
                                                height: "59px",
                                                "background-color": "#fff"
                                            },
                                            thumb: {
                                                width: "290px"
                                            },
                                            container: {
                                                width: "300px",
                                                height: "250px",
                                                overflow: "hidden",
                                                "background-color": "#fff"
                                            },
                                            headlineLink: {
                                                ":hover": {
                                                    color: "#23ace6"
                                                },
                                                "font-size": "15px",
                                                "font-weight": "bold"
                                            },
                                            brandnameLink: {
                                                "font-size": "10px"
                                            }
                                        }
                                    }
                                },
                                sitemajiBackfill: SD.adModYsm.ucfunnelGen
                            });
                            break;
                        case "728x90|||top":
                            SD.config.ucfunnel["728x90"] = {
                                ad_unit_id: "ad-D77428B4EA8A4B808B32929AB73B93"
                            }, s(o);
                            break;
                        case "728x90|||bottom":
                            SD.config.ucfunnel["728x90"] = {
                                ad_unit_id: "ad-D77428B463AE37BC8B32929AB73B9E"
                            }, s(o);
                            break;
                        case "320x50||dable|":
                        case "728x90||dable|":
                            r = o, SD.util.turnTime({
                                adConfig: {
                                    domObj: SD.adModYsm.checkDom({
                                        dom: r
                                    }),
                                    dable: {
                                        service: "m.comicbus.com/pal-mate",
                                        "728x90": {
                                            id: "37JbYB7N"
                                        },
                                        "320x50": {
                                            id: "w7WpN4l2"
                                        }
                                    }
                                },
                                rule: {
                                    100: SD.adModYsm.dableGen
                                }
                            });
                            break;
                        default:
                            s(o)
                    }
                }
                var r;
                var c;
                SD.adModYsm.nativeIntersDesktopGen({
                    domObj: SD.adModYsm.checkDom({
                        class: "sitemaji_inters_d"
                    }),
                    intersCookieHour: .25
                })
            }()
        })
    }();
