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

		var key = {};
		var experience = {};
		var project = {};
		var strHtml = "";
		var strNavHtml = "";
		var className = "";
		var navClassName = "";
		var count = 1;
		for(var i in workExperiencesWithTag.data) {
			key = i.split("_");

			if(key[1] == "Now") {
				navClassName = "selected";
			} else {
				navClassName = "";
			}

			strHtml = '<dt tabindex="' + key[0] + '">' + key[1] + '</dt>';

			for(var j in workExperiencesWithTag.data[i]) {
				experience = workExperiencesWithTag.data[i][j];
				
				if(count % 2 == 0) {
					className = "pos-left";
				} else {
					className = "pos-right";
				}
				strHtml += '<dd class="' + className + ' clearfix">';
				strHtml += '<div class="circ"></div>';
				strHtml += '<div class="time">' + experience.start_time + '</div>';
				strHtml += '<div class="timeline-column">';
				strHtml += '<div class="timeline-column-body">';
				strHtml += '<h4 class="timeline-column-heading">' + experience.title + '</h4>';
								
				strHtml += '<div>';
				if(experience.desc != "") {
					strHtml += experience.desc + "<br />";
				}
				strHtml += '<li>时间：' + experience.start_time + ' - ' + experience.start_time + '</li>';
				if(experience.address != "") {
					strHtml += '<li>地点：' + experience.address + "</li>";
				}
				if(experience.job_title != "") {
					strHtml += '<li>所任职位：' + experience.job_title + "</li>";
				}
				if(experience.responsibility != "") {
					strHtml += '<li>职责描述：' + experience.responsibility + "</li>";
				}
				for(var k in experience.ext) {
					strHtml += '<li>' + experience.ext[k].name + '：' + experience.ext[k].value + "</li>";
				}
				strHtml += '</div></div></div></dd>';

				for(var k in experience.projects) {
					project = experience.projects[k];

					if(count % 2 == 0) {
						className = "pos-left";
					} else {
						className = "pos-right";
					}
					strHtml += '<dd class="' + className + ' clearfix">';
					strHtml += '<div class="circ"></div>';
					strHtml += '<div class="time">' + project.start_time + '</div>';
					strHtml += '<div class="timeline-column">';
					strHtml += '<div class="timeline-column-body">';
					strHtml += '<h4 class="timeline-column-heading">项目' + project.project_id + ' ' + project.project_name + '</h4>';

					strHtml += '<div>';
					strHtml += '<div data-projectId="' + project.project_id + '" class="project-button">展开</div>';
					strHtml += '<div id="project_content_' + project.project_id + '" class="project-content">';
					strHtml += '<li>时间：' + project.start_time + ' - ' + project.end_time + '</li>';
					for(var ii in project.kv) {
						strHtml += '<li>' + project.kv[ii].name + '：' + project.kv[ii].value + '</li>';
					}
					strHtml += '</div>';

					strHtml += '</div></div></div></dd>';

					count++;
				}
				if(experience.projects.length == 0) {
					count++;
				}
			}

			strNavHtml = '<li data-key="recent" data-index="' + key[0] + '" class="' + navClassName + '">';
			strNavHtml += '<a href="#" rel="ignore">' + key[1] + '</a>';
			strNavHtml += '</li>';

			html.unshift(strHtml);
			navHtml.unshift(strNavHtml);
		}

		$(".timeline dl").html(html.join(''));
		//$(".nav_timeline").html(navHtml.join(''));

		$(".project-button").each(function() {
			$(this).bind("click", function() {
				var id = $(this).attr("data-projectId");//dataset[""]
				var project_content = $("#project_content_" + id);
				if(project_content.is(":visible")) {//is(:hidden)
					$(this).html("展开");
					project_content.hide(1000);
				} else {
					$(this).html("隐藏");
					project_content.show(1000);
				}
			});
		});
	}

	$(".menu a").each(function() {
		$(this).bind("click", function() {
			var id = $(this).attr("data-href");
			var obj = $("#" + id);
			$('html, body').animate({scrollTop: obj.offset().top}, 2000);
		});
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