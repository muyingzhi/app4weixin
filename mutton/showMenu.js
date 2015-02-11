var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('./config');
router.get('/', function(req, res){
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(err, result){
		console.log(result);
		for(var i=0;i<arguments.length;i++){
 				console.log("-----"+arguments[i]);
 			}
		var sender={};
		sender.data = {};
		if (err) {
			sender.data.title = "店铺管家的菜单(有异常：code="+err.code+")";
			sender.data.menu = [];
		}else{
			sender.data.title = "店铺管家的菜单";
			sender.data.menu = result.menu.button;
		}
		res.render("menuShow", sender);
	});
});

module.exports = router;
