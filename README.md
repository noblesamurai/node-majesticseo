node-majesticseo
================

Node module for access to the majesticseo API.

# Usage
```javascript
var majestic = require('majesticseo');

majestic.getIndexItemInfo(process.env.MAJESTIC_API_KEY, ['http://google.com', 'http://wikipedia.com'], callback);
```

# Tests
Run them:
```bash
MAJESTIC_API_KEY=blah npm test
```
