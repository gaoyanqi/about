/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: init
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 *         甲午年（马年）丁卯月丙戌日 农历二月十六
 */
var About = {

};

About.LANG_EN = "en_US";
About.LANG_ZH = "zh_CN";

/**
 */
About.init = function() {
    if(window.location.href.indexOf("aboutMeEn") > 0) {
        About.lang = About.LANG_EN;
    } else {
        About.lang = About.LANG_ZH;
    }
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
