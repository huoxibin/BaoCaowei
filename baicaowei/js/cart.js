$(function(){
	$("footer").load("common_footer.html",function(){
		$(".foot-c a").attr("href","javascript:;");
		$(".foot-c .icon-cart").addClass("on");
		$(".foot-c .icon-cartfill").removeClass("on");
	});//载入底部导航
	
	var islocal=localStorage.getItem("cartdata");         //本地数据是否存在
	if(islocal&&islocal.length>2){                        //存在
		var data_odd=JSON.parse(islocal);                 //转成对象，存在重复项
		var data=[data_odd[0]];                           //准备存放新的不重复的项，先加进去第一项
		for(var i=1;i<data_odd.length;i++){               //逐个比较
			var hasitem=false;
			for(var j=0;j<data.length;j++){
				if(data_odd[i].id==data[j].id){           //重复项存在
					data[j].number++;                     //只增加数量
					hasitem=true;
				}
			}
			if(!hasitem)data.push(data_odd[i]);           //没重复，加进新数组
		}
		localStorage.cartdata=JSON.stringify(data);       //更新本地数据
		cartgoods(data);
	}else{
		$(".cart-list>div").css("display","block");
		$(".cart-list>ul").css("display","none");
	};

	function cartgoods(data){
		var totalmony=0;//保存商品总价值；
		var totalnum=0;//保存商品数；
		var checknum=0;//保存选择的商品条目，为全选准备；
		var quanonoff=true;//判断是否全选的变量；
		var allmony=0;//保存加入购物车的总价值；
		var allnum=0;//保存加入购物车总商品数；
	//生成购物车商品
		var $Ul=$("<ul></ul>");
		for(var i=0;i<data.length;i++){
			var $Li=$("<li></li>").appendTo($Ul);
			$("<div class='check-box'><i class='check-icon'></i></div>").appendTo($Li);
			$("<div class='good-pic'><a href='javascript:;'><img src="+data[i].url+" alt=''/></a></div>").appendTo($Li);
			var $Div3=$("<div class='good-detail'></div>");
			$("<p>"+data[i].tit+"</p>").appendTo($Div3);
			var $numbox=$("<div class='good-numbox'></div>");
			$("<span class='pro-price'>¥"+data[i].price+"</span>").appendTo($numbox);
			$("<div><button class='cutnum'>－</button><input type='text' class='buynum' value="+data[i].number+" /><button class='addnum'>＋</button></div>").appendTo($numbox);
			$numbox.appendTo($Div3);
			$Div3.appendTo($Li);
			totalnum+=data[i].number;
			totalmony+=data[i].number*data[i].price;
			checknum++;
		}
		$Ul.appendTo($(".cart-list"));
		
	//初始化数据
		allnum=totalnum;
		allmony=totalmony;
		baoyou();
		gengxin();
	//商品选择框按钮点击
		$(".check-icon").each(function(index){
			this.onoff=true;
			touch.on($(this),"tap",function(){
				var pronum=parseInt($(this).parent().parent().find("input").val());
				var promoney=pronum*data[index].price;
				this.onoff=!this.onoff;
				if(this.onoff){
					$(this).css("background-image","url(../img/check_s.png)");
					checknum++;
					totalnum+=pronum;
					totalmony+=promoney;
					baoyou();
					gengxin();
					if(checknum==$(".cart-list li").length){
						$(".check-all i").css("background-image","url(../img/check_s.png)");
						quanonoff=true;
					}
				}else{
					$(this).css("background-image","url(../img/check_n.png)");
					checknum--;
					totalnum-=pronum;
					totalmony-=promoney;
					baoyou();
					gengxin();
					$(".check-all i").css("background-image","url(../img/check_n.png)");
					quanonoff=false;
				}
			})
		})
	//全选按钮点击
		touch.on(".check-all i","tap",function(){
			quanonoff=!quanonoff;
			if(quanonoff){
				$(this).css("background-image","url(../img/check_s.png)");
				$(".check-icon").prop("onoff",true).css("background-image","url(../img/check_s.png)");
				checknum=$(".cart-list li").length;
				totalnum=allnum;
				totalmony=allmony;
				baoyou();
				gengxin();
			}else{
				$(this).css("background-image","url(../img/check_n.png)");
				$(".check-icon").prop("onoff",false).css("background-image","url(../img/check_n.png)");
				checknum=0;
				totalnum=0;
				totalmony=0;
				baoyou();
				gengxin();
			}
		})
	//加按钮点击事件
		$(".addnum").each(function(index){
			touch.on($(this),"tap",function(){
				var $numobj=$(this).parent().find("input");
				var buy_num=parseInt($numobj.val());
				if(buy_num>9){
					$(".warn-tip").text("该商品最多购买10件~").addClass("warn_go");
					$(".warn-tip").on("webkitAnimationEnd",function(){
						$(this).removeClass("warn_go");
					})
					return;
				}
				buy_num++;
				allnum++;
				totalnum++;
				allmony+=data[index].price;
				totalmony+=data[index].price;
				$numobj.val(buy_num);
				baoyou();
				gengxin();
			})	
		})
	//减按钮点击事件
		$(".cutnum").each(function(index){
			touch.on($(this),"tap",function(){
				var $numobj=$(this).parent().find("input");
				var buy_num=parseInt($numobj.val());
				if(buy_num<2){
					$(".warn-tip").text("最少购买1件吧~").addClass("warn_go");
					$(".warn-tip").on("webkitAnimationEnd",function(){
						$(this).removeClass("warn_go");
					})
					return;
				}
				buy_num--;
				allnum--;
				totalnum--;
				allmony-=data[index].price;
				totalmony-=data[index].price;
				$numobj.val(buy_num);
				baoyou();
				gengxin();
			})	
		})	
	//更新总钱数和总数量的函数
		function gengxin(){
			$(".allmony>i").text("¥"+totalmony.toFixed(2));
			$(".topay span").text("("+totalnum+")");
			$(".cart-num").text(totalnum);
		}
	//包邮提示信息函数
		function baoyou(){
			var bynum=(68-totalmony).toFixed(2);
			$(".cart-warn em").text(bynum);
			if(bynum<=0){
				$(".cart-warn a").css("display","none");
				$(".cart-warn div").css("display","block");
			}else{
				$(".cart-warn div").css("display","none");
				$(".cart-warn a").css("display","block");
			}
		}
	//删除商品条目函数
		function goods_del(){
			var dataarr=JSON.parse(localStorage.getItem("cartdata"));
			for(var i=0;i<$(".check-icon").length;i++){
				var cheone=$(".check-icon").eq(i);
				if(cheone.prop("onoff")){
					dataarr.splice(i,1);
					allnum-=parseInt(cheone.parent().parent().find("input").val());
					allmony-=parseFloat(cheone.parent().parent().find(".pro-price").text().slice(1));
					cheone.parent().parent().remove();
					i--;
				}
			}
			checknum=0;
			totalnum=0;
			totalmony=0;
			baoyou();
			gengxin();
			$(".check-all i").css("background-image","url(../img/check_n.png)");
			quanonoff=false;
			if(dataarr.length==0){
				$(".cart-list>div").css("display","block");
				$(".cart-list>ul").css("display","none");
			}
			var datastr=JSON.stringify(dataarr);
			localStorage.cartdata=datastr;
		}
	//删除按钮点击事件
		touch.on("#del-cart","tap",function(){
			if(totalnum<=0){
				$(".warn-tip").text("没有选中任何要删除的商品~").addClass("warn_go");
				$(".warn-tip").on("webkitAnimationEnd",function(){
					$(this).removeClass("warn_go");
				})
				return;
			}
			$(".del-sure").css("display","block");
		})
	//删除框中取消按钮
		$(".del-sure em").eq(1).on("tap",function(){
			$(".del-sure").css("display","none");
		})
	//删除框中确定按钮
		$(".del-sure em").eq(0).on("tap",function(){
			$(".del-sure").css("display","none");
			goods_del();
		})
	//支付按钮点击
		touch.on(".topay>a","tap",function(){
			$(".warn-tip").text("此功能未开通啊~").addClass("warn_go");
			$(".warn-tip").on("webkitAnimationEnd",function(){
				$(this).removeClass("warn_go");
			})
		})
	}
})