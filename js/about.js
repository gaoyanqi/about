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
			return false;
		})
	});
	
	var top = 40;
	var left = 15;
	$("#social").css({
		"left": left,
		"top": top
	});
	$(window).scroll(function() {
		var iconsPosition = parseInt($("social").css("top"));
		var headerPosition = parseInt($("#menu").css("height"));
		var offset = $(document).scrollTop();
		if(offset >= headerPosition) {
			$("#social").animate({
				top: (top + offset)
			}, {
				duration: 500,
				queue: false
			});
		} else {
			$("#social").animate({
				top: (headerPosition + 25)
			}, {
				duration: 500,
				queue: false
			});
		}
	});
	
	$("#to-top-button").hide();
	var offset = $(document).scrollTop();
	var offsetBottom = offset + ($(window).height() - 60);
	$("#to-top-button").css({
		"top": offsetBottom
	});
	if(offset > 10) {
		$("#to-top-button").fadeIn(900);
	}
	$(window).scroll(function() {
		var offset = $(document).scrollTop();
		offsetBottom = offset + ($(window).height() - 60);
		if(offset > 1) {
			$("#to-top-button").fadeIn(900);
		} else {
			$("#to-top-button").fadeOut(900);
		}
		$("#to-top-button").animate({
			top: offsetBottom
		}, {
			duration: 500,
			queue: false
		});
	});
});