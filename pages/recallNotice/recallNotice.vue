<template>
	<detailsPage>
		<menuNavigation mode="customize">
			<template #head>
				<view class="head-title">召回公告</view>
			</template>
		</menuNavigation>
		<view class="recall-notice">
			<titleStyle class="title-style" :fontSize="4.5">召回公告公示</titleStyle>
			<tableCustomize :data="recallNoticeData" :height="tableHeight" :option="recallNoticeOption"></tableCustomize>

			<!-- <paginationCustomize :size="query.size" :current="query.page" :total="recallNoticeData.total" @change="queryChange"></paginationCustomize> -->

		</view>
	</detailsPage>
</template>

<script>
	import {
		formatDate,
		lazyLoadCache,
		pageSelectedMenu
	} from '@/tool/tool.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import menuNavigation from '@/components/menuNavigation.vue' // 选择标签菜单
	import titleStyle from '@/components/titleStyle'
	import tableCustomize from '@/components/tableCustomize'
	import paginationCustomize from '@/components/paginationCustomize'



	export default {
		name: "recallNotice",
		components: {
			detailsPage,
			menuNavigation,
			titleStyle,
			tableCustomize,
			paginationCustomize
		},
		data() {
			return {
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				recallNoticeData: {},
				recallNoticeOption: [{
					prop: 'index',
					label: '序号',
					maxWidth: 5,
					maxCharacter: 3,
				}, {
					prop: 'goods_name',
					label: '商品名称',
					maxWidth: 40,
					maxCharacter: 15,
				}, {
					prop: 'recall_type',
					label: '类别',
					maxWidth: 30,
					maxCharacter: 8,
				}, {
					prop: 'date',
					label: '召回日期',
					maxWidth: 30,
					maxCharacter: 10,
				}, {
					prop: 'handle',
					label: '处理方式',
					maxWidth: 60,
					maxCharacter: 20,
				}],
				tableHeight: '0vw',
				selfRootRoute: 'recallNotice',
				currentComponent: null,
				goodsId: null,

			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			this.tableHeight = `calc(100vh - 41vw - 20vw - 23vw)`
			const recallNoticeData = uni.getStorageSync('recallNoticeData') || null;
			if (recallNoticeData) {
				lazyLoadCache(() => {
					this.recallNoticeData = recallNoticeData
				})
			} else {
				await this.getData()
			}
		},
		watch: {
			routeInfo(newVal) {
				if (!newVal.options.routePath.includes('secureDetail')) {
					this.currentComponent = null
					this.updataRichTextData(null)
				}
			}
		},
		methods: {
			...mapMutations(['updataRouteInfo', 'updataRichTextData']),
			// 查询类型发生变化
			queryTypeChange(data) {
				this.query = {
					page: 1,
					size: 15,
					pword: '',
				}
			},
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getShopRecall',
					method: 'post',
					data: {
						// ...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.recallNoticeData = res.data.data
						}
					},
				});
			},
			confirm() {
				this.query.page = 1
				this.getData()
			},

			queryChange(data) {
				this.query.page = data.current
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head-title {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-family: "PingFangH";
		color: #0464CA;
		background-color: #fff;
	
		&:before {
			content: '';
			width: 4vw;
			height: 5rpx;
			background-color: #0464CA;
			position: absolute;
			top: 85%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5rpx;
		}
	}

	.recall-notice {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;

		.title-style {
			width: 100%;
			box-sizing: border-box;
			padding: 2vw 0;
			margin-bottom: 2vw;
		}
	}
</style>