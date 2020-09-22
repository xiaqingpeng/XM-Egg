module.exports = (option, app) => {
  return async (ctx, next) => {
    //1. 获取 header 头token
    const { authorization } = ctx.header;
    const { method } = ctx;
    let decode = {};
    if (method !== "get") {
      await next();
    } else if (method === "get" && !authorization) {
      ctx.body = {
        code: 401,
        message: "未登录，请先登录",
      };
    } else {
      try {
        // 验证当前token
        decode = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        if (!decode || !decode.user_id) {
          ctx.body = {
            code: 401,
            message: "没有权限,请登录",
          };
        }
        if (Date.now(-decode.exp > 0)) {
          ctx.body = {
            code: 401,
            message: "token已经过期",
          };
        }
        let user = await ctx.service.userList.register(decode.user_id);
        if (
          user.user_id === decode.user_id &&
          user.telphone === decode.telphone
        ) {
          await next();
        } else {
          ctx.body = {
            code: 401,
            message: "用户信息验证失败",
          };
        }
      } catch (error) {
        ctx.body = {
          code: 401,
          message: "没有权限，请登录",
        };
      }
    }
  };
};
