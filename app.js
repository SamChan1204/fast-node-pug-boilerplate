'use strict';

const http = require('http');
const path = require('path');
const koa = require('koa');
const middlewares = require('koa-middlewares');
const logRecord = require('koa-logs-full');
const easyLogger = require('./middlewares/easy_logger');
const koaBody = require('koa-better-body');
const koaValidate = require('koa-validate');
const koaRouter = require("koa-router");
const router = koaRouter();
const convert = require('koa-convert');

let app = new koa();

/**
 * response time header
 */
app.use(convert(middlewares.rt()));

/**
 * response compress
 */
app.use(convert(middlewares.compress({
  threshold: 2048,
  flush: require('zlib')
    .Z_SYNC_FLUSH
})));

/**
 * static file server
 */
app.use(convert(middlewares.staticCache(path.join(__dirname, 'public/dist'))));

koaValidate(app);

/**
 * koa body parser, support file body
 */
app.use(convert(koaBody({
  patchKoa: true,
  jsonLimit: '20mb',
  formLimit: '20mb',
  multipart: true,
  extendTypes: {
    // will parse application/x-javascript type body as a JSON string
    json: ['application/x-javascript'],
    multipart: ['multipart/mixed']
  },
  formidable: {
    uploadDir: path.join(__dirname, 'uploads')
  }
})));

/**
 * 日志记录中间件，可以将统一请求的日志集中到一起
 * 日志可以有 log, info, warn, error 四种类型
 * 暴露出一个全局的 koaLogger，用法：koaLogger.log('Hello logger');
 * 在请求中可以调用 ctx.koaLogger 来记录该请求中的日志
 */
app.use(convert(logRecord(app, {
  logdir: path.join(__dirname, 'logs'),
  exportGlobalLogger: true
})));
app.use(easyLogger.middleware);
easyLogger.easyLogger();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const status = (e && e.status) ? e.status : 500;
    const message = (e && e.message) ? e.message : 'Server error';
    ctx.koaLogger.error(status);
    ctx.koaLogger.error(message);
    ctx.status = status;
    ctx.body = {
      status,
      msg: message
    };
    return;
  }
});

/**
 * routes
 */
require('./routes')(router);
app.use(router.routes());
app.use(router.allowedMethods());

app = module.exports = http.createServer(app.callback());

const koaLogger = global.koaLogger;
if (!module.parent) {
  const port = process.argv[2] || require('config')
    .get('defaultPort');
  app.listen(port);
  koaLogger.warn(`$ Server is listening on port:${port}`);
}

process.on('exit', (code) => {
  koaLogger.warn(`$ About to exit with code:${code}`);
});