"use strict";

module.exports = (option, app) => {
  return async function (ctx, next) {
    const startTime = process.hrtime(); // 获取高精度时间
    let logStatus = 1; //正常
    let logError = "";
    try {
      await next();
    } catch (err) {
      logStatus = 0; //错误
      logError = `${err.message}${err.errors ? ":" + JSON.stringify(err.errors) : ""}`;
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit("error", err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const msg = status === 500 && app.config.env === "prod" ? "内部服务器错误" : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
        msg
      };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      // ctx.status = 200
      ctx.status = status;
    }
    if (ctx.request.method === "GET") {
      return;
    }
    const { getIP, calcResponseTime } = ctx.helper;
    const { method, url, header, body, query } = ctx.request;
    let payload = {
      method,
      url,
      status: logStatus,
      error: logError,
      ip: getIP(ctx.request),
      params: (body && JSON.stringify(body)) || query || "",
      userAgent: header["user-agent"],
      time: calcResponseTime(startTime)
    };
    if (url.includes("login") || url.includes("Login") || url.includes("token")) {
      payload.type = "login";
      payload.username = body.username;
    } else if (url.includes("upload")) {
      payload.type = "action";
    } else {
      const _id = ctx.state.user.data._id;
      const user = await ctx.service.user.find(_id);
      payload.username = user.username;
      payload.type = "action";
    }
    ctx.service.log.create(payload);
  };
};
