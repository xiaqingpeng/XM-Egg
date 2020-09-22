'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 配置mysql
  mysql:{
    enable: true,
    package: 'egg-mysql',
  },
  // 配置jwt 
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 配置跨域
  cors :{
    enable: true,
    package: 'egg-cors',
  },
};
