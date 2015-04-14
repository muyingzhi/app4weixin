define(['controller/controllers','jquery'],function(controllers,$){
    controllers.controller("pmController", ['$rootScope','$scope','$routeParams',
        function($rootScope,$scope,$routeParams){
            //---------设置顶端路径，当前位置不在此哪呢，而在html中
            $rootScope.topNav = [{text:"首页",href:"main"},
            					{text:"培训中心",href:"train"}];
            var itemno = $routeParams.itemno;//明细的编号
            console.log(itemno);
			var data = window.modeData;//----接收来自node的数据
				if(data && data.type=="list"){
					$scope.list = data.list;
				}
				if(itemno){
					var detail = {id:itemno,title:"xxxxx",date:"2012-09-08",author:"六三"};
					$scope.detail = detail;
				}
			
        }
    ]);
})