define(['controller/controllers','jquery'],function(controllers,$){
    controllers.controller("signinController", ['$rootScope','$scope','$routeParams','$timeout',
        function($rootScope,$scope,$routeParams,$timeout){
            //---------设置顶端菜单
            $rootScope.topNav = [{text:"首页",href:"main"}];
            var employee = $routeParams.employee;//员工
            
            var weeknames = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			var updateDate = function(){
				var d = new Date();
				$scope.today = d.getFullYear()+"年" + (d.getMonth()+1) + "月" + d.getDate()+"日，" + weeknames[d.getDay()];
				$scope.nowTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
			}
			setInterval(function() {
				$scope.$apply(updateDate)
			}, 1000);
			updateDate();
        }
    ]);
})