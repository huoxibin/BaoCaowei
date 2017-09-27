$(function(){
	$('footer').load('common_footer.html',function(){
		$(".foot-b .icon-circle").addClass("on");
		$(".foot-b .icon-circlefill").removeClass("on");
	})
	
	function getHref(){
        var s=decodeURI(window.location.search.substr(1));
        var arr1= s.split("&");
        var obj={};
        $(arr1).each(function(i){
            var arr=this.split("=");
            obj[arr[0]]=arr[1];
        })
        return obj;
   	}
  	var hrefObj=getHref().idex;
  	console.log(hrefObj)
	
	
	$.ajax({
		type:"get",
		url:"../json/List.json",
		success:function(data){
			var goodsId = data[hrefObj].goodsId
			console.log(data[hrefObj])
			var tit = data[hrefObj].tit
			$('.tit').text(tit)
			var str=''
			for(var i=0;i<data[hrefObj].pic.length;i++ ){
					str+="<li>"+
						"<img src='../img/List/"+data[hrefObj].pic[i]+"' >"+
						"<p class='descripte'>"+data[hrefObj].goods[i]+"</p>"+
						"<p class='price'>￥<span>"+data[hrefObj].price[i]+"</span></p>"+
					"</li>"
			}
			$(str).appendTo($('.main ul'))
			touch.on('.main ul li','tap',function(){
				var index = $(this).parent().index()
				console.log(goodsId[index])
				window.location.href="details.html?goodsid="+goodsId[index];
			})	
		}
	});
		
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
