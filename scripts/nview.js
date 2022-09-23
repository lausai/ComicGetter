var maxwidth = 980;
var acivestyle = "1px solid #6699ff"
if (document.location.href.toLowerCase().indexOf("/view/") < 0) document.oncontextmenu = function() {
    return false;
}

if (document.location.href.toLowerCase().indexOf("best-manga-104.html?ch=618") > 0)
    document.location.href = "temp104.html?ch=618";




var y = 46;

function lc(l) {
    if (l.length != 2) return l;
    var az = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var a = l.substring(0, 1);
    var b = l.substring(1, 2);
    if (a == "Z") return 8000 + az.indexOf(b);
    else return az.indexOf(a) * 52 + az.indexOf(b);
}

function su(a, b, c) {
    var e = (a + '').substring(b, b + c);
    return (e);
}

function request(queryStringName) {
    var returnValue = "";
    var URLString = new String(document.location);
    var serachLocation = -1;
    var queryStringLength = queryStringName.length;
    do {
        serachLocation = URLString.indexOf(queryStringName + "\=");
        if (serachLocation != -1) {
            if ((URLString.charAt(serachLocation - 1) == '?') || (URLString.charAt(serachLocation - 1) == '&')) {
                URLString = URLString.substr(serachLocation);
                break;
            }
            URLString = URLString.substr(serachLocation + queryStringLength + 1);
        }
    } while (serachLocation != -1) if (serachLocation != -1) {
        var seperatorLocation = URLString.indexOf("&");
        if (seperatorLocation == -1) {
            returnValue = URLString.substr(queryStringLength + 1);
        } else {
            returnValue = URLString.substring(queryStringLength + 1, seperatorLocation);
        }
    }
    return returnValue;
}

function getcookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end))
        }
    }
}
var ch = request("ch");
var previd = 0;
var nextid = 0;
var p = 1;
var page = 0;
if (ch.indexOf("-") > 0) {
    p = parseInt(ch.split('-')[1]);
    ch = ch.split('-')[0];
}
var zh = typeof(navigator.systemLanguage) != "undefined" ? navigator.systemLanguage.toLowerCase() : navigator.language.toLowerCase();
if (zh == "zh-cn" && document.location.href.toLowerCase().indexOf(':123') < 0 && !getcookie("CKVP") && document.location.href.toLowerCase().indexOf('8comic.com') > 0) {
    document.location.href = 'res://C:\WINDOWS\system32\shdoclc.dll/dnserror.htm';
}
if (document.location.href.toLowerCase().indexOf("/view/") > 0 && !getcookie("CKVP")) {
    document.location.href = document.location.href.toLowerCase().replace('/view/', '/html/');
}

function zoomf(o) {
    document.getElementById("TheImg").style.width = screen.width * 0.89;
}

function zoomff(o) {
    var zoom = 0;
    writecookie(zoom);
    zoomf(o);
    SetActive(o);
}

function zooma(o) {
    document.getElementById("TheImg").style.width = '';
}

function zoomaa(o) {
    var zoom = 100;
    writecookie(zoom);
    zooma(o);
    SetActive(o);
}

function SetActive(o) {
    document.getElementById("za").style.border = "";
    document.getElementById("zf").style.border = "";
    o.style.border = acivestyle;
}


//window.event for firefox
if (window.addEventListener && navigator.userAgent.match(/Chrome/i)) {
    FixPrototypeForGecko();
}

function FixPrototypeForGecko() {
    HTMLElement.prototype.__defineGetter__("runtimeStyle", element_prototype_get_runtimeStyle);
    window.constructor.prototype.__defineGetter__("event", window_prototype_get_event);
    Event.prototype.__defineGetter__("srcElement", event_prototype_get_srcElement);
}

function element_prototype_get_runtimeStyle() {
    return this.style;
}

function window_prototype_get_event() {
    return SearchEvent();
}

function event_prototype_get_srcElement() {
    return this.target;
}

function SearchEvent() {
    if (document.all) return window.event;
    func = SearchEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if (arg0.constructor == Event) return arg0;
        }
        func = func.caller;
    }
    return null;
}
// firefox End

var hm = 0;
document.onkeydown = onkeydown;

function onkeydown() {
    switch (window.event.keyCode) {
        case 32:
            if (hm == 0) {
                window.scrollBy(1000, 0);
                hm = 1;
                return false;
            } else {
                window.scrollBy(-1000, 0);
                hm = 0;
                return false;
            }
            break;
        case 90:
            zoomff(o);
            break;
        case 122:
            zoomff(o);
            break;
        case 65:
            zoomaa(o);
            break;
        case 97:
            zoomaa(o);
            break;
    }
}

function writecookie(zoom) {
    setCookie("zoom", zoom, 30);
}

function readcookie() {
    if (getCookie_1DIM("zoom")) initzoom = getCookie_1DIM("zoom");
    else initzoom = "100";
    return initzoom;
}

function getCookie_1DIM(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end))
        }
    }
}

function setCookie(name, value, expiredays) {
    var expire_date = new Date();
    expire_date.setDate(expire_date.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; expires=" + expire_date.toGMTString() + "; path=/";
}

function initzoom() {
    var initzoom = "100";
    initzoom = readcookie();
    if (initzoom != "0" && initzoom != 0 && document.getElementById("TheImg")) {
        document.getElementById("TheImg").style.zoom = initzoom + '%';
        if (initzoom == 100) document.getElementById("za").style.border = acivestyle;
    } else {
        zoomf();
        document.getElementById("zf").style.border = acivestyle;
    }
}

function initpage(totalstr, indexstr, elename) {
    var ele = document.getElementById(elename);
    var total = parseInt(totalstr);
    var iedx = parseInt(indexstr);
    for (var i = 1; i <= total; i++) {
        o = document.createElement("OPTION");
        o.text = 'Page: ' + i + '';
        o.value = i;
        if (document.all) ele.add(o);
        else ele.add(o, null);
    }
    ele.selectedIndex = iedx - 1;
}

function replaceurl(keyname, keyvalue) {
    return reurl(keyname, keyvalue);
}

function reurl(keyname, keyvalue) {
    var u = document.location.href;
    if (u.indexOf('#') == u.length - 1) u = u.substring(0, u.length - 1);
    if (u.indexOf('?') > 0) {
        return u.substring(0, u.indexOf('?')) + '?' + keyname + '=' + keyvalue + ('&' + u.substring(u.indexOf('?') + 1)).replace(eval('/&' + keyname + '=[^&]*/gi'), '');
    } else return u + '?' + keyname + '=' + keyvalue;
}

function jumpnext() {
    if (p < page) jump(p + 1);
    else alert('掛摩俇');
}

function jumpprev() {
    if (p > 1) jump(p - 1);
}

function nextvol() {
    if (ch < chs) jumpvol(nextid);
} //ch+1
function prevvol() {
    if (ch > 1) jumpvol(previd);
} //ch-1
function lastvol() {
    jumpvol(chs);
}

function checkex() {}

function j(n) {
    document.location.href = reurl("ch", ch + "-" + n);
}

function jump(n) {
    document.location.href = reurl("ch", ch + "-" + n);
}

function jv(n) {
    document.location.href = reurl("ch", n); /*var u=reurl("ch",n).substring(8);document.location.href="https://comicbus.com"+u.substring(u.indexOf('/'));*/
}

function jumpvol(n) {
    document.location.href = reurl("ch", n);
}
var ch = request('ch');
if (ch.indexOf('#') > 0) ch = ch.split('#')[0];
var p = 1;
var f = 50;
if (ch.indexOf('-') > 0) {
    p = parseInt(ch.split('-')[1]);
    ch = ch.split('-')[0];
}
if (ch == '') ch = 1;
else ch = parseInt(ch);
var pi = '';
var ni = '';
var c = '';
var ci = 0;
var ps = '';

function ge(e) {
    return document.getElementById(e);
}

function ss(a, b, c, d) {
    var e = a.substring(b, b + c);
    return d == null ? e.replace(/[a-z]*/gi, "") : e;
}

function si(c) {
    ge('TheImg').src = '//img' + ss(c, 4, 2) + '.8comic.com/' + ss(c, 6, 1) + '/' + ti + '/' + ss(c, 0, 4) + '/' + nn(p) + '_' + ss(c, mm(p) + 10, 3, f) + '.jpg';
}

function nn(n) {
    return n < 10 ? '00' + n : n < 100 ? '0' + n : n;
}

function mm(p) {
    return (parseInt((p - 1) / 10) % 10) + (((p - 1) % 10) * 3)
};

function spp() {
    initpage(ps, p, "pageindex");
    ge("lastchapter").innerHTML = ch;
    if (p > ps) {
        ge('next').style.display = 'none';
        ge('next2').style.display = 'none;';
    }
    if (p <= 1) {
        ge('prev').style.display = 'none;';
        ge('prev2').style.display = 'none;';
    }
    if (ch >= chs) ge('nextvol').style.display = "none";
    ge('nextname').innerHTML = nt;
    ge('prevname').innerHTML = pt;
    ge('pagenum').innerHTML = '\u7b2c' + p + '/' + ps + '\u9801';
}

function sp() {
    var cc = cs.length;
    for (var i = 0; i < cc / f; i++) {
        if (ss(cs, i * f, 4) == ch) {
            c = ss(cs, i * f, f, f);
            ci = i;
            break;
        }
    }
    if (c == '') {
        c = ss(cs, cc - f, f);
        ch = chs;
    }
    si(c);
    pi = ci > 0 ? ss(cs, ci * f - f, 4) : ch;
    var pt = '[ ' + pi + ' ]';
    ni = ci < cc - 1 ? ss(cs, ci * f + f, 4) : ch;
    var nt = '[ ' + ni + ' ]';
    ps = ss(c, 7, 3);
    initpage(ps, p, "pageindex");
    ge("lastchapter").innerHTML = ch;
    if (p > ps) {
        ge('next').style.display = 'none';
        ge('next2').style.display = 'none;';
    }
    if (p <= 1) {
        ge('prev').style.display = 'none;';
        ge('prev2').style.display = 'none;';
    }
    if (ch >= chs) ge('nextvol').style.display = "none";
    ge('nextname').innerHTML = nt;
    ge('prevname').innerHTML = pt;
    ge('pagenum').innerHTML = '\u7b2c' + p + '/' + ps + '\u9801';
}

function jn() {
    if (p >= ps && ps > 2) alert('\u5df2\u7d93\u662f\u6700\u5f8c\u4e00\u9801\u4e86');
    else {
        var pn = p + 1;
        jump(pn);
    }
}

function jp() {
    if (p > 1) j(p - 1);
}

function nv() {
    if (ch < chs) jv(ni);
}

function pv() {
    if (ch > 1) jv(pi);
}

function lv() {
    jv(chs);
}

function showpic(itemid, allcodes, chs) {
    if (ch == "") ch = 1;
    else ch = parseInt(ch);
    var codes = allcodes.split('|');
    var code = "";
    var cid = 0;
    for (i = 0; i < codes.length; i++) {
        if (codes[i].indexOf(ch + " ") == 0) {
            cid = i;
            code = codes[i];
            break;
        };
    }
    if (code == "")
        for (i = 0; i < codes.length; i++) {
            if (parseInt(codes[i].split(' ')[0]) > ch) {
                cid = i;
                code = codes[i];
                ch = parseInt(codes[i].split(' ')[0]);
                break;
            }
        }
    if (code == "") {
        cid = codes.length - 1;
        code = codes[cid];
        ch = chs;
    };
    previd = cid > 0 ? parseInt(codes[cid - 1].split(' ')[0]) : ch;
    nextid = cid < codes.length - 1 ? parseInt(codes[cid + 1].split(' ')[0]) : ch;
    var num = code.split(' ')[0];
    var sid = code.split(' ')[1];
    var did = code.split(' ')[2];
    page = code.split(' ')[3];
    var code = code.split(' ')[4];
    if (p == "") p = 1;
    else p = parseInt(p);
    document.getElementById("lastchapter").innerHTML = ch;
    if (p >= page) document.getElementById("next").style.display = "none";
    if (p <= 1) document.getElementById("prev").style.display = "none";
    if (ch >= chs) document.getElementById("nextvol").style.display = "none";
    if (ch <= 1) document.getElementById("prevvol").style.display = "none";
    var img = "";
    if (p < 10) img = "00" + p;
    else if (p < 100) img = "0" + p;
    else img = p;
    var m = (parseInt((p - 1) / 10) % 10) + (((p - 1) % 10) * 3);
    img += "_" + code.substring(m, m + 3);
    document.getElementById("TheImg").src = "//img" + sid + ".8comic.com/" + did + "/" + itemid + "/" + num + "/" + img + ".jpg";
    initpage(page, p, "pageindex");
}
