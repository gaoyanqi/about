/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: init
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 * 		甲午年（马年）丁卯月丙戌日 农历二月十六
 */
var About = {

};

/**
 */
About.init = function() {
	console.log("%c", "padding:50px 300px;line-height:120px;background:url('http://about.luomor.com/aboutMe/images/technology.png');background-size: 100px 110px");
	console.log("%c我是张春生", "font-size: 5em");
	console.log("%c技术改变未来", "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;");
	console.log("手机号: MTM0MzkxNzQ4MTg=");
};

About.in_array = function(str, array) {
	var ele = "";
	for(var i = 0 ; i < array.length ; i++) {
		ele = array[i].toString();
		if(ele == str) {
			return true;
		}
	}
	return false;
};

About.init();