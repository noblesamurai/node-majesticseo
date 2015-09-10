var request = require('request'),
    url = require('url');

var majesticURL = {
  protocol: 'http',
  host: 'enterprise.majesticseo.com',
  pathname: '/api/json'
};

if (process.env.NODE_ENV === 'test') {
  majesticURL.host = 'developer.majesticseo.com';
}

module.exports = function(apiKey) {

  function doRequest(command, items, options, callback) {
    var query = {
        app_api_key: apiKey,
        cmd: command
    };

    if (options.backlinkSource) {
      query.datasource = options.backlinkSource;
    }

    if (command === 'GetBackLinkData') {
      query.item = items;
      if (options.backlinkCount) query.Count = options.backlinkCount;
    } else if (items) {
      items.forEach(function(value, index) {
        query['item' + index] = (command === 'GetIndexItemInfo') ? encodeURI(value) : value;
      });
      if (command === 'GetIndexItemInfo') {
        query.items = items.length;
      }
      query.EnableResourceUnitFailover = 1;
    }

    request.post(url.format(majesticURL), {form: query}, makeResponseHandler(callback));
  }

  return {
    getSubscriptionInfo: doRequest.bind(null, 'GetSubscriptionInfo', null, {}),
    getIndexItemInfo: doRequest.bind(null, 'GetIndexItemInfo'),
    getKeywordInfo: doRequest.bind(null, 'GetKeywordInfo'),
    getBackLinkData: function(item, options, callback) {
      return doRequest('GetBackLinkData', item, options, callback);
    }
  };
};

function makeResponseHandler(callback) {
  return function handleResponse(err, response, body) {
    if (err) return callback(err);
    var parsedBody;
    try {
       parsedBody = JSON.parse(body);
      if (parsedBody.ErrorMessage) return callback(new Error(parsedBody.ErrorMessage));
    } catch(err) {
      return callback(new Error('Failed to parse: ' + body + '\n' + err.message));
    }
    return callback(null, parsedBody);
  };
}

// vim: set et sw=2 ts=2 colorcolumn=80:
