const Koa = require('koa');
const path = require('path');
const api = require('./api')//api.js
const logInfo = require('./log4js');
const bodyParser = require('koa-bodyparser');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const serve = require('koa-static');
var AV = require('leanengine');

const app = new Koa();

// app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))
// __dirname = C:\Users\clect\Documents\clect\react_node
app.use(bodyParser());
app.use(serve(path.join(`${__dirname}/dist`)));
// 设置默认超时时间
app.use(timeout('15s'));
// 加载云引擎中间件
app.use(AV.express());
app.use(cookieParser());

app.use(api());

// app.listen(3000, () => {
//   logInfo.info('Success');
// });

app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    logInfo.error(err.stack || err);
  }
  if (req.timedout) {
    logInfo.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;
