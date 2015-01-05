
(function(){
	var btn = document.getElementById("submitMenu");
	btn.onclick = function(){
		var buttons = document.querySelectorAll("div.menu01");
		var menu = {"button": []};
		for(var i=0; i<buttons.length; i++){
			//---------第一层菜单
			var btn = buttons[i];
			var inpBtn = btn.querySelector("input");
			menu.button[i] = {
				"name": inpBtn.value,
				"sub_button": []
			}
			//----------第二层菜单
			var sub_btns = btn.querySelectorAll("li");
			for(var j=0; j<sub_btns.length; j++){
				var subBtn = sub_btns[j];
				var inpSubName = subBtn.querySelector("input.menuName");
				var inpSubKey  = subBtn.querySelector("input.menuKey");	
				if(inpSubName.value){
					menu.button[i].sub_button[j] = {
						"name": inpSubName.value,
						"key": inpSubKey.value,
						"type": 'click',
						"sub_button":[]
					};
				}
			}
		}
		console.log(menu);
		var xhr = createXHR();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 ){
				if ((xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304){
					alert("请求成功:"+xhr.responseText);
				} else {
					alert( '请求失败：'+xhr.status);
				}
			}
		}
		xhr.open("post", "/EHRBrowser/setWechatMenu", true);
		xhr.setRequestHeader("Content-Type", "text/json");
		xhr.send(menu);
	}
	function createXHR(){
		if(typeof XMLHttpRequest !="undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined"){
			if (typeof arguments.callee.activeXString != "string"){
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
				i,len;
				for (i=0,len=versions.length;i<len;i++){
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch (ext){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}
	}
})()