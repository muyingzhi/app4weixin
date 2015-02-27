var express = require('express');
var ejs = require('ejs');
var path = require("path");
var http = require('http');
var bodyParser = require("body-parser");
var session = require('cookie-session');
var app = express();
//-------------views engine for HTML
var views = [];
views = path.join(__dirname, 'mutton');
//----设置views的目录，能够不区分子目录的引用html文件,而且可以直接被访问到
app.set('views', views);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
//----js文件目录
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/mutton/login')));
app.use(express.static(path.join(__dirname, '/mutton/menu')));

//----设置session
app.use(session({
    name: 'Msessionid',
    keys: ['key1','key2'],
    secret: 'key secret',
    maxAge: 900000
}));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
//---------不需要登录的route
app.get( '/verfiy', require("./mutton/routes/verfiy4weixin").weixinVerfiy);
app.post('/verfiy', require("./mutton/routes/verfiy4weixin").weixinServer);

//-----登录页面
app.use("/login.html", function(req, res) {
    res.render("login/loginPage", function(err, html){
        if(err){
            console.log("LOGIN PAGE is error:"+err);
        }
        console.log("redirect to Login.html");
        res.send(html);
    });
});
app.use("/dologin", require("./mutton/routes/doLogin").dologin);
app.use("/javascripts/jquery.min.map", function(req, res){
    res.send("");
})
// 检查session，以下的router需要用户登录
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        res.locals.user = sess.user;
        next();
    } else{
        res.redirect("login.html");
    }
});
app.use("/logout", require("./mutton/routes/doLogin").logout);
app.use("/menuInfo", require("./mutton/routes/menu4wx").showMenu);
app.use("/saveMenu4wx", require("./mutton/routes/menu4wx").saveMenu4wx);
app.use("/userInfo", require("./mutton/findUser"));
app.use(function(req, res) {
    res.send({
        "message": "未找到的url：" + req.path
    });
})

function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
        return res.redirect('/login');
    }
    next();
}

function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登陆';
        return res.redirect('/');
    }
    next();
}

module.exports = app;