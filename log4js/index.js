const log4js = require('koa-log4');
log4js.configure("./config/log4jsConfig.json");
const logInfo = log4js.getLogger('logInfo');

module.exports = logInfo;