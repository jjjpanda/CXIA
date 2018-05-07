# Getting Started:

Clone or download ZIP of repository. 
```https://github.com/jjjpanda/CXIA```

## Setting up the Server:

The website runs on a linux server, using a daily cron daemon, nodeJS and 1 external package that does not come with node,

Curl: https://www.npmjs.com/package/curl

which can be downloaded on command line with ```npm install curl```

In addition, the following line needs to be edited in order for json files to be processed by the webpage:

scripts/script.js Line 201:

```var JSONData = Get('YOUR_HTTP_SERVER_HERE/CXIA/JSON/JSONS/'+currency+'.json')```

## Setting up the Cron Daemon:

In the JSON folder, there are 3 files: a createJSON.sh file calls the run.js file which calls the coinDatabase.js file. The cd command in createJSON.sh must be adjusted such that it links to the JSON folder. 
Be sure to set the createJSON.sh as an executable file by the chmod command.
While in the JSON folder in command line, run the command ```crontab -e``` which should prompt you to select a text editor and then open a document.
The following command must be entered:
```
x y * * * cd “INSERT PATH TO JSON FOLDER HERE” && ./createJSON.sh
```
The x and y are integers ranging from 0-59 and 0-23 respectively, which specify the time the command is set to run at everyday. 

## Website and HTML:

### Changing Search Bar Autocomplete / View All List:
scripts/script.js Line 2:
```
var availableTags = [‘crypto_identifier1’, ‘crypto_identifier2’...]
```
You can add different cryptocurrencies by adding the symbol. Note that the symbol should work with the CryptoCompare API. To test this go to this URL with the symbol inserted:
```
https://min-api.cryptocompare.com/data/histohour?fsym='INSERT SYMBOL HERE'&tsym=USD&limit=0&e=CCCAGG 
```
You should get a JSON output with price data. If you add a cryptocurrency to HTML list, you’ll also need to add that coin to the coinDatabase.js file, adding the symbol to line 6:
```
var a = [ 'symbol_1’, ‘symbol_2’,... ‘symbol_n’, ‘INSERT SYMBOL HERE’]; 
```
### Editing Charts:

Changing tooltip text scripts/script.js Line 211:
```
createChartDIV([help_text1, help_text2, ...])
```
Changing chart date scripts/script.js Line 213:
```
createCharts(json_object, [‘json_path1’,’json_path2’, ...], [‘column_display_name1’,’column_display_name2’, ...], [[0, chart1_path_index1, chart1_path_index2, ...], [0, chart2_path_index1, chart2_path_index2, ...], ...], [first_column_is_bar_graph1, first_column_is_bar_graph2, ...])
```
Ensure both tooltip array and chart arrays are all of the same length.



