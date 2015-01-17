var express = require('express');
var app = express();
var config = require('../app_config');
var OAuth = require('wechat').OAuth;
var UserManager = require('./WxUser');
var userManager = new UserManager();
app.use('/', function(req, res, next) {
	//----取用户信息
	//----是否已注册
	//----已注册的，根据身份证号组织url，重定向到url
	//----未注册的，
	console.log("start save user");
	var user = req.body;
	user = userManager.save(user);
	res.json(user);
	
});

module.exports = app;
