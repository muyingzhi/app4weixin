define(['controller/controllers','jquery'],function(controllers,$){
    controllers.controller("mainController", ['$rootScope','$scope',
        function($rootScope,$scope){
            //---------设置顶端菜单
            $rootScope.topNav = [
            ];
            document.title = $scope.title="云工作";
            $scope.menu = [{text:"陈列中心",href:"#"},
            {text:"培训中心",href:"train"},
            {text:"签到",href:"signin"},
            {text:"巡店",href:"#"},
            {text:"公司新闻&公告栏",href:"#"},
            {text:"通讯录",href:"contact"}];
        }
    ]);
})