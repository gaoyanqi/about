/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: scripts
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 * 		甲午年（马年）丁卯月丙戌日 农历二月十六
 */
$(document).ready(function () {
	$('.work-items li').hover(function () {
		$(this).prepend('<a href="' + $(this).find('a').attr('href') + '" class="option-overlay" target="_blank">Click for preview</a>');
		$('.option-overlay').fadeIn(300)
	}, function () {
		$('.work-items li .option-overlay').fadeOut(200);
		$('.work-items li .option-overlay').remove()
	})
});
$(document).ready(function () {
	$(".tooltip").tipTip({
		maxWidth: "auto",
		edgeOffset: 10,
		delay: 400
	})
});
$(document).ready(function () {
	$('.client-feedback').click(function () {
		var pagePosition = $(document).scrollTop();
		if (pagePosition == 0) {
			openFeedbackSection()
		} else {
			$('html,body').stop(true, true).animate({
				scrollTop: 0
			}, 1000, function () {
				openFeedbackSection()
			})
		}
	});
	$('#header-slider .close').click(function () {
		closeFeedbackSection()
	});

	function openFeedbackSection() {
		$('#header-slider .close').fadeIn(600);
		$('#header-slider').animate({
			'height': 150
		}, 1000);
		$('#social-icons').animate({
			top: 230
		}, {
			duration: 1000,
			queue: false
		})
	}
	function closeFeedbackSection() {
		$('#header-slider .close').fadeOut(600);
		$('#header-slider').animate({
			'height': '0px'
		}, 1000);
		$('#social-icons').animate({
			top: 25
		}, {
			duration: 1000,
			queue: false
		})
	}
});
$(document).ready(function () {
	var top = 20;
	var left = 15;
	$('#social-icons').css({
		'left': left,
		'top': top
	});
	$(window).scroll(function () {
		var iconsPosition = parseInt($('#social-icons').css('top'));
		var headerPosition = parseInt($('#header-slider').css('height'));
		var offset = $(document).scrollTop();
		if (offset >= headerPosition) {
			$('#social-icons').animate({
				top: (top + offset),
			}, {
				duration: 500,
				queue: false
			})
		} else {
			$('#social-icons').animate({
				top: (headerPosition + 25)
			}, {
				duration: 500,
				queue: false
			})
		}
	})
});
$(document).ready(function () {
	$('#to-top-button').hide();
	var offset = $(document).scrollTop();
	var offsetBottom = offset + ($(window).height() - 60);
	$('#to-top-button').css({
		'top': offsetBottom
	});
	if (offset > 10) {
		$('#to-top-button').fadeIn(900)
	}
	$(window).scroll(function () {
		var offset = $(document).scrollTop();
		offsetBottom = offset + ($(window).height() - 60);
		if (offset > 1) {
			$('#to-top-button').fadeIn(900)
		} else {
			$('#to-top-button').fadeOut(900)
		}
		$('#to-top-button').animate({
			top: offsetBottom
		}, {
			duration: 500,
			queue: false
		})
	})
});
$(document).ready(function () {
	$(".avatar-wink").hover(function () {
		hover = true
	}, function () {
		hover = false
	});
	$('.avatar-happy').hover(function () {
		$('.avatar').css('background-position', '-230px 0px')
	}, function () {
		$('.avatar').css('background-position', '0px 0px')
	});
	$('.avatar-surprised').hover(function () {
		$('.avatar').css('background-position', '-345px 0px')
	}, function () {
		$('.avatar').css('background-position', '0px 0px')
	});
	$('.avatar-wink').hover(function () {
		$('.avatar').css('background-position', '-460px 0px')
	}, function () {
		$('.avatar').css('background-position', '0px 0px')
	});
	$('.avatar-sad').hover(function () {
		$('.avatar').css('background-position', '-680px 0px')
	}, function () {
		$('.avatar').css('background-position', '0px 0px')
	});
	hover = false;
	closeEyes()
});

function closeEyes() {
	if (hover == false) {
		$('.avatar').css('background-position', '-115px 0px')
	}
	setTimeout('openEyes()', 500)
}
function openEyes() {
	if (hover == false) {
		$('.avatar').css('background-position', '0px 0px')
	}
	setTimeout('closeEyes()', 6000)
}