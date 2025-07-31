<template>
	<detailsPage>
		<menuNavigation mode="customize">
			<template #head>
				<view class="head-title">召回公告</view>
			</template>
		</menuNavigation>
		<view class="recall-notice">
			<titleStyle class="title-style" :fontSize="4.5">召回公告公示</titleStyle>
			<scroll-view class="recall-notice-scroll" :scroll-y="true" :show-scrollbar="false" v-if="recallNoticeData.length != 0">
				<view class="recall-notice-box">
					<view class="item" v-for="(recallNoticeItem, index) in recallNoticeData" :key="recallNoticeItem.region_id">
						<view class="head">
							<view class="title">
								<image class="icon" src="../../assets/imgs/shield-icon.png" mode=""></image>
								<view class="name">{{ recallNoticeItem.goods_name || '-' }}</view>
							</view>
							<!-- <view class="state">{{ recallNoticeItem.status == 0 ? '合格' : '不合格' }}</view> -->
						</view>
						<view class="main">
							<view class="item">
								<text class="title">召回时间</text>
								<view class="content">{{ recallNoticeItem.date || '-' }}</view>
							</view>
							<view class="item">
								<text class="title">处理方式</text>
								<view class="content">{{ recallNoticeItem.handle || '-' }}</view>
							</view>
						</view>
					</view>
					<view class="gap" style="width: 100%; height: 2vw;"></view>
				</view>
			</scroll-view>
			<nullDataState v-else></nullDataState>
		</view>
	</detailsPage>
</template>

<script>
	import { lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import menuNavigation from '@/components/menuNavigation.vue' // 选择标签菜单
	import titleStyle from '@/components/titleStyle'
	import nullDataState from '@/components/nullDataState'



	export default {
		name: "recallNotice",
		components: {
			detailsPage,
			menuNavigation,
			titleStyle,
			nullDataState,
		},
		data() {
			return {
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				recallNoticeData: [],
				selfRootRoute: 'recallNotice',
				currentComponent: null,
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
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
			// margin-bottom: 2vw;
		}
		.recall-notice-scroll {
			width: 100%;
			height: calc(100% - 12vw);
			.recall-notice-box {
				width: 100%;
				height: calc(100%);
				box-sizing: border-box;
				padding: 2vw 0;
				> .item {
					width: calc(100% - 4vw);
					border: 1px solid rgba(221, 221, 221, 1);
					margin: 0 auto 3vw auto;
					border-radius: 1.5vw;
					background-image: url('@/assets/imgs/bg-item-icon-recall.png');
					background-size: 13vw 13vw;
					background-position: calc(100% + 2vw) calc(100% + 2vw);
					background-repeat: no-repeat;
					.head {
						width: 100%;
						box-sizing: border-box;
						padding: 2vw 4vw;
						background-image: linear-gradient(90deg, rgba(147, 188, 230, 0.5) 0%, rgba(147, 188, 230, 0) 100%);
						background-size: 100% 20vw;
						background-repeat: repeat-x;
						display: flex;
						justify-content: space-between;
						border-radius: 1.5vw 1.5vw 0 0;
						border-bottom: 1px solid rgba(147, 188, 230, 0.2);
						.title {
							display: flex;
							align-items: center;
							.icon {
								width: 4vw;
								height: 4vw;
								margin-right: 1vw;
								flex-shrink: 0;
							}
							.name {
								font-size: 4.2vw;
								color: rgba(4, 100, 202, 1);
								width: 80vw;
								overflow:hidden;/*内容超出后隐藏*/
								text-overflow:ellipsis;/*超出内容显示为省略号*/
								white-space:nowrap;/*文本不进行换行*/
							}
						}
						.state {
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
						box-sizing: border-box;
						padding: 2vw 4vw;
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
								width: calc(100% - 20vw);
								// overflow:hidden;/*内容超出后隐藏*/
								// text-overflow:ellipsis;/*超出内容显示为省略号*/
								// white-space:nowrap;/*文本不进行换行*/
							}
						}
					}
				}
			}
		}
	}
</style>