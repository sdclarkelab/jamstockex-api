# StockWatchJa: JamStockEx API V1
The **StockWatchJa: JamStockEx API V1** serves up stock details info as JSON at this [URL](http://jamstockexapi.stockwatchja.com/stocks). The data is pulled from **[StockWatchJa: JamStockEx Scraper](https://github.com/sdclarkelab/jamstockex-scraper)**.

#### Response Preview
```javascript
{
  "stocks": [
    {
      "id": "5f4efd8b77435e97079e95bb",
      "lastUpdatedDate": "1995-06-22T18:31:18.362Z",
      "instrumentName": "SOME STOCK NAME",
      "symbol": "SYMBOL",
      "currency": "JMD",
      "sector": "TOURISM",
      "type": "ORDINARY",
      "website": null,
      "isListed": true,
      "market": "Main Market",
      "corporateActionUrl": "https://www.jamstockex.com/market-data/listed-companies/corporate-actions/SYMBOL/latest",
      "dividends": [],
      "tradeInfo": {
        "volumeTraded": 955,
        "dollarChange": 0,
        "marketPrice": 0.3,
        "percentageChange": 0,
        "lastUpdatedDate": "1995-06-22T18:31:18.345Z"
      }
    },
  .....
  ],
  "results": 10,
  "total": 245,
}
```

## API Documentation
Click **[here](https://documenter.getpostman.com/view/6678518/TVt2biUM)** to view the API documentation.

## Requirements  
Tool | Version  | Source |  
--- | --- | --- |  
NodeJs | **10.16.2** (includes npm 6.9.0) | [Nodejs v10.x Releases](https://nodejs.org/dist/latest-v10.x/) | 
Heroku|-|[Getting Started on Heroku with Python](https://devcenter.heroku.com/articles/getting-started-with-python)|
Windows OS| 10 | - | 


## Heroku Setup

### Installation
1. Install GIT
2. [Install Heroku](https://devcenter.heroku.com/articles/getting-started-with-python#set-up)
3. Login using the following command
```shell script
heroku login
```

### Prepare Heroku to recieve source code

#### Create environment file file
Create ".env" in application root folder
```.env
DB="<MongoDB-node-2.2.12-connection-string>"
PORT=5000
```

#### Create Heroku project in Heroku
```shell script
heroku create jamstockex-api
```

### Set Environment Variables
```shell script
heroku config:set DB="<MongoDB-node-2.2.12-connection-string>"
heroku config:set PORT=5000
```

### Deploy 
```shell script
git push heroku your_local_branch_name:master
```
Validate that the application is live
```shell script
heroku ps:scale web=1
```
#### Test locally with heroku
```shell script
heroku local web
```
