<template>
	<view class="risk-level">
		<template v-if="dailyControlData">
			<view class="title-box">{{ dailyControlData.date.split(' ')[0] }}</view>
			<scroll-view class="scroll-box" scroll-y="true">
				<view class="day-item" v-for="(item, index) in dailyControlData.list" :key="item.title">
					<view class="day-title">
						<view class="day-num">{{ index + 1 }}</view>
						<view class="dayname">{{ item.title }}</view>
					</view>
					<view class="daymain" v-for="(ite, ind) in item.child" :key="ite.toString() + ind">
						<template v-if="ite.item_kind == 0">
							<view class="dayDesc" v-if="ite.item_type != 0">
								<view class="dayLabel">检查内容:</view>
								<view class="desc">{{ite.item_content || '暂无内容'}}</view>
							</view>
							<view class="dayDesc" v-if="ite.prj_item_desc">
								<view class="dayLabel">说明:</view>
								<view class="desc desc2">{{ ite.prj_item_desc }}</view>
							</view>
							<!-- radio and judgment -->
							<view class="dayAns" v-if="ite.item_type == 1 || ite.item_type == 2">
								<view class="dayLabel">检查情况:</view>
								<view class="ans">
									<view :class="['ansItem', ite.content == inn ? 'active' : '']"
										v-for="(itt, inn) in JSON.parse(ite.item_results)" :key="itt.toString() + inn">{{ itt }}</view>
								</view>
							</view>
							<!-- input -->
							<view class="dayAns" v-if="ite.item_type == 0">
								<view class="dayLabel">填写内容:</view>
								<view class="ans">{{ ite.content }}</view>
							</view>
							<!-- checkbox -->
							<view class="dayAns" v-if="ite.item_type == 3">
								<view class="dayLabel">检查情况:</view>
								<view class="ans">
									<view :class="['ansItem', ite.content.split(',').includes(inn) ? 'active' : '']"
										v-for="(itt, inn) in JSON.parse(ite.item_results)" :key="inn">{{ itt }}</view>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="dayAns" v-if="ite.item_type !== 0" style="justify-content: center">
								<view class="ans">
									<view :class="['ansItem', ite.content.split(',').includes(inn) ? 'active' : '']"
										v-for="(itt, inn) in JSON.parse(ite.item_results)" :key="inn" style="zoom: 1.5;">{{ itt }}</view>
								</view>
							</view>
							<!-- 填写 -->
							<view class="option-list" v-else-if="ite.item_type == 0" style="padding: 1.5vw 2vw; border: 1px solid rgba(4, 100, 202, 0.2); width: 100%; border-radius: 1vw; font-size: 3.5vw; margin-bottom: 3vw;">
								{{ ite.content }}
							</view>
							<!-- <view class="dayDesc" v-if="ite.prj_item_desc">
								<view class="dayLabel">说明:</view>
								<view class="desc desc2">{{ ite.prj_item_desc }}</view>
							</view> -->
						</template>
					</view>
				</view>
				<view class="gap" style="width: 100%; height: 3vw;"></view>
			</scroll-view>
		</template>
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


	export default {
		name: "dailyControl",
		components: {
			titleStyle,
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				dailyControlData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const dailyControlData = uni.getStorageSync('dailyControlData') || null;
			if (dailyControlData) {
				lazyLoadCache(() => {
					this.dailyControlData = dailyControlData
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
					url: 'touch/shop/getShopSunDay',
					method: 'post',
					data: {},
					success: (res) => {
						if (res.data.code == 200) {
							this.dailyControlData = res.data.data
						}
					},
				});
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
	.risk-level {
		width: 100vw;
		height: calc(100%);
		position: relative;
		box-sizing: border-box;
		padding: 3vw 0;

		.title-box {
			width: calc(100vw - 6vw);
			font-size: 3.8vw;
			font-weight: bold;
			color: #000;
			margin: 0 auto 2vw auto;
			text-align: center;
			box-shadow: 0 0 0.5vw rgba(4, 100, 202, 0.2);
			box-sizing: border-box;
			padding: 1vw;
			border-radius: 1.5vw;
		}

		.scroll-box {
			width: 100%;
			height: calc(100vh - 76vw);

			.day-item {
				width: calc(100vw - 6vw);
				border-radius: 10rpx;
				box-shadow: 0 0 0.5vw rgba(4, 100, 202, 0.2);
				box-sizing: border-box;
				margin: 20rpx auto 0;
				box-sizing: border-box;
				padding: 3vw;

				.day-title {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 4.2vw;
					font-weight: bold;
					border-bottom: 1px solid rgba(4, 100, 202, 0.2);
					box-sizing: border-box;
					padding-bottom: 2vw;
					margin-bottom: 2vw;

					.day-num {
						width: 7.4vw;
						height: 7.4vw;
						line-height: 7.5vw;
						background-color: #0464CA;
						color: #FFF;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 1vw;
						margin-right: 10rpx;
						font-size: 4.2vw;
						font-weight: normal;
						flex-shrink: 0;
					}
				}

				.daymain {
					border-bottom: 1rpx solid rgba(4, 100, 202, 0.2);
					margin-bottom: 2vw;
				}

				.daymain:last-child {
					margin-bottom: -3vw;
					border: none;
				}
				.dayAns {
					&:last-child {
						margin-bottom: 0;
					}
				}
				.dayDesc,
				.dayAns {
					width: 100%;
					min-height: 50rpx;
					display: flex;
					margin: 0 auto 2vw auto;

					.dayLabel {
						font-weight: bold;
						// width: 140rpx;
						font-size: 3.4vw;
						text-align: right;
						margin-right: 10rpx;
						flex-shrink: 0;
					}

					.desc {
						color: #333;
						width: calc(100%);
						font-size: 24rpx;
					}

					.desc2 {
						color: #000;
					}

					.ans {
						display: flex;
						margin-bottom: 20rpx;

						.ansItem {
							min-width: 100rpx;
							height: 50rpx;
							background-color: rgba(4, 100, 202, 0.2);
							margin-right: 20rpx;
							font-size: 22rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 1.2vw;
							color: #2c78bb;
						}

						.active {
							background-color: #0464CA;
							color: #fff;
						}
					}
				}
			}
		}

	}
</style>