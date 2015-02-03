var express = require('express');
var ejs = require('ejs');
var path = require("path");
var wechat = require('wechat');
var app = express();

app.set('views', path.join(__dirname, 'mutton'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,  '/public')));

app.use('/verfiy', 
    wechat("shoppingManager",function(req, res, next){
        if (req.method == "GET"){
            console.log("------wechat GET echostr:"+req.query.echostr);
            res.send(req.query.echostr);
            return;
        }
        var message = req.weixin;
        console.log("-------获取消息:");
        if( message.MsgType == "text"){
            res.reply("Hello world:" + message.FromUserName + "。这是文本消息")
        } else if( message.MsgType == "event"){
            if (message.Event="CLICK"){
                res.reply("CLICK:" + message.EventKey);
            } else if ( message.Event=="SCAN"){
                res.reply("您扫描二维码，EventKey" + message.EventKey);
            } else if(message.Event == "subscribe"){
                res.reply("感谢您的关注。");
            } else if(message.Event == "unsubscribe"){
                res.reply("取消关注");
            } else if(message.Event == "scancode_push"){
                res.reply("您扫描二维码:"+message.EventKey + ";"+message.Ticket);
            } else if ( message.Event=="VIEW"){
                //------跳转到对应的url,回应空
                res.send("");LOCATION
            } else if ( message.Event=="LOCATION"){
                //------跳转到对应的url,回应空
                res.send("");
            } else {
                res.reply("event:"+message.Event + ";"+message.EventKey);
            }
        } else {
            res.reply("未处理的类型："+message.MsgType);
        }
    })
);
app.use("/userInfo", require("./mutton/findUser"));
app.use("/menuInfo", require("./mutton/showMenu"));
app.use("/", function(req, res){
    res.send("index.html");
})
module.exports = app;