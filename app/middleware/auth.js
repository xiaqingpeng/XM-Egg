module.exports = (option, app) => {
  return async (ctx, next) => {
    // console.log(ctx);
    ctx.state.csrf = ctx.csrf;
    await next();
  };
};
