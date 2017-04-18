'use strict';

const fs = require('fs');

exports.removeTempFile = (path, ctx) =>
  new Promise((resolve, reject) => fs.unlink(path, (err) => {
    if (err) {
      ctx.koaLogger.error(err);
      reject(err);
    } else {
      resolve();
    }
  }));

exports.isMobile = (agent) => {
  const string = agent.toLowerCase();
  return string.indexOf('iphone') >= 0 || string.indexOf('android') >= 0 || string.indexOf('windows phone') >= 0;
};