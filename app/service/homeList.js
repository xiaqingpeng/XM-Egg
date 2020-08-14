'use strict';

const Service = require('egg').Service;

class HomeList extends Service {
  async getIndexList() {
    const { ctx } = this;
    try {
      const result = await this.app.mysql.insert("class", {
        id:5,
        name:'五年级'
      });
    } catch (error) {
      ctx.body = error
    }
    
    const results = await this.app.mysql.select('class');
    return  results
  }
  async getDetailList() {
    const { ctx } = this;
    //const results = await this.app.mysql.select('student');
    let sql=`select*from student where salary>20000 order by salary desc `
    const results = await this.app.mysql.query(sql);
    return results
  }
}

module.exports = HomeList;
