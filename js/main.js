/*弹出层*/
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
    url:"http://39.108.63.108/Sign_In/AdminTeacher/findAll.action?page=1",
  })
    .done(function(msg){
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr><td>"+msg.rows[i].tname+"</td>"+"<td>"+msg.rows[i].tnumber+"</td>"+"<td>"+msg.rows[i].tsex+"</td>"+"<td>"+msg.rows[i].tage+"</td>"+"<td>"+msg.rows[i].dbAcademy.aname+"</td>"+"<td>"+"</td>"+"</td></tr>";
				$("#dataTbody").append(tTr);
		}  
	});

