'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/detail', controller.home.detail);

  router.post('/insert_user', controller.user.insert_user);
  router.get('/find_user', controller.user.find_user);
  router.put('/update_user/:use_id', controller.user.update_user);
  router.delete('/delete_user/:use_id', controller.user.delete_user);

  router.get('/login', controller.mine.login);
  router.get('/exit', controller.mine.exit);
  
};
