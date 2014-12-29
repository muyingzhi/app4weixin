var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
var fs = require('fs');
var config = {
  appid: 'wxc9135aade4e81d57',
  appsecret: '0461795e98b8ffde5a212b5098f1b9b6'
};
router.get('/', function(req, res) {
	fs.readFile('public_token.txt',function(err,data){
		//----------读取当前的Access_token
		var wxp = {};
	    if(err) throw err;
	    console.log("read file:"+data);
	    wxp = JSON.parse(data);
	    console.log("appid:"+wxp.appid);
		
		if(req.method=='GET'){
			//--------接受微信平台的验证
			console.log(wxp.token);
			
			res.send(req.query.echostr+wxp.token);
			//res.json({"echostr":"xxxxxx"});
		}else{
			//--------接受微信平台的服务等
			console.log("POST");
			var api = new OAuth(config.appid, config.appsecret);
			
			api.getAccessToken('code', function (err, data) {
		        if(err.name =='WeChatAPIError'){
		        	res.send("get access token is erro:" + err.message)
		        }else{
		        	res.send('wechat is verfing:'+api.appid+'\n'+api.appsecret+'\n'+data);
		        }
		    });
	  	}
  	})
});

module.exports = router;
