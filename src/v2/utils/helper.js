const url = require('url');

class CustomUrl {
  constructor(req) {
    const urlObj = url.parse(req.originalUrl);
    urlObj.protocol = req.protocol;
    urlObj.host = req.get('host');

    this.reqUrl = new URL(url.format(urlObj));
  }

  upsertQueryParam(param, paramValue) {
    this.reqUrl.searchParams.set(param, paramValue || 0);
    return this.reqUrl.toString();
  }

  updateQueryParam(param, paramValue) {
    this.reqUrl.searchParams.set(param, paramValue || 0);
  }

  getCurrentUrlString() {
    return this.reqUrl.toString();
  }
}

module.exports = {
  CustomUrl,
};
