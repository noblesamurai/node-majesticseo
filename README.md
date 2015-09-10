node-majesticseo
================

Node module for access to the majesticseo API.

# Usage
```javascript
var majestic = require('majesticseo')(apiKey);

majestic.getIndexItemInfo(['http://google.com', 'http://wikipedia.com'], {dataSource: 'fresh'}, callback);
majestic.getSubscriptionInfo(callback);
majestic.getKeywordInfo('my keyword', {}, callback)
majestic.getBackLinkData('http://google.com', {backlinkCount: 1000}, callback)
```

# Tests
Run them:
```bash
MAJESTIC_API_KEY=blah npm test
```
