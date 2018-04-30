var availableTags = [ 'BTC', 'ETH',  'XRP',  'BCH',  'IOT', 'LTC',  'ADA',  'NEO',  'XLM',  'EOS',  'XEM',  'DASH', 'XMR',  'USDT',  'TRX',  'VEN',  'ETC',  'LSK',  'OMG',  'QTUM',  'BTG',  'ICX',  'BNB',  'ZEC',  'DGD',  'PPT',  'STEEM',  'WAVES',  'BCN',  'STRAT',  'MKR',  'XVG',  'RHOC',  'DOGE',  'SC',  'SNT',  'BTS',  'AE',  'REP',  'DCR',  'BTM',  'WTC',  'KMD',  'ARK',  'VERI',  'ARDR',  'ZIL',  'ETN',  'ZRX',  'KCS',  'CNX', 'AION',  'HSR',  'MONA',  'DGB',  'PIVX',  'BAT',  'QASH',  'FCT',  'GNT',  'ETHOS',  'DRGN',  'GAS',  'R',  'SYS',  'NAS',  'LRC',  'FUN',  'GXS',  'RDD',  'ELF',  'KIN',  'LINK',  'DCN',  'IOST',  'KNC',  'SALT',  'XZC',  'SMART',  'POWR',  'POLY',  'GBYTE',  'BNT',  'NXT',  'PART',  'MAID',  'EMC',  'NEBL',  'REQ',  'SRN',  'DENT',  'PAY',  'BTX', 'ENG',  'ICN',  'BLOCK',  'AGI',  'STORJ',  'PLR',  'NXS',  'SUB',  'BTCD',  'CND',  'GNO',  'CVC',  'VTC',  'MCO',  'XPA', 'QSP',  'DTR',  'GAME',  'MNX',  'RDN',  'GVT',  'THETA',  'ANT',  'ENJ',  'SKY',  'RLC',  'MANA',  'STORM',  'SLS',  'MTL',  'SAN',  'IGNIS',  'PPP',  'NAV',  'EMC2',  'UBQ',  'CS',  'POE',  'ABT',  'BCO',  'GNX', 'WAX',  'XDN', 'NAN', 'ZEN',  'XAS',  'PURA',  'TNB',  'HPB',  'EDG',  'VEE',  'PRL',  'NULS',  'EVN',  'MED',  'SPHTX',  'ION',  'FSN',  'ADX',  'XP',  'SPC',  'C20',  'BLZ',  'LEND',  'POA',  'JNT',  'SPANK',  'MDS',  'TEL',  'SNM',  'DATA',  'BAY',  'OST',  'PPC',  'AMB',  'TRAC', 'XBY',  'RCN',  'WGR',  'SMT',  'VIBE',  'FTC',  'AST',  'WINGS',  'RPX',  'MLN',  'KICK',  'EDO',  'MGO',  'QRL',  'BURST',  'UTK',  'INK',  'GTO',  'TAAS',  'DBC',  'SNGLS',  'INS',  'LBC',  'NGC',  'HTML',  'CLOAK',  'BCPT',  'ITC',  'NLG',  'DPY',  'XCP',  'APPC',  'CMT',  'BRD',  'WPR',  'WABI', 'DTA',  'MOBI',  'GRS',  'ETP',  'FUEL',  'TNC',  'CRPT',  'VIA',  'MOD',  'BITCNY',  'BTO',  'GTC',  'TNT',  'AEON',  'HST',  'RFR',  'LUN',   'DNT', 'PRE',  'BKX',  'LKK',  'CRW',  'IDH',  'UNO',  'HVN',  'CTR',  'CDT',  'HMQ',  'ADT',  'QLC',  'ATM',  'DCT',  'PEPECASH',  'TKN',  'AMP','CFI',  'ZCL',  'CPC',  'NMC' ];
$( function()
{
	$( "#tags" ).autocomplete({
		source: availableTags
	});
});

function Get(myUrl){
    var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET",myUrl,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);          
}

function getFullCoinData(myArray) {
	var output = [];
	var cutoff = 50;
	leftOver = myArray.length%cutoff;
	for (i = 0; i < Math.floor(myArray.length/cutoff); i++){
		var commaStringTemp = myArray[cutoff*i];
		for (j = 0; j < cutoff; j++){
			commaStringTemp += ","+myArray[cutoff*i+j]
		}
		var temp = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+commaStringTemp+"&tsyms=USD").DISPLAY;
		for (j = 0; j < cutoff; j++){
			output.push(temp[myArray[cutoff*i+j]]);
		}
	}
	commaStringTemp="";
	for (i = 0; i < leftOver; i++){
			commaStringTemp += ","+myArray[Math.floor(myArray.length/cutoff)*cutoff+i]
		}
		temp = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+commaStringTemp+"&tsyms=USD").DISPLAY;
	for (i = 0; i < leftOver; i++){
			output.push(temp[myArray[Math.floor(myArray.length/cutoff)*cutoff+i]]);
		}
	return output;
}

function getCurrencyTable(currencies) {
	var output = "<table style=\"width:100%\"><th>Cryptocurrency</th><th>Price(USD)</th><th>24hr Trend</th><th>7 day Chart</th>";
	time = Get("https://min-api.cryptocompare.com/data/histominute?fsym="+currencies[0]+"&tsym=USD&limit=1").TimeFrom;
	coins = Get("https://min-api.cryptocompare.com/data/all/coinlist");
	//coins = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+convertToCommaSeparatedList(currencies)+"&tsyms=USD");
	coinPriceData = getFullCoinData(currencies);
	for (i = 0; i < currencies.length; i++) {
		output += "<tr class=\"tableRow\" onClick=\"writeText('"+currencies[i]+"')\"><td>"+(i+1)+")";
		try {
			output += " <img height=25px width=25px src=https://cryptocompare.com"+coins.Data[currencies[i]].ImageUrl+"> "+coins.Data[currencies[i]].FullName+"</td>";
		}
		catch(err) {
			output += " ERROR ("+currencies[i]+")</td>";
		}
		try {
			output += "<td>"+coinPriceData[i].USD.PRICE+"</td>";
		}
		catch(err) {
			output += "<td>Price Error</td>";
		}
		try {
			output += "<td>"+coinPriceData[i].USD.CHANGEPCT24HOUR+"%</td>";
		}
		catch(err) {
			output += "<td>Trend error</td>";
		}
		try {
			output += "<td> <img class='border' height=35px src=https://images.cryptocompare.com/sparkchart/"+currencies[i]+"/USD/latest.png?ts="+time+" onerror=\"this.src='images/logo.png'\"></td>";
		}
		catch(err) {
			output += "<td> ERROR ("+currencies[i]+")</td>";
		}
			output += "</tr>"
	}
	//output += "</table>";
	return output;
}

function createChartDIV(num){
	var output = ""
	for (i = 0; i < num; i++) {
		output+="<div id=\"dashboard_div_"+i+"\"><div style=\"width: 100%;\" id=\"chart_div_"+i+"\"></div><div id=\"control_div_"+i+"\"></div><div id=\"table_div_"+i+"\"></div></div>"
		}
		return output;
}

function formatData(coinData, paths) {
	var output = []
	for (i = 0; i < coinData.length; i++) {
		output.push([new Date(coinData[i]['time']*1000)])
		for (j = 0; j < paths.length; j++) {
			output[i].push(coinData[i][paths[j]])
		}
	}
	return output;
}

google.charts.load('visualization', '1', {packages: ['controls', 'charteditor']});

function chart(coinData, paths, displayNames, chartID) {
    
}

function readText (form) {
    var currency = form.inputbox.value.toUpperCase();
	if (availableTags.indexOf(currency) != -1)
	{
		form.inputbox.value = '';
		writeText(currency);
	}
}

function writeText (currency) {
	JSONData = Get('http://mallard.stevens.edu/herbz/CXIA/JSON/JSONS/'+currency+'.json')
	data = Get("https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms="+currency+"&tsym=USD");
	pricedata = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+currency+"&tsyms=USD");
	time = Get("https://min-api.cryptocompare.com/data/histominute?fsym="+currency+"&tsym=USD&limit=1").TimeFrom;
	$("#mainTitle").text(data.Data["0"].CoinInfo.FullName + " (" + data.Data["0"].CoinInfo.Name + ")");
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("<img class=\"logo\" src=https://cryptocompare.com"+data.Data["0"].CoinInfo.ImageUrl+">");

	$("#pageHeadOne").html(pricedata.DISPLAY[currency].USD.PRICE+" "+pricedata.DISPLAY[currency].USD.CHANGEPCT24HOUR+"% "+"<img class='border' src=https://images.cryptocompare.com/sparkchart/"+currency+"/USD/latest.png?ts="+time+">");
	$("#pageBodyOne").html(createChartDIV(7));
	//chart(JSONData, ['upperband14', 'close', 'ema14', 'lowerband14'], ['Upperband', 'Close', 'EMA14', 'Lowerband'], '0');
	//chart(JSONData, ['macd1428', 'signal7'], ['MACD', 'Signal'], '1');
	//chart(JSONData, ['rsi14'], ['RSI'], '2');
	//chart(JSONData, ['aroonup28', 'aroondown28'], ['Aroon Up', 'Aroon Down'], '3');
	//chart(JSONData, ['cmf14'], ['CMF'], '4');
	//chart(JSONData, ['adl'], ['ADL'], '5');
	//chart(JSONData, ['chaikosc310'], ['Chaikin Oscillator'], '6');
	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");

	var date = new Date();
    var control = new google.visualization.ControlWrapper({
        controlType: 'ChartRangeFilter',
        containerId: 'control_div_0',
        options: {
            filterColumnIndex: 0,
            ui: {
                chartOptions: {
                    height: 50,
                    chartArea: {
                        width: '75%'
                    }
                }
            }
        },
        state: {
          range: {
            start: new Date(date.getYear()-2+1900, date.getMonth(), date.getDate())
          }
        }
    });
	
	var dash = new google.visualization.Dashboard(document.getElementById('dashboard'));
	var dash2 = new google.visualization.Dashboard(document.getElementById('dashboard2'));
	var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'date');
	data.addColumn('number', 'upperband14');
	data.addColumn('number', 'lowerband14');
	data.addColumn('number', 'close');
	data.addColumn('number', 'ema14');
	data.addRows(formatData(JSONData, ['upperband14', 'lowerband14', 'close', 'ema14']));
    var chart = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
        containerId: 'chart_div_1',
        options: {
        	legend: { 
              position: 'bottom', 
              alignment: 'center', 
              textStyle: {
                fontSize: 12
              },
			  animation:{
				  startup: true
			  },
			  seriesType: 'bars',
			  series: {2: {type: 'line'}}
          },
		  orientation:'horizontal',
          explorer: {
              axis: 'horizontal',
              keepInBounds: true
          },
          hAxis: {
              title: 'Date'
          },
          pointSize: 3,
		  view: {
			 columns: [0, 1, 2] 
		  }
          //vAxis: {
          //    title: 'Y'
          //}
      }
    }, data);
	chart.draw();
	var data2 = new google.visualization.DataTable();
    data2.addColumn('datetime', 'date');
	data2.addColumn('number', 'macd1428');
	data2.addColumn('number', 'signal7');
	data2.addRows(formatData(JSONData, ['macd1428', 'signal7']));
    var chart2 = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
        containerId: 'chart_div_2',
        options: {
        	legend: { 
              position: 'bottom', 
              alignment: 'center', 
              textStyle: {
                fontSize: 12
              }
          },
          explorer: {
              axis: 'horizontal',
              keepInBounds: true
          },
          hAxis: {
              title: 'Date'
          },
          pointSize: 3
          //vAxis: {
          //    title: 'Y'
          //}
      }
    });
   // dash.bind(control, chart);
	//dash.draw(data)
	//dash2.bind([control], [chart2]);
	//dash2.draw(data2)
    // example of a new date set up
}

function viewAll() {
	$("#mainTitle").text("All Cryptocurrencies");
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("<img class=\"headerLogo\" src=\"images/logo.png\">");
	
	$("#pageHeadOne").html("");
	$("#pageBodyOne").html(getCurrencyTable(availableTags));

	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");
}

function viewHeatMap() {
	$("#mainTitle").text("Heat Map");
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("");
	
	$("#pageHeadOne").html("<iframe src=\"https://coin360.io/widget/map.html\" frameborder=\"0\" style=\"overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:90%;width:90%;position:absolute;top:55%;left:5%;right:5%;bottom:5%;\" height=\"90%\" width=\"90%\"></iframe>");
	$("#pageBodyOne").html("");

	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");
}