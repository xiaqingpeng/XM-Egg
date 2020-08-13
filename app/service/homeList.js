'use strict';

const Service = require('egg').Service;

class HomeList extends Service {
  async getIndexList() {
    const { ctx } = this;
    return [{name:'首页'}];
  }
  async getDetailList() {
    const { ctx } = this;
    return [{name:'明细'}]
  }
}

module.exports = HomeList;
