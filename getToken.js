var wechat = require('wechat');
var API = require('wechat').API;
var fs = require('fs');
var config = {
  appid: 'wxc4e54add8c920608',
  appsecret: '84f56957e721158de4c742ddf9aa8ba7'
};

var i=0;
var api = new API(config.appid, config.appsecret, function(callback){
	fs.readFile('public_token.txt', 'utf8', function(err, txt){
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(txt));
	});
}, function(token, callback){
	fs.writeFile('public_token.txt', JSON.stringify(token), callback);
	console.log('app token is save');
});
//--------第一执行,-向微信发送请求以获取access_token
// api.getAccessToken(function(err,token){
// 	console.log("access_token: " + token.access_token);
// });

//--------每隔两小时执行一次
setInterval(
	// api.getAccessToken(function(err,token){
	// 	console.log("access_token: " + token.access_token + i++);
	// })
	console.log(i++)
	,2*1000);