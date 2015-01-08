var hms = function(){
};
hms.prototype.showCheckPage = function(numberofcase){
    console.log("-------scancode_push:yy_getEcg回复体检报告图片")
    var message = [
      {
        title: '体检报告',
        description: '体检日期：2015-01-02',
        picurl: 'http://220.178.60.10:8018/dualreferral/images/login_007.jpg',
        url: 'http://220.178.60.10:8018/dualreferral/ztremotelogin.do?uid=340406100205&upwd=a&opno=340406100205&urt=ecgDetail&numberofcase=0000000163&ecd=utf-8'
      }
    ];
    return message;
}
module.exports = hms;
