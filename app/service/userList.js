"use strict";

const Service = require("egg").Service;

class HomeList extends Service {
  async getIndexList(id) {
      console.log(id)
    const { ctx } = this;
    try {
      const result = await this.app.mysql.insert("user", {
        use_id: id,
        user_name:`用户${id}号`,
        age: id,
        telphone_number: `13872030683`,
        role: "校长1",
        origin: "广东省深圳市1",
      });
    } catch (error) {
      ctx.body = error;
    }

    const results = await this.app.mysql.select("user");
    return results;
  }
}

module.exports = HomeList;
