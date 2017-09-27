$(function(){

//图文评论切换
var aTabList=$(".z-tabList");
var aTabpp=$(".z-tabpp");
$(".z-tab-ul").delegate(".z-tabList","tap",function(){
//aTabList.click(function(){
//touch.on(".z-tabList","tap",function(){//点谁 this 指向谁！而不是指向绑定对象
	aTabList.find("em").removeClass("z-lin");
	$(this).find("em").addClass("z-lin");
	aTabpp.addClass("z-none");
	aTabpp.eq($(this).index()).removeClass("z-none");
})

//截取地址传参
function getHref(){
	//接受传递过来的地址参数
    var s=decodeURI(window.location.search.substr(1));
//  console.log(s);
    var arr1= s.split("&");
    var obj={};
    $(arr1).each(function(i){
        var arr=this.split("=");
//          console.log(arr);
		//数组转成对象
        obj[arr[0]]=arr[1];
//          console.log(obj)
    })
//      console.log(obj);
    return obj;
}

//请求响应数据
var dataHref=getHref();//取得传参
//var dataHref="hetaojiazao";
//console.log(dataHref.goodsid);
$.ajax({
    url:"../json/detail.json",
    dataType:"json",
    success:function(data){
//      console.log(data[dataHref.goodsid]);
		var _data=data[dataHref.goodsid];
		//console.log(_data);
		if(_data==undefined){
			var lay=layer.msg('加载中', {icon: 16,time:10*1000},function(){
				layer.msg('加载失败，请重试',function(){});
			});		
		}else{
			//console.log(_data.goodsPic);
			$(_data.goodsPic).each(function(i){
				var $lunPic=$("#z-goodsPic .swiper-wrapper li").eq(0).clone().removeClass("hidden");
				$lunPic.find("img").attr("src",_data.goodsPic[i]);
				$lunPic.addClass("swiper-slide");
				$lunPic.appendTo($("#z-goodsPic .swiper-wrapper"));
			})
			//价格
			$(".z-newPrice").html(_data.newPrice);
			$(".z-price del").html(_data.price);
			//标题
			$(".z-title h1").html(_data.title);
			$(".z-title p").html(_data.subTitle);
			$(".z-title span").html(_data.guige);
			//图文详情
			$(_data.tuwen).each(function(i){
				var $tuwen=$(".z-tabpp li").eq(0).clone().removeClass("hidden");
				$tuwen.find("img").attr("src",_data.tuwen[i]);
				$tuwen.appendTo($(".tabpp-ul"));
			})
			//评论
	//		console.log(_data.pinglun.length);
			$(".z-pj-number span").html(_data.pinglun.length);
			$(_data.pinglun).each(function(i){
	//			console.log(_data.pinglun[i]);
				var $pinglun=$(".pj-ul li").eq(0).clone().removeClass("hidden");
				$(".pj-ul li .tab-name").eq(i).html(_data.pinglun[i].tel);
				$(".pj-ul li .tab-time").eq(i).html(_data.pinglun[i].time);
				$(".pj-ul li .tab-page").eq(i).html(_data.pinglun[i].count);
				$pinglun.appendTo($(".pj-ul"));
			})
			
			
			//swiper初始化
			var swiper = new Swiper('.swiper-container', {
				pagination : '.swiper-pagination',
				paginationType : 'fraction',
				autoplay : 5000,
				autoplayDisableOnInteraction : false,
				loop:true
			});
			
			//购物车数据同步
			var cart_item=localStorage.getItem("cartdata");
			//因为是字符串所以要>2, "[]" 这是两个长度
			if(cart_item&&cart_item.length>2){
				$(".cart-number").text(JSON.parse(cart_item).length);
			}else{
				$(".cart-number").text(0);
			}
			//点击购物车功能
			touch.on(".z-addBtn span","tap",function(){
				if(localStorage.login_success){
					//获取本地数据
					var dataarr=localStorage.getItem("cartdata")?JSON.parse(localStorage.getItem("cartdata")):[];
					var datajson={
									"url":_data.goodsPic[0],
									"tit":_data.title,
									"price":parseFloat(_data.newPrice),
									"number":1,
									"id":_data.goodsid
							}
						//数据往前插,确保新添加的在最前面
						dataarr.unshift(datajson);
						//往本地存
						localStorage.cartdata=JSON.stringify(dataarr);
					var cartnew=parseInt($(".cart-number").text());
					cartnew++;
					$(".cart-number").text(cartnew);
					layer.msg('加入购物车成功');
				}else{
					window.location.href="../html/login.html";
				}
			})
			
			//判断是否收藏过
			var scData=localStorage.getItem("shoucang");
			if(scData && scData.length>2){
				scData=JSON.parse(scData);
				for(var i=0; i<scData.length; i++){
					if(scData[i].id==_data.goodsid){
						$(".collection i").addClass("icon-iconcollected");
						$(".collection i").removeClass("icon-iconcollect");
					}
				}
			}
			//点击收藏
			$(".z-footer").delegate(".collection","tap",function(){
//			touch.on(".collection","tap",function(){
				var scArr=localStorage.getItem("shoucang")?JSON.parse(localStorage.getItem("shoucang")):[];
				//判断点击的是不是已经收藏过的
				if($(".collection i").hasClass("icon-iconcollect")){//是空心的就存一下
					var scData={
						"picurl":_data.goodsPic[0],
						"title":_data.title,
						"subtitle":_data.subTitle,
						"price":parseFloat(_data.newPrice),
						"id":_data.goodsid
					}
					scArr.unshift(scData);
					localStorage.shoucang=JSON.stringify(scArr);
					layer.msg('加入收藏成功');
				}else{//是实心的就删除
					if(scArr){
						for(var i=0; i<scArr.length; i++){
							if(scArr[i].id==_data.goodsid){
								console.log(scArr);
								scArr.splice(i);
								localStorage.shoucang=JSON.stringify(scArr);
								layer.msg('已取消收藏');
							}
						}
					}
				}
				//切换
				$(".collection i").toggleClass("icon-iconcollected");//实心
				$(".collection i").toggleClass("icon-iconcollect");//空心
			})

			//每一秒执行一下倒计时函数
			setInterval(function(){
				GetTime(_data.countdown);
			},1000)
			
	    	//转换时间戳
//			function time(stamp) {
//			    var date,time;
//			    time = new Date(stamp);
//			    date = time.getFullYear() + '-' + add0(time.getMonth()+1) + '-' + add0(time.getDate())
//			        +" "+add0(time.getHours())+":"+add0(time.getMinutes())+':'+add0(time.getSeconds());
//			    return date;
//			}
			//倒计时
			function GetTime(endTime){
			    var nowTime = Math.round(new Date().getTime()/1000);
//			    console.log(nowTime);
			    var t = endTime - nowTime;
			    var d=0;
			    var h=0;
			    var m=0;
			    var s=0;
			    if(t>=0){
			        d=Math.floor(t/60/60/24);//天
			        h=Math.floor(t/60/60%24);//时
			        m=Math.floor(t/60%60);//分
			        s=Math.floor(t%60);//秒
			        h=add0(h);
			        m=add0(m);
			        s=add0(s); 
			        var time="剩"+d+"天"+h+"时"+m+"分"+s+"秒";
			        $(".z-time").html(time);
//			        return time;
			    }
			}
			function add0(n) {
			    if(n < 10) {
			        n = '0' + n;
			    }
			    return n;
			}
	    	
	    	//服务窗口
		    touch.on(".z-carry","tap",function(){
				//显示遮盖
				$(".z-zhegai").removeClass("hidden");
				//禁用滚动条
				$("body").addClass("z-rolling");
				//显示窗口
				$(".z-fuwu").addClass("rising");
			})
	    	//关闭窗口
	    	touch.on(".z-close","tap",function(){
	    		$(".z-zhegai").addClass("hidden");
	    		$("body").removeClass("z-rolling");
	    		$(".z-fuwu").removeClass("rising");
	    	})
	    }
    
    }
    
})




})