var wechat = require('wechat');
var config = require('../config');

exports.showMenu = function(req, res){
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(err, result){
		//----从微信获取菜单
		var sender={};
		sender.data = {};
		if (err) {
			sender.data.title = config.title + "(有异常：code="+err.code+")";
			sender.data.menu = [];
		}else{
			sender.data.title = config.title;
			sender.data.menu = result.menu.button;
		}
		res.render("menu/menuShow.html", sender);
	});
};
exports.saveMenu4wx = function(req, res){
	var menu = {};
	var API = wechat.API;
	var OAuth= wechat.OAuth;
	var api = new API(config.appid, config.appsecret);
	var oauth = new OAuth(config.appid, config.appsecret);
	var txt = '';
	req.on('data',function(chunk){
		txt += chunk;//--接收数据
	})
	req.on('end',function(){//--数据接收完毕
		if(!txt){
			res.send("no data");
			return;
		}
		menu = JSON.parse(txt);
		//---菜单中view，url（eventKey）需要转换为author2需要的url
		for(var i=0;i<menu.button.length;i++){
			if(menu.button[i].sub_button){
				for(var j=0;j<menu.button[i].sub_button.length;j++){
					var url = menu.button[i].sub_button[j].url;
					if(url){
						//url = oauth.getAuthorizeURL(url,"shopping","snsapi_userinfo");
						menu.button[i].sub_button[j].url = url;
					}
				}
			}
		}
		//---向微信提交菜单
		api.createMenu(menu,function(err, result){
			if(err){
				if(!result){resunt = {errmsg:"严重错误",errcode:"00"};}
				res.send("微信消息："+result.errmsg+result.errcode);
			}else{
				res.send("更新菜单完成");
			}
		});
	});
};
