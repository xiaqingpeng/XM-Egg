"use strict";

const Controller = require("egg").Controller;
class ProductController extends Controller {
  //增加商品
  async insert_product() {
    const { ctx, service } = this;
    let row=ctx.request.body
    let list = await service.app.productList.insertProductList(row);
    ctx.body = list;
  }
  
  // 查找商品
  async find_product() {
    const { ctx, service } = this;
    let list = await service.app.productList.findProductList(ctx.query);
    ctx.body = list;
  }
  
  // 修改商品信息
  async update_product() {
    const { ctx, service } = this;
    let params= ctx.request.body
    let list = await service.app.productList.updateProductList(params);
    ctx.body=list
  }
  // 删除商品 销户
  async delete_product() {
    const { ctx, service } = this;
    let {product_id} = ctx.params
    let list = await service.app.productList.deleteProductList(parseInt(product_id));
    ctx.body=list
  }
}

module.exports = ProductController;
