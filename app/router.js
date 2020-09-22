'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.post('/insert_user', controller.user.insert_user);
  router.get('/find_user', controller.user.find_user);
  router.put('/update_user/:user_id', controller.user.update_user);
  router.delete('/delete_user/:user_id', controller.user.delete_user);
  router.post('/login', controller.user.login);

  
};
