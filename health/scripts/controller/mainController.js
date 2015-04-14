define(['controller/controllers','jquery'],function(controllers,$){
    console.log("mainController start...");
    controllers.controller("mainController", ['$rootScope','$scope',
        function($rootScope,$scope){
            //---------设置顶端菜单
            $rootScope.topNav = [
            ];
            document.title = $scope.title="云工作";
            $scope.menu = [
            {text:"功能1",href:"#"},
            {text:"微信菜单",href:"menuInfo"},
            {text:"退出",href:"logout"}
            ];
        }
    ]);
})