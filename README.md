# Jamstockex-api
  This project uses NodeJS and ExpressJS framework to serve [Jamaica Stock Exchange](https://www.jamstockex.com/) scraped data that is stored in MongoDB.


## Requirements  
Tool | Version  | Source |  
--- | --- | --- |  
NodeJs | **10.16.2** (includes npm 6.9.0) | [Nodejs v10.x Releases](https://nodejs.org/dist/latest-v10.x/) | 
Heroku|-|[Getting Started on Heroku with Python](https://devcenter.heroku.com/articles/ |getting-started-with-python)|
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