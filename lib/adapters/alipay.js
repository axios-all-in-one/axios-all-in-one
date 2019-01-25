'use strict';

var utils = require('./../utils');
var createError = require('../core/createError');
var settle = require('./../core/settle');

module.exports = function alipayAdapter(config) {
  return new Promise(function dispatchAlipayRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;

    if (data && !utils.isStream(data)) {
      if (utils.isString(data)) {
        // Nothint to do...
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, or a Stream',
          config
        ));
      }
    }

    var req = my.httpRequest({
      url: config.url,
      method: config.method.toUpperCase(),
      data: data,
      header: headers,
      dataType: config.responseType,
      timeout: config.timeout,
      success: function success(res) {
        resolve({
          status: res.statusCode,
          statusMessage: 'ok',
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
