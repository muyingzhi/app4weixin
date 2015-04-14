/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/

exports.dologin = function(req, res){
	var user={
	    username:"admin",
	    password:"manager"
	};

	var query = req.body;

	if(query.username==user.username && query.password==user.password){
		req.session.user = query;//用户信息写入session
		// //----记录登录时间
		// var usersManager = require("./UsersManager");
		//usersManager.loginRecord(query);
		// 显示菜单页面
        return res.redirect("main");
    }else{
        //return res.render("login/loginPage",query);
        return res.redirect("login.html");
    }

    // var usersManager = require('../../database/usersManager');
	// usersManager.findUserByName(query.username,function(users){
	// 	if(!users || !users[0]){
	// 		req.session.error="用户名未注册";
	// 		return res.render("login/loginPage",{message:"用户名未注册"});
	// 	}else{
	// 		if(users[0].password != query.password){
	// 			req.session.error="用户名或密码错误";
	// 			return res.render("login/loginPage",{message:"用户名或密码错误"});
	// 		}else{
	// 			// 显示菜单页面
	// 			req.session.user = query;
 //        		return res.redirect("menuInfo");
	// 		}
	// 	}
	// })
};
exports.logout = function(req, res){
	
	if(req.session && req.session.user){
		req.session.user = null;//用户信息清空
	}
    return res.redirect("login.html");
};
exports.saveUser = function(user, callback){
	callback({code:"1",message:"数据保存未开发。"});
}