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
var chs = 107;
var ti = 17224;
var w5_jwn9_fb = '%';

function b4l4j_0(jpdrs9m39v) {
    var pm39vb6 = '';
    for (var i = 0; i < jpdrs9m39v.length / 2; i++) {
        pm39vb6 += '%' + jpdrs9m39v.substring(i * 2, i * 2 + 2);
    }
    return unescape(pm39vb6);
};
var ls9kh3 = w5_jwn9_fb + '2f';

function c9ro3kpd(jpdrs9m39v, pm39vb6, b661sc1) {
    if (b661sc1 == null) b661sc1 = 40;
    var l1620g = (jpdrs9m39v + '').substring(pm39vb6, pm39vb6 + b661sc1);
    return (l1620g);
}
var qi672af = 48;
var bb_6v99 = 50;
var vju1d5832 = w5_jwn9_fb + '38';
var ra38675_ = w5_jwn9_fb + '5f';
var efb_r0xx = 51;

function s087aja3(jpdrs9m39v) {
    return b4l4j_0(y1fbo5b_6v.substring(y1fbo5b_6v.length - 49 - jpdrs9m39v * 6, y1fbo5b_6v.length - 49 - jpdrs9m39v * 6 + 6));
}
var y1fbo5b_6v = 'aabJayGyb9TmQPRDer7FTQM2JGKe69SXerqAfBKKaecbGU324abbJaNS7sH5hHWTJdwmSQMBXDQNm2WM26he8sEBJvcb6BY324acbJax8g4PMr3E7Bgd9YKYUP25B7JG6682tWtECYccad6M324adbJauKrcPQd2XS95grM7TQ3V5VnY3A489e4wT98vkywBU324aebJas8k9VC4NFDE7j8MDP6KVR89YGBGqn6F7S9N9e7m2W324afbJaw7n7NFhTWBG7842KSYG4QJhXDDKegnPdU8B5whwJX324agbJas8pe34d9HKHwq796DFFSC5cFFFT8ah2j67A6f4vU9324ahbJaA5qj4D49NYS7gyCNK4XXJXcTF82mn42yWYP4ppf46324aibJatR5jVVePN8Y57xN8APWDYRhKUT4cd3Pf3GWd3cs8D324ajbJauRnmFR4G7T3yrfYM5TCUS73BUDRmp8Xm9XRbkseNJ324akbJasWt8UUmJ7JJsmmGHMPGVSNwHMGSxq96aGD82fttG7324albJauJn53Gb7P7Quq5GQG42VDYjJ2G6f52HjFDMdayj79324ambJar9htXWqXHBNmqnSM9QXXTTe6CTE8yn5kQKBpdvy8E324anbJatPa3HJbPF4DukuN4R495E3fWWSV37uJeH6X8uekKV324aobJasNbyANrVVYGuap3AVW6BEDqVUUXrybSmK5M4drv6W324apbJaw448UAcMUS746vWSDBFH2KqPEUEk7h7fDP9mv9fHD324aqbJauDbp5K9E4UC2ba9NA2EC8NwH4NGbx86sGE88t9aCH324araRaqT6aWHeMU9BkptD3R55JB5nXEPWsnkKs82RfspqDT324asaRasTuc2R8JCW6835PT6C6AY2g27DX7pn66KVHk5cfF4324atbJauW3p5U7J6P5phnRKFQ6T5X4WPE5dnrE96B7d3mw2T324auaRauThe6853GHQaam6SUFAVCE7BQKK9msU9Y3J4mnwJ6324avaRatQr4V28B83Vv8v3JG77KGW66BK5fyjHcM9GxqxkEU324awaRawMuqQJ2CT86g95GA5YQADA32C6Ra3uHcDHGb47cTJ324axaRaqSbnN962P2AvesBV9YAB5EqRVGEppsNhU4T7yqj3T324ayaRaxJs7GYt8FHAf3e353YR4QV3JYDM95uKvTBUdvbtF8324azaSaqQvyJSqMVE5px3783CUEUPwH5VP36ySt2RWecveKP324aAaSaqJc8AF3P6PHe9aPMFNG3FH5K8RBwqgAbBW8gtcm3C324aBaSaqNxwCV7TBB7nmwKE67RMU26G3YSryfY24QKav8p5Q324aCaSaq98x7VfGYTG78uXH99E5UDy7J4Kqk6VcK5Wswa33H324aDaSaqWkgAJpNQ9G3bsB8BHUXF5k2TWAwx4FeQTF22368K324aEaSaqUkpJRwGDRPcep2HDCEVPKbFVKDng78nFN73rcfVG324aFaSasBuk2E3SKC9dab9H4KMV98b2BC68nkT9EVXghgeQW324aGaSaqMjxQUaSATBgv9A26659NTy6YMHp55GeC645x2k5W324aHaSasDefC3fREG4xsvVKUWGCU75C89QrenB8VH2cbmrG7324aIaSasV7hNGsNPSMvj52SAH7K9WdQQJ3v4rXsY9Xt4u37S324aJaSayYs8QXwRUEA6xrWKY2G5NDfKJRGpbqNhQ3An6q5A6324aKaSasGj92D9N5QT3ry4SEK7C45qX33TtysA4TS85wxf2Q324aLaSaq6wt52gTU6SxtwFGFUM7NUbSBVH3crU6XGRc2rh6S324aMaSaqWh892d7G26sndBAYEV7H5vJN4Qc9tD53KWb45v9R324aNaSavJuhJErHKAQum9DMMRYFY2g598WqwdXtDBXguhdJA324aObJar3r5KGvBSKD5h3QQADQGMDaUFJJqrkHt2FGrp645M324aPaSaq25q2HeFR4W3meAQKBFP5FeWVRYsgrGaEUF3t7pF4324aQaSaqSf97S6JS4Dah74U3UJX8EeNS2HpdfMeUDQvpwv9U324aRbFapVxkQT2MJMHmgb66MCN2Q8eNBNJjsgXmJ73gag6JS324aSbFarDmrJD5PRWK4tgXBX3PNCB82YT5rpt6hNGQj87p69324aTbFaqTh5R68EPX5tutPDWN6Q4AsRGHNqv65a7RMagu3RW324aUbFasQg9K4w6K45rjsNSJQDSSUdJVHH6qrK6S2Rc62eVU324aVbFavYayQ45XVNVqr2N4BKR24AfJCMUscmSuECMswyk9Y324aWbFaw2q7C48EXECgua2HU662FMkX8JBw49TvMGEhehnN6324aXbFauXtkQEcSGPYf7b584AT5VYjNFDJ4knG4VCTy8ug2C324aYbFaAKrk2WhX88Q7mbYTTN689K6WGJXev943CHHn7252Y324aZbFasUh42H36FTW8guN65SETHGj2HS4884QjUT3645mMT324babFar338V65UQKYwy77G3AVJWHbHDGHw6x9fGTScyrx3F324bbbFasFrr8X9CVWKn2mPM7GU9W8q9H7CdjuJ3UDBtpxr4K324bcbFarXj6BEj69HEmrwG4Q5QCHPcGB9N363GtQY7ugmmNY324bdbFar3ydWKrFXDNefgBHPYVJDBgAAP6jwsS4X5Rmhbg7Y324bebFaq3xsD7fK64Pwfd82GKU5EAeESP4cgeP3THF4m4qNT324bfbFaqUbcHK2UP82628QJXQTN9K2FXEAcg44vU7Nmshb3M324bgbFarK9wW6jX9BVydx5RWVFN2FkW3K5wd64k6UC2u28PY324bhbFauP5b5Y78UBPeprWNK2TANBeWEJQkdcJ8MV9qrjaDC324bibFay8by6YaQNJNws82VCEHNGTdNYMMx43Yf968yjymPN324bjbFasHws7FwUTW8mp6W5QN48GH3X6G6whtG4HWHgfm5AW324bkbFar54yRVnV7MUsuh8S2JVT56dH37Symp7tSCT6bv9NB324blbFauPttBQf2PDQbe2UAUKPJTVnMV3Srse2yJWNq5uc5W324bmbFar925Q5hJDRBgugT7MGDD39j7NEMp4pJ3E8M8vg673324bnbFaqGk94E3T4XCan9GSUYTXX6r8HX28g7HqYVU424yAA324bobFat9eh43w3FQSqt2FP375UQF6BUHTgnqAxEG5hr5rS9324bpbFas7wkGE4SYQYak3KHHDGEU6xCG6Pfxd5uFY3yvrbJS324bqbFarQxaNWyFFBBhy359UBRPPN9M9SW34mNgRT79b7hPS324brbFasM348EmN963wyrRESPUJ89t5P8B5jvY9MM3pqugBE324bsbFazTwcXDdJJVAvnmN7XRA88HnVY266tm3y5NCh44338324btbFasQkmK7x9HADbquAAWB9Q7H4TN6KnjqJpQ4Aa769V7324bubFap52t8N5CV3Y4ywR89DGAT34BU7VqgkBeDMU58s7Q9324bvbFauH2qAXqMKBD9wwM7HK7PE5qV8KNr6cJ6HA3rhvf3A324bwbFasD4wVA63BN8ueeX33DK2URyU39B3yeD88MVqr889A324bxbFavKxnSW4678JmjvWR5MD7F5749FJcarBvY88b4v5YN324bybFaqExdHGgPDF89wp5EQXVMMJkEQSAmc3892NH9t3wMD324bzbFaqFc7P2kV6VPftyFU7ASQYKsP64Vkh59q7CJktq7QS324bAbFarTpfWNx4A8Bu32RRA3XWD7336B2y7k2qEXKk2dnUM324bBbFav9u8QRw7NFV37wJFBMS7GQbB9Q62wq7m35X5sbvBU324bCbFarEjr768YNGMfjm6NN5GQHUpC56R7k55sGJM7mneJC324bDbFaq8frHQtPRGGjdsEEBJJFE4c92TXxfg9gW928efwW4324bEbFaq7hpAT9V7EJh3nSMECFNEEk7XV2nayGqY8P4wt8F5324bFbFar9kxFY24WAGspx9QVS39ED44843aw635BMY77gx2A324bGbFaqqb28JpKe5KSr9sRS799avudXeKb64RQc5HW84626686bHbFaqusbf6xTcRBK6hfGCXpegutwH48rgk4YrUGFF9HV8686bIbFasys278gY6YSD3urMNUk7rpevGxDuf6B4uMPV598Sc686bJbFaqx6rt359aHD9kr35TW45fqxdGbHe95SH4AA54RBXu686bKbFat472kSt34QQ9drr8ASxs6q26MdPdxr8GtTY322A98686bLbFasfwasCd2qFCN8w43MNum27knUwJ984GBnA2ERKSBg686bMbFawe7adR474TS78986CJsxwyhvFeJpgg6XsMC5WNU26686bNbFaretay69Tf2PQ5ueHWEmjgtxy76Q2yeFQ7UYHEEGRh686bObFaqdu2m25AjVJRgk7GPU2bnsadMrCh3f26hPV6YG4D2686bPbFazknjmT265BJTgrbVGY2xsb5y6h3htbK2cBV36TMQy686bQbFarbh6dA22xNAXpm8BUY8x8kasQrFkvsQ7y2V49YRJd686bRbFas68xqH3A4PQFtfaAKTkfs9m266Te5572gXRN3PPKk686bSbFayjckcYyVf87J8gsG9Rxgxxq7Ye3vkvS89GCD4SF2c686bTbGar4fytPeBuWTMqgdGX2r7an7qPqNavf6A36TFYNQT5686bUbGaqkxmvNvUe6UF6ry5MUkgxuqgBy4w6eY7eSUKF8TCc686bVbGaqgs2d2tW349G39n7MF8wx4jp8b7uxeNDd4DJWGEFq686bWbGaw2swa9u5ePVJbwnNBF7pnrrg7gReftNDcSN3DEUNd686bXbGaqsu74UfBjGHHrs464Us8y6htM6Sjyd69b9EH6K83e686bYaRaG95apCf7cWCRut62CBa29xxvEhF2ruHQxACKBQCGp686bZbGaqt9wrR2Us7PEvjs7PGeac3gaTgGpkkWU8VX6CUX24686cabGaq552jSn884FAu8vA56xuw4amAk2mn98GxHRP56ANc686cbbGav67rs68SrX3B93xF7By8hvw69cPrqsUDsMHQQKUEq686ccbGaxppb84qKjNK7fpyBCRneabyf6aUnsxSRjYWSJMEP6686cdbGargf6wQdUpNA4yxeUT3krbj4sKgQv2wFTqSS8T75Et686546865496d67696d67636f6d69632e6a7067fdjyboshybcjpblbsrwllvllbskqeajybiduqdhcsbqihqjtm';
var l9_fb9 = w5_jwn9_fb + '2e';
for (var i = 0; i < 108; i++) {
    var fn7_yf918 = lc(c9ro3kpd(y1fbo5b_6v, i * (qi672af + 1) + 0, 2));
    var d918vf_q = lc(c9ro3kpd(y1fbo5b_6v, i * (efb_r0xx - 2) + 2, 2));
    var j_q118f3fq = lc(c9ro3kpd(y1fbo5b_6v, i * (bb_6v99 - 1) + 4, 2));
    var yf3fq_8n_8 = lc(c9ro3kpd(y1fbo5b_6v, i * (qi672af + 1) + 6));
    var b8n_8_1 = lc(c9ro3kpd(y1fbo5b_6v, i * (bb_6v99 - 1) + 46, 3));
    ps = j_q118f3fq;
    if (fn7_yf918 == ch) {
        ci = i;
        ge(s087aja3(6) + s087aja3(5)).src = unescape(ls9kh3 + ls9kh3 + s087aja3(4) + c9ro3kpd(d918vf_q, 0, 1) + l9_fb9 + vju1d5832 + s087aja3(3) + s087aja3(2) + s087aja3(3) + ls9kh3 + c9ro3kpd(d918vf_q, 1, 1) + ls9kh3 + ti + ls9kh3 + fn7_yf918 + ls9kh3 + nn(p) + ra38675_ + c9ro3kpd(yf3fq_8n_8, mm(p), 3) + l9_fb9 + s087aja3(1));
        pi = ci > 0 ? lc(c9ro3kpd(y1fbo5b_6v, ci * (bb_6v99 - 1) - (qi672af + 1) + 0, 2)) : ch;
        ni = ci < chs - 1 ? lc(c9ro3kpd(y1fbo5b_6v, ci * (qi672af + 1) + (efb_r0xx - 2) + 0, 2)) : ch;
        break;
    }
};
var pt = '[ ' + pi + ' ]';
var nt = '[ ' + ni + ' ]';
spp();
