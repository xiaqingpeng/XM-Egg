"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  //增加用户
  async insert_user() {
    const { ctx, service } = this;
    let row=ctx.request.body
    let list = await service.userList.insertUserList(row);
    ctx.body = list;
  }
  // 查找用户
  async find_user() {
    const { ctx, service } = this;
    let list = await service.userList.findUserList(ctx.query);
    ctx.body = list;
  }
  // 修改用户信息
  async update_user() {
    const { ctx, service } = this;
    let params= ctx.request.body
    let list = await service.userList.updateUserList(params);
    ctx.body=list
  }
  // 删除用户
  async delete_user() {
    const { ctx, service } = this;
    let {use_id} = ctx.request.body
    let list = await service.userList.deleteUserList(parseInt(use_id));
    ctx.body=list
   
   
  }
}

module.exports = UserController;
