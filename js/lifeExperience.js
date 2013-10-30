var birth = new Date("1986/04/23 04:00:00");
var present = new Date();
$(document).ready(function() {
	absoluteTime();
	loadNotes();
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

function absoluteTime() {
	var dayNumber = $.absoluteTime(birth, present);
	$("#technology #progress-bar-container .day-number").html("DAY " + dayNumber.days);
}

function loadNotes() {
	$.ajax({
		type: "GET",
		url: "http://luomor.duapp.com/lifeExperience.php",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		error: function(data) {
			
		},
		success: addNotes
	});
}

function addNotes(data) {
	var notes = '<ul class="notes">';
	for(var i = 0 ; i < data.notes.note.length; i++) {
		notes += '<li class="' + data.notes.note[i].type + '">';
		notes += '<div class="caption">';
		notes += '<div class="arrow"></div>';
		notes += '<h4 class="heading">' + data.notes.note[i].title + '</h4>';
		notes += '<p class="date">' + data.notes.note[i].date + '</p>';
		notes += '<p class="description">' + data.notes.note[i].description + '</p>';
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