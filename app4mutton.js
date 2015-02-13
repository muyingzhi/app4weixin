var express = require('express');
var ejs = require('ejs');
var path = require("path");
var body = require("body-parser")
var http = require('http');
// SessionStore = require("session-mongoose")(express);
// var store = new SessionStore({
//     url: "mongodb://localhost/session",
//     interval: 120000
// });
var session = require('express-session');
var app = express();

// app.use(express.favicon());
//app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser());
// app.use(express.cookieSession({
//     secret: 'fens.me'
// }));
// app.use(express.session({
//     secret: 'fens.me',
//     store: store,
//     cookie: {
//         maxAge: 900000
//     }
// }));

//-------------views engine for HTML
app.set('views', path.join(__dirname, 'mutton/html'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.use('/verfiy', require("./mutton/routes/verfiy4weixin"));
// app.use(session({
//     genid: function(req) {
//         return genuuid() // use UUIDs for session IDs 
//       },
//     secret: 'keyboard cat'
// }));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}));
app.use(function(req, res) {
    var sess = req.session;
    if (sess.views) {
        sess.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        sess.views = 1
        res.end('welcome to the session demo. refresh!')
    }
});

app.use(function(req, res, next) {
    var sess = req.session;
    console.log(sess);
    if (sess && sess.user) {
        res.locals.user = sess.user;
    }
    //res.locals.user = req.session.user;
    // var err = req.session.error;
    // //delete req.session.error;
    // res.locals.message = '';
    // if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    next();
});
app.use("/login.html", function(req, res) {
    res.render("login");
});
//-----登录url
app.use("/dologin", require("./mutton/routes/doLogin"));
app.use("/userInfo", require("./mutton/findUser"));
app.use("/menuInfo", require("./mutton/showMenu"));
app.use("/saveMenu4wx", require("./mutton/saveMenu4wx"));
app.use("/", function(req, res) {
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