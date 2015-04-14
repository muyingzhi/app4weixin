var express = require('express');
var ejs = require('ejs');
var path = require("path");
var http = require('http');
var bodyParser = require("body-parser");
var session = require('cookie-session');
var wechat = require('wechat');
var app = express();

//-------------views engine for HTML
var views = [];
views = path.join(__dirname, 'mutton');
//----设置views的目录，能够不区分子目录的引用html文件,而且可以直接被访问到
app.set('views', views);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
//----js文件目录
app.use(express.static(path.join(__dirname, '/mutton/login')));
app.use(express.static(path.join(__dirname, '/mutton/menu')));
app.use(express.static(path.join(__dirname, '/mutton/train')));
app.use("/scripts",express.static(path.join(__dirname, '/mutton/scripts')));
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
//app.get( '/verfiy', require("./mutton/routes/verfiy4weixin").weixinVerfiy);
app.use('/verfiy',wechat("shoppingManager",function(req,res,next){
    if (req.method == "GET"){
        console.log("------wechat GET echostr:"+req.query.echostr);
        res.send(req.query.echostr);
        return;
    } else{
        var server = require("./mutton/routes/WeixinServer");
        server.recieve(req,res,next);
    }
})
);
    //require("./mutton/routes/verfiy4weixin").weixinServer);
app.use("/userRegist", require("./mutton/routes/WeixinServer").registBywx);

//----------------后台管理登录页面
app.use("/login.html", function(req, res) {
    res.render("login/loginPage",{message:""});
});
app.use("/registerUser",function(req, res){
    res.render("login/editUser");
});
app.use("/saveUser",function(req, res){
    var user = req.body;
    console.log(req);
    require('./database/usersManager').saveUser(user,function(result){
        res.send(result);
    });
})
app.use("/dologin", require("./mutton/routes/doLogin").dologin);

app.use("/main", function(req,res){
    res.render("train/main");//----主页面
});
app.use("/train", function(req,res){
    res.render("train/train");//----培训中心页面
});
app.use("/employee_manual", function(req,res){
    res.render("train/employee_manual");//----培训－员工手册页面
});

app.use("/production_management", require('./mutton/routes/pm').pmShow);

app.use("/contact", function(req,res){
    res.render("train/contact");//----通讯录
});
app.use("/signin", function(req,res){
    res.render("train/signin");//----主页面
});
// --------检查session，以下的router需要用户登录
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        res.locals.user = sess.user;
        next();
    } else{
        console.log(req.url);
        //----未登录的转向登录页面
        res.redirect("/mutton/login.html");
    }
});
app.use("/logout", require("./mutton/routes/doLogin").logout);
app.use("/menuInfo", require("./mutton/routes/menu4wx").showMenu);

app.use("/saveMenu4wx", require("./mutton/routes/menu4wx").saveMenu4wx);
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
