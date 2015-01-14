var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = require('../app_config');
router.get('/', function(req, res){
 		var OAuth = wechat.OAuth;
 		var oauth = new OAuth(config.appid, config.appsecret);
 		var code = req.query.code;
 		oauth.getAccessToken(code,function(err, token){
 			var openid = token.data.openid;
 			oauth.getUser(openid, function(err, data){
 				//----返回用户信息
 				res.render("userRegiste", data);
 			});
 		});
});

module.exports = router;
