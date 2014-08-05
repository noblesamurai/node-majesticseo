var request = require('request'),
    url = require('url');

exports.getIndexItemInfo = function(apiKey, urls, options, callback) {
  var query = {
      app_api_key: apiKey,
      cmd: 'GetIndexItemInfo',
      datasource: options.backlinkSource
  };

  urls.forEach(function(value, index) {
    query['item' + index] = encodeURI(value);
  });

  query.items = urls.length;

  var reqURL = {
    protocol: 'http',
    host: 'enterprise.majesticseo.com',
    pathname: '/api/json'
  };

  if (process.env.NODE_ENV === 'test') {
    reqURL.host = 'developer.majesticseo.com';
  }

  request.post(url.format(reqURL), {form: query}, function(err, response, body) {
    if (err) return callback(err);
    try {
      var parsedBody = JSON.parse(body);
      if (parsedBody.ErrorMessage) return callback(new Error(parsedBody.ErrorMessage));
      return callback(null, parsedBody);
    } catch(err) {
      return callback(new Error('Failed to parse: ' + body + '\n' + err.message));
    }
  });
};

// vim: set et sw=2 ts=2 colorcolumn=80:
