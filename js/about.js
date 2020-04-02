/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.me
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-16
 * Description: about
 * Modification:
 *      甲、乙、丙、丁、戊、己、庚、辛、壬、癸 甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）
 *      子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
 *         甲午年（马年）丁卯月丙戌日 农历二月十六
 */
$(document).ready(function() {
    var workExperiences = [];
    var workExperiencesWithTag = {
        tag: {},
        data: {}
    };

    var url = "https://about.luomor.com/about/workExperience";
    if(About.lang == About.LANG_EN) {
        url = "https://about.luomor.com/about/workExperienceEn";
    }
    function init() {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            error: function(data) {
                
            },
            success: initWorkExperiences
        });
        console.log("%c", "padding:50px 300px;line-height:120px;background:url('http://about.luomor.com/aboutMe/images/technology.png');background-size: 100px 110px");
        console.log("%c" + lang.name, "font-size: 5em");
        console.log("%c" + lang.title, "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;");
        console.log(lang.cellphone + ": MTM0MzkxNzQ4MTg=");
        console.log(lang.introduce);
    }

    jQuery.i18n.properties({
        name: 'About',
        path: 'js/i18n/',
        mode: 'both',
        //debug: true,
        language: About.lang,
        async: true,
        callback: function() {
            init();
        }
    });

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
        var projectHtml = [];

        var key = {};
        var experience = {};
        var project = {};
        var strHtml = "";
        var strProjectHtml = "";
        var className = "";
        var count = 1;
        var hValue = "";
        for(var i in workExperiencesWithTag.data) {
            key = i.split("_");

            strHtml = '<dt tabindex="' + key[0] + '">' + key[1] + '</dt>';

            for(var j in workExperiencesWithTag.data[i]) {
                projectHtml = [];
                
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
                strHtml += '<li>' + lang.time + lang.colon + experience.start_time + ' - ' + experience.end_time + '</li>';
                if(experience.address != "") {
                    strHtml += '<li>' + lang.address + lang.colon + experience.address + "</li>";
                }
                if(experience.job_title != "") {
                    strHtml += '<li>' + lang.job_title + lang.colon + experience.job_title + "</li>";
                }
                if(experience.responsibility != "") {
                    strHtml += '<li>' + lang.responsibility + lang.colon + experience.responsibility + "</li>";
                }

                for(var k in experience.ext) {
                    hValue = experience.ext[k].value;
                    if(hValue.indexOf("http") == 0) {
                        hValue = '<a href="' + hValue + '">' + hValue + '</a>';
                    }
                    strHtml += '<li>' + experience.ext[k].name + lang.colon + hValue + "</li>";
                }
                strHtml += '</div></div></div></dd>';

                for(var k in experience.projects) {
                    project = experience.projects[k];

                    if(count % 2 == 0) {
                        className = "pos-left";
                    } else {
                        className = "pos-right";
                    }
                    strProjectHtml = '<dd class="' + className + ' clearfix">';
                    strProjectHtml += '<div class="circ"></div>';
                    strProjectHtml += '<div class="time">' + project.start_time + '</div>';
                    strProjectHtml += '<div class="timeline-column">';
                    strProjectHtml += '<div class="timeline-column-body">';
                    strProjectHtml += '<h4 class="timeline-column-heading">' + lang.project + '' + project.project_id + ' ' + project.project_name + '</h4>';

                    strProjectHtml += '<div>';
                    strProjectHtml += '<div data-projectId="' + project.project_id + '" class="project-button">' + lang.show + '</div>';
                    strProjectHtml += '<div id="project_content_' + project.project_id + '" class="project-content">';
                    strProjectHtml += '<li>' + lang.time + lang.colon + project.start_time + ' - ' + project.end_time + '</li>';
                    for(var ii in project.kv) {
                        hValue = project.kv[ii].value;
                        if(hValue.indexOf("http") == 0) {
                            hValue = '<a href="' + hValue + '">' + hValue + '</a>';
                        }
                        strProjectHtml += '<li>' + project.kv[ii].name + lang.colon + hValue + '</li>';
                    }
                    strProjectHtml += '</div>';

                    strProjectHtml += '</div></div></div></dd>';

                    projectHtml.unshift(strProjectHtml);

                    count++;
                }
                strHtml += projectHtml.join('');
                if(experience.projects.length == 0) {
                    count++;
                }
            }

            html.unshift(strHtml);
        }

        $(".timeline dl").html(html.join(''));
        //$(".nav_timeline").html(navHtml.join(''));

        $(".project-button").each(function() {
            $(this).bind("click", function() {
                var id = $(this).attr("data-projectId");//dataset[""]
                var project_content = $("#project_content_" + id);
                if(project_content.is(":visible")) {//is(:hidden)
                    $(this).html(lang.show);
                    project_content.hide(1000);
                } else {
                    $(this).html(lang.hide);
                    project_content.show(1000);
                }
            });
        });
    }

    $(".menu a").each(function() {
        $(this).bind("click", function() {
            var id = $(this).attr("data-href");
            if(id) {
	            var obj = $("#" + id);
	            $('html, body').animate({scrollTop: obj.offset().top}, 2000);	
            }
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
