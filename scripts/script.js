//array of available coins by identifier
var availableTags = [ 'BTC', 'ETH',  'XRP',  'BCH',  'IOT', 'LTC',  'ADA',  'NEO',  'XLM',  'EOS',  'XEM',  'DASH', 'XMR',  'USDT',  'TRX',  'VEN',  'ETC',  'LSK',  'OMG',  'QTUM',  'BTG',  'ICX',  'BNB',  'ZEC',  'DGD',  'PPT',  'STEEM',  'WAVES',  'BCN',  'STRAT',  'MKR',  'XVG',  'RHOC',  'DOGE',  'SC',  'SNT',  'BTS',  'AE',  'REP',  'DCR',  'BTM',  'WTC',  'KMD',  'ARK',  'VERI',  'ARDR',  'ZIL',  'ETN',  'ZRX',  'KCS',  'CNX', 'AION',  'HSR',  'MONA',  'DGB',  'PIVX',  'BAT',  'QASH',  'FCT',  'GNT',  'ETHOS',  'DRGN',  'GAS',  'R',  'SYS',  'NAS',  'LRC',  'FUN',  'GXS',  'RDD',  'ELF',  'KIN',  'LINK',  'DCN',  'IOST',  'KNC',  'SALT',  'XZC',  'SMART',  'POWR',  'POLY',  'GBYTE',  'BNT',  'NXT',  'PART',  'MAID',  'EMC',  'NEBL',  'REQ',  'SRN',  'DENT',  'PAY',  'BTX', 'ENG',  'ICN',  'BLOCK',  'AGI',  'STORJ',  'PLR',  'NXS',  'SUB',  'BTCD',  'CND',  'GNO',  'CVC',  'VTC',  'MCO',  'XPA', 'QSP',  'DTR',  'GAME',  'MNX',  'RDN',  'GVT',  'THETA',  'ANT',  'ENJ',  'SKY',  'RLC',  'MANA',  'STORM',  'SLS',  'MTL',  'SAN',  'IGNIS',  'PPP',  'NAV',  'EMC2',  'UBQ',  'CS',  'POE',  'ABT',  'BCO',  'GNX', 'WAX',  'XDN', 'NAN', 'ZEN',  'XAS',  'PURA',  'TNB',  'HPB',  'EDG',  'VEE',  'PRL',  'NULS',  'EVN',  'MED',  'SPHTX',  'ION',  'FSN',  'ADX',  'XP',  'SPC',  'C20',  'BLZ',  'LEND',  'POA',  'JNT',  'SPANK',  'MDS',  'TEL',  'SNM',  'DATA',  'BAY',  'OST',  'PPC',  'AMB',  'TRAC', 'XBY',  'RCN',  'WGR',  'SMT',  'VIBE',  'FTC',  'AST',  'WINGS',  'RPX',  'MLN',  'KICK',  'EDO',  'MGO',  'QRL',  'BURST',  'UTK',  'INK',  'GTO',  'TAAS',  'DBC',  'SNGLS',  'INS',  'LBC',  'NGC',  'HTML',  'CLOAK',  'BCPT',  'ITC',  'NLG',  'DPY',  'XCP',  'APPC',  'CMT',  'BRD',  'WPR',  'WABI', 'DTA',  'MOBI',  'GRS',  'ETP',  'FUEL',  'TNC',  'CRPT',  'VIA',  'MOD',  'BITCNY',  'BTO',  'GTC',  'TNT',  'AEON',  'HST',  'RFR',  'LUN',   'DNT', 'PRE',  'BKX',  'LKK',  'CRW',  'IDH',  'UNO',  'HVN',  'CTR',  'CDT',  'HMQ',  'ADT',  'QLC',  'ATM',  'DCT',  'PEPECASH',  'TKN',  'AMP','CFI',  'ZCL',  'CPC',  'NMC' ];

$( function() {//search box jQuery autocomplete
	$( "#tags" ).autocomplete({
		source: availableTags
	});
});

function Get(myUrl){ //calls json api url, then returns parsed data as object
    var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET",myUrl,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}

function getFullCoinData(myArray) {//returns analytical price data from cryptocompare api of given array of coins
	var output = [];
	var cutoff = 50; //api only allows for 300 chars max per call. coins are split into batches of 50 in order to decrease number of api calls
	leftOver = myArray.length%cutoff; //left over batch of coins
	for (i = 0; i < Math.floor(myArray.length/cutoff); i++){ //add coin data batches to array
		var commaStringTemp = myArray[cutoff*i]; //create string to make api call
		for (j = 0; j < cutoff; j++){
			commaStringTemp += ","+myArray[cutoff*i+j]
		}
		var temp = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+commaStringTemp+"&tsyms=USD").DISPLAY;
		for (j = 0; j < cutoff; j++){
			output.push(temp[myArray[cutoff*i+j]]); //add data from api to array
		}
	}
	commaStringTemp="";
	for (i = 0; i < leftOver; i++){ //add left over coin data batch to array
			commaStringTemp += ","+myArray[Math.floor(myArray.length/cutoff)*cutoff+i] //create string to make api call of left over coins
		}
		temp = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+commaStringTemp+"&tsyms=USD").DISPLAY;
	for (i = 0; i < leftOver; i++){
			output.push(temp[myArray[Math.floor(myArray.length/cutoff)*cutoff+i]]); //add data from api to array
		}
	return output;
}

function getCurrencyTable(currencies) { //create html table for view all page
	var output = "<table style=\"width:100%\"><th>Cryptocurrency</th><th>Price(USD)</th><th>24hr Trend</th><th>7 day Chart</th>"; //create table headers
	var time = Get("https://min-api.cryptocompare.com/data/histominute?fsym="+currencies[0]+"&tsym=USD&limit=1").TimeFrom; //cryptocompare time data
	var coins = Get("https://min-api.cryptocompare.com/data/all/coinlist"); //cryptocompare general coin data
	//coins = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+convertToCommaSeparatedList(currencies)+"&tsyms=USD");
	var coinPriceData = getFullCoinData(currencies); //price data for all available coins
	for (i = 0; i < currencies.length; i++) {
		output += "<tr class=\"tableRow\" onClick=\"writeText('"+currencies[i]+"')\"><td>"+(i+1)+")"; //ensure rows are clickable for navigation to individual pages
		try {
			output += " <img height=25px width=25px src=https://cryptocompare.com"+coins.Data[currencies[i]].ImageUrl+"> "+coins.Data[currencies[i]].FullName+"</td>"; //icon, full name, and identifier
		}
		catch(err) {
			output += " ERROR ("+currencies[i]+")</td>"; //show error rather than breaking table
		}
		try {
			output += "<td>"+coinPriceData[i].USD.PRICE+"</td>"; //current price
		}
		catch(err) {
			output += "<td>Price Error</td>"; //show error rather than breaking table
		}
		try {
			output += "<td>"+coinPriceData[i].USD.CHANGEPCT24HOUR+"%</td>"; //24 hr % change
		}
		catch(err) {
			output += "<td>Trend error</td>"; //show error rather than breaking table
		}
		try {
			output += "<td> <img class='border' height=35px src=https://images.cryptocompare.com/sparkchart/"+currencies[i]+"/USD/latest.png?ts="+time+" onerror=\"this.src='images/logo.png'\"></td>"; //7 day chart
		}
		catch(err) {
			output += "<td> ERROR ("+currencies[i]+")</td>"; //show error rather than breaking table
		}
			output += "</tr>"
	}
	output += "</table>";
	return output;
}

function createChartDIV(descriptionText) { //create divs for dashboard, control, and charts 
	var output = "<div id='dashboard_div'><div style='position: -webkit-sticky;position: sticky;top: 0;z-index:5;background-color: white;'><div id='control_div' style='padding: 35px;'></div><img src='images/help.png' height=25px style='position: relative; top: 10px; z-index:10;' class='btn' title='Use this slider to control the charts below\!'></div><div style='padding:35px'></div>" //dashboard and control divs
	for (i = 0; i < descriptionText.length; i++) {
		output+="<div style='width: 100%; height: 300px;' id='chart_div_"+i+"'></div><div><img src='images/help.png' height=25px style='position: relative; bottom: 35px;' class='btn' title='"+descriptionText[i].toString()+"'></div>" //chart divs. descript text is added to tooltip
	}
	output +="</div>"
	return output;
}

function formatData(coinData, paths) { //format data in order for data to be put into google charts columns
	var output = []
	for (i = 0; i < coinData.length; i++) {
		output.push([new Date(coinData[i]['time']*1000)]) //convert UTC string to date object
		for (j = 0; j < paths.length; j++) {
			output[i].push(coinData[i][paths[j]]) //convert paths to actual objects
		}
	}
	return output;
}

google.charts.load('visualization', '1', {packages: ['controls', 'charteditor']}); //load google charts api

function createCharts(coinData, columnPaths, columnNames, chartSeparation, barBool) { //main function for creating charts
	var date = new Date(); //get current date/time
    var data = new google.visualization.DataTable(); //google charts data table object
    data.addColumn('datetime', 'date'); //add date as first column
	for (i = 0; i < columnNames.length; i++) {
		data.addColumn('number', columnNames[i]); //add other specified columns to data
	}
	data.addRows(formatData(coinData, columnPaths)); //add specified rows to data
	var dash = new google.visualization.Dashboard(document.getElementById('dashboard_div')); //create google charts dashboard
	var control = new google.visualization.ControlWrapper({ //create google charts controller
        controlType: 'ChartRangeFilter',
        containerId: 'control_div',
        options: {
            filterColumnIndex: 0,
            ui: {
                chartOptions: {
                    height: 100,
                    chartArea: {
						width: '75%'
                    }
                }
            }
        },
        state: {
			range: {
				start: new Date(date.getYear()+1900, date.getMonth()-2, date.getDate()) //default shows last two months of data
			}
        }
    });
	var chartList = [];
	for (i = 0; i < chartSeparation.length; i++) { //create charts
		if(barBool[i]) { //if barBool is true, the first series of data will be displayed as a bar graph, rather than a line grpah
			var chart = new google.visualization.ChartWrapper({
				chartType: 'ComboChart',
				containerId: 'chart_div_'+i,
				options: {
					legend: { 
						position: 'bottom', 
						alignment: 'center', 
						textStyle: {
						fontSize: 12
						}
					},
					seriesType: 'line',
					series: {0: {type: 'bars', targetAxisIndex:1}},
					explorer: {
						axis: 'horizontal',
						keepInBounds: true
					},
					pointSize: 3,
					vAxis: [{},{}] //secondary y axis for bar graph
				}
			});
		}
		else { //normal chart only consisting of line graphs
			var chart = new google.visualization.ChartWrapper({
				chartType: 'ComboChart',
				containerId: 'chart_div_'+i,
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
					pointSize: 3
				}
			});
		}
		chart.setView({columns:chartSeparation[i]}); //separate correct columns from data onto chart
		chartList.push(chart); //add chart to chart array
	}
	
	dash.bind([control], chartList); //bind controller to all charts
    dash.draw(data); //draw data on all charts
	
	setTimeout(function () { //rezoom charts after three seconds to default in case of slow loading times
    	control.setState({range: {
      		start: new Date(date.getYear()+1900, date.getMonth()-2, date.getDate()),
          end: new Date()
      }});
      control.draw();
    }, 3000);
}

function readText (form) { //read text from search box form
    var currency = form.inputbox.value.toUpperCase();
	if (availableTags.indexOf(currency) != -1) //only pass data if input matches available coins
	{
		form.inputbox.value = '';
		writeText(currency);
	}
}

function writeText (currency) { //individual coin page
	var JSONData = Get('http://mallard.stevens.edu/herbz/CXIA/JSON/JSONS/'+currency+'.json') //CXIA json data
	var data = Get("https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms="+currency+"&tsym=USD"); //general coin data
	var pricedata = Get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+currency+"&tsyms=USD"); //current coin price data
	var time = Get("https://min-api.cryptocompare.com/data/histominute?fsym="+currency+"&tsym=USD&limit=1").TimeFrom; //current time
	$("#mainTitle").text(data.Data["0"].CoinInfo.FullName + " (" + data.Data["0"].CoinInfo.Name + ")"); //full coin name and identifier
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("<img class=\"logo\" src=https://cryptocompare.com"+data.Data["0"].CoinInfo.ImageUrl+">"); //coin icon
	$("#pageHeadOne").html(pricedata.DISPLAY[currency].USD.PRICE+" "+pricedata.DISPLAY[currency].USD.CHANGEPCT24HOUR+"% "+"<img class='border' src=https://images.cryptocompare.com/sparkchart/"+currency+"/USD/latest.png?ts="+time+">"); //current price, 24 hr % change, 7 day chart
	//create divs for charts. array of help tooltips is input here
	$("#pageBodyOne").html(createChartDIV(["EMA - Exponential Moving Average for a certain number of days. If the closing price crosses below or above, it may indicate a bearish or bullish trend, respectively. Upperband/Lowerband - Two standard deviations above and below the 14 day moving average, usually indicates a coin should be bought if touching the lowerband, or sold if touching the upperband. Volume - The amount of buys and sells of a coin, higher volume indicates that more people are affecting the price of the coin. Kind of like a lie-detector.", "MACD - Moving Average Convergence Divergence, the difference between the 14 day and the 28 day moving averages. Mathematically, if the EMA is the 1st Derivative of Price, the MACD is the 2nd Derivative. Signal - The 7 day moving average of the MACD, the 3rd Derivative of Price. Histogram - The difference between the MACD and the Signal, the 4th Derivative of Price. Crossovers: When the MACD falls below or rises above the Signal Line, this may indicate a bearish signal or bullish signal respectively. Divergence: When the MACD is moving in the opposite direction of the price, it indicates the price may start to move in the direction of the MACD. For example, if a coin is falling but its MACD is rising, this may indicate a bullish reversal.", "RSI- Relative Strength Index, this ranges from 0 to 100. If a coin is overbought it will be closer to 100, and inversely if it close to 0, the close is oversold.", "Aroon Up/Aroon Down - Aroon indicates how recent a high or low is in the range of 28 days. A high Aroon Up and a low Aroon Down indicates a coin is consistently hitting new highs. Conversely, a low Aroon Up and high Aroon down means a coin is continually hitting new lows. The crossover between the two lines and a line hitting 100 may be indicative of a reversal in the price trend of a coin.", "CMF - Chaikin Money Flow, measures buying and selling pressure by volume. A positive CMF implies heavy buying pressure, meaning more and more people are buying and a negative CMF implies that more and more people are selling. A positive CMF confirms an uptrend, but a negative CMF would imply a weak uptrend that may not last long. The reverse is true for downtrends.", "ADL - Accumulation Distribution Line is based on the theory that volume precedes and indicates price. The higher ADL climbs, the more buying pressure is stacked on a coin. A rising ADL confirms a rising price, while a falling price is called into question with a rising ADL.", "Chaikin Oscillator - The Chaikin Oscillator is the difference between the 3 day EMA and 10 day EMA of ADL, making it the 2nd Derivative of ADL. It confirms the buying or selling pressure of a coin."]));
	//create charts using CXIA data and google charts api
	createCharts(JSONData, ['volumeto', 'upperband14', 'lowerband14', 'close', 'ema14', 'histogram', 'macd1428', 'signal7', 'rsi14', 'aroonup28', 'aroondown28', 'cmf14', 'adl', 'chaikosc310'], ['Volume', 'Upperband', 'Lowerband', 'Close', 'EMA14', 'Histogram', 'MACD', 'Signal', 'RSI', 'Aroon Up', 'Aroon Down', 'CMF', 'ADL', 'Chaikin Oscillator'], [[0, 1, 2, 3, 4, 5], [0, 6, 7, 8], [0, 9], [0, 10, 11], [0, 12], [0, 13], [0, 14]], [true, true, false, false, false, false, false])
	tippy('.btn', {arrow: true, arrowType: 'round', size: 'large'}) //create tooltips using tippy api
	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");
}

function viewAll() { //all coins page
	$("#mainTitle").text("All Cryptocurrencies");
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("<img class=\"headerLogo\" src=\"images/logo.png\">"); //cxia logo
	
	$("#pageHeadOne").html("");
	$("#pageBodyOne").html(getCurrencyTable(availableTags)); //create table of all coins

	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");
}

function viewHeatMap() { //heat map page
	$("#mainTitle").text("Heat Map");
	$("#mainSubTitle").attr("class", "");
	$("#mainSubTitle").html("");
	//coin 360 api is used to get a heatmap of trends. (api periodically returns data that has resizing issues)
	$("#pageHeadOne").html("<iframe src=\"https://coin360.io/widget/map.html\" frameborder=\"0\" style=\"overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:90%;width:95%;position:absolute;top:55%;left:5%;right:5%;bottom:5%;\" height=\"90%\" width=\"95%\"></iframe>");
	$("#pageBodyOne").html("");

	$("#pageHeadTwo").text("");
	$("#pageBodyTwo").text("");

	$("#pageHeadThree").text("");
	$("#pageBodyThree").text("");
}
