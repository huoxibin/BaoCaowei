$(document).ready(function(){
	
	$("footer").load("html/common_footer.html",function(){
		$(".foot-a a").attr("href","javascript:;");
		$(".foot-b a").attr("href","html/Sort.html");
		$(".foot-c a").attr("href","html/cart.html");
		$(".foot-d a").attr("href","html/wode.html");
		$(".foot-a .icon-home").addClass("on");
		$(".foot-a .icon-homefill").removeClass("on");
	})
	
	$.get("json/index.json",Mata);
	var $ul=$("<ul></ul>").appendTo(".index-content");
	var dataid=[];
	function Mata(data){
		
		for(var i=0;i<data.length;i++){
//			console.log(data[i].goodsid);
			dataid.push(data[i].goodsid);
			var $li=$("<li></li>").appendTo($ul);
			var $a=$("<a href='javascript:;'></a>").appendTo($li);
			
			var $img=$("<img src='"+data[i].src+"' />").appendTo($a);

			var $price=$("<p class='index-list-page-top'></p>").appendTo($a);
			$price.html(data[i]["index-list-page-top"]);
			
			var $sis=$("<em class='index-jiage'></em>").appendTo($price)
			$sis.html(data[i]["index-jiage"]);
			
			var $pro=$("<p class='index-list-page-bottom'></p>").appendTo($a);
			$pro.html(data[i]["index-list-page-bottom"]);
			
			var $sem2=$("<em class='index-shijian'></em>").appendTo($pro);
			$sem2.html(data[i]["index-shijian"]);
			
		}
		
		$(".index-content ul").delegate("li a","tap",function(){
			var index=$(this).parent().index();
	      	window.location.href="html/details.html?goodsid="+dataid[index];
//			console.log(dataid[index]);
    	})	
	}
	
//	中部导航栏按钮
	$oLi=$(".index-choose .clear li").eq(0);
		touch.on($oLi,"tap",function(){
			window.location.href="html/xinrenlibao.html"
		})
	$oLi=$(".index-choose .clear li").eq(1);
		touch.on($oLi,"tap",function(){
			window.location.href="html/meiriqiandao.html"
		})
	$oLi=$(".index-choose .clear li").eq(2);
		touch.on($oLi,"tap",function(){
			window.location.href="html/hot.html"
		})
	$oLi=$(".index-choose .clear li").eq(3);
		touch.on($oLi,"tap",function(){
			window.location.href="html/shichi.html"
		})
})












