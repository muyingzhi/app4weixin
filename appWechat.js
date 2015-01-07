var express = require("express");
var path = require("path");
var wechat =   require('wechat');
var setWechatMenu = require('./routes/wechatMenuSet');
var getWechatMenu = require('./routes/wechatMenuGet');
var pageWechatMenu = require('./routes/wechatMenuPage');
var app = express();
var appdir ='';// "/EHRBrowser";
app.use(express.static(path.join(__dirname,  '/public')));

app.use('/weixinVerfiy.do',wechat("haojiankang",function(req, res, next){
    if (req.method == "GET"){
        res.send(req.query.echostr);
        return;
    }
    var message = req.weixin;
    for(var p in message){
        console.log(p + ":" + message[p]);
    }
    if( message.MsgType == "text"){
        res.reply("Hello world:" + message.FromUserName + "。这是文本消息")
    } else if( message.MsgType == "event"){
        if (message.Event == "CLICK"){
            if (message.EventKey=="yy_getEcg"){
                //-----回复体检报告图片
                res.reply([
                  {
                    title: '体检报告',
                    description: '体检日期：2015-01-02',
                    picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                    url: 'http://nodeapi.cloudfoundry.com/'
                  }
                ])
            }
            res.reply("CLICK:" + message.EventKey);
        } else if(message.Event == "subscribe"){
            console.log("用户关注:"+message.FromUserName);
            res.reply("感谢您的关注");
        } else if(message.Event == "unsubscribe"){
            console.log("用户取消关注:"+message.FromUserName);
            res.reply("欢迎加入我们！<br>使用说明：......");
        }
    } else {
        res.reply("未处理的类型："+message.MsgType);
    }
        
}));
app.use(appdir + "/setWechatMenu", setWechatMenu);
app.use(appdir + "/getWechatMenu", getWechatMenu);
app.use(appdir + "/pageWechatMenu", pageWechatMenu);

module.exports = app;
