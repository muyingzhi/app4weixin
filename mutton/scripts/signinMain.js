require.config({
    paths:{
        jquery:  '/public/javascripts/jquery.min',
        angular: '/public/javascripts/angular.min',
        domReady: "/public/javascripts/domReady",
        twitter: "/public/javascripts/bootstrap.min"
    },
    shim:{
        'twitter' : {
            deps : ['jquery']
        }
        ,angular:{
            deps:['jquery','twitter'],
            exports:'angular'
        }
    }
});
require([
    'angular',
    'app',
    'bootstrap',
    'controller/signinController'
    ],
    function(angular,app,bootstrap){
	    'use strict';
        if(app==undefined){console.log("app is undefined");}
        
	    app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $routeProvider.
                otherwise({
                    redirectTo:"/"
                });
            }]
        );
        bootstrap();
    }
);