'use strict';

const pug = require('pug');

exports.index = async (ctx, next) => {
  ctx.body = pug.renderFile('views/pages/index.pug', {
    pageTitle: '首页'
  });
};