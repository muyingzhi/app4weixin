var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
var fs = require('fs');
var appConfig = {
  appid: '',
  appsecret: '',
  access_token: ''
};
router.get('/', function(req, res) {
	fs.readFile('public_token.txt',function(err,data){
		//----------读取public_token.txt,当前的Access_token
	    if(err) throw err;
	    appConfig = JSON.parse(data);
	    console.log("appid:"+appConfig.appid);
		
  	})
});

module.exports = router;
