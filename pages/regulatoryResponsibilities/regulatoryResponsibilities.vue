<template>
	<detailsPage>
		<switchTagMenu :menuData="menuData" @selectedMenu="selectedMenu" :defaultMenuValue="currentTabComponent"></switchTagMenu>
		<view class="regulatory-responsibilities">
			<component class="component-box" v-bind:is="currentTabComponent" @switchComponents.stop></component>
		</view>
	</detailsPage>
</template>

<script>
	import { formatDate, initPageRoute, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import switchTagMenu from '@/components/switchTagMenu.vue' // 选择标签菜单
	import supervisor from './components/supervisor.vue' // 监管人员
	import riskLevel from './components/riskLevel.vue' // 风险等级
	import supervisionAndInspection from './components/supervisionAndInspection.vue' // 监督检查
	import supervisionAndSpotChecks from './components/supervisionAndSpotChecks.vue' // 监督抽查
	
	export default {
		name: "regulatoryResponsibilities",
		components:{
			detailsPage,
			switchTagMenu,
			supervisor,
			riskLevel,
			supervisionAndInspection,
			supervisionAndSpotChecks,
		},
		data() {
			return {
				selfRootRoute: 'regulatoryResponsibilities',
				menuData: [{
					title: '监管人员',
					value: 'supervisor',
				}, {
					title: '风险等级',
					value:'riskLevel',
				}, {
					title: '监督检查',
					value:'supervisionAndInspection',
				}, {
					title: '监督抽查',
					value:'supervisionAndSpotChecks',
				}],
				currentTabComponent: 'supervisor',
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		watch: {
			routeInfo(newVal) {
				if (!newVal.options.routePath.includes('richTextDetails')) {
					this.richTextDetails = false
				}
			}
		},
		async created() {
			initPageRoute(this)
		},
		methods: {
			// 切换菜单
			selectedMenu(val) {
				pageSelectedMenu(val, this)
			},
		}
	}
</script>

<style lang="scss" scoped>
.regulatory-responsibilities {
	width: 100vw;
	height: calc(100% - 10.5vw);
	position: relative;
	.component-box{
		width: 100vw;
		height: calc(100%);
		overflow-y: auto;
		background-color: #fff;
	}
}

</style>
