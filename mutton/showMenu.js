var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('./config');
router.get('/', function(req, res){
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(data){
		console.log(data);
		var sender={};
		sender.data = {};
		if (data.code) {
			sender.data.title = "店铺管家的菜单(有异常：code="+data.code+")";
			sender.data.menu = [];
		}else{
			sender.data.title = "店铺管家的菜单";
			sender.data.menu = data.button;
		}
		res.render("menuShow", sender);
	});
});

module.exports = router;
