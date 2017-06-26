$(function(){

	// function verifyFn(){
    //
	// }

	// window.showType = function(v){	//暂未使用此方法
	// 	var typeArray = ["login","reg","reg-success"],i= 0,n;
	// 	for( ; n=typeArray[i]; i++){
	// 		if(v != n){
	// 			$("#"+n).hide();
	// 		}else{
	// 			var $thisEle = $("#"+n);
	// 			$thisEle.find("input").val("");
	// 			$thisEle.show().find(".error-style").removeClass("error-style").find(".error-tip").remove();
	// 		}
	// 	}
	// }

	var paramArray = [
		{
			"name":"邮箱",
			"reg":	/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
			"regName":"请输入正确格式"
		},
		{
			"name":"密码",
			"reg":/^\w{8,}$/,
			"regName":"请输入8位及以上数字加字母"
		},
		{
			"name":"确认密码",
			"reg":"",
			"regName":""
		},
		{
			"name":"校验码",
			"reg":"",
			"regName":""
		},
		{
			"name":"手机号",
			"reg":/^1(3|4|5|7|8)\d{9}$/,
			"regName":"请输入正确手机号码"
		},
		{
			"name":"验证码",
			"reg":"",
			"regName":""
		}
	];

	var isReg = false;
	$("#login").on("click",".submit-btn",function(){		//登录
		var $parent = $(this).closest("div");
		var $inputs = $parent.find("input");
		$parent.find(".error-tip").remove();
		$parent.find(".error-style").removeClass("error-style");
		var isSubmit = true;

		$.each($inputs,function(index){
			var val = $.trim($(this).val());
			var $parent = $(this).closest("dd");
			if(val == ""){
				$parent.addClass("error-style");
				$parent.append("<span class='error-tip'>" + paramArray[index].name + "不能为空</span>");
				isSubmit = false;
			}else if(!!paramArray[index].reg){
				if(!paramArray[index].reg.test(val)){
					$parent.addClass("error-style");
					$parent.append("<span class='error-tip'>" + paramArray[index].regName + "</span>");
					isSubmit = false;
				}
			}
		})
		if(isSubmit){
			if(!isReg){
				var $childParent = $parent.find(".form-list").eq(0);
				$childParent.addClass("error-style");
				if(1){	//未激活
					$childParent.find("dd").append("<span class='error-tip'>邮箱待激活,<a href='reg_activation..shtml'>点击激活邮箱</a></span>");
				}else{	//未注册
					$childParent.find("dd").append("<span class='error-tip'>邮箱尚未注册,<a href='register.shtml'>点击注册</a></span>");
				}
			}
		}
	});

	$("#js-auto-login").click(function(){
		var $this = $(this);
		if($this.hasClass("cur")){
			$this.removeClass("cur");
		}else{
			$this.addClass("cur");
		}
	});
})


