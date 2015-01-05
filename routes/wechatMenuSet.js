var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var fs = require('fs');
var config = {
  appid: 'wxc4e54add8c920608',
  appsecret: '84f56957e721158de4c742ddf9aa8ba7'
};
router.get('/', function(req, res){
	console.log("set menu to wechat.");
	var menu = fs.readFileSync("./routes/menu4HJK.json");
	menu = JSON.parse(menu);
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.createMenu(menu,function(){
		console.log("菜单创建完成:");
		for(var i=0;i<arguments.length;i++){
			console.log(arguments[i]);
		}
	});
	res.send("finish");
});

module.exports = router;