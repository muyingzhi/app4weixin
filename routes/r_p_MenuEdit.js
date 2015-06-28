var express = require('express');
var wechat = require('wechat');
var router = express.Router();
var fs = require('fs');
var config = require('../app_config');
/* GET users listing. */
router.get('/', function(req, res) {
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(){
		var menu = {};
		if(arguments[1] && arguments[1].menu){
			menu = arguments[1].menu;
			menu.title = "微信菜单";
		}else{
			menu.title = "取菜单失败";
		}
		;
		if(!menu.button){menu.button = [];}
		for(var i=0;i<3;i++){
			if(!menu.button[i]){
				menu.button[i] = {};//----不够三个的补充
			}
			var button = menu.button[i];
			if(!button.sub_button){
				button.sub_button=[]
			}

			for(var j=0;j<5;j++){
				if(!button.sub_button[j]){
					button.sub_button[j] = []
				}
			}
		}
		res.render('wechatMenuPage',menu);
	});
});

module.exports = router;
