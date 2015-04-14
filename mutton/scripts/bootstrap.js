console.log("bootstrap...");
define(['domReady','angular'],function(domReady,angular){
    return function(){
    	console.log("domReady");
        domReady(function(){
        	console.log("angular.bootstrap");
	        angular.bootstrap(document,["mutton"]);
        })
    }
});