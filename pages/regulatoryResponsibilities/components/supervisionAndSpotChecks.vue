<template>
	<view class="supervision-and-spotChecks">
		<view class="input-search-box">
			<input type="text" placeholder="请输入需要查询的商品名称" class="input" placeholder-class="inputplaceholder"
				v-model="query.pword" />
			<view class="search-but" @click="inputSearch">
				<image class="icon" src="../../../assets/imgs/search.png" mode="aspectFit"></image>
				<text class="search">查询</text>
			</view>
		</view>

		<scroll-view class="supervision-and-spotChecks-scroll" v-if="supervisionAndSpotChecksData.length != 0"
			:scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMore">
			<view class="supervision-and-spotChecks-box">
				<view class="item" v-for="(supervisionAndSpotChecksItem, index) in supervisionAndSpotChecksData"
					:key="supervisionAndSpotChecksItem.check_no + index">
					<view class="head">
						<view class="title">
							<image class="icon" src="../../../assets/imgs/shield-icon.png" mode=""></image>
							<view class="name">
								{{ supervisionAndSpotChecksItem.goods_name || '-' }}
							</view>
							
						</view>
						<view class="state">{{ supervisionAndSpotChecksItem.results == 0 ? '合格' : '不合格' }}</view>
					</view>
					<view class="main">
						<view class="item">
							<text class="title">抽检编号</text>
							<view class="content">{{ supervisionAndSpotChecksItem.check_no || '-' }}</view>
						</view>
						<view class="item">
							<text class="title">年度</text>
							<view class="content">{{ supervisionAndSpotChecksItem.check_year || '-' }}</view>
						</view>
						<view class="item">
							<text class="title">报告编号</text>
							<view class="content">{{ supervisionAndSpotChecksItem.report_no || '-' }}</view>
						</view>
						<view class="item">
							<text class="title">报告日期</text>
							<view class="content">{{ supervisionAndSpotChecksItem.date || '-' }}</view>
						</view>
					</view>
				</view>
				<view class="gap" style="width: 100%; height: 2vw;"></view>
			</view>
 		</scroll-view>
		<nullDataState v-else></nullDataState>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</view>
</template>

<script>
	import {
		formatDate,
		lazyLoadCache
	} from '@/tool/tool.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import titleStyle from '@/components/titleStyle'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	import tableCustomize from '@/components/tableCustomize'


	export default {
		name: "supervisionAndSpotChecks",
		components: {
			titleStyle,
			kxjPreviewImage,
			nullDataState,
			tableCustomize,
		},
		data() {
			return {
				supervisionAndSpotChecksData: [],
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				imageUrl: '',
				isComplete: false,
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const supervisionAndSpotChecksData = uni.getStorageSync('supervisionAndSpotChecksData') || null;
			if (supervisionAndSpotChecksData) {
				lazyLoadCache(() => {
					this.supervisionAndSpotChecksData = supervisionAndSpotChecksData.data
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updateId']),

			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getSupSamp',
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
								this.supervisionAndSpotChecksData.push(item)
							})
						}
					},
				});
			},

			inputSearch() {
				this.query.page = 1
				this.isComplete = false
				this.supervisionAndSpotChecksData = []
				this.getData()
			},

			loadMore(e) {
				if (this.isComplete) {
					return
				}
				this.query.page++
				this.getData()
			},



			// 预览图片
			previewImage(data) {
				if (!data) {
					return
				}
				this.imageUrl = data
				this.$refs.kxjPreviewImage.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.supervision-and-spotChecks {
		width: 100vw;
		height: calc(100%);
		position: relative;
		box-sizing: border-box;
		padding: 3vw 0 0 0;

		.input-search-box {
			width: 100%;
			height: 9vw;
			display: flex;
			align-items: center;
			margin-bottom: 2vw;
			box-sizing: border-box;
			padding: 0 3vw;

			.input {
				width: 82%;
				height: 98%;
				box-shadow: 0 0 4rpx 0 rgba(4, 100, 202, 0.4);
				padding-left: 15rpx;
				border-radius: 10rpx 0 0 10rpx;
				font-size: 24rpx;
			}

			.search-but {
				width: 20vw;
				height: 100%;
				background-color: #53A4FD;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				border-radius: 0 10rpx 10rpx 0;
				font-size: 24rpx;

				.icon {
					width: 3.2vw;
					height: 3.2vw;
					margin-right: 1vw;
				}

				.search {
					font-size: 3.5vw;
				}
			}

			.inputsearch:active {
				background-color: rgba(4, 100, 202, 0.7);
			}
		}

		.supervision-and-spotChecks-scroll {
			width: 100%;
			height: calc(100% - 12vw);

			.supervision-and-spotChecks-box {
				width: 100%;
				height: calc(100%);
				box-sizing: border-box;
				padding: 2vw 0;

				>.item {
					width: calc(100% - 4vw);
					border: 1px solid rgba(221, 221, 221, 1);
					margin: 0 auto 3vw auto;
					border-radius: 1.5vw;
					background-image: url('@/assets/imgs/bg-item-icon.png');
					background-size: 15vw 15vw;
					background-position: right bottom;
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
								width: 65vw;
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