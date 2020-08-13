"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx ,service} = this;

    let list = await service.homeList.getIndexList();
    console.log(list,"11111111")
    ctx.body = list;
  }
  async detail() {
    const { ctx,service } = this;
    let list = await service.homeList.getDetailList();
    console.log(list,2222222222222)
    ctx.body = list;
  }
}

module.exports = HomeController;
