$(function(){

	var $price = $("#price");

	function chooseType(el,cla){
		$(el).addClass(cla).siblings().removeClass(cla);
		getPrice();
	}

	function getPrice(){
		$price.html('<em class="f22">正在计算价格...</em>');
		setTimeout(function(){
			$price.html('<em>51083.96</em> &nbsp;&nbsp;<b>元</b>');
		},1000);
	}

	$(".choose-item-type").on("click","span",function(){	//select
		if($(this).hasClass("disabled")){ return false;}
		$childUl = $(this).next(".item-list");
		if(!$childUl.hasClass("hide")){
			$childUl.addClass("hide").removeClass("show");
		}else{
			$childUl.addClass("show").removeClass("hide");
		}
		return false;
	});
	$(".choose-item-type").on("click",".item-list li",function(){	//select
		var $this = $(this);
		var val = $this.text();
		$("#js-item-type").text(val);
		$this.addClass("active").siblings().removeClass("active");
	});

	$(".choose-list-style").on("click","li",function(){
		chooseType(this,"active");
		return false;
	});

	$(document).on("click",function(event){	//select
		$(".item-list").addClass("hide").removeClass("show");
	});

	$(".product-list").find("li").click(function(){
		var $this = $(this);
		$("#calc-product-name").text($this.text());
	});

	/********************************** 滑块 script **********************************/
	var jrangeParam = {
		from: 0,
		to: 500,
		step: 1,
		format: '%s',
		width:510,
		showLabels: false,
		snap: true
	}

	var valueObj = {
		min:{	//基础带宽
			index:0,
			value:[20,150]
		},
		max:{	//峰值带宽
			index:0,
			defalut:20,
			value:[20,320]
		},
		work:{	//工作带宽
			index:0,
			value:[100,2000]
		}
	}

	var initMinVl,initMaxVl,initWorkVl;
	$('#min-val-slider').jRange($.extend(true,{},jrangeParam,{
		from:0,
		to:100,
		step:10,
		scale: ["0G","10G","20G","30G","40G","50G","60G","70G","80G","100G","150G"],
		onstatechange:function(val){
			var val = Number(val);
			if(val == 20){
				$("#js-min-val").find(".up").addClass("disabled");
			}
			if(val >= 20){
				changeVal("min",val);
			}
			var maxVal = $("#js-max-val").find("input").val();
			if(val){
				switch(val){
					case 90:
						val = 100;
						break;
					case 100:
						val = 150;
						break;
				}
				valueObj.max.defalut = val;
				if(val >= maxVal){
					setTimeout(function(){
						$("#max-val-slider").jRange('setValue', valueObj.max.defalut.toString());
					},200);
				}
			}
		},
		ondragend:function(val){
			if(val < 20){
				val = 20;
				$("#min-val-slider").jRange('setValue', val.toString());
			}
		},
		onbarclicked:function(val){
			if(val < 20){
				val = 20;
				setTimeout(function(){
					$("#min-val-slider").jRange('setValue', val.toString());
				},500);
			}
		}
	}));
	$('#max-val-slider').jRange($.extend(true,{},jrangeParam,{
		from:0,
		to:320,
		step:10,
		scale: ["0G","40G","80G","120G","160G","200G","240G","280G","320G"],
		onstatechange:function(val){
			$("#js-max-val").children("em").find("input").val(val);
			if(val == valueObj.max.defalut){
				$("#js-max-val").find(".up").addClass("disabled");
			}
			if(val >= valueObj.max.defalut){
				changeVal("max",val);
			}
		},
		ondragend:function(val){
			if(val < valueObj.max.defalut){
				val = valueObj.max.defalut;
				$("#max-val-slider").jRange('setValue', val.toString());
			}
		},
		onbarclicked:function(val){
			if(val < valueObj.max.defalut){
				val = valueObj.max.defalut;
				setTimeout(function(){
					$("#max-val-slider").jRange('setValue', val.toString());
				},500);
			}
		}
	}));
	$('#work-val-slider').jRange($.extend(true,{},jrangeParam,{
		from:0,
		to:2000,
		step:50,
		scale: ["0M","200M","400M","600M","800M","1000M","1200M","1400M","1600M","1800M","2000M"],
		onstatechange:function(val){
			if(val == 100){
				$("#js-work-val").find(".up").addClass("disabled");
			}
			if(val >= 100){
				changeVal("work",val);
			}
		},
		ondragend:function(val){
			if(val < 100){
				val = 100;
				$("#work-val-slider").jRange('setValue', val.toString());
			}
		},
		onbarclicked:function(val){
			if(val < 100){
				val = 100;
				setTimeout(function(){
					$("#work-val-slider").jRange('setValue', val.toString());
				},500);
			}
		}
	}));

	function initVal(){
		$(".jrange-select").find(".select-btn").each(function(){
			var $this = $(this);
			var dataType = $this.attr("data-type");
			var i = $this.attr("data-val");
			var value = valueObj[dataType].value[i];
			$("#" + dataType + "-val-slider").jRange('setValue', value.toString());
		});
	}
	initVal();

	$(".jrange-select").find(".select-btn").find("i").click(function(){	//加减值
		var $this = $(this);
		if($this.hasClass("disabled")){ return false;}
		var $parentEle = $this.closest("div");
		var dataType = $parentEle.find("span").attr("data-type");
		var value = Number($parentEle.find("input").val());

		if(dataType == "min"){

			switch (value){
				case 100:
					value = 90;
					break;
				case 150:
					value = 100;
					break;
			}
		}

		if(dataType == "min" || dataType == "max"){
			if($this.hasClass("up")){
				value = Number(value) - 10;
			}else{
				value = Number(value) + 10;
			}
		}
		if(dataType == "min"){
			value = value < 20 ? 20 : value;
		}
		if(dataType == "max"){
			value = value < valueObj.max.defalut ? valueObj.max.defalut : value;
		}
		if(dataType == "work"){
			if($this.hasClass("up")){
				value = Number(value) - 50;
			}else{
				value = Number(value) + 50;
			}
			value = value < 100 ? 100 : value;
		}
		$("#" + dataType + "-val-slider").jRange('setValue', value.toString());
		// changeVal(dataType,value);
	});
	/******************* 基础带宽 blur 判断值 **************************/
	$("#js-min-val").find("input").focus(function(){
		initMinVl = $(this).val();
	});
	$("#js-min-val").find("input").blur(function(){
		var value = $(this).val();
		if(Math.abs(value - initMinVl) <= 5){
			$(this).val(initMinVl);
		}
	});

	/******************* 弹性带宽 blur 判断值 **************************/
	$("#js-max-val").find("input").focus(function(){
		initMaxVl = $(this).val();
	});
	$("#js-max-val").find("input").blur(function(){
		var value = $(this).val();
		if(Math.abs(value - initMaxVl) <= 5){
			$(this).val(initMaxVl);
		}
	});

	/******************* 业务带宽 blur 判断值 **************************/
	$("#js-work-val").find("input").focus(function(){
		initWorkVl = $(this).val();
	});
	$("#js-work-val").find("input").blur(function(){
		var value = $(this).val();
		if(Math.abs(value - initWorkVl) <= 25){
			$(this).val(initWorkVl);
		}
	});

	$(".jrange-select").find("input").blur(function(){
		var $this = $(this);
		var value = Number($this.val());
		var $parentEle = $this.closest("div");
		var dataType = $parentEle.find("span").attr("data-type");
		var isC = false;
		var sildeArray = valueObj[dataType].value;

		if(value < sildeArray[0]){
			value = sildeArray[0];
			isC = true;
		}else if(value > sildeArray[sildeArray.length-1]){
			value = sildeArray[sildeArray.length-1];
			isC = true;
		}
		isC ? $this.val(value) : "";
		$("#" + dataType + "-val-slider").jRange('setValue', value.toString());
	});

	function changeVal(str,val){	//滑动触发
		var val =  Number(val.toString().indexOf(".") != -1 ? val.split(".")[0] : val);
		var valueArray = valueObj[str].value;
		var $thisEle = $("#js-" + str + "-val");
		var $sileInput = $thisEle.find("em").find("input");
		if(str == "min"){	//兼容基础带宽
			switch(val){
				case 90:
					val = 100;
					break;
				case 100:
					val = 150;
					break;
			}
		}
		$sileInput.val(val);

		$thisEle.find(".disabled").removeClass("disabled");

		if(val == valueArray[0] || (str == "max" && val == valueObj.max.defalut)){	//兼容基础带宽
			$thisEle.find(".up").addClass("disabled");
		}else if(val == valueArray[valueArray.length-1]){
			$thisEle.find(".down").addClass("disabled");
		}
		getPrice();
	}

	$(".reset").click(function(){		//重置
		var $itemType = $(".item-list").find("li").eq(0);
		$itemType.addClass("active").siblings().removeClass("active")
		$("#js-item-type").text($itemType.text());

		$(".choose-list-style").each(function(){
			$(this).find("li").eq(0).addClass("active").siblings().removeClass("active");
		});

		initVal();

		return false;
	});

	/***************************** 购买数量 *******************************/
	$("#js-buy-number").keyup(function(){
		changeBuyNum(this);
	});
	$(".choose-number").on("click",".add",function(){
		changeBuyNum(this);
	});
	$(".choose-number").on("click",".subtract",function(){
		changeBuyNum(this);
	});
	function changeBuyNum(t){
		var $this = $(t);
		if($this.hasClass("disabled")){ return false;}
		var $input = $("#js-buy-number");
		var $parentEle = $this.closest(".choose-number");
		var thisVal = $.trim($input.val());

		if($this.hasClass("add")){
			thisVal++;
		}else if($this.hasClass("subtract")){
			thisVal--;
		}else{
			thisVal = thisVal.replace(/\D/g,'');
		}
		thisVal = thisVal <= 0 ? 1 : thisVal;
		$input.val(thisVal);
		$parentEle.find(".disabled").removeClass("disabled");
		if(thisVal == 1){
			$parentEle.find(".subtract").addClass("disabled");
		}
	}
})


