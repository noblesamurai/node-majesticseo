var majestic = require('../index'),
    expect = require('expect.js');

describe('Majestic', function(){
  describe('#getIndexItemInfo()', function(){
    it('should callback', function(done){
      majestic.getIndexItemInfo('key', ['http://google.com', 'http://wikipedia.com'], done);
    });

    it('should error on failure', function(done){
      majestic.getIndexItemInfo('key', ['http://google.com', 'http://wikipedia.com'], callback);
      function callback(err) {
        console.log('err');
        console.log(err);
        expect(err).to.be.ok();
        done();
      }
    });
  });
});

// vim: set et sw=2 ts=2 colorcolumn=80:
