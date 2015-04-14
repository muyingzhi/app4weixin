
var config = require('../config');
var AV = require('avoscloud-sdk').AV;
AV.initialize("8x87xn4neztpymeej3lpqgr0bzdmamxjtx73yheg2jpzr6vn", "91k3852kdiqieilt49t5zmcfnfmx18uemvub41bcqth7j6t7");
//----记录admin用户登录时间到cleanCloud
exports.loginRecord = function(adminUser){
    //console.log("记录admin用户登录时间到cleanCloud");
    // var user = AV.Object.new("LoginUser");
    //     user.set("username",adminUser.username);
    //     user.set("loginTime",new Date());
    //     user.save(null,{
    //         success:function(user){
    //             console.log("save login user:" + user.id);
    //         },
    //         error:function(user,error){
    //             console.log("save login Error:" + error.description);
    //         }
    //     });
}
//----检查微信用户是否注册
exports.checkWxuser = function (wxFromUserName,callback){
    var Users4Weixin = AV.Object.extend("Users4Weixin");
    var query = new AV.Query(Users4Weixin);
    query.equalTo("FromUserName",wxFromUserName);
    query.find({
        success:function(results){
            callback(results);
        },
        error:function(error){
            if(error.code=="101"){
                callback(null);//没有表，不算错误。
            }else{
                callback(null,error);
            }
        }
    })
}
