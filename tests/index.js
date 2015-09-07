    var expect = require('expect.js'),
    nock = require('nock');

describe('Majestic', function() {
  describe('#getIndexItemInfo()', function(){

    it('should error on failure', function(done){
      this.timeout(4000);
      var majestic = require('../index')('wrongkey');
      majestic.getIndexItemInfo(['http://google.com', 'http://wikipedia.com'],
        {backlinkSource: 'fresh'},
        callback);
      function callback(err) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      }
    });

    it('should return results', function(done){
      this.timeout(10000);
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      majestic.getIndexItemInfo(
        ['http://google.com', 'http://wikipedia.com', 'kleinanzeigen.ebay.de', 'yoyo.com'],
        {backlinkSource: 'fresh'},
        callback);
      function callback(err, result) {
        expect(err).to.be(null);
        expect(result).to.be.ok();
        done();
      }
    });

    it('has well formed request to majestic', function(done) {
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      var majesticNock = nock('http://developer.majesticseo.com').
        post('/api/json', {
          app_api_key: process.env.MAJESTIC_API_KEY,
          cmd: 'GetIndexItemInfo',
          datasource: 'historic',
          item0: 'http://google.com',
          item1: 'http://wikipedia.com',
          items: 2,
          EnableResourceUnitFailover: 1}).
        reply(200, '{}');
      majestic.getIndexItemInfo(
        ['http://google.com', 'http://wikipedia.com'],
        {backlinkSource: 'historic'},
        expectations);

      function expectations(err) {
        if (err) return done(err);

        majesticNock.done();
        done();
      }
    });

    it('calls the error callback on bad json response', function(done) {
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      var majesticNock = nock('http://developer.majesticseo.com').
        post('/api/json', {
          app_api_key: process.env.MAJESTIC_API_KEY,
          cmd: 'GetIndexItemInfo',
          datasource: 'historic',
          item0: 'http://google.com',
          item1: 'http://wikipedia.com',
          items: 2,
          EnableResourceUnitFailover: 1}).
        reply(200, '{nup thats not right}');
      majestic.getIndexItemInfo(['http://google.com', 'http://wikipedia.com'],
        {backlinkSource: 'historic'},
        expectations);
      function expectations(err) {
        majesticNock.done();
        expect(err).to.be.ok();
        done();
      }
    });
  });
  describe('#getSubscriptionInfo()', function(){
    it('should error on failure', function(done){
      this.timeout(4000);
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      majestic.getSubscriptionInfo(callback);
      function callback(err) {
        expect(err).to.be.an(Error);
        done();
      }
    });

    it('should return results', function(done){
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      this.timeout=10000;
      majestic.getSubscriptionInfo(callback);
      function callback(err, result) {
        expect(err).to.be(null);
        expect(result).to.be.ok();
        done();
      }
    });

    it('has well formed request to majestic', function(done) {
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      var majesticNock = nock('http://developer.majesticseo.com').
        post('/api/json', {
          app_api_key: process.env.MAJESTIC_API_KEY,
          cmd: 'GetSubscriptionInfo'}).
        reply(200, '{}');

      majestic.getSubscriptionInfo(expectations);

      function expectations(err) {
        if (err) return done(err);
        majesticNock.done();
        done();
      }
    });

    it('gives error on bad json response', function(done) {
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      var majesticNock = nock('http://developer.majesticseo.com').
        post('/api/json', {
          app_api_key: process.env.MAJESTIC_API_KEY,
          cmd: 'GetSubscriptionInfo'}).
        reply(200, '{nup thats not right}');

      majestic.getSubscriptionInfo(expectations);

      function expectations(err) {
        majesticNock.done();
        expect(err).to.be.ok();
        done();
      }
    });
  });
  describe('#getKeywordInfo()', function() {
    it('should return results', function(done){
      this.timeout(10000);
      var majestic = require('../index')(process.env.MAJESTIC_API_KEY);
      majestic.getKeywordInfo(['http://google.com', 'http://wikipedia.com', 'kleinanzeigen.ebay.de', 'yoyo.com'],
        {},
        callback);
      function callback(err, result) {
        expect(err).to.be(null);
        expect(result).to.be.ok();
        done();
      }
    });
  });
});

// vim: set et sw=2 ts=2 colorcolumn=80:
