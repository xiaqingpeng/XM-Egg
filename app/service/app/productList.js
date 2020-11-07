"use strict";

const Service = require("egg").Service;
const { v4: uuidv4 } = require("uuid");

class ProductList extends Service {
  //新增商品
  async insertProductList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    console.log(row)
    try {
      let results = await client1.insert("life_product", row);
      if (results.affectedRows) {
        let data = await client1.select("life_product");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_product`);
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
 
  //查找商品
  async findProductList(params) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    // let uuid = await uuidv4();
    // console.log(uuid);
    const { limit, offset, category_id ,product_id} = params;
    try {
      //查询总数
      let total = await client1.query(`select count(*) as total from life_product`);
      if (limit) {
        const data = await client1.select("life_product", {
          limit: Number(limit), // 返回数据量
          offset: Number(offset) * Number(limit),
          orders: [["product_id", "asc"]],
        });

        console.log(total);
        return { data, total: total[0].total };
      } else if(product_id){
        const data = await client1.select("life_product", {
            where:{
                product_id: Number(product_id),
            },
        });
        console.log(data);
        return { data, total: total[0].total };
      }
      
      else if (category_id) {
        const data = await client1.select("life_product", {
            where:{
                category_id: Number(category_id),
               
            },
            columns: ['category_id','product_id','product_name','market_price','current_price',"product_image"],
        });
        return { data, total: total[0].total };
      } else {
        const data = await client1.select("life_product");
        return { data, total: total[0].total };
      }
    } catch (error) {
      return {
        code: 10000,
        message: "操作错误",
      };
    }
  }
  //修改商品信息
  async updateProductList(row) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    const options = {
      where: {
        product_id: row.product_id,
      },
    };
    try {
      const results = await client1.update("life_product", row, options);
      if (results.affectedRows) {
        let data = await client1.select("life_product");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_product`);
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
  //删除商品
  async deleteProductList(product_id) {
    const { ctx, app } = this;
    const client1 = app.mysql.get("db2");
    try {
      let results = await client1.delete("life_product", { product_id: product_id });
      if (results.affectedRows) {
        let data = await client1.select("life_product");
        //查询总数
        let total = await client1.query(`select count(*) as total from life_product`);
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

module.exports = ProductList;
