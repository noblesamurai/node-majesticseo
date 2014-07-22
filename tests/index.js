var majestic = require('../index'),
    expect = require('expect.js'),
    nock = require('nock');

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

    it('has well formed request to majestic', function(done) {
      var majesticNock = nock('http://developer.majesticseo.com').
        get('/api/json?app_api_key=' + process.env.MAJESTIC_API_KEY +
            '&cmd=GetIndexItemInfo&datasource=fresh&item0=http%3A%2F%2Fgoogle.com&item1=http%3A%2F%2Fwikipedia.com&items=2').
        reply(200, {});
      majestic.getIndexItemInfo(process.env.MAJESTIC_API_KEY,
          ['http://google.com', 'http://wikipedia.com'], expectations);

      function expectations(err) {
        if (err) return done(err);

        majesticNock.done();
        done();
      }
    });
  });
});

// vim: set et sw=2 ts=2 colorcolumn=80:
