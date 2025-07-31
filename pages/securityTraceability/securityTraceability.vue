<template>
	<detailsPage>
		<menuNavigation mode="customize" v-show="currentComponent == null">
			<template #head>
				<dropDown class="drop-down-box" :options="options" v-model="queryType" :defaultValue="queryType" @change="queryTypeChange"></dropDown>
			</template>
			<template #foot>
				<template v-if="queryType == '名称搜索'">
					<inputBox class="input-box" v-model="query.pword" placeholder="商品名称搜索" @confirm="keywordQuery"></inputBox>
				</template>
				
				<template v-else-if="queryType == '扫码查询'">
					<inputBox class="input-box" :disabled="true" v-model="query.pword" placeholder="商品条码搜索" @confirm="keywordQuery" @clean="cleanScanKeyData"></inputBox>
				</template>
				
				<template v-else-if="queryType == '时间筛选'">
					<inputDateBox class="input-box" :end="endDate" v-model="query.src_date" placeholder="请选择日期" @confirm="keywordQuery"></inputDateBox>
				</template>
				
			</template>
		</menuNavigation>
		<scroll-view class="security-traceability" v-show="currentComponent == null" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMore">
			<view class="security-traceability-box" v-if="securityTraceabilityData.length != 0">
				<view class="gap" style="width: 100%; height: 2vw;"></view>
				<view class="item" v-for="securityTraceabilityItem in securityTraceabilityData" :key="securityTraceabilityItem.goods_id">
					<view class="head">
						<view class="name">{{ securityTraceabilityItem.goods_name || '-' }}</view>
						<view class="query-but" @click="tableQueryDetails(securityTraceabilityItem)">查询</view>
					</view>
					<view class="main">
						<view class="title-item">
							<view class="item" style="width: 180%">
								<text class="title">商品分类</text>
								<view class="content" style="width: 40vw;">{{ securityTraceabilityItem.goods_category || '-' }}</view>
							</view>
							<view class="item">
								<text class="title">入库数量</text>
								<view class="content">{{ securityTraceabilityItem.in_num || '0' }}{{ securityTraceabilityItem.goods_unit || '' }}</view>
							</view>
						</view>
						<view class="item" style="width: 80%">
							<text class="title">入库时间</text>
							<view class="content">{{ securityTraceabilityItem.in_date || '-' }}</view>
						</view>
						<view class="item" style="width: 80%">
							<text class="title">供货商</text>
							<view class="content">{{ securityTraceabilityItem.vendor || '-' }}</view>
						</view>
					</view>
				</view>
				<view class="gap" style="width: 100%; height: 2vw;"></view>
			</view>
			<nullDataState v-else></nullDataState>
		</scroll-view>
		<secureDetail :goodsId="goodsId" v-show="currentComponent != null"></secureDetail>
	</detailsPage>
</template>

<script>
	import { formatDate, lazyLoadCache, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import menuNavigation from '@/components/menuNavigation.vue' // 选择标签菜单
	import dropDown from '@/components/dropDown.vue'
	import inputBox from '@/components/inputBox.vue'
	import inputDateBox from '@/components/inputDateBox.vue'
	import nullDataState from '@/components/nullDataState'
	import tableCustomize from '@/components/tableCustomize'
	
	
	import secureDetail from './components/secureDetail.vue' // 食安详情
	
	
	export default {
		name: "securityTraceability",
		components:{
			detailsPage,
			dropDown,
			inputBox,
			inputDateBox,
			menuNavigation,
			nullDataState,
			tableCustomize,
			secureDetail,
		},
		data() {
			return {
				options: [{
					value: '名称搜索',
					label: '名称搜索'
				}, {
					value: '扫码查询',
					label: '扫码查询'
				}, {
					value: '时间筛选',
					label: '时间筛选'
				}],
				queryType: '名称搜索',
				query: {
					page: 1,
					size: 15,
					pword: '',
					src_date: ''
				},
				securityTraceabilityData: [],
				selfRootRoute: 'securityTraceability',
				currentComponent: null,
				goodsId: null,
				endDate: '', // 结束日期
				isComplete: false, // 是否完成
			}
		},
		computed: {
			...mapState(['routeInfo', 'scanKeyData'])
		},
		async created() {
			// console.log('扫码的值:', this.scanKeyData)
			if (this.scanKeyData) {
				this.queryType = '扫码查询'
				this.query.pword = this.scanKeyData
				this.updateScanKeyData('')
			}
			this.endDate = formatDate(new Date())
			const securityTraceabilityData = uni.getStorageSync('securityTraceabilityData') || null;
			if (securityTraceabilityData) {
				lazyLoadCache(() => {
					this.securityTraceabilityData = securityTraceabilityData.data
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
			},
			scanKeyData(newVal) {
				if (newVal) {
					this.queryType = '扫码查询'
					this.query.pword = newVal
					this.updateScanKeyData('')
				}
				this.$nextTick(() => {
					this.keywordQuery()
				})
			},
		},
		methods: {
			...mapMutations(['updataRouteInfo', 'updataRichTextData', 'updateScanKeyData']),
			// 清除ScanKeyData
			cleanScanKeyData() {
				this.updateScanKeyData('')
				console.log('我清除了')
			},
			// 查询类型发生变化
			queryTypeChange(data) {
				this.query = {
					page: 1,
					size: 15,
					pword: '',
					src_date: ''
				}
			},
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopOrigin',
					method: 'post',
					data: {
						...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.data.length == 0) {
								this.isComplete = true
							}
							res.data.data.data.forEach(item => {
								this.securityTraceabilityData.push(item)
							})
						}
					},
				});
			},
			
			tableQueryDetails(data) {
				this.goodsId = data.goods_id
				pageSelectedMenu('secureDetail', this, 'secureDetail')
			},
			
			keywordQuery() {
				this.query.page = 1
				this.isComplete = false
				this.securityTraceabilityData = []
				this.getData()
			},
			loadMore(e) {
				if (this.isComplete) {
					return
				}
				this.query.page++
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
.drop-down-box {
	// padding: 3vw 0 0 0;
}
.input-box {
	width: 66.5vw;
}
.security-traceability {
	width: 100vw;
	height: calc(100% - 10vw);
	position: relative;
	background-color: #fff;
	
	.security-traceability-box {
		width: 100%;
		height: calc(100%);
		box-sizing: border-box;
		padding: 2vw 0;
		> .item {
			width: calc(100% - 4vw);
			padding: 2vw 3vw;
			border: 1px solid rgba(221, 221, 221, 1);
			background-image: linear-gradient(180deg, rgba(147, 188, 230, 0.5) 0%, rgba(147, 188, 230, 0) 100%);
			background-size: 100% 20vw;
			background-repeat: repeat-x;
			margin: 0 auto 3vw auto;
			border-radius: 1.5vw;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding-bottom: 2vw;
				border-bottom: 1px solid rgba(147, 188, 230, 0.2);
				margin-bottom: 1vw;
				.name {
					font-size: 3.8vw;
					color: rgba(4, 100, 202, 1);
					font-family: "PingFangH";
					overflow:hidden;/*内容超出后隐藏*/
					text-overflow:ellipsis;/*超出内容显示为省略号*/
					white-space:nowrap;/*文本不进行换行*/
					width: calc(100% - 20vw);
				}
				.query-but {
					font-size: 3.2vw;
					color: rgba(4, 100, 202, 1);
					box-sizing: border-box;
					padding: 1vw 2.5vw;
					border: 1px solid rgba(4, 100, 202, 1);
					border-radius: 1vw;
					background-color: #fff;
					flex-shrink: 0;
					margin-left: 2vw;
				}
			}
			.main {
				width: 100%;
				background-image: url('@/assets/imgs/securityTraceability-icon.png');
				background-size: 10vw 10vw;
				background-repeat: no-repeat;
				background-position: right bottom;
				.title-item {
					width: 100%;
					display: flex;
					align-items: center;
				}
				.item {
					display: flex;
					align-items: baseline;
					color: rgba(119, 119, 119, 1);
					font-size: 3.6vw;
					width: 100%;
					box-sizing: border-box;
					padding: 0.5vw 0;
					

					.title {
						color: rgba(56, 56, 56, 1);
						font-family: "PingFangH";
						margin-right: 1.5vw;
						width: 14.5vw;
						text-align: justify;
						text-justify: inter-character;
						text-align-last: justify;
					}
					.content {
						width: calc(100% - 18vw);
						overflow:hidden;/*内容超出后隐藏*/
						text-overflow:ellipsis;/*超出内容显示为省略号*/
						white-space:nowrap;/*文本不进行换行*/
					}
				}
			}
		}
	}
}
</style>

	