// 路由地址
export const routes = [
	{
		name: '',
		component: 'home', // 首页
	}, 
	{
		name: 'home',
		component: 'home', // 首页
	},
	{
		name: 'companyIntroduction',
		component: 'companyIntroduction', // 企业介绍 -> 企业介绍
		childrens: [{
			name: 'companyIntroductionPage',
			component: 'companyIntroductionPage', // 企业介绍 -> 企业介绍
		}, {
			name: 'systemManagement',
			component: 'systemManagement' ,// 企业介绍 -> 制度管理
			childrens: [{
				name: 'richTextDetails',
				component: 'richTextDetails' ,// 企业介绍 -> 制度详情 --> 富文本详情
			}]
		}]
	},
	{
		name: 'principalResponsibility',
		component: 'principalResponsibility', // 主体责任 -> 主体承诺
		childrens: [{
			name: 'subjectCommitment',
			component: 'subjectCommitment', // 主体责任 -> 主体承诺
		}, {
			name: 'selfDirectedTraining',
			component: 'selfDirectedTraining' // 主体责任 -> 企业自主培训
		}]
	},
	{
		name: 'manager',
		component: 'manager', // 管理人员
	},
	{
		name: 'securityTraceability',
		component: 'securityTraceability', // 安全溯源
		childrens: [{
			name: 'securityTraceability',
			component: 'securityTraceability', // 安全溯源 -> 溯源详情
		},{
			name: 'secureDetail',
			component: 'secureDetail', // 安全溯源 -> 溯源详情
		}]
	},
	{
		name: 'deadlineReminder',
		component: 'deadlineReminder', // 临期提醒
		childrens: [{
			name: 'deadlineReminder',
			component: 'deadlineReminder', // 临期提醒 -> 临期提醒
		}]
	},
	{
		name: 'foodSafetyTesting',
		component: 'foodSafetyTesting', // 食安檢測
		childrens: [{
			name: 'foodSafetyTesting',
			component: 'foodSafetyTesting', // 食安檢測 -> 食安檢測
		}]
	},
	{
		name: 'regulatoryResponsibilities',
		component: 'regulatoryResponsibilities', // 监管责任
		childrens: [{
			name: 'supervisor',
			component: 'supervisor', // 监管责任 -> 监管人员
		}, {
			name: 'riskLevel',
			component: 'riskLevel' // 监管责任 -> 风险等级
		}, {
			name: 'supervisionAndInspection',
			component: 'supervisionAndInspection' // 监管责任 -> 监督检查
		}, {
			name: 'supervisionAndSpotChecks',
			component: 'supervisionAndSpotChecks' // 监管责任 -> 监督抽查
		}]
	},
	{
		name: 'territorialResponsibility',
		component: 'territorialResponsibility', // 属地责任
		childrens: [{
			name: 'territorialResponsibility',
			component: 'territorialResponsibility', // 属地责任 -> 属地责任
		}]
	},
	{
		name: 'lawsAndRegulations',
		component: 'lawsAndRegulations', // 法律法规
		childrens: [{
			name: 'lawsAndRegulations',
			component: 'lawsAndRegulations', // 法律法规 -> 法律法规
		}]
	},
	{
		name: 'sunshineFood',
		component: 'sunshineFood', // 阳光食品
		childrens: [{
			name: 'dailyControl',
			component: 'dailyControl', // 阳光食品 -> 日管控
		}, {
			name: 'weeklyInvestigation',
			component: 'weeklyInvestigation' // 阳光食品 -> 周排查
		}, {
			name: 'monthlyScheduling',
			component: 'monthlyScheduling' // 阳光食品 -> 月调度
		}, {
			name: 'dynamicScoring',
			component: 'dynamicScoring' // 阳光食品 -> 动态评分
		}]
	},
	{
		name: 'riskStatement',
		component: 'riskStatement', // 风险提示
		childrens: [{
			name: 'riskStatement',
			component: 'riskStatement', // 风险提示 -> 风险提示
		}]
	},
	{
		name: 'recallNotice',
		component: 'recallNotice', // 召回公告
		childrens: [{
			name: 'recallNotice',
			component: 'recallNotice', // 召回公告 -> 召回公告
		}]
	},
	{
		name: 'login',
		component: 'login', // 登录
	},
	{
		name: 'system',
		component: 'system', // 管理配置页
	},
	{
		name: 'screensaver',
		component: 'screensaver', // 屏保
	},
	{
		name: 'complaintOpinion',
		component: 'complaintOpinion', // 投诉管理
	},
	{
		name: 'manageCache',
		component: 'manageCache', // 管理缓存
	}
]