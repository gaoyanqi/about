$(document).ready(function() {
	var height = $("#work").height();
	$("#work .TimelineSpine").css("height", height);
	$(document).scroll(function() {
		var offsetTop = $("#rightCol").offset().top;
		if(scrollY > offsetTop) {
			$("#nav_year").addClass("fixed_elem");
		} else {
			$("#nav_year").removeClass("fixed_elem");
		}
	});
	$("#menu a").each(function() {
		$(this).bind("click", function() {
			var id = $(this).attr("data-href");
			var obj = $("#" + id);
			$('html, body').animate({scrollTop: obj.offset().top}, 2000);
		});
	});
	$(".project-button").each(function() {
		$(this).bind("click", function() {
			var id = $(this).attr("data-projectId");//dataset[""]
			var project_content = $("#project_content_" + id);
			if(project_content.is(":visible")) {//is(:hidden)
				$(this).html("展开");
				project_content.hide(1000);
				var height = $("#work").height();
				$("#work .TimelineSpine").css("height", height);
			} else {
				$(this).html("隐藏");
				project_content.show(1000);
				var height = $("#work").height();
				$("#work .TimelineSpine").css("height", height);
			}
		});
	});
	$("#nav_year li").each(function() {
		$(this).bind("click", function() {
			var index = $(this).attr("data-index");
			var div = $("div h3[tabindex=" + index + "]");
			$('html, body').animate({scrollTop: div.offset().top - 100}, 2000);
		})
	});
});