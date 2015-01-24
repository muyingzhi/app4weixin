var fs = require("fs");

fs.watchFile("app.js",function(curr,prev){
	console.log('the current mtime is: ' + curr.mtime);
	console.log('the previous mtime was: ' + prev.mtime);
});

var info = process.versions;
info.platform = process.platform;
info.memory = process.memoryUsage();
console.log(info);
setInterval(function(){
	console.log(process.uptime());
	var a = process.uptime();
	if (a>5){
		process.exit();
	}
},1000);

process.on("exit", function(code){
	setTimeout(function(){
		console.log("This will not run");
	}, 0)
	console.log("exit code:"+code);
})

var util = require('util');

console.log(util.inspect(process.memoryUsage()));