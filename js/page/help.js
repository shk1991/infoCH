$(function(){
	$(".help-menu-list").on("click",".select",function(){
		var $this = $(this);
		var $childList = $this.next(".menu-list");
		if($this.hasClass("active")){
			$this.removeClass("active");
			$childList.slideUp();
		}else{
			$this.addClass("active");
			$childList.slideDown();
		}
	});

	$("#serch-btn").click(function(){
		window.location.href = "help-serch.shtml";
	});

})


