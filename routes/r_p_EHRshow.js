var express = require('express');
var app = express();
var config = require('../app_config');
var wechat = require('wechat');
var OAuth = wechat.OAuth;
var API = wechat.API;
app.use('/', function(req, res) {
	//----取用户信息
	//----是否已注册
	//----已注册的，根据身份证号组织url，重定向到url
	//----未注册的，
	var code = req.query.code;
	var api = new API(config.appid, config.appsecret);
	var oauth = new OAuth(config.appid, config.appsecret);
    oauth.getAccessToken(code,function(err ,result ){
    	if (err){

    	} else {
    		var openid = result.data.openid;
    		oauth.getUser(openid, function(err, data){
    			if (data.nickname == "穆英智"){
	    			//----进行注册用户信息
	 				data.title = "用户注册";
	 				res.render("userRegiste", data);
	 			} else {
	 				data.title = "个人健康档案";
    				res.render("userRegiste", data);
	 			}

    		});
    	}

    });
});

module.exports = app;
