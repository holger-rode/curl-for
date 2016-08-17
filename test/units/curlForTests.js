'use strict';

const assert = require('assertthat'),
      request = require('request');

const curlFor = require('../../lib/curlFor');

suite('curlFor', () => {
  test('is a function.', done => {
    assert.that(curlFor).is.ofType('function');
    done();
  });

  test('throws an error if request is missing.', done => {
    assert.that(() => {
      curlFor();
    }).is.throwing('Request is missing.');
    done();
  });

  test('returns the CURL call.', done => {
    request({
      method: 'GET',
      url: 'http://www.example.com'
    }, (err, res) => {
      assert.that(err).is.null();

      const curl = curlFor(res.request);

      assert.that(curl).is.equalTo('curl -i \'http://www.example.com/\'');
      done();
    });
  });

  test('supports HTTP methods other than GET.', done => {
    request({
      method: 'POST',
      url: 'http://www.example.com'
    }, (err, res) => {
      assert.that(err).is.null();

      const curl = curlFor(res.request);

      assert.that(curl).is.equalTo('curl -i -X POST \'http://www.example.com/\'');
      done();
    });
  });

  test('supports sending data.', done => {
    request({
      method: 'POST',
      url: 'http://www.example.com',
      body: 'foo=bar'
    }, (err, res) => {
      assert.that(err).is.null();

      const curl = curlFor(res.request);

      assert.that(curl).is.equalTo('curl -i -X POST -d \'foo=bar\' \'http://www.example.com/\'');
      done();
    });
  });

  test('supports sending JSON.', done => {
    request({
      method: 'POST',
      url: 'http://www.example.com',
      json: true,
      body: {
        foo: 'bar'
      }
    }, (err, res) => {
      assert.that(err).is.null();

      const curl = curlFor(res.request);

      assert.that(curl).is.equalTo('curl -i -X POST -d \'{"foo":"bar"}\' -H \'accept: application/json\' -H \'content-type: application/json\' \'http://www.example.com/\'');
      done();
    });
  });
});
