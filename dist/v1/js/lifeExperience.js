/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: lifeExperience
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 * 		甲午年（马年）丁卯月丙戌日 农历二月十六
 */
var birth = new Date("1986/04/23 04:00:00");
var present = new Date();

$(document).ready(function() {
	absoluteTime();
	loadLifeNotes();

	$("#technology #progress-bar-container").css("display", "block");
	$("#technology").css("overflow", "visible");
	$("#technology .progress-bar .progress .notes li.personal").live("mouseenter", function() {
		$(this).animate({
			top: 10
		}, 200, function() {
			$(this).find(".caption").stop(true, true).fadeIn(200);
		});
	}).live("mouseleave", function() {
		$(this).stop(true, true).find(".caption").stop(true, true).delay(200).fadeOut(400, function() {
			$(this).parents("li").animate({
				top: 15
			}, 200);
		});
	});

	$("#technology .progress-bar .progress .notes li.professional").live("mouseenter", function() {
		$(this).animate({
			top: -32
		}, 200, function() {
			$(this).find(".caption").stop(true, true).fadeIn(200);
		});
	}).live("mouseleave", function() {
		$(this).stop(true, true).find(".caption").stop(true, true).delay(200).fadeOut(400, function() {
			$(this).parents("li").animate({
				top: -37
			}, 200);
		});
	});
});

/**
 *
 */
function absoluteTime() {
	var dayNumber = $.absoluteTime(birth, present);
	$("#technology #progress-bar-container .day-number").html("DAY " + dayNumber.days);
    $("#technology #progress-bar-container .current-date").html(present.getFullYear());
}

/**
 *
 */
function loadLifeNotes() {
	$.ajax({
		type: "GET",
		url: "https://about.luomor.com/about/lifeExperience",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		error: function(data) {
			
		},
		success: addLifeNotes
	});
}

/**
 *
 * @param data
 */
function addLifeNotes(data) {
    var lifeNodes = data.result.life_notes;

	var notes = '<ul class="notes">';
	for(var i = 0 ; i < lifeNodes.length; i++) {
		notes += '<li class="' + lifeNodes[i].type + '">';
		notes += '<div class="caption">';
		notes += '<div class="arrow"></div>';
		notes += '<h4 class="heading">' + lifeNodes[i].title + '</h4>';
		notes += '<p class="date">' + lifeNodes[i].date + '</p>';
		notes += '<p class="description">' + lifeNodes[i].description + '</p>';
		notes += '</div>';
		notes += '</li>';
	}
	notes += '</ul>';

	$("#technology .progress-bar .progress").prepend(notes);
	$("#technology .progress-bar .progress .notes li").each(function() {
		var eventDate = new Date($(this).find(".date").html());
		var position = $.percentageTime(birth, eventDate, present, 20);
		var parentWidth = 745;
		var position = 745 * (position / 100) - 10;
		$(this).css("left", position);
		if($(this).attr("class") == "professional") {
			var captionHeight = $(this).find(".caption").height();
			$(this).find(".caption").css("top", -captionHeight - 30);
		}
	});
}

$.extend({
	absoluteTime: function(date1, date2) {
		var difference = date2.getTime() - date1.getTime();
		var times = {
			years: Math.floor(difference / 1000 / 60 / 60 / 24 / 365),
			days: parseInt(Math.floor(difference / 1000 / 60 / 60 / 24)),
			hours: Math.floor(difference / 1000 / 60 / 60),
			minutes: Math.floor(difference / 1000 / 60),
			seconds: Math.floor(difference / 1000),
			milliseconds: date2.getTime() - date1.getTime()
		};
		return times;
	},
	percentageTime: function(date1, date2, date3, decimalPlaces) {
		var dateSpan = date3.getTime() - date1.getTime();
		var currentDate = date2.getTime() - date1.getTime();
		var timeSpent = (currentDate / dateSpan * 100).toFixed(decimalPlaces);
		return timeSpent;
	}
});