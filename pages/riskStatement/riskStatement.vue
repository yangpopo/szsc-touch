<template>
	<detailsPage>
		<template v-if="richTextDetails != 'richTextDetails'">
			<menuNavigation mode="customize">
				<template #head>
					<view class="head-title">风险提示</view>
				</template>
			</menuNavigation>
			
			<view class="laws-and-regulations">
				<template v-if="riskStatementData != null">
					<scroll-view class="scroll-box" :scroll-y="true" :show-scrollbar="false">
						<articleListItem v-for="item in riskStatementData" :key="item.article_id" @bubblingClick="openDetails(item)">
							<image class="cover" :src="item.touch_thumbArr[0]" mode="aspectFill"></image>
							<view class="info">
								<view class="title">{{ item.title }}</view>
								<view class="info-list">
									<view class="info-item">状态：<text class="tag ordinary">正常</text></view>
									<view class="info-item">时间：{{ item.date }}</view>
								</view>
							</view>
						</articleListItem>
						
					</scroll-view>
				</template>
				<nullDataState v-else></nullDataState>
			</view>
		</template>
		<richTextDetails v-else ></richTextDetails>
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
	import dropDown from '@/components/dropDown.vue'
	import inputBox from '@/components/inputBox.vue'
	import inputDateBox from '@/components/inputDateBox.vue'
	import nullDataState from '@/components/nullDataState'
	import articleListItem from '@/components/articleListItem'
	import richTextDetails from '@/components/richTextDetails.vue' // 富文本详情




	export default {
		name: "riskStatement",
		components: {
			detailsPage,
			dropDown,
			inputBox,
			inputDateBox,
			menuNavigation,
			nullDataState,
			articleListItem,
			richTextDetails
		},
		data() {
			return {
				selfRootRoute: 'riskStatement',
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				riskStatementData: null,
				richTextDetails: null
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			const riskStatementData = uni.getStorageSync('riskStatementData') || null;
			if (riskStatementData) {
				lazyLoadCache(() => {
					this.riskStatementData = riskStatementData
				})
			} else {
				await this.getData()
			}
		},
		watch: {
			routeInfo(newVal) {
				if (!newVal.options.routePath.includes('richTextDetails')) {
					this.richTextDetails = null
					this.updataRichTextData(null)
				}
			}
		},
		methods: {
			...mapMutations(['updataRichTextData']),
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
					url: 'touch/shop/getShopRisk',
					method: 'post',
					data: {
						...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							res.data.data.forEach(item => {
								if (item.touch_thumb) {
									item['touch_thumbArr'] = item.touch_thumb.split(',')
								} else {
									item['touch_thumbArr'] = []
								}
							})
							this.riskStatementData = res.data.data
						}
					},
				});
			},
			queryData() {
				this.query.page = 1;
				this.getData()
			},
			openDetails(data) {
				this.updataRichTextData(data)
				pageSelectedMenu('richTextDetails', this)
			}
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

	.laws-and-regulations {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;
		.scroll-box {
			width: 100%;
			height: calc(100%);
			box-sizing: border-box;
			padding: 2vw 3vw;

			.item {
				width: calc(100%);
				display: flex;
				padding: 15rpx;
				box-shadow: 0 0 1vw rgba(4, 100, 202, 0.5);
				margin: 3vw auto 3vw auto;

				.cover {
					width: 23vw;
					height: 23vw;
					margin-right: 2vw;
					border-radius: 1vw;
					flex-shrink: 0;
				}

				.info-box {
					width: calc(100% - 23vw - 2vw);

					.name {
						display: flex;
						align-items: center;
						color: #0464CA;
						font-family: 'PingFangH';
						font-size: 4vw;
						width: 100%;
						white-space: nowrap;
						/* 不换行 */
						overflow: hidden;
						/* 隐藏超出的内容 */
						text-overflow: ellipsis;
						/* 用省略号表示被隐藏的部分 */
					}

					.info-item {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 3.5vw;
						margin: 0.5vw 0;
						color: #000;
					}

					.danger {
						color: #F24822;
						font-family: 'PingFangH';
					}

					.warn {
						color: #FFA54B;
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