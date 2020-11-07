"use strict";

const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");

class CategoryList extends Service {
  //新增列表
  async insertCategoryList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    
    try {
      let results = await client1.insert("life_category", row);
      if (results.affectedRows) {
        let data = await client1.select("life_category");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_category`);
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
 
  //查找列表
  async findCategoryList(params) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    // let uuid = await uuidv4();
    // console.log(uuid);
    const { limit, offset, category_id } = params;

    try {
      //查询总数
      let total = await client1.query(`select count(*) as total from life_category`);
      if (limit) {
        const data = await client1.select("life_category", {
          limit: Number(limit), // 返回数据量
          offset: Number(offset) * Number(limit),
          orders: [["category_id", "asc"]],
        });

        console.log(total);
        return { data, total: total[0].total };
      } else if (category_id) {
        const data = await client1.get("life_category", {
          category_id: Number(category_id),
        });
        return { data, total: total[0].total };
      } else {
        const data = await client1.select("life_category");
        return { data, total: total[0].total };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //修改列表信息
  async updateCategoryList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    const options = {
      where: {
        category_id: row.category_id,
      },
    };
    try {
      const results = await client1.update("life_category", row, options);
      if (results.affectedRows) {
        let data = await client1.select("life_category");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_category`);
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
  //删除列表
  async deleteCategoryList(category_id) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    try {
      let results = await client1.delete("life_category", { category_id: category_id });
      if (results.affectedRows) {
        let data = await client1.select("life_category");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_category`);
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

module.exports = CategoryList;
