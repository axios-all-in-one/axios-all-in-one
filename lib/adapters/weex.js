'use strict';

var utils = require('./../utils');
var createError = require('../core/createError');
var settle = require('./../core/settle');
var stream = weex.requireModule('stream');

module.exports = function weexAdapter(config) {
  return new Promise(function dispatchWeexRequest(resolvePromise, rejectPromise) {
    var timer;
    var resolve = function resolve(value) {
      clearTimeout(timer);
      resolvePromise(value);
    };
    var reject = function reject(value) {
      clearTimeout(timer);
      rejectPromise(value);
    };

    var data = config.data;
    var headers = config.headers;

    if (data && !utils.isStream(data)) {
      if (utils.isArrayBuffer(data)) {
        // Nothing to do...
      } else if (utils.isString(data)) {
        // Nothint to do...
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    var req = stream.fetch({
        url: config.url,
        body: data,
        method: config.method.toUpperCase(),
        headers: headers,
        dataType: config.dataType,
        type: config.responseType
      },
      function success(res) {
        resolve({
          status: res.status,
          statusMessage: res.statusText,
          data: res.data,
          headers: res.headers,
          config: config,
          request: req
        });
      }
    );
  });
};