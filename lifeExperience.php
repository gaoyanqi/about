<?php
	$jsoncallback = $_GET["jsoncallback"];
	if(empty($jsoncallback))
		$jsoncallback = "jsoncallback";
	echo $jsoncallback . '({
			"notes": {
				"note": [{
					"title": "我是80后 - <span>1986</span>",
					"type": "personal",
					"date": "1986/04/23 04:00:00",
					"description": "我出生在80年代，那是一个纯真的年代"
				},{
					"title": "高考 - <span>2005</span>",
					"type": "professional",
					"date": "2005/06/27 09:00:00",
					"description": "参加高考对于我来说是一次人生经历，和大多数考生一样听父母和老师的话，我人生的第一个重要决定选择了软件开发与应用英语专业"
				},{
					"title": "第一次租房 - <span>2007</span>",
					"type": "personal",
					"date": "2007/11/20 09:00:00",
					"description": "第一次租房子，和同学住在一个没有窗户的隔间里，这段经历让人难以忘记"
				},{
					"title": "大学毕业 - <span>2008</span>",
					"type": "professional",
					"date": "2008/06/25 09:00:00",
					"description": "在常州信息职业技术学院软件学院毕业，实习时在常州富深协通数码技术有限公司工作后到北京富深伟业软件技术有限公司工作，毕业后仍留在北京富深伟业软件技术有限公司工作"
				},{
					"title": "哈酷那 - <span>2010</span>",
					"type": "professional",
					"date": "2010/07/06 09:00:00",
					"description": "关注移动互联网和社交网络(SNS)，加入哈酷那SNS手机游戏服务器端开发，学习和了解php、mysql、memcache等"
				},{
					"title": "地铁10号线 - <span>2010</span>",
					"type": "personal",
					"date": "2010/10/10 10:00:00",
					"description": "每天从营慧寺坐公交到巴沟，再从巴沟坐10号线到劲松，在地铁上看到形形色色的人，每次告白都失败，开始思索人生的意义"
				},{
					"title": "休假 - <span>2011</span>",
					"type": "personal",
					"date": "2011/03/01 09:00:00",
					"description": "给自己放一个长假，身体累了，心也累了"
				},{
					"title": "html5 - <span>2011</span>",
					"type": "personal",
					"date": "2011/04/29 09:00:00",
					"description": "开始关注html5研究小组，参加html5举行的培训和CodeJam，认识了娜姐和大城小胖等小组成员，对移动互联网的未来充满信心，购买了iPod Touch，也参加百度技术沙龙和Google组织的html5训练营，认识了高寒蕊和胡坤"
				},{
					"title": "掌中浩阅 - <span>2011</span>",
					"type": "professional",
					"date": "2011/05/17 09:00:00",
					"description": "加入北京掌中浩阅科技有限公司，做服务器开发和架构，使用mysql、redis、hbase等技术，android版iReader网络书城开始使用html5相关技术"
				}]
			}
		})';
?>