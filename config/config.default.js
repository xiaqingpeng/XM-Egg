"use strict";
module.exports = (appInfo) => {
  let config = {};
  config.keys = appInfo.name + '_1597208262412_5457';
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: "127.0.0.1",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "1994514Xia_",
      // 数据库名
      database: "test",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
  };
};
