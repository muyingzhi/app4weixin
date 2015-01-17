
var config = require('../app_config');
var wechat = require('wechat');
var OAuth = wechat.OAuth;
var API = wechat.API;
var fs = require('fs');

var usersManager = function(){
	var filename = "../users.json";
	this.usersMode = {};
	try{
		var fd = fs.openSync(filename, "r")
		fs.closeSync(fd);
	}catch (err){
		var fd = fs.openSync(filename, "w");
		fs.closeSync(fd);
	}
	this.usersMode  = require(filename);
}
usersManager.prototype.authorize = function( openid ) {
	var isAuthorize = false;
	//----取用户信息
	var user = this.findByOpenid(openid);
	if (user){
		//----是否已注册
		//----已注册的，根据身份证号组织url，重定向到url
		isAuthorize = true;
	}else {
		//----未注册的，
		var api = new API(config.appid, config.appsecret);
		var auth = new OAuth(config.appid, config.appsecret);
	    var url = auth.getAuthorizeURL('http://61.142.82.2/EHRBrowser/oauth2','hjk','snsapi_userinfo');
	    api.sendText(openid, "<a href='"+url+"'>需要注册你的信息</a>");
	}
	return isAuthorize;
};
//读出所有用户记录
usersManager.prototype.list = function(){
	var list = [];
	list = this.usersMode.datalist;

	return list;
};
usersManager.prototype.findByOpenid = function(openid){
	var list = this.list();
	var rtn = null;
	for(var i=0;i<list.length;i++){
		var user = list[i];
		if( user.openid == openid){
			rtn = user;
			break;
		}
	}
	return rtn;
}
usersManager.prototype.saveUser = function(user){
	return user;
}

module.exports = usersManager;
