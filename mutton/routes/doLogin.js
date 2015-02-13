/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/
var express = require('express');
var router = express.Router();

var user={
    username:"admin",
    password:"manager"
};

router.all('/', function(req, res){
	if(req.body.username==user.username && req.body.password==user.password){
        res.redirect("/mutton/menuInfo");
    }else{
        res.redirect("/mutton/html/login.html");
    }
});

module.exports = router;