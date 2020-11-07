
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 分类接口
  router.post('/insert_category', controller.app.category.insert_category);
  router.get('/find_category', controller.app.category.find_category);
  router.put('/update_category', controller.app.category.update_category);
  router.delete('/delete_category/:category_id', controller.app.category.delete_category);
  

  // 商品接口
  router.post('/insert_product', controller.app.product.insert_product);
  router.get('/find_product', controller.app.product.find_product);
  router.put('/update_product', controller.app.product.update_product);
  router.delete('/delete_product/:product_id', controller.app.product.delete_product);
 
};
