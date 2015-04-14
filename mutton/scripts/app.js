//----------要先load angular.js controller/controllers.js
console.log("app...");
define(['angular','controller/controllers','services/services','directives/directives'],
	function(angular){
    //--------------依赖controllers模块
    var app = angular.module("mutton",["controllers","services",'directives']);
    app.config(function () {
    });
    return app;
});