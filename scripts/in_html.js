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

var ch = request('ch');
if (ch.indexOf('#') > 0) ch = ch.split('#')[0];
var p = 1;
if (ch.indexOf('-') > 0) {
    p = parseInt(ch.split('-')[1]);
    ch = ch.split('-')[0];
}
if (ch == '') ch = 1;
else ch = parseInt(ch);
var pi = ch;
var ni = ch;
var ci = 0;
var ps = 0;

function ge(e) {
    return document.getElementById(e);
}
var chs = 188;
var ti = 10406;
var p5h6w_y = '%';

function u_m8548_7(nu_317) {
    var u7k7z21_r = '';
    for (var i = 0; i < nu_317.length / 2; i++) {
        u7k7z21_r += '%' + nu_317.substring(i * 2, i * 2 + 2);
    }
    return unescape(u7k7z21_r);
};

function x8_77nj_k7(nu_317) {
    return u_m8548_7(r2i07n_n.substring(r2i07n_n.length - 53 - nu_317 * 6, r2i07n_n.length - 53 - nu_317 * 6 + 6));
}
var rimxl531 = p5h6w_y + '38';
var t81yj5eb0 = 55;
var r2i07n_n = 'apabanJgHPABCP4JXKvePd68rsQGhvSG4Ccc9mE9Y4cn5a7233359aqacanQpH6F2WNNCJG84VsDpm39UxcKG6S3xggFCQqg8u97233359auadanSgBJUEHNDGH3u6TrX99qABp9USr5yrbbE9Epeckh7233359auaean8xACGTAP4JA5hkWqArbkEP5rPC4Dbe4dTKNbke4v7233359atafan9sBPF4XWJB5Dby7dJkfxX94qR2f7vdxs8BGwdf367233359ayaganEpEE7M53MYEJtj658fgj747p6H5Hryb2TES9ueyp7233359arahanVgXSRRD6YMKB25D7784cF6pjNBt8sr488K846emh7233359awaianXm9G8CPNBEX93rKe92fyXJgrMWfUuu7a52Wrhs4c7233359ayajanB99PMFPA3FCF7eRvHqtsEGuxWM5Qd86744R7e5ah7233359aCakanA7MGXEVQVP76a7QyGk5tBBpwUHkQetdyAYX267pv7233359awalanAnA2URU8GH58w37aHsf8EK683TcE4grqEFE2pnqs7233359ayamanR46G9Y33WEDYk3F3V4x9SN9vKH9D25anHWP34mwn7233359azananVkDH7S9AUJ4CshU9M4y7HDutPX8Xmcmv7X2tkuue7233359awaoan5uQ9DAW65QFSsgBkAnwrKC9dUHySa6tb32Njww9w7233359aAapan6y79363CWQ4TruUu629jKGfpH9bWf354S7Ewkjdm7233359axaqan5jSV3M8PKV7D7k9cPh4sKUb3AD6BkfhdVABh4vq37233359aFaran6pWG2X4ET3NY9dGb386tHU4mDCuYmb3cMU6492gh7233359anasanUq46V6MR3QQN6ePnW7kxFMrmHVd8gpf23BJvu8w47233359asatanQg69RGJNJ58D7hFkTahcU2sdG78Me7ksBS338xun7233359aBauanDkSY522WGAU4hx4dGjgyJ5qaQQmGp3cyVJW66ygu7233359aravanFqA5S3RJ9B3Dfc729adb66msGTcD4sysQRFhjxsf7233359axawanM4NB6HNJT3JDddSpJ7ppKP6rVShWfvmtNK7rawhk7233359azaxan52UQTR4CVGBQcqJ6We2k6PuuQChNcxth6M975yv47233359aqayanVaMTC4D4KHB6w3TaPj8u5J9g679826u59DW3qsmk7233359axazanUrDJT7NPJVGWwtEyKt2xHHwcTMcQ4u4cNW5w3vgv7233359aUaAanGmGYW7WFSGN8sfAg2bxuAK6m83nJbe68NMQsa3fh7233359aLaBbJDxVBTUV582ASbjP367u28PbgNTe87y3tATHnt23a7233359araCbJAh7TVEYX3425682p42m96MpnQEf49bck62Cwh7bm7233359aiaDbJAdS4EPA7QE4Vvb8n8qv6FB2x2Nd46mjsYY5bk8y37233359bbaEbJRgNU437U3QKM95WhC2cg8B7cRJnQy4ggKRGmrfpx7233359aBaFbJDwSB2PQ8T7HU8b8jTcxhG6pdXCa2qucxQPT8xxd87233359amaGbJJ2J99W6YWRVBjvS4SsccC4a3A6eHpuyaHBN7d6yb7233359aoaHbJYbSEYQEW5E3Fq64eUvh7BR2xWFqFxk6772Rpqpad7233359aAaIbJWh99MHCQBJ7X3q7fRqgxSBhy2E3Ggpbv7KVb5gur7233359azaJbJV99C4QFDYU5Nu2QyVyws7Qv738aFykhjSYGuedvv7233359ataKbJ2c7KG8QTKMR84aKkPy9sHEww464H3ddkDCDh7v6w7233359auaLbJMaHKD6WJ7X3Xd4Y8BgutR43mC4uS854q2PKxsjaa7233359aJaMaRGn6V4QNJ644Rur2wW3wmNGvbNSwV57rrPYMqwdf77233359amaNbJ6hXKXHCTSMWHenWkA79nR3ywPPrQcpu7XS9fb5wy7233359aqaObJ7qQDNX83QQBE4mT5Ht3xR3meX7aRu48xPRHjfw7s7233359axaPbJQbT9D7QJA44YmtQr42hjM3yv9UyE2s9pVHCuvh8h7233359aFaQbJ7eCAEMPXDWCBjqKeFtcdW4whGFcHkaw38K94ba267233359auaRanDj2RCE94RCWRyqMn8kbc5MmuH2pYwv7pPGGejwwh7233359ataSaxEyKUE27594F2ucGd8xy2KMnfA4g644vpSNJ28cau7233359ayaTanQaACCR6426YJmrY7AbtvAS5vXJxYbk52R2Kuwf6t7233359apaUanW7MKV8UJFDDEym55QsvnK8eqPTmW6fufCHM4t4qs7233359aKaVanUjK3GHBN5E5Rfc8n43gfQBntMVkGqehmTSU9sg487233359ataWanYaPXV3V5JQC4p2AeH9w72JfpSNpHf8x5CD4ph67h7233359auaXaRS7MUVFQE27SKvgU96c6mGH25CUwEwvjxVJKahb5p7233359aoaYanPfUHN84YM2EMtjUb43a9RWkjWUcMmw5qQU9d8b277233359anaZan7bMMGUJ6M6QY7pF8YbwhTFqvTF26rv5tHMCtdbxn7233359ajbaax2uHC9TKKQK877hGpS6kn4R98PVbKtmhe5ME9rr957233359axbbaR7b3BS7B4SXGBnc3uDumnDGjuDNh2kk98UECfja7u7233359avbcax6dKGQCDUFAJ62rHaYd9aJEb67WpP6u2bNHYrahrc7233359aobdbJQfF2R5SG4BWJkjHcTuce28j4GSxD8n6nA8H27t7h7233359ajbebJ2qENR3N9H86Ub74s8kfxT24cD48H99ww2HB3e2kh7233359aibfan34VG9GGNUVSS7q8vQagcAX5fG5sAc5ev5AM85k2a7233359apbgaxQpVP5PG372F5xtBw8xscC7jpC9mXg9rvEUQ3ajpa7233359aubhaxHm2GM6WNM7ARh64m28c8RK9c6X37t528484w6aw77233359aAbianTdXNV2QC2WAX58DuPu69K994R45R9wns934qd8y97233359aobjanFa3TKXD75KY83gC53x76Y2cwEA5UanysF9Gesnuj7233359albkan5k89P2YNMPM75hXp3se3Y6w3X5uG6w9hQGAqpey57233359ajblanPmGWAMGWMQKFt2SuVxmbNStxFDqB7k5xPGXd56u97233359aibmaxC2XDCDHQPQ57r4RrS7ecK6vjTMfCcu7vKCD7faq67233359afbnan9hTQG2N3EN695bHbBa5cPBkrEJkKya42B2Yjtdqc7233359alboax23UNQT8EYB5HucU567sp6Va78HgR8nb83MMx9a4w7233359awbpaRRjTR6KK6Y89FggJcYjf26GraD8pTd6eeASTx2ptd7233359aobqbJHgGBFJDA45GE7rGqX7dj6Su8K4dRu3pnUE5hkww67233359ajbrbJNmPMT43RNNPVtg26Bc56JRy79JbV6ansJ6Wwywe27233359ambsaxQ4CJB39JPTGDhsSgGhc62Gr794jUmj7sT6Yry4na7233359ambtaxN7EW2XXS8SC6qeDt2b2jDSmd2Yb4mtvsXGQp9j7t7233359aibuax3r38A5EJH39G5n9e4v4dUJsgDHrR8h3x7K4yb7we7233359apbvaxH5KH599WNRDKekXp3u29NNw9WK8Yke45TS8mmm777233359aqbwaxP3Y96QGPP6WGdbSv3a88A6csEAcD3csbA8Y26cg67233359ajbxaxEyGDDJVY83VK5c3rNt77G4ep38xPru5hUA2h8sxk7233359aebyax42V3NDE3RVNJv8PuJ5uhBKt7CScU7xhs3XW8d5mv7233359aibzbJPhJHWMUD2U5G7xYb6kf3N3d9JDyA8dvqJMVpgaup7233359albAaxNc2J662DA4QQksJ5SscwBS4cVD6DptkhESCbkqpq7233359albBan4rF2PC42JRENfgRdK56vWVtb2GrQkpqtXXM7qgx57233359aobCbJS3FWQX9YE4V47nTjU63eRC76973D88mwH7Bnx7jm7233359agbDbJRfD4F8XDG2K2vwT2Y4ntS4xj3AwT8h2aJX8pw9v57233359ahbEbJVuGRHEA5CB6V77T24dpuPCbtMEjEm3tqNKXuwe9v7233359aobFanPn85CAK69E6VnxBhH27k64vkGUk9xnpvPR3hrxdv7233359anbGanCpX8AR7MNTTD645n5ytkE8xvVCr9u2dpJ3Wxhmn47233359akbHaxGxBMGSVNFE5NebK5Nkp63Ms79PrJgna48W8f4cn37233359anbIaxVf76JXWTT4W23bSnVw6mA697DMn673s2P9Rhfg6w7233359aibJaxAaTAD6D3CRD7mhTk93e32XaeEAw922ncYGMcv6dd7233359ambKbJYq7EW2WTA6H4ggQr3wm2KG7e2T2EjakgDP89dr2k7233359aobLanQf7UK5JB8WGUxy2v2b7wEQtgFCp8trps44Ung6eg7233359aAbManQnRJVAJ75JUXc5BsE4fhPD54U8hYhetjQHDqeha67233359ahbNaxN47FX9T23WKM7y2f8ffdY7643DcEc9rn3TMep7cg7233359ajbOan7mTSVCC5D9KFjyGh69jcXRgdREw85mntFGU879jk7233359ambPbJ66KJGV3QUDX772Wv2cxdV2kaDD8Xy34cBECkmjjg7233359ajbQaxBsD9XXF4M6C2b4473pyfH9qa2S4W6y3bRWDf89pe7233359aobRbJ37PB2BJHCW57dcCs3abg7WhsQ62EhdvkSTGqrhnp7233359aobSan5nKSWYFE2KT5736tFy29D289X78Qmpj8YY2wrgbw7233359axbTbJDnP5Y7KXM2QApnW4Xkbd7KvbE2ePmva8M7Ttk5687233359aobUanCrWEFGT8MUREgh4eY9m92X3wTQ93ee8uXWSbky8g7233359awbVbJVb777gbP7vNTk64xWg5QS6XeHm9R742sub3d6P7t5675166ambWanCuNE4vqN5h7BbHYmDkWUHrSv9fGQMGp548BqjU5p5675166ambXanKtCVS8fNqx7JqQM4PrU4BmUrPaSNHVcwdcTggD8d5675166azbYbJ8dDW8ypK35DQ6BKm56JKCm6qQ6RKA6fgj43jgUjy5675166aEbZanHa5E6r7Qb86Gt7Aq7tUJKqBbU45YWDmujwKb4Mxk5675166apcaan6ePR3esEyfAS5R887aDAMnCtFc5WF35ec7Xy6S965675166azcbbJS9B486eMj6MXf2KhVmRHNpBpJvKSKRh5p4Fuy2nd5675166aPccbJFfXJJpxN6yYH3H8x3742J9GgMtR5PChhdw6yyCkt5675166aucdbJJxW6Vx9X2vSG9U3wXbFP3pW42rMESU9jdv9j4Hmw5675166aGcebJAjJJW2w4k897jSQbNqWDCv28CdBMH9k9kpYhhDqp5675166aQcfbJ2q3N69fCae9N7AKpEs7AW3J6J99VDH5u6b7xqFkd5675166azcgaRT58XE4dJswPXtT85U6Q3Bu25E5H5V34k4x5whEpr5675166aIchanDfCE4hcJjjFAm2QrXdU8P747RdVBX5y8rw7rhJ6t5675166aHcianRt55KhnC5sGFgNAb24R3M7AgGw575Ud3xjDe4Vrh5675166alcjanQcWW8bn234MUpNHhHf7U6g45YfWCWXpqpnFfpCex5675166atckanKnCWP2hV98KP3QFbK9YHPfShA2TYB4j2m3MbjVdd5675166axclbJHbMAB38MhgYXxNEqDy57YsP7MhJV4SghwbUttXyp5675166aOcman57GSR2aHugUBv86eUqG5D7HbAsYVHDd3qcTa6Ksw5675166arcnbJH4U5Te2XjpSQ5UBkTrK2Sv6yGq8QR9j78nMrwK555675166aFcoanRv2TBadCs438jT43X8GE425d8e99X2rttkCdwK985675166aPcpbJH8XG67xX6uDD489dQbU5V7UqYcVVTT67xd5dcK745675166aVcqbJ2sVQC8fFkwUHmH4pVsE2XsUkQ6TB852gmd43aVny5675166aHcrbJ4pVWEetWnyJHq3BhNh3EF9SxS2B7VXptq8M4hYcn5675166aXcsanKxTXT6mS9xV32YB346XBVuTuDmBRGEmq9nA4rUx55675166bgctbJJy9JN5gRpaUNaYQvU3HRJ2Ha6293EQxevsChuGdt5675166becuanJ6TUHq8StbPJbVTb66KS7sGg4v876JtpypW82Ge95675166cBcvanG7B7Exs5g4BS3PPaE6G7V3NdAm7M6Vk6bc23vQdv5675166aScwanGgYSDhqUfg6J2TU73xTRTu68YjAJM3c945CfhM9w5675166aFcxan7kKCE6y3jh3Gm7MjGe5HCcSm26XBF55tct8c5Y2n5675166aRcyanXhUAPpkJtpBPr4Em9wK82cUqQ39Y6Tn7r2Y4jGc55675166bgczbJA3JE27mVcc3Mn45n8tQEAkT5T56GEC2b7vB549bq5675166bVcAanYqVG684Td9KPkU3nK6JPEfTaV9KMY3sxq23rkH485675166aUcBanGq4A6ewWg99Je4Y26xK48dHqQcNM3X6tmjEm7Afd5675166bhcCanAu4YKyxEwsWDfKUy5n926kYmHuF664qew5A86Pfa5675166bocDbJPwU2G73UhjN342K75xKWKy5pFhUAK9e87rExjCng5675166bscEbJMkXU477D3w843HQnDj8N9tRdXp32HWgbf8Fmq3e95675166cMcFbJ9v29X6nB36VD9AXyEeTQB8MvV9HQH5aejbYxk2nm5675166bbcGaRP2K44keEs83BhNCeFwGHJbP45pDF5Pg6y9Y5vWt65675166aFcHaRTdAR68rNx6WXjHX4ScHEXb687x8GAUs4rd8a2N485675166aGcIaRE95TRhb3pmN8cVY3PcTAS8PfDyAPUD5ef5D8xXyj5675166aMcJaRS5VJNc8Emj34pQQqXaX6464fNk98CQv8r4Haw3q75675166aLcKaRB67CR49Rvg7334V7CtA72aNtHfEGN8bw8q7sfV3x5675166aWcLaR4jWP25b8udTD89MrSb44NcUdSpVYRXuvxmQehChc5675166aBcMaR24NSEx6429HJkAX2V78P5uXbAmB4CPuyjnQs7Pb35675166aVcNaRPqA6Aj7F2g79qS3aJ3CEGpGdU4REKK76gdHhhSgh5675166aocObJMjEDJak8ppEY8GYhTaDR6sA8EfU557fsdmJy7She5675166ancPaRP624R4gW7bJE3GStUgN4CbRaDv8WFRdcav4cjUg95675166avcQaR6y9CBpaNea4EfK9365889nN86xWWFDu3nyStcYt55675166aNcRaRNjAFPabTg9FUf8NmX3CN2pM7NhRR5Ufurr4jt8yb5675166aJcSaRUtQ72q9Xef6H7M2f9wKHT2E62yWQNVa8sxX4fCh55675166atcTbJ2yYQBds88tHQhPD4G26GXg63W8NX5C2unvWbmM5p5675166aJcUbJDyDJ26w86eT3eVUeTyEV3q763vYJHCbrp8Xp8E3y5675166ascVaRCh5EJphB64PY7RAqEsNDT3VtGkCDH5yt57J2m9q35675166aAcWaRT4BFN5bTkx6JrHHdKbCBWkBhPmETNEumfjGah93q5675166aycXaR5fJ2Vvt4h6M8sM9794PYW7AqJnWKMYtaumRrpWy45675166aAcYbJH48YG4gK83KQtJSdTvQCF26xQxE5BT9g5qN2y4ap5675166aAcZaR3b3JU3xKbp3TeNHeTeTYR6TwRvC5VGcc48MfkBf65675166avdaaRH5B632w3ds4S2G5x8r2NUrAtFjHUCW4xfmMvwVsg5675166aBdbbJPbEWXvjGqk6262VuPkB8M52b55YJBNmrsx35vGyc5675166awdcbJQ8U4Cej98fG6sSXu7g2MVsSyV7MKHJq8ndFaeHe95675166atddbJYbX6Jm7Qtu2JaXMfN3CPWtGaTjAC8Ab8jaQc6Ydg5675166aAdebJPp4M2yqMkd7H95WbYfH47yRpV56MT3tysx54mF455675166aCdfbJ8tWQD7rS6aXJrETtNgQECx4v7t3RQ5ypj436yNyx5675166aydgaR83T4A339tbYFx5WvYyMAEm5xXdVJV346ptRve7ap5675166audhbJPhUKE9c82fGFk36fHcMMTtEuDkQHYDqnj98ffJxd5675166avdiamY52MAwg3ajMFvJ6j7894KtP7Fa89WAq37bNvv2885675166azdjbF5u6DGarHqvMCyJKcD3NDJuHjNtMUCAc6r83epVhk5675166aqdkbFU4DUSwbA9rHHbBD5M3BKHqR9MnTDT4hdqaK76Jxc5675166andlbF3gRGXeyDjhW24B2n3qQXNfGg2uG2QJ597u5v93ec5675166atdmbF2yWANmrHhkCUjJFpC8P9M9DgVkWRFBdy5sPbqCpc5675166aKdnbFB6Y9Jt2Tg7JN2BA5WaKCK7Ur53Y6HNws2933uQxt5675166aHdobF7kVM5maN7cQEu523A7YD5a477yHHK8t5jkH9w4795675166aydpbFEjU6C7wTfrS2j2Fd34RPC5UaTgKBC5267cAkkH6w5675166aAdqbFKsHXJcf6496ChFXuYwU7NpUwUtRF9HvgjmMprW8m5675166aydrbFDpUJB6yBha9HhD8vS6HQY8QhYmD9EQtfqyXf773c5675166axdsbFAdE4HrpUc75Xa377Rf8XRt8w2dA6JF4wjtJ4jY9j5675166avdtbFYvS3DeqQxsPB9GX4C5VPR4UdEb9738kwckPp853y5675166aPdubF7hQMSwgN68SA73Tw6g7AT6XuWrRUY36gs87gbDnt5675166aCdvbFUtVEMs9884VJ9HPtM55FAfYu36VADQdcysFh4Na35675166aJdwbFBuK443fHpsEJj3WuEsJVPxTwVvNY4YjnnmF2fF435675166amdxbFW8BFXhgXmyKQe5WyGsBPWa3aDnKV5Buh7vRujTv25675166aIdybFMsWNUegQ8u8Vu9NsNuACJ9Y4NkAXYKae78Bb49745675166aIdzbFEhBE8tjUv22UrDEb2dTXJp26HfNN739gtqH7yRpt5675166aNdAbF2jFAM3w2qsH9cBRwA6RJ3tG7Eh5PXGg2gyMn8Hxj5675166aBdBbFBjC8Be3C5u5Nj27jWt5E2jY72kPQKEfcgd65654u5675166atdCaR2fRVR4aNmgN6q9DcEjNFKu9w62VAMNr28aP9uQ8m5675166aGdDaRCh2TY5qFuaHRsYK365MCT9VeEv72WBwu7rT7bX6d5675166andEaRK8WS4wmNtaP62H6x4w3WX2TuJmGKBD383gUk83885675166aLdFbGHhC8MdjR5aV6jA2m45UMRtJf6hH4NT5pna76vWv95675166awdGbGMsAGMv858xXStQDrYeCGFk6sUnW76FyjppHkeHrt5675166546865496d67696d67636f6d69632e6a7067qefhhlxgrwynuenuxjpkgrtqfristdukclhekvovsemlvdwplqxyr';

function yrwfobu_31(nu_317, u7k7z21_r, e1_rkt13) {
    if (e1_rkt13 == null) e1_rkt13 = 40;
    var n135ge = (nu_317 + '').substring(u7k7z21_r, u7k7z21_r + e1_rkt13);
    return (n135ge);
}

function lc(l) {
  if (l.length != 2) return l;
  var az = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var a = l.substring(0, 1);
  var b = l.substring(1, 2);
  if (a == 'Z') return 8000 + az.indexOf(b);
   else return az.indexOf(a) * 52 + az.indexOf(b);
}

var gcw_g1imx = p5h6w_y + '2f';
var jj_k7o5h6w = p5h6w_y + '5f';
var s_f2o_81 = 52;
var w_n250rwfo = 54;
var ky__t8cw_g = p5h6w_y + '2e';
for (var i = 0; i < 188; i++) {
    var fxzh0z9_r = lc(yrwfobu_31(r2i07n_n, i * (w_n250rwfo - 1) + 0, 2));
    var qchn689t = lc(yrwfobu_31(r2i07n_n, i * (s_f2o_81 + 1) + 2, 2));
    var e9t2fpxz = lc(yrwfobu_31(r2i07n_n, i * (t81yj5eb0 - 2) + 4, 2));
    var h9_r142g6 = lc(yrwfobu_31(r2i07n_n, i * (s_f2o_81 + 1) + 6));
    var h2g60ndo3 = lc(yrwfobu_31(r2i07n_n, i * (w_n250rwfo - 1) + 46, 7));
    ps = fxzh0z9_r;
    if (qchn689t == ch) {
        ci = i;
        ge(x8_77nj_k7(6) + x8_77nj_k7(5)).src = unescape(gcw_g1imx + gcw_g1imx + x8_77nj_k7(4) + yrwfobu_31(e9t2fpxz, 0, 1) + ky__t8cw_g + rimxl531 + x8_77nj_k7(3) + x8_77nj_k7(2) + x8_77nj_k7(3) + gcw_g1imx + yrwfobu_31(e9t2fpxz, 1, 1) + gcw_g1imx + ti + gcw_g1imx + qchn689t + gcw_g1imx + nn(p) + jj_k7o5h6w + yrwfobu_31(h9_r142g6, mm(p), 3) + ky__t8cw_g + x8_77nj_k7(1));
        pi = ci > 0 ? lc(yrwfobu_31(r2i07n_n, ci * (w_n250rwfo - 1) - (s_f2o_81 + 1) + 2, 2)) : ch;
        ni = ci < chs - 1 ? lc(yrwfobu_31(r2i07n_n, ci * (s_f2o_81 + 1) + (t81yj5eb0 - 2) + 2, 2)) : ch;
        break;
    }
};
var pt = '[ ' + pi + ' ]';
var nt = '[ ' + ni + ' ]';
spp();