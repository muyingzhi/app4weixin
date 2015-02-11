function Mycontroller($scope,$http){
	var weixinData = window.modeData;//----接收来自node的数据
	var menus = weixinData.menu;
	menus = initMenu(menus);//----规范需要的显示数据
	//-----
	$scope.data = {};
	$scope.data.menu = menus;
	$scope.data.title = weixinData.title;
	$scope.types = [{name:"click",text:"点击"},
	{name:"view",text:"链接网页"},
	{name:"scancode_push",text:"扫一扫"}];
	$scope.saveMenu = function(){
		//------
		var newMenu = makeMeun4Form();
		//------向服务端发请求
		$http.defaults.headers.post["Content-Type"] = "text/json";
		$http.post(
			"saveMenu4wx",
			newMenu
		)
		.success(function(data, status, headers, config){
			alert("请求返回:"+data);
		})
		.error(function(data, status, headers, config){
			alert( '请求失败：'+status);
		});
		
	}

	function initMenu(menus){
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
		return menus;
	}
	function makeMeun4Form(){
		var datas = $scope.data.menu;
		var menu = {"button": []};
		for(var i=0; i<datas.length; i++){
			//---------第一层菜单
			var data = datas[i];
			if(data.name){
				//----有名称的菜单才会被记录
				menu.button[i] = {
					"name": data.name,
					"sub_button": []
				}
				//----------第二层菜单
				var sub_btns = data.sub_button;
				for(var j=0; j<sub_btns.length; j++){
					var sub = sub_btns[j];
					
					if(sub.name){//----有名字才会加为菜单
						if(sub.type){
							var subType = sub.type;

							menu.button[i].sub_button[j] = {
								"name": sub.name,
								"type": subType,
								"sub_button":[]
							};
							if (subType=='view'){
								menu.button[i].sub_button[j].url = sub.key
							} else {
								menu.button[i].sub_button[j].key = sub.key
							}
						}
					}
				}
			}
		}
		return menu;
	}
	//console.log(menus);
}