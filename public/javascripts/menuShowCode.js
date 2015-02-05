function Mycontroller($scope){
	$scope.data = window.modeData;//----接收来自node的数据

	var menus = $scope.data.menu;
	if (menus)
	if (!menus){ menus = [];}
	//-------微信菜单转化为标准的3*5的数组
	for(var i=0;i<3; i++){
		var menuBranch = menus[i];//-----一级菜单
		if ( !menuBranch){
			menuBranch = {name :"菜单"+i,sub_button :[]};//----没有时建立起
			menus[i] = menuBranch;
		}
		for(var j=0;j<5; j++){//-----子菜单
			var menuSub = menuBranch.sub_button[j];
			if (!menuSub){
				menuSub = {
					"type": "",
					"name": "",
					"key": "",
					"sub_button": []
				};//-------初始化
				menuBranch.sub_button[j] = menuSub;
			}
		}
	}
	//-----
	$scope.data.menu = menus;
	console.log(menus);
}