
var token = "muyzhealth";
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
views = path.join(__dirname, './');//----设置views的目录，render函数指定的页面相对／health的路径
app.set('views', views);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
//----js文件目录,在html中引用js文件采用这里定义的相对路径
app.use("/scripts",express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/common')));
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
app.use('/verfiy',wechat(token,function(req,res,next){
    if (req.method == "GET"){
        console.log("------wechat GET echostr:"+req.query.echostr);
        res.send(req.query.echostr);
        return;
    } else{
        require("./routes/WeixinServer").recieve(req,res,next);
    }
})
);
//----通过oauth2认证，获取微信用户，带入用户编辑页面
app.use("/oauthUser", require("./routes/WeixinServer").registBywx);

//----登录页面
app.use("/login.html", function(req, res) {
    res.render("common/loginPage",{message:""});
});
//----登录处理
app.use("/dologin", require("./routes/userService").dologin);
//----用户注册页面
app.use("/registerUser",function(req, res){
    res.render("common/editUser");
});
//----保存用户
app.use("/saveUser",function(req, res){
    var user = req.body;
    require('./routes/userService').saveUser(user,function(result){
        res.send(result);
    });
})
//----主页面，无需登录可访问
app.use("/main", function(req,res){
    res.render("views/main");//----主页面
});
//----检查session，以下的router需要用户登录
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        res.locals.user = sess.user;
        next();
    } else{
        console.log(req.url);
        //----未登录的转向登录页面
        res.redirect("login.html");
    }
});
app.use("/logout", require("./routes/userService").logout);
//----显示微信菜单
app.use("/menuInfo", require("./routes/menu4wx").showMenu);
//----保存菜单到微信平台
app.use("/saveMenu4wx", require("./routes/menu4wx").saveMenu4wx);
//----未知的url
app.use(function(req, res) {
    res.send({
        "message": "未找到的url：" + req.path
    });
})

function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
        return res.redirect('login.html');
    }
    next();
}
function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登陆';
        return res.redirect('main');
    }
    next();
}

module.exports = app;
