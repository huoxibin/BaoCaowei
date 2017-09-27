$(function(){
	//请求响应数据
	$.ajax({
		url:"../json/hot.json",
		async:true,
		success:function(data){
//			console.log(data);//数组
			$(data).each(function(i){
				console.log(data[i].top)
				var ptLi=$(".product-list li").eq(0).clone().removeClass("hidden");
				ptLi.find(".z-top img").attr("src",data[i].top);
				ptLi.find(".pro-img img").attr("src",data[i].pic);
				ptLi.find(".pro-name").html(data[i].title);
				ptLi.find(".pro-txt").html(data[i].subtitle);
				ptLi.find(".pro-price span").html(data[i].price);
				ptLi.appendTo($(".product-list"));
			})
			//***跳转详情
			$(".product-list").delegate("li a","tap",function(){
//				console.log($(this));
				var index=$(this).parent().index();
				window.location.href="details.html?goodsid="+data[index-1].goodsid;
//				console.log(data[index-1].goodsid)	
			})
			
			//***购物车数据同步
			var cart_item=localStorage.getItem("cartdata");
			//因为是字符串所以要>2, "[]" 这是两个长度
			if(cart_item&&cart_item.length>2){
				$(".cart-num").text(JSON.parse(cart_item).length);
			}else{
				$(".cart-num").text(0);
			}
			//加入购物车功能
			touch.on(".z-addGWC","tap",function(){
				if(localStorage.login_success){//存在则为已经登陆
					var i=$(this).parent().index();
					//获取本地数据
					var dataarr=localStorage.getItem("cartdata")?JSON.parse(localStorage.getItem("cartdata")):[];
					var datajson={
									"url":data[i-1].pic,
									"tit":data[i-1].title,
									"price":parseFloat(data[i-1].price),
									"number":1,
									"id":data[i-1].goodsid
							}
						//数据往前插
						dataarr.unshift(datajson);
						//往本地存
						localStorage.cartdata=JSON.stringify(dataarr);
					var cartnew=parseInt($(".cart-num").text());
					cartnew++;
					$(".cart-num").text(cartnew);
					layer.msg('加入购物车成功');
				}else{//未登录
					window.location.href="../html/login.html";
				}
			});
		}
	});
})
