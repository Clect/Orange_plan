const Koa = require('koa');
const path = require('path');
const api = require('./api')//api.js
const logInfo = require('./log4js');
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const app = new Koa();

// app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))
// __dirname = C:\Users\clect\Documents\clect\react_node
app.use(bodyParser());
app.use(serve(path.join(`${__dirname}/dist`)));
app.use(api());

app.listen(3000, () => {
  logInfo.info('Success');
});