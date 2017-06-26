
var publicMethod = {
	showTab:function(p,c){
		var $p = $(p);
		$(c).click(function(){
			var index = $(this).index();
			$(this).addClass("curr").siblings().removeClass("curr");
			$p.children("div").eq(index).show().siblings().hide();
		})
	}
}

var $body = $("body");

$(function(){

	//计算footer位置宽度
	var $el = $(".infoCH-cp-footer-info-01 li"), len = $el.length, _w = 0;
	for (var i = 0; i < len; i++) {
		_w += $el.eq(i).outerWidth();
	}
	$(".infoCH-cp-footer-info-02").width(_w);

	var isHover = false;
	$(".infoCH-nav-item").find("li").hover(function(){
		var $this = $(this);

		if($this.find(".menu-child").length){
			isHover = true;
			$this.addClass("hover").find(".menu-child").stop(true,true).show(200);
			$this.siblings().find(".menu-child").hide(200);
		}
	},function(e){
		setTimeout(function(){
			if(!isHover){
				$(".infoCH-nav-item").find("li").removeClass("hover");
				$(".menu-child").hide(200);
			}
		},200);
		isHover = false;
	});

	//加载当前页面索引类
	var $productName = $("#product-name");
	var nameObj = {
		"index":"产品",
		"product-epds":"产品 - 专属私有域名服务",
		"product-itm":"产品 - 智能流量管理系统",
		"product-openLB":"产品 - 开放式负载均衡"
	}
	function showThisPage(){
		// var arr = ["index","calculate","help","about-us","dispute_agent","product-epds","product-itm","product-openLB"]
		var arr = ["index","calculate","about-us","dispute_agent","product-epds","product-itm","product-openLB"]
		var url = window.location.href;
		if(url.indexOf("html") == -1){
			$(".infoCH-nav-item").find(".menu-child").addClass("style-blue");
			$productName.text(nameObj["index"]);
			$(".infoCH-nav-item").find("li").removeClass("active").eq(0).addClass("active");
			return false;
		}
		for(var k=0,len = arr.length; k<len; k++){
			if(url.indexOf(arr[k]) != -1){

				if(arr[k] == "product-epds" || arr[k] == "product-itm" || arr[k] == "product-openLB" || arr[k] == "index" || arr[k] == "help" || arr[k] == "about-us"){
					$(".infoCH-nav-item").find(".menu-child").addClass("style-blue");
				}
				if(arr[k] == "product-epds" || arr[k] == "product-itm" || arr[k] == "product-openLB"){
					$productName.text(nameObj[arr[k]]);
					k = 0;
				}else{
					$productName.text(nameObj["index"]);
				}
				$(".infoCH-nav-item").find("li").removeClass("active").eq(k).addClass("active");
				break;
			}
		}
	}
	showThisPage();

	$(".infoCH-nav-item").find("li").children("a").click(function(){
		if($(this).closest("li").hasClass("active")){
			return false;
		}
	})
	
	//返回顶部
	var backTopFn = (function(){
		$("body").on("click","#backTop",function(){
			$("html,body").stop(true,true).animate({"scrollTop":0},300);
			return false;
		});
	})();

	$(".login-input").find("input").focus(function(){
		var $parant = $(this).closest("p");
		$parant.addClass("active");
	});
	$(".login-input").find("input").blur(function(){
		var $parant = $(this).closest("p");
		$parant.removeClass("active");
	})
	
})


