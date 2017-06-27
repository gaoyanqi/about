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

			callback();
		}
	}

	function callback() {
		var html = [];
		var navHtml = [];

		html.push('<div class="TimelineSpine"></div>');

		var key = {};
		var experience = {};
		var project = {};
		var strHtml = "";
		var strNavHtml = "";
		var className = "";
		var navClassName = "";
		for(var i in workExperiencesWithTag.data) {
			key = i.split("_");

			if(key[1] == "Now") {
				className = "";
				navClassName = "selected";
			} else {
				className = " timelineHeader";
				navClassName = "";
			}

			strHtml = '<div class="uiHeader fbTimelineContentHeader' + className + '">';
			strHtml += '<div class="clearfix uiHeaderTop">';
			strHtml += '<div>';
			strHtml += '<h3 tabindex="' + key[0] + '" class="uiHeaderTitle">' + key[1] + '</h3>';
			strHtml += '</div></div></div>';

			for(var j in workExperiencesWithTag.data[i]) {
				experience = workExperiencesWithTag.data[i][j];

				strHtml += '<div class="TimelineTwoColumn">';
				strHtml += '<div class="TimelineUnitActor">';
				strHtml += experience.title;
				strHtml += '</div>';
				strHtml += '<div>';
				strHtml += '<li class="TimelineColumn">';
				if(experience.desc != "") {
					strHtml += experience.desc + "<br />";
				}
				strHtml += '时间：' + experience.start_time + ' - ' + experience.start_time + '<br />';
				if(experience.address != "") {
					strHtml += '地点：' + experience.address + "<br />";
				}
				if(experience.job_title != "") {
					strHtml += '所任职位：' + experience.job_title + "<br />";
				}
				if(experience.responsibility != "") {
					strHtml += '职责描述：' + experience.responsibility + "<br />";
				}
				for(var k in experience.ext) {
					strHtml += experience.ext[k].name + '：' + experience.ext[k].value + "<br />";
				}
				strHtml += '</li></div></div>';

				for(var k in experience.projects) {
					project = experience.projects[k];
					strHtml += '<div class="TimelineTwoColumn">';
					strHtml += '<div class="TimelineUnitActor">';
					strHtml += '项目' + project.project_id + ' ' + project.project_name;
					strHtml += '</div>';
					strHtml += '<div data-projectId="' + project.project_id + '" class="project-button">展开</div>';
					strHtml += '<div id="project_content_' + project.project_id + '" class="project-content">';
					strHtml += '<li class="TimelineColumn">时间：' + project.start_time + ' - ' + project.end_time + '</li>';
					for(var ii in project.kv) {
						strHtml += '<li class="TimelineColumn">' + project.kv[ii].name + '：' + project.kv[ii].value + '</li>';
					}
					strHtml += '</div>';
					strHtml += '</div>';
				}
			}

			strNavHtml = '<li data-key="recent" data-index="' + key[0] + '" class="' + navClassName + '">';
			strNavHtml += '<a href="#" rel="ignore">' + key[1] + '</a>';
			strNavHtml += '</li>';

			html.unshift(strHtml);
			navHtml.unshift(strNavHtml);
		}

		$("#timeline_tab_content").html(html.join(''));
		$("#nav_year").html(navHtml.join(''));

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