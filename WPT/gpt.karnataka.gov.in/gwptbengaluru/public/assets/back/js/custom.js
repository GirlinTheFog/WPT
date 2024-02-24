$(document).ready(function(){
	//Datatable code #START
    var table = $('.datatable').dataTable({
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
        "sPaginationType": "bootstrap",
		"aLengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        },
		"bSort" : false
    });
	function customDeleteAndResetTable(row_pos)
	{
		var oTable = $('.datatable').dataTable();
		oTable.fnDeleteRow(row_pos);
	}
	//Datatable code #END
	$( "#sortable" ).sortable({
		axis: 'y',
		update: function (event, ui) {
			var data = $(this).sortable('serialize');

			// POST to server using $.post or $.ajax
			$.ajax({
				data: data,
				type: "GET",
				url: base_url+"/back/save_order/"+$(this).closest("table").data("key")
			});
		}
	});
    $( "#sortable" ).disableSelection();

	$(document).on("click", ".restore_item_button", function(){
		var restore_button_html = $(this).html();
		$(this).html("Please wait");
		
		var row_pos_handler = this;
		var restore_details = $(this).data("details");
		$.ajax({
				url: base_url+"/back/restore_item/"+restore_details.table+"/"+restore_details.id,
				type: "GET",
				dataType: "JSON",
				success: function(data){
					$(this).html(restore_button_html);
					if(data.status){
						var row = $(row_pos_handler).closest("tr").get(0);
						customDeleteAndResetTable(row);
					}
					else
						alert("Something went wrong, please refresh and try again.");
				}
		});
	});
	
	$(document).on( "click", ".add_menu_button", function(){
		$("#add_edit_menu_form").find("input").each(function(){
			$(this).val("");
		});
		$("select[name='parent']").val("0_0");
		$("select[name='page']").val("0");
		$("select[name='menu_category']").val("0");
		$("input[name='menu_id']").val("0");
		$("input[name='external_link']").val("#");
		$("input[name='kn_external_link']").val("#");
		$("input[name='media_id']").val("0");
		$("input[name='sam_sign']").val("0");
		$("#menu_modal_featured_image").html("");
		$("input[name='add_menu_submit_button']").val("Save");
		
		$("#add_edit_menu_modal").modal("show");
	});
	$(document).on( "click", ".edit_menu_button", function(){
		var details = $(this).data("details");
		var select_op_val = "0_0";
		if(parseInt(details.level)>0){
			var exp_level = parseInt(details.level)-1;
			select_op_val = details.parent_id+"_"+exp_level;
		}
		else
			select_op_val = details.parent_id+"_"+details.level;
		$.ajax({
				url: base_url+"/back/menus/"+details.menu_category_id+"/"+details.menu_id,
				type: "GET",
				dataType: "JSON",
				success: function(data){
							$("select[name='parent']").val(select_op_val);
							$("select[name='page']").val(data.menu_data["list"][details.menu_id].page_id);
							$("select[name='menu_category']").val(details.menu_category_id);
							$("input[name='external_link']").val(data.menu_data["list"][details.menu_id].external_link);
							$("input[name='kn_external_link']").val(data.menu_data["list"][details.menu_id].kn_external_link);
							$("input[name='name']").val(data.menu_data["list"][details.menu_id].menu_name);
							$("input[name='kn_name']").val(data.menu_data["list"][details.menu_id].kn_menu_name);
							$("input[name='icon_classes']").val(data.menu_data["list"][details.menu_id].icon_classes);
							$("input[name='menu_classes']").val(data.menu_data["list"][details.menu_id].menu_classes);
							$("input[name='menu_id']").val(details.menu_id);
							if(data.menu_data["list"][details.menu_id].media_id)
							 $("input[name='media_id']").val(data.menu_data["list"][details.menu_id].media_id);
							$(".menu_approve_btn").remove();
							
							var media_link = "";
							var media_name = data.menu_data["list"][details.menu_id].media_name;
							if(media_name){
								media_link = "<a target='_blank' href='"+base_url+"/uploads/"+media_name+"'>View Image</a>";
								if(parseInt($("input[name='user_group_id']").val()) != parseInt(ut_approver))
									media_link += " | Remove Image <input type='checkbox' name='remove_featured_image' value='1'>";
							}
							$("#menu_modal_featured_image").html(media_link);
							if(parseInt(data.menu_data["list"][details.menu_id].menu_status) == 1 && 
							(parseInt($("input[name='user_group_id']").val()) == parseInt(ut_approver) || 
							parseInt($("input[name='user_group_id']").val()) == parseInt(ut_super_admin)))
							{
								var approve_link = "<a href='"+base_url+"/back/approve_content/"+data.menu_data["list"][details.menu_id].menu_id+"/2' class='btn btn-success menu_approve_btn' >Approve</a>";
								$("#menu_footer_buttons_div").append(approve_link);
							}
								
							$("#add_edit_menu_modal").modal("show");
						}
			});
	});
	
	$('#ceg_icon_repo').on('hidden.bs.modal', function () {
		$("#add_edit_menu_modal").modal("show");
	});
	$(".fontawesome-icon-list a").click(function(){
		var selected_icon = $(this).children("i").attr("class");
		$("input[name='icon_classes']").val(selected_icon);
		$("#ceg_icon_repo").modal("hide");
		$("#add_edit_menu_modal").modal("show");
	});
	$("input[name='icon_classes']").click(function(){
		$("#ceg_icon_repo").modal("show");
		$("#add_edit_menu_modal").modal("hide");
	});
	
	$(document).on( "change", "select[name='media_category']", function(e){
		var chosen_type = $(this).val();
		var temp_media_types = JSON.parse(media_types)
		$("media_types").text(temp_media_types[chosen_type].join(" | "));
		$("media_types").fadeOut("50").fadeIn("50");
	});
	$(document).on( "click", "input[type='submit']", function(e){
		//e.preventDefault()
		$(this).closest("form").find("#csrf_token").val(CryptoJS.MD5(back_csrf_token));
		if($("input[name='password']").val() != "")
		{
			var enc_password = CryptoJS.MD5($("input[name='password']").val());
			$("input[name='password']").val(back_left_passpad+enc_password+back_right_passpad);
		}
		tinyMCE.triggerSave();
		var post_data_str = $(this).closest("form").serialize();
		//post_data_str = post_data_str.replace(" ", "%2B");
		//alert(post_data_str);
		$(this).closest("form").find("#sam_sign").val(CryptoJS.MD5(post_data_str));
	});
	
	$('.live-search-list div').each(function(){
		$(this).attr('data-search-term', $(this).text().toLowerCase());
	});
	$(document).on('keyup', '.live-search-box', function(){

	var searchTerm = $(this).val().toLowerCase();

		$('.live-search-list div').each(function(){

			if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
				$(this).show();
			} else {
				$(this).hide();
			}

		});

	});
	$(document).on("change", "select[name='data_page_category_id']", function(e){
		if(parseInt($(this).val()) > 1)
		{
			var page_id = $("input[name='page_id']").val();
			$(".page_contents").addClass("hide");
			$.ajax({
				url: base_url+"/back/get_special_pages_checklist/"+page_id,
				type: "POST",
				dataType: "JSON",
				success: function(data){
					$("#special_page_list").html(data.special_page_checklist_html);
						$('.live-search-list div').each(function(){
							$(this).attr('data-search-term', $(this).text().toLowerCase());
						});
					$(".sbg").removeClass("hide");
				}
			});
		}
		else{
			$(".sbg").addClass("hide");
			$("#special_page_list").empty();
			$(".page_contents").removeClass("hide");
		}
	});
	$(document).on("change", "select[name='page_id']", function(e){
		var page_id = $("select[name='page_id']").val();
		$.ajax({
			url: base_url+"/back/get_code_by_page_id/"+page_id,
			type: "GET",
			dataType: "JSON",
			success: function(data){
				var css = "";
				var js = "";
				if(data.status){
					css = data.code.css;
					js = data.code.js;
				}
				$("textarea[name='css']").val(css);
				$("textarea[name='js']").val(js);
			}
		});
	});
	
	$(document).on("click", "#media_palace", function(e){
		$("#media_modal").modal("show");
	});
	$(document).on("click", "#gallery_palace", function(e){
		$("#gallery_modal").modal("show");
	});
	$(document).on("click", "#gallery_category_palace", function(e){
		$("#gallery_category_modal").modal("show");
	});
	$(document).on("click", "#icon_palace", function(e){
		$("#ceg_icon_repo").modal("show");
	});
	
	$(".refresh_captcha").click(function(){
		var src = $("#captcha_img").attr("src");
		const d = new Date();
		let time = d.getTime();
		var src_arr = src.split("?");
		var new_src = src_arr[0]+"?"+time;
		$("#captcha_img").attr("src", new_src);
	});
	$('#view_password').click(function(){
		if($(this).hasClass("glyphicon-eye-open")){
			$(this).removeClass("glyphicon-eye-open");
			$(this).addClass("glyphicon-eye-close");
			$("input[name='password']").attr('type', 'text');
			$("input[name='ppassword']").attr('type', 'text');
		}
		else{
			$(this).removeClass("glyphicon-eye-close");
			$(this).addClass("glyphicon-eye-open");
			$("input[name='password']").attr('type', 'password');
			$("input[name='ppassword']").attr('type', 'password');
		}
			
	});
	
	var colorList = [ '273c75', '2f3640', 'ffaf40', '474787', 'ff793f', 'ff5252', 'b33939', '40407a', '706fd3', '34ace0', '218c74', '33d9b2', 'b71540', '0066FF', '666699', '666666', 'CC3333', 'FF9933', '99CC33', '669966', '66CCCC', '3366FF', '663366', '999999', 'CC66FF', 'FFCC33', 'FFFF66', '99FF66', '99CCCC', '66CCFF', '993366', 'CCCCCC', 'FF99CC', 'FFCC99', 'FFFF99', 'CCffCC', 'CCFFff', '99CCFF', 'CC99FF', 'FFFFFF' ];
	var picker = $('#color-picker');

	for (var i = 0; i < colorList.length; i++ ) {
		picker.append('<li class="color-item" data-hex="' + '#' + colorList[i] + '" style="background-color:' + '#' + colorList[i] + ';"></li>');
	}

	$('body').click(function () {
		picker.hide();
	});

	$('.call-picker').click(function(event) {
		event.stopPropagation();
		picker.fadeIn();
		picker.children('li').click(function() {
			var codeHex = $(this).data('hex');

			$('.color-holder').css('background-color', codeHex);
			$('#pickcolor').val(codeHex);
		});
	});

	$(document).on("click", "a.copy_link", function(e){
		e.preventDefault();
		   $(this).children(".tooltiptext").text("copying...");
		var copyText = $(this).attr('data-link');

		document.addEventListener('copy', function(e) {
		  e.clipboardData.setData('text/plain', copyText);
		  e.preventDefault();
		}, true);
	   document.execCommand('copy');  

	   $(this).children(".tooltiptext").text("Copied");
	});
	
});