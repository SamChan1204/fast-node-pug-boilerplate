'use strict';

exports.success = (ctx, msg, data) =>
  Object.assign(ctx, {
    status: 200,
    body: {
      status: 20000,
      msg: msg || 'success',
      data
    }
  });

exports.unAuthorized = (ctx, msg) =>
  Object.assign(ctx, {
    status: 200,
    body: {
      status: 40001,
      msg: msg || 'unAuthorized',
      data: null
    }
  });

exports.notFound = (ctx, msg) =>
  Object.assign(ctx, {
    status: 200,
    body: {
      status: 40004,
      msg: msg || 'resource not found',
      data: null
    }
  });

exports.invalidParams = (ctx, msg) =>
  Object.assign(ctx, {
    status: 200,
    body: {
      status: 40000,
      msg: msg || 'invalid params',
      data: null
    }
  });

exports.serverError = (ctx, msg) =>
  Object.assign(ctx, {
    status: 200,
    body: {
      status: 50000,
      msg: msg || 'server error',
      data: null
    }
  });

exports.response = (ctx, status, msg, data) =>
  Object.assign(ctx, {
    status,
    body: {
      status,
      msg,
      data
    }
  });