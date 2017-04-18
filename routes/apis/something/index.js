'use strict';

const ctrl = require('./controller');

module.exports = (router) => {
  router.get('/apis/something', ctrl.somethingList);
};