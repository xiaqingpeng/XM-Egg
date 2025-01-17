"use strict";

const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");

class HomeList extends Service {
  //新增用户
  async insertUserList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db1");
    console.log(row);
    try {
      let results = await client1.insert("user", row);

      if (results.affectedRows) {
        let data = await client1.select("user");
        //查询总数
        let total = await client1.query(`select count(*) as total from user`);
        return { data, total: total[0].total };
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
  // 鱼护注册
  async register(row) {
    const { app } = this;
    const client1 = app.mysql.get("db1");
    let data;
    try {
      data = await client1.get("user", { telphone: row.telphone });
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
    if (data === null) {
      try {
        let insert = await client1.insert("user", row);
        if (insert.affectedRows) {
          return {
            message: "注册成功",
            code: 200,
          };
        }
      } catch (error) {}
    } else if (data.user_id) {
      return {
        message: "已经注册",
        code: 201,
      };
    } else {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //用户登录
  async loginList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db1");
    try {
      console.log(row);

      let _row =
        row.user_name.length === 11
          ? {
              telphone: row.user_name,
            }
          : {
              user_name: row.user_name,
            };
      console.log(_row);
      let results = await client1.get("user", _row);

      if (
        (row.user_name === results.user_name ||
          row.user_name === results.telphone) &&
        row.password === results.password
      ) {
        const token = app.jwt.sign(
          {
            user: results, //需要存储的 token 数据
          },
          app.config.jwt.secret
        );
        return {
          ...results,
          token,
          code: 200,
        };
      } else {
        return {
          code: 10001,
          message: "账号或者密码错误",
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
    const client1 = app.mysql.get("db1");
    // let uuid = await uuidv4();
    // console.log(uuid);
    const { limit, offset, user_id } = params;

    try {
      //查询总数
      let total = await client1.query(`select count(*) as total from user`);
      if (limit) {
        const data = await client1.select("user", {
          limit: Number(limit), // 返回数据量
          offset: Number(offset) * Number(limit),
          orders: [["user_id", "asc"]],
        });

        console.log(total);
        return { data, total: total[0].total };
      } else if (user_id) {
        const data = await client1.get("user", {
          user_id: Number(user_id),
        });
        return { data, total: total[0].total };
      } else {
        const data = await client1.select("user");
        return { data, total: total[0].total };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //修改用户信息
  async updateUserList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db1");
    const options = {
      where: {
        user_id: row.user_id,
      },
    };
    try {
      const results = await client1.update("user", row, options);
      if (results.affectedRows) {
        let data = await client1.select("user");
        //查询总数
        let total = await client1.query(`select count(*) as total from user`);
        return { data, total: total[0].total };
      } else {
        return {
          code: 10001,
          message: "不能重复操作",
        };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误11",
      };
    }
  }
  //删除用户
  async deleteUserList(user_id) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db1");
    try {
      let results = await client1.delete("user", { user_id: user_id });
      if (results.affectedRows) {
        let data = await client1.select("user");
        //查询总数
        let total = await client1.query(`select count(*) as total from user`);
        return { data, total: total[0].total };
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
