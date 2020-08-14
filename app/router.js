'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/detail', controller.home.detail);

  router.get('/user', controller.user.index);

  router.get('/login', controller.mine.login);
  router.get('/exit', controller.mine.exit);
  
};
