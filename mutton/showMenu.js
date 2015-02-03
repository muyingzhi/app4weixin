var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('./config');
router.get('/', function(req, res){
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(data){
		if (data.code==46003) {

		};
		//res.send(data);
		data.title = "店铺管家的菜单";
		res.render("menuShow", data);
	});
});

module.exports = router;
