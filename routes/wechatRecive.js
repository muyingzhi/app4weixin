var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
var fs = require('fs');
var config = {
  appid: 'wxc9135aade4e81d57',
  appsecret: '0461795e98b8ffde5a212b5098f1b9b6'
};
router.get('/', function(req, res) {
	
	
	if(req.method=='GET'){
		//--------接受微信平台的验证
		res.send(req.query.echostr);
	}else{
		var wxp = {};
		//----------读取public_token.txt,当前的Access_token
    	var data = fs.readFileSync('public_token.txt');
	    wxp = JSON.parse(data);
	    console.log("appid:"+wxp.appid);
		if(!wechat.checkSignature(req.query,wxp.token)){
			console.log("请求验证未通过，存在风险，请处理。。。。。。");
		}
		//--------接受微信平台的服务等
		wechat.getMessage(req,function(err,jsonMsg){
			console.log("收到微信的请求消息类型："+jsonMsg.MsgType);
		})
  	}
});

module.exports = router;
