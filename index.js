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

  var reqURL = {
    protocol: 'http',
    host: 'enterprise.majesticseo.com',
    pathname: '/api/json',
    query: query
  };

  if (process.env.NODE_ENV === 'test') {
    reqURL.host = 'developer.majesticseo.com';
  }

  reqURLString = url.format(reqURL);
  console.log(reqURLString);

  request(reqURLString, function(err, response, body) {
    if (err) return callback(err);
    var parsedBody = JSON.parse(body);
    if (parsedBody.ErrorMessage) return callback(new Error(parsedBody.ErrorMessage));
    return callback(null, parsedBody);
  });
};

// vim: set et sw=2 ts=2 colorcolumn=80:
