
export const routes = [
	{
		name: '',
		component: 'home', 
	}, 
	{
		name: 'home',
		component: 'home', 
	},
	{
		name: 'companyIntroduction',
		component: 'companyIntroduction', 
		childrens: [{
			name: 'companyIntroductionPage',
			component: 'companyIntroductionPage', 
		}, {
			name: 'systemManagement',
			component: 'systemManagement' ,
			childrens: [{
				name: 'richTextDetails',
				component: 'richTextDetails' ,
			}]
		}]
	},
	{
		name: 'principalResponsibility',
		component: 'principalResponsibility', 
		childrens: [{
			name: 'subjectCommitment',
			component: 'subjectCommitment', 
		}, {
			name: 'selfDirectedTraining',
			component: 'selfDirectedTraining' 
		}]
	},
	{
		name: 'manager',
		component: 'manager', 
	},
	{
		name: 'securityTraceability',
		component: 'securityTraceability', 
		childrens: [{
			name: 'securityTraceability',
			component: 'securityTraceability', 
		},{
			name: 'secureDetail',
			component: 'secureDetail', 
		}]
	},
	{
		name: 'deadlineReminder',
		component: 'deadlineReminder', 
		childrens: [{
			name: 'deadlineReminder',
			component: 'deadlineReminder', 
		}]
	},
	{
		name: 'foodSafetyTesting',
		component: 'foodSafetyTesting', 
		childrens: [{
			name: 'foodSafetyTesting',
			component: 'foodSafetyTesting', 
		}]
	},
	{
		name: 'regulatoryResponsibilities',
		component: 'regulatoryResponsibilities', 
		childrens: [{
			name: 'supervisor',
			component: 'supervisor', 
		}, {
			name: 'riskLevel',
			component: 'riskLevel' 
		}, {
			name: 'supervisionAndInspection',
			component: 'supervisionAndInspection' 
		}, {
			name: 'supervisionAndSpotChecks',
			component: 'supervisionAndSpotChecks' 
		}]
	},
	{
		name: 'territorialResponsibility',
		component: 'territorialResponsibility', 
		childrens: [{
			name: 'territorialResponsibility',
			component: 'territorialResponsibility', 
		}]
	},
	{
		name: 'lawsAndRegulations',
		component: 'lawsAndRegulations', 
		childrens: [{
			name: 'lawsAndRegulations',
			component: 'lawsAndRegulations', 
		}]
	},
	{
		name: 'sunshineFood',
		component: 'sunshineFood', 
		childrens: [{
			name: 'dailyControl',
			component: 'dailyControl', 
		}, {
			name: 'weeklyInvestigation',
			component: 'weeklyInvestigation' 
		}, {
			name: 'monthlyScheduling',
			component: 'monthlyScheduling' 
		}, {
			name: 'dynamicScoring',
			component: 'dynamicScoring' 
		}]
	},
	{
		name: 'riskStatement',
		component: 'riskStatement', 
		childrens: [{
			name: 'riskStatement',
			component: 'riskStatement', 
		}]
	},
	{
		name: 'recallNotice',
		component: 'recallNotice', 
		childrens: [{
			name: 'recallNotice',
			component: 'recallNotice', 
		}]
	},
	{
		name: 'login',
		component: 'login', 
	},
	{
		name: 'system',
		component: 'system', 
	},
	{
		name: 'screensaver',
		component: 'screensaver', 
	},
	{
		name: 'complaintOpinion',
		component: 'complaintOpinion', 
	},
	{
		name: 'manageCache',
		component: 'manageCache', 
	}
]