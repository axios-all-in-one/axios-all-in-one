'use strict';

var utils = require('./../utils');
var createError = require('../core/createError');
var settle = require('./../core/settle');
var fetch = require('@system.fetch')

module.exports = function quickAppAdapter(config) {
  return new Promise(function dispatchQuickAppRequest(resolvePromise, rejectPromise) {
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

    var req = fetch.fetch({
      url: config.url,
      data: data,
      method: config.method.toUpperCase(),
      header: headers,
      dataType: config.dataType,
      responseType: config.responseType,
      success: function success(res) {
        resolve({
          status: res.statusCode,
          statusMessage: res.errMsg,
          data: res.data,
          headers: res.header,
          config: config,
          request: req
        });
      },
      fail: function fail(err) {
        reject(createError(err.errMsg, config, err.statusCode, req));
        req = null;
      }
    });
  });
};
