$(function(){

	// window.showType = function(v){
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
			"regName":"请输入8位及以上字母、数字或下划线组合"
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

	$("#reg").on("click",".submit-btn",function(){		//注册
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
			}else if(paramArray[index].name == "确认密码"){
				var prevVal = $inputs.eq(index-1).val();
				if(val != prevVal){
					$parent.addClass("error-style");
					$parent.append("<span class='error-tip'>两次输入的密码不一致</span>");
					isSubmit = false;
				}
			}
		})
		if(isSubmit){
			if(1){	//已注册过
				var $childParent = $parent.find(".form-list").eq(0);
				$childParent.addClass("error-style");
				if(1){	//已注册过
					$childParent.find("dd").append("<span class='error-tip'>邮箱已成功注册,<a href='login.shtml'>点击登陆</a></span>");
				}else{	//未激活
					$childParent.find("dd").append("<span class='error-tip'>邮箱待激活,<a href='reg_activation.shtml'>点击激活账号</a></span>");
				}
			}else{
				window.location.href = "reg_activation.shtml";
			}
		}
	});

	$("#js-get-code").click(function(){	//获取验证码
		if($(this).hasClass("disabled")){ return false;}
		var $this = $(this);
		var index = 4;
		var $parent = $(this).closest("dd");
		var val = $.trim($parent.find("input").val());

		$parent.find(".error-tip").remove();
		$parent.removeClass("error-style");

		if(val == ""){
			$parent.addClass("error-style");
			$parent.append("<span class='error-tip'>" + paramArray[index].name + "不能为空</span>");
		}else if(!!paramArray[index].reg){
			if(!paramArray[index].reg.test(val)){
				$parent.addClass("error-style");
				$parent.append("<span class='error-tip'>" + paramArray[index].regName + "</span>");
			}else{
				var num = 60,timeID;
				$this.addClass("disabled").text(num + "s");
				timeID = setInterval(function(){
					if(num == 0){
						clearInterval(timeID);
						$this.removeClass("disabled").text("发送验证码");
					}else{
						$this.text(--num + "s");
					}
				},1000);
			}
		}
	});
	
})


