"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    const { ctx ,service} = this;
    
    console.log(ctx.query)
    
    let id=parseInt(ctx.query.id)
    let list = await service.userList.getIndexList(id);
    ctx.body =list;
  }
 
}

module.exports = UserController;
