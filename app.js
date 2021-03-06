var koa = require('koa');
var router = require('koa-route');
var app = koa();
var views = require('co-views');
var service = require('./service/webAppService.js');
var render = views('./view', {
  map: {html: 'ejs'}
});
var koa_static = require('koa-static-server');
app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/'
}));
app.use(router.get('/test', function*(){
  this.body = { msg: "HelloWorld" };
}));
app.use(router.get('/ejs_test', function*(){
  this.body = yield render('index', {title: 'title_index'}); 
}));
app.use(router.get('/ajax/search', function*(){
  this.set('Cache-Controller', 'no-cache');
  var qs = require('querystring');
  var param = qs.parse(this.req._parsedUrl.query);
  var start = param.start;
  var end = param.end;
  var keyword = param.keyword;
  this.body = yield service.get_search_data(start, end, keyword);
}));
app.listen(3000);
console.log('nodejs server is started');
