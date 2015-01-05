var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = {
  appid: 'wxc4e54add8c920608',
  appsecret: '84f56957e721158de4c742ddf9aa8ba7'
};
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
