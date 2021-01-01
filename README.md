# StockWatchJa: JamStockEx API
The **StockWatchJa: JamStockEx API** serves up stock details info as JSON at this [URL](http://jamstockexapi.stockwatchja.com/stocks). The data is pulled from **[StockWatchJa: JamStockEx Scraper](https://github.com/sdclarkelab/jamstockex-scraper)**.

#### Response Preview
```javascript
{
  result: [
  {
    trade_info: {
      volume_traded: 9211,
      dollar_change: 0.01,
      market_price: 7.86,
      percentage_change: 0.21,
      last_updated_date: "1971-10-03T18:29:43.795Z"
    },
    _id: "f342efecedcfvedc",
    last_updated_date: "1971-10-0T18:29:43.802Z",
    instrument_name: "Some stock name",
    symbol: "SSN",
    currency: "JMD",
    sector: "OTHER",
    type: "ORDINARY",
    website: null,
    is_listed: true,
    market: "Main Market",
    corporate_action_url: "https://www.jamstockex.com/market-data/listed-companies corporate-actions/SSN/latest",
    dividends: [ ],
    id: "f342efecedcfvedc"
  },
  .....
  ]
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
