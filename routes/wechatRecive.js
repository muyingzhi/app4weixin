var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = {
  appid: 'wxc9135aade4e81d57',
  appsecret: '0461795e98b8ffde5a212b5098f1b9b6'
};
router.get('/', 
 	wechat("haojiankang")
 	.text(function(message, req, res, next){
 		//var message = req.weixin;
 		//console.log("text message:" + JSON.stringfy(message));
 		res.reply("Hello world:" + message.FromUserName + "。这是文本消息")
 	}).middlewarify()
);

module.exports = router;
