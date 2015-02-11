/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/
var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('./config');
router.all('/', function(req, res){
	var menu = {};
	var API = wechat.API;
	var OAuth= wechat.OAuth;
	var api = new API(config.appid, config.appsecret);
	var oauth = new OAuth(config.appid, config.appsecret);
	var txt = '';
	console.log("save menu ......");
	req.on('data',function(chunk){
		txt += chunk;//--接收数据
	})
	req.on('end',function(){//--数据接收完毕
		if(!txt){
			res.send("no data");
			return;
		}
		menu = JSON.parse(txt);
		//---菜单中view，url（eventKey）需要转换为author2需要的url
		for(var i=0;i<menu.button.length;i++){
			if(menu.button[i].sub_button){
				for(var j=0;j<menu.button[i].sub_button.length;j++){
					var url = menu.button[i].sub_button[j].url;
					if(url){
						url = oauth.getAuthorizeURL(url,"shopping","snsapi_userinfo");
						menu.button[i].sub_button[j].url = url;
					}
				}
			}
		}
		console.log("向微信提交菜单");
		//---向微信提交菜单
		api.createMenu(menu,function(err, result){
			if(err){
				if(!result){resunt = {errmsg:"严重错误",errcode:"00"};}
				res.send("微信消息："+result.errmsg+result.errcode);
			}else{
				res.send("更新菜单完成");
			}
		});
	});
});

module.exports = router;