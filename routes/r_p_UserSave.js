var express = require('express');
var app = express();
var config = require('../app_config');
var OAuth = require('wechat').OAuth;
app.use('/', function(req, res) {
	//----取用户信息
	//----是否已注册
	//----已注册的，根据身份证号组织url，重定向到url
	//----未注册的，
	var user = req.data;
	//----身份证号
	res.send("ehr?cardno="+user.nickname);
});

module.exports = app;
