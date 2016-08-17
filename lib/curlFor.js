'use strict';

const shellEscape = require('shell-escape');

const curlFor = function (req) {
  if (!req) {
    throw new Error('Request is missing.');
  }

  const cliParts = [ 'curl', '-i' ];

  if (req.method !== 'GET') {
    cliParts.push('-X');
    cliParts.push(req.method);
  }

  if (req.body) {
    cliParts.push('-d');
    cliParts.push(req.body);
  }

  if (req.headers) {
    Object.keys(req.headers).forEach(key => {
      // Remove the content-length header because it interferes with a proxy.
      // If you do not remove it, the proxy returns a 400.
      if (key.toLowerCase() === 'content-length') {
        return;
      }

      cliParts.push('-H');
      cliParts.push(`${key}: ${req.headers[key]}`);
    });
  }

  cliParts.push(req.href);

  return shellEscape(cliParts);
};

module.exports = curlFor;
