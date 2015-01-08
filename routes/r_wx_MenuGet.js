var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('../app_config');
router.get('/', function(req, res){
 		var API = wechat.API;
 		var api = new API(config.appid, config.appsecret);
 		api.getMenu(function(){
 			for(var i=0;i<arguments.length;i++){
 				console.log(arguments[i]);
 			}
 			res.setHeader("Content-type","text/json");
 			res.send(arguments[1]);
 		});
});

module.exports = router;
