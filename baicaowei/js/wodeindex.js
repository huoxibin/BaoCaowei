		
		$("footer").load("../html/common_footer.html",function(){
			$(".foot-d .icon-my").addClass("on");
			$(".foot-d .icon-myfill").removeClass("on")
		})
		
				$aLi=$(".nav ul li").eq(0)
				touch.on($aLi,"tap",function(){
					window.location.href="youhuiquan.html"			
				})
				$aLi1=$(".nav ul li").eq(1)
				touch.on($aLi1,"tap",function(){
					window.location.href="wodeshoucang.html"			
				})
				
				$aLi2=$(".nav ul li").eq(4);
				touch.on($aLi2,"tap",function(){
					$(".h-zhegai").removeClass("zgnone");
					$(".del_center").removeClass("zgnone");
				})
				touch.on(".h-zhegai","tap",function(){
					$(".h-zhegai").addClass("zgnone");
					$(".del_center").addClass("zgnone");
				})
				touch.on(".del_center","tap",function(){
					$(".h-zhegai").addClass("zgnone");
					$(".del_center").addClass("zgnone");
				})
		
//		$oLi=$("#common_fot .foot li").eq(0);
//		touch.on($oLi,"tap",function(){
//			window.location.href="../index.html"
//		})
//		$oLi=$("#common_fot .foot li").eq(1);
//		touch.on($oLi,"tap",function(){
//			window.location.href="Sort.html"
//		})
//		$oLi=$("#common_fot .foot li").eq(2);
//		touch.on($oLi,"tap",function(){
//			window.location.href="cart.html"
//		})
		if(localStorage.login_success){
			$(".header1 p em").html("ID:  "+localStorage.username+"  >");
			$(".header1 p i").hide()
		}else{
			$(".header1 p i").show();
			touch.on(".header1 p i","tap",function(){
				window.location.href="login.html"
			})
		}

//		touch.on("#log2","tap",function(){
//			window.location.href="wodeshezhi.html"
//		})
		


		