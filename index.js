var request = require('request'),
    url = require('url');

exports.getIndexItemInfo = function(apiKey, urls, callback) {
  var query = {
      app_api_key: apiKey,
      cmd: 'GetIndexItemInfo',
      datasource: 'fresh'
  };

  urls.forEach(function(value, index) {
    query['item' + index] = value;
  });

  query.items = urls.length;

  var reqURL = url.format({
    protocol: 'http',
    host: 'enterprise.majesticseo.com',
    pathname: '/api/json',
    query: query
  });

  request(reqURL, function(err, response, body) {
    if (err) return callback(err);
    var parsedBody = JSON.parse(body);
    if (parsedBody.ErrorMessage) return callback(new Error(parsedBody.ErrorMessage));
    return callback(null, parsedBody);
  });
};

// vim: set et sw=2 ts=2 colorcolumn=80:
