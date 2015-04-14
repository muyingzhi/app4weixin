/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/

exports.pmShow = function(req, res){
	var id = req.query.id;
	var list = [{id:'pm001',title:'2015年春夏季商品设计特点',date:'2015-09-01',author:'张三'},
    	{id:'pm002',title:'夏季服饰面料的特点',date:'2015-09-01',author:'张三'},
    	{id:'pm003',title:'企业生产管理之库存控制',date:'2015-09-01',author:'张三'}];
    if(id){
    	var detail={};
    	for(var i=0;i<list.length;i++){
    		if(id==list[i].id){
    			detail = list[i];
    		}
    	}
        res.render("train/pmShow",{data:{type:"detail",detail:detail}});
    }else{
    	
        res.render("train/production_Management",{data:{type:"list",list:list}});//----培训－生产管理页面
    }
};