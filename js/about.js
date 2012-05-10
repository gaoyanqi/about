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
});