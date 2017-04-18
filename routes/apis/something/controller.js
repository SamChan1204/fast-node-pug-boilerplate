'use strict';

const requestHelper = require('../../../common/helpers/request');
const responseHelper = require('../../../common/helpers/response');

exports.somethingList = async (ctx, next) => {
  return responseHelper.success(ctx, '', {});
};