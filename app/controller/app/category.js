"use strict";

const Controller = require("egg").Controller;
class CategoryController extends Controller {
  //增加列表
  async insert_category() {
    const { ctx, service } = this;
    let row=ctx.request.body
    let list = await service.app.categoryList.insertCategoryList(row);
    ctx.body = list;
  }
  
  // 查找列表
  async find_category() {
    const { ctx, service } = this;
    let list = await service.app.categoryList.findCategoryList(ctx.query);
    ctx.body = list;
  }
  
  // 修改列表信息
  async update_category() {
    const { ctx, service } = this;
    let params= ctx.request.body
    let list = await service.app.categoryList.updateCategoryList(params);
    ctx.body=list
  }
  // 删除列表 销户
  async delete_category() {
    const { ctx, service } = this;
    let {category_id} = ctx.params
    let list = await service.app.categoryList.deleteCategoryList(parseInt(category_id));
    ctx.body=list
  }
}

module.exports = CategoryController;
