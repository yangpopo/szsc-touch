<template>
	<detailsPage>
		<view class="principal-responsibility">
			<switchTagMenu :menuData="menuData" @selectedMenu="selectedMenu" :defaultMenuValue="currentTabComponent"></switchTagMenu>
			<component class="component-box" v-bind:is="currentTabComponent" @switchComponents.stop></component>
		</view>
	</detailsPage>
</template>

<script>
	import { formatDate, initPageRoute, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import switchTagMenu from '@/components/switchTagMenu.vue' // 选择标签菜单
	import subjectCommitment from './components/subjectCommitment.vue' // 主体承诺
	import selfDirectedTraining from './components/selfDirectedTraining.vue' // 企业自主培训
	
	
	export default {
		name: "principalResponsibility",
		components:{
			detailsPage,
			switchTagMenu,
			subjectCommitment,
			selfDirectedTraining
		},
		data() {
			return {
				selfRootRoute: 'principalResponsibility',
				menuData: [{
					title: '主体承诺',
					value: 'subjectCommitment',
				}, {
					title: '企业自主培训',
					value:'selfDirectedTraining',
				}],
				currentTabComponent: 'subjectCommitment',
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
.principal-responsibility {
	width: 100vw;
	height: calc(100%);
	position: relative;
	.component-box{
		width: 100vw;
		height: calc(100% - 10.5vw);
		overflow-y: auto;
		background-color: #fff;
	}
}

</style>
