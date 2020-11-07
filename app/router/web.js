'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.post('/insert_user', controller.web.user.insert_user);
  router.get('/find_user', controller.web.user.find_user);
  router.put('/update_user', controller.web.user.update_user);
  router.delete('/delete_user/:user_id', controller.web.user.delete_user);
  router.post('/login', controller.web.user.login);
};
