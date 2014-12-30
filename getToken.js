var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
var fs = require('fs');
var config = {
  appid: 'wxc4e54add8c920608',
  appsecret: '84f56957e721158de4c742ddf9aa8ba7'
};

var i=0;
//--------第一执行
getAccessToken();
//--------每隔两小时执行一次
setInterval(getAccessToken,2*60*60*1000);
//---------向微信发送请求以获取access_token
function getAccessToken(){
	console.log(i + " : " + new Date());
	
	var api = new OAuth(config.appid, config.appsecret);
	var wxp = {};
	api.getAccessToken('code', function (err, data) {
	    if(err.name =='WeChatAPIError'){
	    	console.log("get access token is erro:" + err.message)
	    }else{
	    	console.log('wechat is verfing:'+api.appid+'\n'+api.appsecret+'\n'+data);
	    	wxp.appid = api.appid;
	    	wxp.appsecret = api.appsecret;
	    	wxp.token = data;
	    	
			fs.writeFile('public_token.txt',JSON.stringify(wxp),function(err){
				if(err) throw err;
				console.log('app token is save');
			});
	    }
	});
}
