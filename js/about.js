/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: about
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 * 		甲午年（马年）丁卯月丙戌日 农历二月十六
 */
$(document).ready(function() {
	var workExperiences = [];
	var workExperiencesWithTag = {
		tag: {},
		data: {}
	};

	function init() {
		$.ajax({
			type: "GET",
			url: "http://about.luomor.com/about/workExperience",
			dataType: "jsonp",
			jsonp: "jsoncallback",
			error: function(data) {
				
			},
			success: initWorkExperiences
		});
	}

	init();

	function initWorkExperiences(data) {
		if(data.code == 200) {
			workExperiences = data.result.work_experiences;

			var tag = "";
			var order = 1;
			var orderTag = "";
			for(var i in workExperiences) {
				tag = workExperiences[i].tag;
				if(!workExperiencesWithTag.tag.hasOwnProperty(tag)) {
					workExperiencesWithTag.tag[tag] = tag;

					orderTag = order + "_" + tag;
					workExperiencesWithTag.data[orderTag] = [];
					order++;
				}
				workExperiencesWithTag.data[orderTag].push(workExperiences[i]);
			}

			console.log(workExperiencesWithTag);
		}
	}

	function callback() {
		var height = $("#work").height();
		$("#work .TimelineSpine").css("height", height);

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
	}
	
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