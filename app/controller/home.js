"use strict";
const Controller = require("egg").Controller;
class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    let list = await service.homeList.getIndexList();
    ctx.body = list;
  }
  async detail() {
    const { ctx, service } = this;
    let list = await service.homeList.getDetailList();
    ctx.body = list;
  }
}

module.exports = HomeController;
