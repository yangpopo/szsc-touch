<template>
	<detailsPage>
		<menuNavigation mode="customize">
			<template #head>
				<dropDown class="drop-down-box" :options="options" v-model="queryType" :defaultValue="queryType"
					@change="queryTypeChange"></dropDown>
			</template>
			<template #foot>
				<inputBox class="input-box" v-if="queryType == '名称搜索'" v-model="query.pword" placeholder="商品名称搜索"
					@confirm="confirm"></inputBox>
				<inputDateBox class="input-box" v-else-if="queryType == '时间筛选'" v-model="query.src_date" placeholder="请选择日期"
					@confirm="confirm"></inputDateBox>
			</template>
		</menuNavigation>
		<scroll-view class="food-safety-testing" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMore">
			<view class="food-safety-testing-box" v-if="foodSafetyTestingData.length != 0">
				<view class="item" v-for="(foodSafetyTestingItem, index) in foodSafetyTestingData" :key="foodSafetyTestingItem.samp_no">
					<view class="head">
						<view class="before">
							<view class="name">{{ foodSafetyTestingItem.goods_name || '-' }}</view>
							<view class="samp-no">{{ foodSafetyTestingItem.samp_no || '-' }}</view>
						</view>
						<view class="after">{{ foodSafetyTestingItem.outcome == 0 ? '阴性' : '阳性' }}</view>
					</view>
					<view class="main">
						<view class="main-item">
							<text class="title">检测日期</text>
							<view class="content">{{ foodSafetyTestingItem.date || '-' }}</view>
						</view>
						<view class="main-item">
							<text class="title">检测项目</text>
							<view class="content">{{ foodSafetyTestingItem.check_item || '-' }}</view>
						</view>
						<template v-if="foodSafetyTestingItem.isOpen">
							<view class="main-item">
								<text class="title">判断标准</text>
								<view class="content">{{ foodSafetyTestingItem.criteria || '-' }}</view>
							</view>
							<view class="main-item">
								<text class="title">检测依据</text>
								<view class="content">{{ foodSafetyTestingItem.basis || '-' }}</view>
							</view>
						</template>
						<view class="switch-but" @click="switchOpen(index)">
							<template v-if="foodSafetyTestingItem.isOpen">
								收起<image class="icon" src="../../assets/imgs/upward-icon.png" mode="aspectFit"></image>
							</template>
							<template v-else>
								详情<image class="icon" src="../../assets/imgs/downward-icon.png" mode="aspectFit"></image>
							</template>
						</view>
					</view>
				</view>
				<view class="gap" style="width: 100%; height: 2vw;"></view>
			</view>
			<nullDataState v-else></nullDataState>
		</scroll-view>
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
	import paginationCustomize from '@/components/paginationCustomize'



	export default {
		name: "foodSafetyTesting",
		components: {
			detailsPage,
			dropDown,
			inputBox,
			inputDateBox,
			menuNavigation,
			nullDataState,
			paginationCustomize
		},
		data() {
			return {
				options: [{
					value: '名称搜索',
					label: '名称搜索'
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
				foodSafetyTestingData: [],
				selfRootRoute: 'foodSafetyTesting',
				currentComponent: null,
				goodsId: null,
				isComplete: false,
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			const foodSafetyTestingData = uni.getStorageSync('foodSafetyTestingData') || null;
			if (foodSafetyTestingData) {
				lazyLoadCache(() => {
					foodSafetyTestingData.data.forEach(item => {
						item['isOpen'] = false
					})
					this.foodSafetyTestingData = foodSafetyTestingData.data
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
					src_date: ''
				}
			},
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopSamp',
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
								item['isOpen'] = false
								this.foodSafetyTestingData.push(item)
							})
						}
					},
				});
			},
			confirm() {
				this.query.page = 1
				this.isComplete = false
				this.foodSafetyTestingData = []
				this.getData()
			},

			queryChange(data) {
				this.query.page = data.current
				this.getData()
			},
			loadMore(e) {
				if (this.isComplete) {
					return
				}
				this.query.page++
				this.getData()
			},
			switchOpen(index) {
				this.foodSafetyTestingData[index].isOpen = !this.foodSafetyTestingData[index].isOpen
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

	.food-safety-testing {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;

		.food-safety-testing-box {
			width: 100%;
			height: calc(100%);
			box-sizing: border-box;
			padding: 2vw 0;
			> .item {
				width: calc(100% - 4vw);
				padding: 2vw 3vw 0 3vw;
				border: 1px solid rgba(221, 221, 221, 1);
				background-image: linear-gradient(180deg, rgba(147, 188, 230, 0.5) 0%, rgba(147, 188, 230, 0) 100%);
				background-size: 100% 15vw;
				background-repeat: repeat-x;
				margin: 0 auto 3vw auto;
				border-radius: 1.5vw;
				.head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding-bottom: 1vw;
					border-bottom: 1px solid rgba(147, 188, 230, 0.2);
					margin-bottom: 1vw;
					.before {
						width: calc(100% - 20vw);
						.name {
							font-size: 3.8vw;
							color: rgba(4, 100, 202, 1);
							font-family: "PingFangH";
							overflow:hidden;/*内容超出后隐藏*/
							text-overflow:ellipsis;/*超出内容显示为省略号*/
							white-space:nowrap;/*文本不进行换行*/
							width: calc(100%);
						}
						.samp-no {
							color: rgba(133, 151, 171, 1);
							font-size: 3.2vw;
						}
					}
					
					.after {
						font-size: 3.2vw;
						color: rgba(4, 100, 202, 1);
						box-sizing: border-box;
						padding: 0.5vw 2vw;
						border: 1px solid rgba(4, 100, 202, 1);
						border-radius: 1vw;
						background-color: #fff;
						flex-shrink: 0;
						margin-left: 2vw;
					}
				}
				.main {
					width: 100%;
					background-image: url('@/assets/imgs/foodSafetyTesting-icon.png');
					background-size: 10vw 10vw;
					background-repeat: no-repeat;
					background-position: right calc(100% - 1vw);
					.main-item {
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
							width: calc(100% - 20vw);
							// overflow:hidden;/*内容超出后隐藏*/
							// text-overflow:ellipsis;/*超出内容显示为省略号*/
							// white-space:nowrap;/*文本不进行换行*/
						}
					}
				}
				.switch-but {
					width: 100%;
					font-size: 3.5vw;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					padding: 1vw 1vw 1.5vw 1vw;
					color: rgba(153, 153, 153, 1);
					.icon {
						width: 4vw;
						height: 4vw;
					}
				}
			}
		}
	}
</style>