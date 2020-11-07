"use strict";
module.exports = (appInfo) => {
  let config = {};
  config.keys = appInfo.name + '_1597208262412_5457';

  // 配置mysql
  config.mysql = {
    // 单数据库信息配置
    clients: {
      db1:{
      // host
      host: "127.0.0.1",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "1994514Xia_",
      // 数据库名
      database: "xunmei",
    },
      db2:{
      // host
      host: "127.0.0.1",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "1994514Xia_",
      // 数据库名
      database: "life",
    },
  
  },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  //配置中间件
  config.middleware=['auth','verifyToken']

  // 配置 csrf 
  config.security= {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://127.0.0.1:7001']
  };
  // 配置 cors跨域
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // 配置jwt
  config.jwt = {  //jwt配置项
    secret: "123456"
  }
  return {
    ...config,
  };
};
