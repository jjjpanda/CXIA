var request = require('curl');
var fs = require('fs');

module.exports = {
    madeDatabases : function(){
            var a = [ 'BTC', 'ETH',  'XRP',  'BCH',  'IOT', 'LTC',  'ADA',  'NEO',  'XLM',  'EOS',  'XEM',  'DASH', 'XMR',  'USDT',  'TRX',  'VEN',  'ETC',  'LSK',  'OMG',  'QTUM',  'BTG',  'ICX',  'BNB',  'ZEC',  'DGD',  'PPT',  'STEEM',  'WAVES',  'BCN',  'STRAT',  'MKR',  'XVG',  'RHOC',  'DOGE',  'SC',  'SNT',  'BTS',  'AE',  'REP',  'DCR',  'BTM',  'WTC',  'KMD',  'ARK',  'VERI',  'ARDR',  'ZIL',  'ETN',  'ZRX',  'KCS',  'CNX', 'AION',  'HSR',  'MONA',  'DGB',  'PIVX',  'BAT',  'QASH',  'FCT',  'GNT',  'ETHOS',  'DRGN',  'GAS',  'R',  'SYS',  'NAS',  'LRC',  'FUN',  'GXS',  'RDD',  'ELF',  'KIN',  'LINK',  'DCN',  'IOST',  'KNC',  'SALT',  'XZC',  'SMART',  'POWR',  'POLY',  'GBYTE',  'BNT',  'NXT',  'PART',  'MAID',  'EMC',  'NEBL',  'REQ',  'SRN',  'DENT',  'PAY',  'BTX', 'ENG',  'ICN',  'BLOCK',  'AGI',  'STORJ',  'PLR',  'NXS',  'SUB',  'BTCD',  'CND',  'GNO',  'CVC',  'VTC',  'MCO',  'XPA', 'QSP',  'DTR',  'GAME',  'MNX',  'RDN',  'GVT',  'THETA',  'ANT',  'ENJ',  'SKY',  'RLC',  'MANA',  'STORM',  'SLS',  'MTL',  'SAN',  'IGNIS',  'PPP',  'NAV',  'EMC2',  'UBQ',  'CS',  'POE',  'ABT',  'BCO',  'GNX', 'WAX',  'XDN', 'NAN', 'ZEN',  'XAS',  'PURA',  'TNB',  'HPB',  'EDG',  'VEE',  'PRL',  'NULS',  'EVN',  'MED',  'SPHTX',  'ION',  'FSN',  'ADX',  'XP',  'SPC',  'C20',  'BLZ',  'LEND',  'POA',  'JNT',  'SPANK',  'MDS',  'TEL',  'SNM',  'DATA',  'BAY',  'OST',  'PPC',  'AMB',  'TRAC', 'XBY',  'RCN',  'WGR',  'SMT',  'VIBE',  'FTC',  'AST',  'WINGS',  'RPX',  'MLN',  'KICK',  'EDO',  'MGO',  'QRL',  'BURST',  'UTK',  'INK',  'GTO',  'TAAS',  'DBC',  'SNGLS',  'INS',  'LBC',  'NGC',  'HTML',  'CLOAK',  'BCPT',  'ITC',  'NLG',  'DPY',  'XCP',  'APPC',  'CMT',  'BRD',  'WPR',  'WABI', 'DTA',  'MOBI',  'GRS',  'ETP',  'FUEL',  'TNC',  'CRPT',  'VIA',  'MOD',  'BITCNY',  'BTO',  'GTC',  'TNT',  'AEON',  'HST',  'RFR',  'LUN',   'DNT', 'PRE',  'BKX',  'LKK',  'CRW',  'IDH',  'UNO',  'HVN',  'CTR',  'CDT',  'HMQ',  'ADT',  'QLC',  'ATM',  'DCT',  'PEPECASH',  'TKN',  'AMP','CFI',  'ZCL',  'CPC',  'NMC' ];
            function remove(array, element) {
                const index = array.indexOf(element);
                
                if (index !== -1) {
                    array.splice(index, 1);
                }
            }
            str = ""
            for(i=0;i<a.length;i++){
                str += a[i] +",";}
            str = str.substring(0,str.length-1);
            return str;
            },
    calcForListOfCoins : function(listOfCoinsAsString){
        listOfCoinsAsString = listOfCoinsAsString.replace(/ /g, "");
        symbolData = listOfCoinsAsString.split(',');
        console.log("Creating Excel Sheets for "+symbolData.length+" cryptocurrencies...");
        var howManyTimes = symbolData.length
        var j = 0;
        function f(){
            if(j < howManyTimes){
                module.exports.calcJSON(symbolData[j]);
            }
            j++;
            if(j <= howManyTimes){
                setTimeout(f, 250);
            }
        }
        f();
                
    },
    calcJSON: function(str){
        var symbol =str;
        var url = "https://min-api.cryptocompare.com/data/histoday?fsym="+symbol+"&tsym=USD&limit=800&e=CCCAGG";
        var data;
        request.getJSON(url, {}, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                data = body;
                data = data.Data;
                if(data == [] || data[0] == null || data[0] == undefined){
                    console.log(symbol+" does not exist or is incorrect symbol");
                    return;
                }
                //console.log(data);
                for (var i = 0, len = data.length; i < len; i++) {

                    if(data[i].close> data[i].open){
                        data[i].gain = data[i].close-data[i].open;
                        data[i].loss = 0;
                    }
                    else{
                        data[i].gain = 0;
                        data[i].loss = data[i].open-data[i].close;
                    }

                    if(data[i].high != data[i].low){
                        data[i].mfm = ((data[i].close - data[i].low) - (data[i].high - data[i].close))/(data[i].high-data[i].low);
                    }
                    else{
                        data[i].mfm = 0;
                    }

                    data[i].mfv = data[i].mfm * data[i].volumeto;

                    if(i == 0){
                        data[i].adl = data[i].mfv;
                    }
                    else{
                        data[i].adl = data[i].mfv + data[i-1].adl;
                    }
                    
                    n = 14;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].close;
                        }
                        data[i]['ema'+n] = sum/n;
                    }
                    if(i > n-1){
                        data[i]['ema'+n] = ((data[i].close - data[i-1]['ema'+n]) *(2/(n+1)) )+ data[i-1]['ema'+n];
                    }

                    n = 28;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].close;
                        }
                        data[i]['ema'+n] = sum/n;
                    }
                    if(i > n-1){
                        data[i]['ema'+n] = ((data[i].close - data[i-1]['ema'+n]) *(2/(n+1)) )+ data[i-1]['ema'+n];
                    }

                    n = 150;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].close;
                        }
                        data[i]['ema'+n] = sum/n;
                    }
                    if(i > n-1){
                        data[i]['ema'+n] = ((data[i].close - data[i-1]['ema'+n]) *(2/(n+1)) )+ data[i-1]['ema'+n];
                    }

                    n = 14;
                    if(i > n-1){
                        sum = 0;
                        for(j = i+1-n; j <= i; j++){
                            sum += data[j].close;
                        }
                        mean = sum / n;
                        sum = 0;
                        for(j = i+1-n; j <= i; j++){
                            sum += Math.pow((data[j].close - mean), 2);
                        }
                        data[i]['sigma'+n] = Math.pow((sum/(n-1)),0.5);

                        data[i]['upperband'+n] = data[i]['sigma'+n]*2 + data[i]['ema'+n]
                        data[i]['lowerband'+n] = data[i]['ema'+n] - data[i]['sigma'+n]*2;
                    }

                    if(i >= 28){
                        data[i].macd1428 = data[i].ema14-data[i].ema28;
                    }
                    n = 28 + 7;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].close;
                        }
                        data[i].signal7 = sum/n;

                        data[i].histogram = data[i].macd1428 - data[i].signal7; 
                    }
                    if(i > n-1){
                        data[i].signal7 = ((data[i].macd1428 - data[i-1].signal7) *(2/(7+1)) )+ data[i-1].signal7;

                        data[i].histogram = data[i].macd1428 - data[i].signal7;
                    }

                    n = 14;
                    if(i == n-1){
                        sumgain = 0;
                        for(j = i+1-n; j <= i; j++){
                            sumgain += data[j].gain;
                        }
                        data[i].avggain = sumgain/n;

                        sumloss = 0;
                        for(j = i+1-n; j <= i; j++){
                            sumloss += data[j].loss;
                        }
                        data[i].avgloss = sumloss/n;

                        if(sumloss == 0){
                            data[i]['rs'+n] = -1;
                            if(sumgain == 0){
                                data[i]['rs'+n] = 1;
                            }
                        }
                        else{
                            data[i]['rs'+n] = sumgain/sumloss;
                        }
                        data[i]['rsi'+n] = 100;
                        if(data[i]['rs'+n] != -1){
                            data[i]['rsi'+n] = 100 - 100/(1+data[i]['rs'+n]);
                        }
                    }
                    if(i > n-1){
                        data[i].avggain = ((data[i-1].avggain * (n-1))+data[i].gain)/n;
                        data[i].avgloss = ((data[i-1].avgloss * (n-1))+data[i].loss)/n;
                        if(data[i].avgloss == 0){
                            data[i]['rs'+n] = -1;
                            if(data[i].avggain == 0){
                                data[i]['rs'+n] = 1;
                            }
                        }
                        else{
                            data[i]['rs'+n] = data[i].avggain /data[i].avgloss;
                        }
                        data[i]['rsi'+n] = 100;
                        if(data[i]['rs'+n] != -1){
                            data[i]['rsi'+n] = 100 - 100/(1+data[i]['rs'+n]);
                        }
                    }
                   

                    n = 28;
                    if(i >= n-1){
                        aroonup = 0;
                        aroondown = 0;
                        recordedHigh = data[i].high;
                        recordedLow = data[i].low;
                        for(j = i-1; j >= i+1-n; j--){
                            if(data[j].high > recordedHigh){
                                recordedHigh = data[j].high;
                                aroonup = i-j;
                            }
                            if(data[j].low < recordedLow){
                                recordedLow = data[j].low;
                                aroondown = i-j;
                            }
                        }
                        data[i]['aroonup'+n] = (n-aroonup)*100/n;
                        data[i]['aroondown'+n] = (n-aroondown)*100/n;
                    }

                    n = 14;
                    if(i >= n-1){
                        sumMFV = 0;
                        for(j = i+1-n; j <= i; j++){
                            sumMFV += data[j].mfv;
                        }
                        sumVolume = 0;
                        for(j = i+1-n; j <= i; j++){
                            sumVolume += data[j].volumeto;
                        }
                        data[i]['cmf'+n] = sumMFV/sumVolume;
                    }

                    n = 3;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].adl;
                        }
                        data[i]['adlema'+n] = sum/n;
                    }
                    if(i > n-1){
                        data[i]['adlema'+n] = ((data[i].adl - data[i-1]['adlema'+n]) *(2/(n+1)) )+ data[i-1]['adlema'+n];
                    }

                    n = 10;
                    if(i == n-1){
                        sum = 0;
                        for(j = 0; j < n; j++){
                            sum += data[j].close;
                        }
                        data[i]['adlema'+n] = sum/n;

                        data[i].chaikosc310 = data[i].adlema3 - data[i]['adlema'+n];
                    }
                    if(i > n-1){
                        data[i]['adlema'+n] = ((data[i].adl - data[i-1]['adlema'+n]) *(2/(n+1)) )+ data[i-1]['adlema'+n];
                        
                        data[i].chaikosc310 = data[i].adlema3 - data[i]['adlema'+n];
                    }        
                }
                //console.log(data);
                content = JSON.stringify(data);
                fs.writeFile("./JSONS/"+symbol+".json", content, function(err) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    else{
                        console.log(symbol+ " was saved!");
                    }
                });
            }
            else{
            console.log("Error");
            } 
        });
    }
};