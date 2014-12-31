var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var wechatRecive = require('./routes/wechatRecive');
var wechatSend =   require('./routes/wechatSend');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var appdir = "/EHRBrowser";
app.use(appdir + '/', routes);
app.use(appdir + '/users', users);
app.use(appdir + '/weixinVerfiy.do',wechatRecive);
app.use(appdir + '/send2weixin.do',wechatSend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// //-----------------------取accessToken
// var API = require('wechat').API;
// var fs = require('fs');
// var config = {
//   appid: 'wxc4e54add8c920608',
//   appsecret: '84f56957e721158de4c742ddf9aa8ba7'
// };
// var api = new API(config.appid, config.appsecret, function(callback){
//     fs.readFile('public_token.txt', 'utf8', function(err, txt){
//         if (err) {
//             return callback(err);
//         }
//         callback(null, JSON.parse(txt));
//     });
// }, function(token, callback){
//     fs.writeFile('public_token.txt', JSON.stringify(token), callback);
//     console.log('app token is save');
// });
// //--------第一执行,-向微信发送请求以获取access_token
// // api.getAccessToken(function(err,token){
// //  console.log("access_token: " + token.access_token);
// // });

// //--------每隔两小时执行一次
// var i=0;
// api.getAccessToken(function(err,token){
//         i++;
//         console.log("第"+i+"次access_token: " + token.accessToken);
//     });
// setInterval(function(){
//     api.getAccessToken(function(err,token){
//         i++;
//         console.log("第"+i+"次access_token: " + token.accessToken);
//     });
// },2*60*60*1000);
module.exports = app;
