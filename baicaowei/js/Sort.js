$(function(){
	
	$('footer').load('common_footer.html',function(){
		$('.foot-b a').attr('href','###')
		$(".foot-b .icon-circle").addClass("on");
		$(".foot-b .icon-circlefill").removeClass("on");
	})
	
	touch.on('.Dolo_search','tap',function(){
		window.location.href="Search.html"
	})
	
   touch.on('.Dolo_main ul a','tap',function(){
		var idex = $(this).parent().attr('idex')	
		window.location.href="List.html?idex="+idex;
	}) 

	var swiper = new Swiper('.swiper-container', {

        /*pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        preventClicks:true,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }*/
       
       autoplay: 2000,
       loop:true,
       pagination: '.swiper-pagination',
       autoplayDisableOnInteraction : false,
       speed:500,
       effect : 'coverflow',
       slidesPerView: 1.3,
       centeredSlides: true
       
    });
    //tap开始
    var tap_start=0,tap_end=0;
    touch.on(".Dolo_main a"," touchstart",function(e){
//		console.log(e.touches[0].clientX)
	  tap_start=e.touches[0].clientX
	})
    //tap结束
    touch.on('.Dolo_main .swiper-wrapper a','touchend ',function(e){
		var idex = $(this).parent().attr('idex')
		tap_end=e.changedTouches[0].clientX
//		console.log(e.changedTouches[0].clientX)
		if(tap_start==tap_end){
			window.location.href="List.html?idex="+idex;
		}
	})

	//购物车数据同步
		var cart_item=localStorage.getItem("cartdata");
		if(cart_item&&cart_item.length>2){
			$(".cart-num").text(JSON.parse(cart_item).length)
		}else{
			$(".cart-num").text(0);
		}
	
})
