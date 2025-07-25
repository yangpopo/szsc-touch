<template>
	<detailsPage>
		<switchTagMenu :menuData="menuData" @selectedMenu="selectedMenu" :defaultMenuValue="currentTabComponent"></switchTagMenu>
		<view class="sunshine-food">
			<component class="component-box" v-bind:is="currentTabComponent" @switchComponents.stop></component>
		</view>
	</detailsPage>
</template>

<script>
	import { formatDate, initPageRoute, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import switchTagMenu from '@/components/switchTagMenu.vue' // 选择标签菜单
	import dailyControl from './components/dailyControl.vue' // 监管人员
	import weeklyInvestigation from './components/weeklyInvestigation.vue' // 风险等级
	import monthlyScheduling from './components/monthlyScheduling.vue' // 监督检查
	import dynamicScoring from './components/dynamicScoring.vue' // 监督抽查
	
	export default {
		name: "sunshineFood",
		components:{
			detailsPage,
			switchTagMenu,
			dailyControl,
			weeklyInvestigation,
			monthlyScheduling,
			dynamicScoring,
		},
		data() {
			return {
				selfRootRoute: 'sunshineFood',
				menuData: [{
					title: '日管控',
					value: 'dailyControl',
				}, {
					title: '周排查',
					value:'weeklyInvestigation',
				}, {
					title: '月调度',
					value:'monthlyScheduling',
				}, {
					title: '动态评分',
					value:'dynamicScoring',
				}],
				currentTabComponent: 'dailyControl',
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
.sunshine-food {
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
