var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('../app_config');
router.all('/', function(req, res){
	var menu = {};
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);

	var txt = '';
	req.on('data',function(chunk){
		txt += chunk;
	})
	req.on('end',function(){
		menu = JSON.parse(txt);
		console.log(txt);
	
		api.createMenu(menu,function(){
			console.log("菜单创建完成:");
			for(var i=0;i<arguments.length;i++){
				console.log(arguments[i]);
			}
			if(arguments[1]){
				if(arguments[1].errcode){
					res.send("错误："+arguments[1].errmsg);
				}else{
					res.send("更新菜单完成");
				}
			}
		});
	});
});

module.exports = router;