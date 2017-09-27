	
	var $aLi=$(".banner").find("li");
	var $div=$(".banner").find("div");
	
	touch.on($aLi,"tap",function(){
		var i=$(this).index();
		$(this).css({
			borderBottom:'3px solid red'
		}).siblings().css({
			borderBottom:'none'
		})
		$div.hide();
		$div.eq(i).show()
	})
	
	touch.on("header i","tap",function(){
		window.location.href="wode.html"
	})

	$(document).ready(function(){
		$.get("../json/youhuiquan.json",Mata);
		var $ul=$("<ul></ul>").appendTo(".banner1");
		function Mata(data){
			for(var i=0;i<data.length;i++){
				var $li=$("<li></li>").appendTo($ul);
				var $img=$("<img class='img1' src='"+data[i].src+"'/>").appendTo($li);
				var $price=$("<p class='price'></p>").appendTo($li);
				$price.html(data[i]["price"]);
				var  $price1=$("<p class='price1'></p>").appendTo($li);
				$price1.html(data[i]["price1"]);
				var $price2=$("<p class='price2'></p>").appendTo($li);
				$price2.html(data[i]["price2"]);
				var $shijian=$("<p class='shijian'></p>").appendTo($li);
				$shijian.html(data[i]["shijian"]);
				var $price3=$("<p class='price3'></p>").appendTo($li);
				$price3.html(data[i]["price3"]);
				var $img1=$("<img class='img11' src='"+data[i].src1+"'/>").appendTo($li);
				$img1.html(data[i]["src1"])
			}
		}
	})
	

