var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('../app_config');
router.all('/', function(req, res){
	var menu = {};
	var API = wechat.API;
	var OAuth= wechat.OAuth;
	var api = new API(config.appid, config.appsecret);
	var oauth = new OAuth(config.appid, config.appsecret);
	var txt = '';
	req.on('data',function(chunk){
		txt += chunk;
	})
	req.on('end',function(){
		menu = JSON.parse(txt);
		//---菜单中view，url（eventKey）需要转换为author2需要的url
		for(var i=0;i<menu.button.length;i++){
			if(menu.button[i].sub_button){
				for(var j=0;j<menu.button[i].sub_button.length;j++){
					var url = menu.button[i].sub_button[j].url;
					if(url){
						url = oauth.getAuthorizeURL(url,"hjk","snsapi_userinfo");
						menu.button[i].sub_button[j].url = url;
					}
				}
			}
		}
		
		//---
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