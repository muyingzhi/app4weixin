var fs = require("fs");

// fs.watchFile("app.js",function(curr,prev){
// 	console.log('the current mtime is: ' + curr.mtime);
// 	console.log('the previous mtime was: ' + prev.mtime);
// });

// var info = process.versions;
// info.platform = process.platform;
// info.memory = process.memoryUsage();
// console.log(info);
// setInterval(function(){
// 	console.log(process.uptime());
// 	var a = process.uptime();
// 	if (a>5){
// 		process.exit();
// 	}
// },1000);

// process.on("exit", function(code){
// 	setTimeout(function(){
// 		console.log("This will not run");
// 	}, 0)
// 	console.log("exit code:"+code);
// })

// var util = require('util');

// console.log(util.inspect(process.memoryUsage()));

/*
目录变量 appname；微信token变量
app.js文件增加一行
建立目录，appname；
复制路由文件app4health.js,并改名
根据微信公众号的appid，appsecret生成config.json
建立子目录routes，复制menu4wx.js WeixinServer.js doLogin.js
建立子目录common

*/
var appname="okhealth";
var token = "okhealth";
var appid = "",appsecret = "",title = appname;
var copy = function( src, dst , callback){
	var stat = fs.stat;
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;        
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );   
                    // 通过管道来传输流
                    readable.pipe( writable,{end:false} );
                    readable.on("end",function(){
                    	
                    	if(_dst.indexOf("config.json")>=0){
                    		console.log(_dst);
	                    	fs.writeFile(_dst,
								JSON.stringify({"appid":appid,
                                    "appsecret":appsecret,
                                    "title":title,
                                    "token": token}));
	                    }
                        if(_dst.indexOf("app4health.js")>=0){
                            fs.rename(_dst,_dst.substr(0,_dst.indexOf("app4health.js"))+"app4"+appname+".js");
                        }
                    })
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
    //callback();
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};
// 复制目录
exists( './health', './'+appname, copy);
