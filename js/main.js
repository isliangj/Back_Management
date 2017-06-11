var Mymsg;
var Myi;


$.ajax({
    method: "GET",
    url:"http://39.108.63.108/Sign_In/AdminStudent/findAll.action?page=1",
  })
    .done(function(msg){
			Mymsg=msg;
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr class='pag_li' id='pag_li"+i+"'><td>"+msg.rows[i].sname+"</td><td>"+msg.rows[i].snumber+"</td><td>"+msg.rows[i].ssex+"</td><td>"+msg.rows[i].sage+"</td><td>"+msg.rows[i].dbAcademy.aname+"</td><td class='content_button'><button onclick='del("+i+")'>删除</button><button class='btn btn-info btn-lg show-layer' data-show-layer='hw-layer' onclick='update("+i+")'>修改</button></td></tr>";
				$("#dataTbody").append(tTr);
				$(function show(){
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
			}

			Myi =i;
			var page=Math.ceil(msg.total / 20);
			for(var j=page;j>0;j--)
			{
				var tUl="<li><a onclick='paging("+j+")'>"+j+"</a></li>";
				$("#Upage").after(tUl);
			}
	});


function paging(j){
	$.ajax({
		method: "GET",
		url: "http://39.108.63.108/Sign_In/AdminStudent/findAll.action?page="+j,
	})
	.done(function(msg){
			Mymsg=msg;
    	$("tr").remove(".pag_li");
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr class='pag_li' id='pag_li"+i+"'><td>"+msg.rows[i].sname+"</td><td>"+msg.rows[i].snumber+"</td><td>"+msg.rows[i].ssex+"</td><td>"+msg.rows[i].sage+"</td><td>"+msg.rows[i].dbAcademy.aname+"</td><td class='content_button'><button onclick='del("+i+")'>删除</button><button class='btn btn-info btn-lg show-layer' data-show-layer='hw-layer'>修改</button></td></tr>";
				$("#dataTbody").append(tTr);

				$(function show(){
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

			}
			Myi = i;
	});
}

/*
增加
*/

$(document).ready(function(){ 
$('#lastinput').click(function(){
      $.ajax({
         url:"http://39.108.63.108/Sign_In/AdminStudent/add.action?" + $("#mainform").serialize(),
         type:'GET',
      });
			var sname= $("input[name='sname']").val();
			var snumber= $("input[name='snumber']").val();
			var ssex= $("input[name='ssex']").val();
			var sage= $("input[name='sage']").val();
			var sdata= $("input[name='sdata']").val();
			var cid= $("input[name='cid']").val();
			var aid=$("select[name='aid']").find("option:selected").text();
			Myi++;

			var tTr="<tr class='pag_li' id='pag_li"+Myi+"'><td>"+sname+"</td><td>"+snumber+"</td><td>"+ssex+"</td><td>"+sage+"</td><td>"+aid+"</td><td class='content_button'><button onclick='del("+Myi+")'>删除</button><button class='btn btn-info btn-lg show-layer' data-show-layer='hw-layer'>修改</button></td></tr>";
			$("#dataTbody").append(add_tr);
			document.getElementById("mainform").reset(); 
	});
 })

/*
删除
*/

function del(i){
	$("tr[id='pag_li"+i+"']").remove();
	ids=Mymsg.rows[i].sid;
	$.ajax({
		url:"http://39.108.63.108/Sign_In/AdminStudent/delete.action?ids=" + ids,
		type:"GET",
	});
}


/*
更改
*/

function update(i){
	$("input[name='sname']").val(Mymsg.rows[i].sname);
	$("input[name='snumber']").val(Mymsg.rows[i].snumber);
	$("input[name='ssex']").val(Mymsg.rows[i].ssex);
	$("input[name='sage']").val(Mymsg.rows[i].sage);
	$("input[name='sdata']").val(Mymsg.rows[i].sdata);
	$("input[name='cid']").val(Mymsg.rows[i].cid);
	$("select[name='aid']").val(Mymsg.rows[i].dbAcademy.aid);

	$('#updateinput').click(function(){
		$.ajax({
			url:"http://39.108.63.108/Sign_In/AdminStudent/update.action?" + $("#mainform").serialize() +"&sid="+Mymsg.rows[i].sid,
			type:'GET',
		});
		$("tr").remove("#pag_li"+i);

		var sname= $("input[name='sname']").val();
		var snumber= $("input[name='snumber']").val();
		var ssex= $("input[name='ssex']").val();
		var sage= $("input[name='sage']").val();
		var sdata= $("input[name='sdata']").val();
		var cid= $("input[name='cid']").val();
		var aid=$("select[name='aid']").find("option:selected").text();
		Myi++;

		var tTr="<tr class='pag_li' id='pag_li"+Myi+"'><td>"+sname+"</td><td>"+snumber+"</td><td>"+ssex+"</td><td>"+sage+"</td><td>"+aid+"</td><td class='content_button'><button onclick='del("+Myi+")'>删除</button><button class='btn btn-info btn-lg show-layer' data-show-layer='hw-layer'>修改</button></td></tr>";
		$("#dataTbody").append(tTr);
		document.getElementById("mainform").reset();
		});
}

/*
搜索
*/
$('#search_btn').click(function(){
	var sel_sel=$("select[name='search_sel']").val();
	var sel_inp= $("input[name='search']").val();

	$.ajax({
		url:"http://39.108.63.108/Sign_In/AdminStudent/select.action?" + sel_sel + "=" +sel_inp,
		type:'GET',
	})
		.done(function(msg){
			Mymsg=msg;
    	$("tr").remove(".pag_li");
			for(var i=0;i<msg.rows.length;i++)
			{
      	var tTr="<tr class='pag_li' id='pag_li"+i+"'><td>"+msg.rows[i].sname+"</td><td>"+msg.rows[i].snumber+"</td><td>"+msg.rows[i].ssex+"</td><td>"+msg.rows[i].sage+"</td><td>"+msg.rows[i].dbAcademy.aname+"</td><td class='content_button'><button onclick='del("+i+")'>删除</button><button class='btn btn-info btn-lg show-layer' data-show-layer='hw-layer'>修改</button></td></tr>";
				$("#dataTbody").append(tTr);

				$(function show(){
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

			}
			Myi = i;
		});
	});