"use strict";

const Service = require("egg").Service;

class HomeList extends Service {
  //新增用户
  async insertUserList(row) {
    const { ctx, app } = this;
    try {
      let results = await app.mysql.insert("user", row);
      if (results.affectedRows) {
        let data = await app.mysql.select("user");
        return data;
      } else {
        return {
          code: 10001,
          message: "不能重复操作",
        };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //查找用户
  async findUserList(params) {
    const { ctx, app } = this;
    const {limit,offset,use_id}=params
    console.log(params)
    if(limit){
      const results = await app.mysql.select("user", {
        limit: Number(limit), // 返回数据量
        offset: Number(offset),
        orders: [['age','desc']],
      });
      return results;
    } else if(use_id){
      const results = await app.mysql.get("user", {
        use_id:Number(use_id)
      })
      return results;
    }else{
      const results = await app.mysql.select("user");
      return results;
    }
   
  }
  //修改用户信息
  async updateUserList(row) {
    const { ctx, app } = this;
    const options = {
      where: {
        use_id: row.use_id,
      },
    };
    try {
      const results = await app.mysql.update("user", row, options);
      if (results.affectedRows) {
        let data = await app.mysql.select("user");
        return data;
      } else {
        return {
          code: 10001,
          message: "不能重复操作",
        };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //删除用户
  async deleteUserList(use_id) {
    const { ctx, app } = this;
    try {
      let results = await app.mysql.delete("user", { use_id: use_id });
      if (results.affectedRows) {
        let data = await app.mysql.select("user");
        return data;
      } else {
        return {
          code: 10001,
          message: "不能重复操作",
        };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
}

module.exports = HomeList;
