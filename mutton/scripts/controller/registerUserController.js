define(['controller/controllers','jquery'],function(controllers,$){
    controllers.controller("registerUserController", ['$rootScope','$scope','$http',
        function($rootScope,$scope,$http){
        	$scope.saveUser = function(){
        		$http.post("saveUser",$scope.user)
        		.success(function(data,status,headers,config){
        			$scope.result4save = data;
        		})
        	}
        	$scope.reset = function(){
        		$scope.user = {}
        		$scope.result4save = "";
        	}
        }
    ]);
})