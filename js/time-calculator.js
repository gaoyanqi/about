/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: time-calculator
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 *         甲午年（马年）丁卯月丙戌日 农历二月十六
 */
var birth = new Date('1990/05/13 01:00:00');
var present = new Date();
var death = new Date('2067/08/09 01:00:00');
$(document).ready(function () {
    lifePercentage(birth, present, death, 10);
    loadNotes();
});

function lifePercentage(birth, present, death, decimals) {
    var percentageLived = percentageTime(birth, present, death, 2);
    var dayNumber = absoluteTime(birth, present);
    $('#about-me #progress-bar-container .day-number').html('DAY ' + dayNumber.days);
    $('#about-me #progress-bar-container .percentage').html(percentageLived + '%');
    $('.progress-bar .progress').css('width', percentageLived + '%');
}

function percentageTime(date1, date2, date3, decimalPlaces) {
    var dateSpan = date3.getTime() - date1.getTime();
    var currentDate = date2.getTime() - date1.getTime();
    var timeLeft = date3.getTime() - date2.getTime();
    var timeSpent = (currentDate / dateSpan * 100).toFixed(decimalPlaces);
    return timeSpent;
}

function absoluteTime(date1, date2) {
    var difference = date2.getTime() - date1.getTime();
    var times = {
        years: Math.floor(difference / 1000 / 60 / 60 / 24 / 365),
        days: Math.floor(difference / 1000 / 60 / 60 / 24),
        hours: Math.floor(difference / 1000 / 60 / 60),
        minutes: Math.floor(difference / 1000 / 60),
        seconds: Math.floor(difference / 1000),
        milliseconds: date1.getTime() - date2.getTime()
    };
    return times;
}

function loadNotes() {
    $.ajax({
        type: "POST",
        url: "services/timeline-notes.json",
        dataType: "json",
        error: function (result) {},
        success: function (result) {
            addNotes(result);
        }
    })
}

function addNotes(result) {
    var notes = '<ul class="notes">';
    for (var i = 0; i < result.notes.note.length; i++) {
        notes += '<li class="' + result.notes.note[i].type + '">';
        notes += '<div class="caption">';
        notes += '<div class="arrow"></div>';
        notes += '<h4 class="heading">' + result.notes.note[i].title + '</h4>';
        notes += '<p class="date">' + result.notes.note[i].date + '<p>';
        notes += '<p class="description">' + result.notes.note[i].description + '</p>';
        notes += '</div>';
        notes += '</li>';
    }
    notes += '</ul>';
    $('#about-me .progress-bar .progress').prepend(notes);
    $('#about-me .progress-bar .progress .notes li').each(function () {
        var eventDate = new Date($(this).find('.date').html());
        var position = percentageTime(birth, eventDate, present, 20);
        var parentWidth = 745;
        var position = 745 * (position / 100) - 10;
        $(this).css('left', position);
        if ($(this).attr('class') == 'professional') {
            var captionHeight = $(this).find('.caption').height();
            $(this).find('.caption').css('top', -captionHeight - 30);
        }
    })
}

$(document).ready(function () {
    $('#about-me').css('overflow', 'visible');
    $('#about-me #progress-bar-container').css('display', 'block');
    $('#about-me .progress-bar .progress .notes li.personal').live('mouseenter', function () {
        $(this).animate({
            top: 10
        }, 200, function () {
            $(this).find('.caption').stop(true, true).fadeIn(200);
        });
    }).live('mouseleave', function () {
        $(this).stop(true, true).find('.caption').stop(true, true).delay(200).fadeOut(400, function () {
            $(this).parents('li').animate({
                top: 15
            }, 200);
        });
    });
    $('#about-me .progress-bar .progress .notes li.professional').live('mouseenter', function () {
        $(this).animate({
            top: -32
        }, 200, function () {
            $(this).find('.caption').stop(true, true).fadeIn(200);
        });
    }).live('mouseleave', function () {
        $(this).stop(true, true).find('.caption').stop(true, true).delay(200).fadeOut(400, function () {
            $(this).parents('li').animate({
                top: -37
            }, 200);
        });
    })
});
