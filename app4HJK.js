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
var config = require("./app_config.json");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,  '/public')));
//-----接收来自微信的消息
// app.use('/weixinVerfiy.do',function(req,res){
//     var wechat = require('node-wechat')(config.token);
//     //检验 token
//     if (req.method === 'GET') {
//       wechat.checkSignature(req, res);
//       return;
//     }
//     //预处理
//     wechat.handler(req, res);

//     //链式监听
//     wechat.text(function (data) {
//       // TODO
//     }).image(function (data) {
//       // TODO
//     }).location(function (data) {
//       // TODO
//     }).link(function (data) {
//       // TODO
//     }).event(function (data) {
//       // TODO
//     }).voice(function (data) {
//       // TODO
//     }).video(function (data) {
//       // TODO
//     }).all(function (data) {
//       var msg = {
//         FromUserName : data.ToUserName,
//         ToUserName : data.FromUserName,
//         //MsgType : "news",
//         Articles : [
//           {
//             Title: "习近平印尼国会演讲 向现场观众问好:阿巴嘎坝",
//             Description: "央广网雅加达10月3日消息 北京时间3日上午11时许，正在印度尼西亚进行国事访问的中国国家主席习近平，在印尼国会发表重要演讲，阐述如何进一步促进双边关系、中国与东盟关系发展的构想，以及中国和平发展的理念。",
//             PicUrl: "http://news.cnr.cn/special/xjp4/zb/zy/201310/W020131003454716456595.jpg",
//             Url: "http://news.cnr.cn/special/xjp4/zb/zy/201310/t20131003_513743132.shtml"
//           },
//           {
//             Title: "九寨沟：少数游客拦车翻栈道致交通瘫痪",
//             Description: "10月2日，九寨沟发生大规模游客滞留事件。因不满长时间候车，部分游客围堵景区接送车辆，导致上下山通道陷入瘫痪。大批游客被迫步行十几公里下山，包括80岁老人及9个月小孩。入夜后，游客围住售票处要求退票，并一度“攻陷”售票处。10月3日凌晨，九寨沟管理局、阿坝大九旅集团九寨沟旅游分公司发致歉书向游客致歉。",
//             PicUrl: "http://www.chinadaily.com.cn/dfpd/shehui/attachement/jpg/site1/20131003/a41f726719b213b7156402.jpg",
//             Url: "http://www.chinadaily.com.cn/dfpd/shehui/2013-10/03/content_17008311.htm"  
//           },
//           {
//             Title: "美政府关门第二天 官民高呼“伤不起”",
//             Description: "中新社华盛顿10月2日电 (记者 张蔚然)美国政府“关门”进入第二天，白宫与国会对峙僵局未破，美国继续在“喊话”模式中运转。越来越多的联邦部门和民众都在抱怨“伤不起”，调门越喊越高。",
//             PicUrl: "http://i1.hexunimg.cn/2013-10-03/158486762.jpg",
//             Url: "http://www.chinanews.com/gj/2013/10-03/5343908.shtml?f=baidu"
//           }
//         ]
//       }
//       wechat.send(msg);
//     });
// });
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
