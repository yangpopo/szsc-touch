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
		<view class="food-safety-testing">
			<tableCustomize :data="foodSafetyTestingData.data" :indexStarting="(query.page - 1) * query.size"
				:height="tableHeight" :option="foodSafetyTestingOption"></tableCustomize>

			<paginationCustomize :size="query.size" :current="query.page" :total="foodSafetyTestingData.total"
				@change="queryChange"></paginationCustomize>

		</view>
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
			tableCustomize,
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
				foodSafetyTestingData: {},
				foodSafetyTestingOption: [{
					prop: 'index',
					label: '序号',
					maxWidth: 5,
					maxCharacter: 3,
				}, {
					prop: 'date',
					label: '检测日期',
					maxWidth: 30,
					maxCharacter: 10,
				}, {
					prop: 'goods_name',
					label: '商品名称',
					maxWidth: 32,
					maxCharacter: 10,
				}, {
					prop: 'samp_no',
					label: '样品编号',
					maxWidth: 53,
					maxCharacter: 30,
				}, {
					prop: 'check_item',
					label: '检测项目',
					maxWidth: 55,
					maxCharacter: 15,
				}, {
					prop: 'customize',
					label: '检测结果',
					maxWidth: 25,
					maxCharacter: 5,
					renderFun(data) {
						return data.outcome == 0 ? '合格' : '不合格'
					}
				}, {
					prop: 'criteria',
					label: '判断标准',
					maxWidth: 45,
					maxCharacter: 18,
					butText: '查询',
				}, {
					prop: 'basis',
					label: '检测依据',
					maxWidth: 50,
					maxCharacter: 20,
				}],
				tableHeight: '0vw',
				selfRootRoute: 'foodSafetyTesting',
				currentComponent: null,
				goodsId: null,

			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			this.tableHeight = `calc(100vh - 41vw - 20vw - 23vw)`
			const foodSafetyTestingData = uni.getStorageSync('foodSafetyTestingData') || null;
			if (foodSafetyTestingData) {
				lazyLoadCache(() => {
					this.foodSafetyTestingData = foodSafetyTestingData
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
							this.foodSafetyTestingData = res.data.data
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
	.drop-down-box {
		// padding: 3vw 0 0 0;
	}

	.input-box {
		width: 67vw;
	}

	.food-safety-testing {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;

		.scroll-box {
			width: 100%;
			height: calc(100%);
			background-color: #fff;
			box-sizing: border-box;
			padding: 2vw 0;

			.item {
				width: calc(100% - 4vw);
				display: flex;
				padding: 15rpx;
				box-shadow: 0 0 1vw rgba(4, 100, 202, 0.5);
				margin: 3vw auto 3vw auto;

				.profile-picture {
					width: 21vw;
					height: 28vw;
					margin-right: 2vw;
					border-radius: 1vw;
					flex-shrink: 0;
				}

				.info-box {
					width: calc(100% - 21vw - 2vw);

					.name-box {
						display: flex;
						height: 8vw;

						.name {
							// letter-spacing: 10rpx;
							height: 100%;
							min-width: 14vw;
							display: flex;
							align-items: center;
							position: relative;
							margin-right: 2vw;
							color: #0464CA;
							font-family: 'PingFangH';
							font-size: 4vw;
							box-sizing: border-box;
							padding-right: 2vw;

							&::after {
								content: "";
								width: 100%;
								height: 2px;
								background: linear-gradient(to right, #0464CA, #53A4FD);
								position: absolute;
								bottom: 0;
							}
						}

						.position {
							padding: 0 2vw;
							height: 90%;
							background: linear-gradient(to right, #0464CA, #3181D5);
							color: #fff;
							font-family: 'PingFangM';
							font-size: 22rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 4rpx;
						}
					}

					.info-item {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 3.5vw;
						margin: 1vw 0;
					}

					.danger {
						color: #F24822;
						font-family: 'PingFangH';
					}

					.primary {
						color: #0464CA;
						font-family: 'PingFangH';
					}
				}
			}
		}
	}
</style>