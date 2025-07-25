<template>
	<detailsPage>
		<view class="company-introduction">
			<template v-if="richTextDetails != 'richTextDetails'">
				<switchTagMenu :menuData="menuData" @selectedMenu="selectedMenu" :defaultMenuValue="currentTabComponent"></switchTagMenu>
				<component class="component-box" v-bind:is="currentTabComponent" @switchComponents.stop @selectedMenu="selectedMenu"></component>
			</template>
			<richTextDetails v-else ></richTextDetails>
		</view>
	</detailsPage>
</template>

<script>
	import { formatDate, initPageRoute, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import switchTagMenu from '@/components/switchTagMenu.vue' // 选择标签菜单
	import companyIntroductionPage from './components/companyIntroductionPage.vue' // 企业介绍
	import systemManagement from './components/systemManagement.vue' // 制度管理
	import richTextDetails from '@/components/richTextDetails.vue' // 富文本详情
	
	
	export default {
		name: "companyIntroduction",
		components:{
			detailsPage,
			switchTagMenu,
			companyIntroductionPage,
			systemManagement,
			richTextDetails,
		},
		data() {
			return {
				selfRootRoute: 'companyIntroduction',
				menuData: [{
					title: '企业介绍',
					value: 'companyIntroductionPage',
				}, {
					title: '制度管理',
					value:'systemManagement',
				}],
				currentTabComponent: 'companyIntroductionPage',
				richTextDetails: null
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		watch: {
			routeInfo(newVal) {
				if (!newVal.options.routePath.includes('richTextDetails')) {
					this.richTextDetails = null
					this.updataRichTextData(null)
				}
			}
		},
		async created() {
			initPageRoute(this)
		},
		methods: {
			...mapMutations(['updataRichTextData']),
			// 切换菜单
			selectedMenu(val) {
				pageSelectedMenu(val, this)
			},
		}
	}
</script>

<style lang="scss" scoped>
.company-introduction {
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
