var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('../app_config');
router.get('/', function(req, res){
 		var API = wechat.API;
 		var api = new API(config.appid, config.appsecret);
 		var id = req.query.id;

 		api.createTmpQRCode(id,1800,function(err,result){
 			res.setHeader("Content-type","text/json");
 			if(err){
 				res.send(JSON.stringify(err))
 			} else {
 				res.send(JSON.stringify(result))
 			}
 		});
});

module.exports = router;
