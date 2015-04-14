var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, '/public')));
app.use("/public/javascripts/jquery.min.map", function(req, res){
    res.send("");
})
app.use('/', routes);
app.use('/users', users);
//-----HJK微信接口目录
app.use('/EHRBrowser',require('./app4HJK'));
//-----使用html 的路由
app.use('/html', require('./app4html'));
//----
app.use('/mutton', require('./app4mutton'));
//----
app.use('/health', require('./health/app4health'));

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
        res.send( err.message);
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("production error handler:----"+err.message);
    res.send(err.message);
});
module.exports = app;