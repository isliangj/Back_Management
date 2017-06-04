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
        url: "http://39.108.63.108/Sign_In/AdminStudent/findAll.action?page=1",              //请求地址
        type: "POST",                       //请求方式
        data: { 
					sid: arr[11],
					sname: sname, 
					snumber: snumber,

					age: 20 },        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });

    function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
    }
