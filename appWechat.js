var express = require("express");
var path = require("path");
var wechat =   require('wechat');
var setWechatMenu = require('./routes/r_wx_MenuSet');
var getWechatMenu = require('./routes/r_wx_MenuGet');
var pageWechatMenu = require('./routes/r_p_MenuEdit');

var wechatQrcodeGet = require('./routes/r_wx_QrcodeGet');
var pageHmsShow = require('./routes/r_p_HmsShow');

var HMS = require('./hms4wechat');
var hms = new HMS();
var app = express();
var appdir ='';//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,  '/public')));
//-----接收来自微信的消息
app.use('/weixinVerfiy.do',wechat("haojiankang",function(req, res, next){
    if (req.method == "GET"){
        console.log("------wechat GET echostr:"+req.query.echostr);
        res.send(req.query.echostr);
        return;
    }
    var message = req.weixin;
    console.log("-------获取消息:")
    for(var p in message){
        console.log(p + ":" + message[p]);
    }
    if( message.MsgType == "text"){
        res.reply("Hello world:" + message.FromUserName + "。这是文本消息")
    } else if( message.MsgType == "event"){
        if (message.Event == "CLICK"){
            if (message.EventKey=="yy_getEcg"){
                //-----回复体检报告图片
                res.reply(hms.showCheckPage());
            }else if (message.EventKey=="yy_getEHR"){
                //----认证授权
                var user = require('./routes/WxUser');
                var isAuthorize = user.authorize(message.FromUserName);
                if(isAuthorize){
                    //-----跳转到页面
                }else{
                    //-------
                }
                res.send("");
            }else {
                res.reply("CLICK:" + message.EventKey);
            }
        } else if(message.Event == "subscribe"){
            console.log("用户关注:"+message.FromUserName);
            res.reply("感谢您的关注");
        } else if(message.Event == "unsubscribe"){
            console.log("用户取消关注:"+message.FromUserName);
            res.reply("欢迎加入我们！<br>使用说明：......");
        } else if(message.Event == "scancode_push"){
            console.log("用户扫描二维码:"+message.EventKey);
            if (message.EventKey=="yy_getEcg"){
                //-----回复体检报告图片
                console.log("-------scancode_push:yy_getEcg回复体检报告图片")
                res.reply(hms.showCheckPage());
            }else{
                res.reply("您扫描二维码:"+message.EventKey + ";"+message.Ticket);
            }
        } else if ( message.Event=="SCAN" && message.EventKey == "1000"){
            //-----回复体检报告图片
            console.log("-------SCAN:1000回复体检报告图片")
            res.reply(hms.showCheckPage());
        } else if ( message.Event=="VIEW"){
            //------跳转到对应的url
            res.send("");
        } else {
            res.reply("event:"+message.Event + ";"+message.EventKey);
        }
    } else {
        res.reply("未处理的类型："+message.MsgType);
    }
        
}));
//-----------设置微信菜单，post提交
app.use(appdir + "/setWechatMenu", setWechatMenu);
app.use(appdir + "/getWechatMenu", getWechatMenu);
app.use(appdir + "/pageWechatMenu", pageWechatMenu);
//-------取二维码，参数?id=1000
app.use(appdir + "/getWechatQrcode", wechatQrcodeGet);
app.use(appdir + "/pageHmsShow", pageHmsShow);
//----健康档案页面
var getEHR = require("./routes/r_p_EHRshow");
app.use(appdir + "/getEHR" , getEHR);
var getOAuthUser = require("./routes/r_wx_oauth2");
app.use(appdir + "/oauth2" , getOAuthUser);
var saveUser = require("./routes/r_p_UserSave");
app.use(appdir + "/saveUser", saveUser);
module.exports = app;
