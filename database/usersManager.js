var Setting = require('./setting');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var db;

exports.getDb = function(){
	return db;
}
exports.findUserByName=function(username,callback){
	MongoClient.connect(Setting.URL, function(err, db) {
		assert.equal(err,null);
		var collection = db.collection('users');
		collection.find({username:username}).toArray(function(err,result){
			console.log("Find:"+username);
			assert.equal(result.length>0,true);
			callback(result);
			db.close();
		})
				
	});
}
exports.saveUser = function(user, callback){
	MongoClient.connect(Setting.URL, function(err, db) {
		if(err){console.log("错误"+err)}
		var collection = db.collection('users');
		collection.find({"username":user.username}).toArray(function(err,result){
			if(result && result.length>0){
				callback({code:"-1",message:"同名用户已存在",user:user});
				db.close();
			}else{
				collection.insertOne(user,function(err, r){
					callback({code:"1",message:"保存成功"});
					db.close();
				});
			}
		})
				
	});
}
