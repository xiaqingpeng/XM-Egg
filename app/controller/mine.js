'use strict';

const Controller = require('egg').Controller;

class mineController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = '请登录';
  }
  async exit() {
    const { ctx } = this;
    ctx.body = '退出登录';
  }
}

module.exports = mineController;
