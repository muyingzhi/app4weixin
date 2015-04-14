require.config({
    paths:{
        jquery:  '/public/javascripts/jquery.min',
        angular: '/public/javascripts/angular.min',
        domReady: "/public/javascripts/domReady",
        twitter: "/public/javascripts/bootstrap.min",
        //easyui : "../vendor/easyui/jquery.easyui.min",
        //easyGroup : "../vendor/easyui/datagrid-groupview",
        //easyuizh_CN : "../vendor/easyui/locale/easyui-lang-zh_CN",
        indexedDB : "/public/javascripts/indexeddb"
        //calendarInput : "../vendor/calendarInput",
        //clone : "../vendor/clone"
    },
    shim:{
        'twitter' : {
            deps : ['jquery']
        }
        ,angular:{
            deps:['jquery','twitter'],
            exports:'angular'
        }
        // ,easyui : {
        //     deps : ['jquery']
        // }
        // ,easyGroup : {
        //     deps : ['easyui']
        // }
        // ,easyuizh_CN :{
        //     deps : ['easyui']        
        // }
        ,indexedDB : {
            deps : ['angular']
        }
    }
});
require([
    'angular',
    'app',
    'bootstrap',
    'controller/mainController'    ],
    function(angular,app,bootstrap){
	    'use strict';
        if(app==undefined){console.log("app is undefined");}
        
	    app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $routeProvider.
                // when("/pmShow/:itemno",{
                //     templateUrl:"pmShow.html",
                //     controller:"pmController"
                // }).
                // when("/pmList",{
                //     templateUrl:"pmlist.html",
                //     controller:"pmController"
                // }).
                otherwise({
                    redirectTo:"/"
                });
            }]
        );
        bootstrap();
    }
);