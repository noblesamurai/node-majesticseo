var majestic = require('../index'),
    expect = require('expect.js');

describe('Majestic', function() {
  describe('#getIndexItemInfo()', function(){
    it('should error on failure', function(done){
      majestic.getIndexItemInfo('key', ['http://google.com', 'http://wikipedia.com'], callback);
      function callback(err) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      }
    });
    it('should return results', function(done){
      majestic.getIndexItemInfo(process.env.MAJESTIC_API_KEY, ['http://google.com', 'http://wikipedia.com'], callback);
      function callback(err, result) {
        expect(err).to.be(null);
        expect(result).to.be.ok();
        done();
      }
    });
  });
});

// vim: set et sw=2 ts=2 colorcolumn=80:
