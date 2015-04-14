var db = require("../database/usersManager");
var assert = require("assert");
// var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
// var db = new mongodb.Db('test',server,{safe:true});
// db.open(function(err,db){
// 	if(!err){
// 		db.collection('patientInfo',function(err,collection){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				collection.find().toArray(function(err,result){
// 					console.log("Find:");
// 					console.log(result);
// 				})
// 			}
// 		})
// 	}else{
// 		console.log(err);
// 	};
// 	//db.close();
// })
db.findUserByName("admin",function(users){
	console.log(users);
});
db.saveUser({username:"muyz",password:"muyz"},function(r){
	console.log(r);
	assert.equal(r.code,1,true);
});