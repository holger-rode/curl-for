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
      url: 'http://www.google.de'
    }, (err, res) => {
      assert.that(err).is.null();

      const curl = curlFor(res.request);

      assert.that(curl).is.equalTo('curl -i \'http://www.google.de/\'');
      done();
    });
  });
});
