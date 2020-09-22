"use strict";

const Controller = require("egg").Controller;
const md5=require('md5')
class UserController extends Controller {
  //增加用户
  async insert_user() {
    const { ctx, service } = this;
    let row=ctx.request.body
    let list = await service.userList.insertUserList(row);
    ctx.body = list;
  }
  // 用户注册
  async register() {
    const { ctx, service } = this;
    let row=ctx.request.body
    row.password=md5(row.password)
    let list = await service.userList.registerList(row);
    ctx.body = list;
  }
  // 查找用户
  async find_user() {
    const { ctx, service } = this;
    let list = await service.userList.findUserList(ctx.query);
    ctx.body = list;
  }
  //用户登录
  async login() {
    const { ctx, service } = this;
    let row=ctx.request.body
    let list = await service.userList.loginList(row);
    ctx.body = list;
  }
  // 修改用户信息
  async update_user() {
    const { ctx, service } = this;
    let params= ctx.request.body
    let list = await service.userList.updateUserList(params);
    ctx.body=list
  }
  // 删除用户 销户
  async delete_user() {
    const { ctx, service } = this;
    let {user_id} = ctx.params
    let list = await service.userList.deleteUserList(parseInt(user_id));
    ctx.body=list
  }
}

module.exports = UserController;
