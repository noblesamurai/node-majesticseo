node-majesticseo
================

Node module for access to the majesticseo API.

# Usage
```javascript
var majestic = require('majesticseo');

majestic.getIndexItemInfo(apiKey, ['http://google.com', 'http://wikipedia.com'], {dataSource: 'fresh'}, callback);
majestic.getSubscriptionInfo(apiKey, callback);
```

# Tests
Run them:
```bash
MAJESTIC_API_KEY=blah npm test
```
