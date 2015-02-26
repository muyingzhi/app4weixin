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
	console.log(query);
	if(query.username==user.username && query.password==user.password){
		req.session.user = query;//用户信息写入session

        return res.redirect("menuInfo");
    }else{
        res.redirect("login.html");
    }
};