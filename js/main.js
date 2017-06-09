/*
弹出层
*/
$(function(){
	//展示层
	function showLayer(id){
		var layer = $('#'+id),
			layerwrap = layer.find('.hw-layer-wrap');
		layer.fadeIn();
		//屏幕居中
		layerwrap.css({
			'margin-top': -layerwrap.outerHeight()/2
		});
	}

	//隐藏层
	function hideLayer(){
		$('.hw-overlay').fadeOut();
	}

	$('.hwLayer-ok,.hwLayer-cancel,.hwLayer-close').on('click', function() {
		hideLayer();
	});

	//触发弹出层
	$('.show-layer').on('click',  function() {		
		var layerid = $(this).data('show-layer');
		showLayer(layerid);
	});

	//点击或者触控弹出层外的半透明遮罩层，关闭弹出层
	$('.hw-overlay').on('click',  function(event) {
		if (event.target == this){
			hideLayer();
		}
	});

	//按ESC键关闭弹出层
	$(document).keyup(function(event) {
		if (event.keyCode == 27) {
			hideLayer();
		}
	});
});



$.ajax({
    method: "GET",
    url:"http://39.108.63.108/Sign_In/AdminStudent/findAll.action?page=1",
  })
    .done(function(msg){
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr class='pag_li' id='pag_li"+i+"'><td>"+msg.rows[i].sname+"</td>"+"<td>"+msg.rows[i].snumber+"</td>"+"<td>"+msg.rows[i].ssex+"</td>"+"<td>"+msg.rows[i].sage+"</td>"+"<td>"+msg.rows[i].dbAcademy.aname+"</td>"+"<td"+" class='content_button'><button onclick='del("+i+")'>删除</button><button>修改</button></td>"+"</td></tr>";
				$("#dataTbody").append(tTr);
			}
			var page=Math.ceil(msg.total / 20);
			for(var j=page;j>0;j--)
			{
				var tUl="<li><a onclick='paging("+j+")'>"+j+"</a></li>";
				$("#Upage").after(tUl);
			}
	});



function paging(j){
	var Url="http://39.108.63.108/Sign_In/AdminStudent/findAll.action?page="+j;
	$.ajax({
		method: "GET",
		url: Url,
	})
	.done(function(msg){
    	$("tr").remove(".pag_li");
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr class='pag_li' id='pag_li"+i+"'><td>"+msg.rows[i].sname+"</td>"+"<td>"+msg.rows[i].snumber+"</td>"+"<td>"+msg.rows[i].ssex+"</td>"+"<td>"+msg.rows[i].sage+"</td>"+"<td>"+msg.rows[i].dbAcademy.aname+"</td>"+"<td"+" class='content_button'><button onclick='del("+i+")'>删除</button><button>修改</button></td>"+"</td></tr>";
				$("#dataTbody").append(tTr);
			}
	});
}



$(document).ready(function(){ 
$('#lastinput').click(function(){
      $.ajax({
         url:"http://39.108.63.108/Sign_In/AdminStudent/add.action",
         type:'post',         
         data:$("#mainform").serialize(), 
      });        
   });
 })


function del(i){
	$("tr[id='pag_li"+i+"']").remove();
}
