var assert = require('assert');
var UsersManager = require('../routes/WxUser');
var manager = new UsersManager();

var oneuser = manager.findByOpenid("xxx");
assert.notEqual(oneuser,null,"查找失败");