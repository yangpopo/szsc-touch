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
										v-for="(itt, inn) in JSON.parse(ite.item_results)" :key="inn">{{ itt }}</view>
								</view>
							</view>
							<!-- 填写 -->
							<view class="option-list" v-else-if="ite.item_type == 0" style="padding: 1.5vw 2vw; border: 1px solid #ddd; width: 100%; border-radius: 1vw; font-size: 3.5vw;">
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
		padding: 3vw;

		.title-box {
			font-size: 3.8vw;
			color: #000;
			margin: 0 0 2vw 0;
			text-align: center;
			box-shadow: 0 0 1vw rgba(4, 100, 202, 0.5);
			box-sizing: border-box;
			padding: 1vw;
		}

		.scroll-box {
			width: 100%;
			height: calc(100vh - 76vw);

			.day-item {
				width: 98%;
				border-radius: 10rpx;
				box-shadow: 0 0 5rpx 0 rgba(4, 100, 202, 0.2);
				box-sizing: border-box;
				margin: 20rpx auto 0;

				.day-title {
					height: 60rpx;
					width: 95%;
					display: flex;
					align-items: center;
					font-size: 24rpx;
					margin: 0 auto;

					.day-num {
						width: 45rpx;
						height: 45rpx;
						background-color: #0464CA;
						color: #FFF;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 15rpx;
						margin-right: 10rpx;
					}
				}

				.daymain {
					border-bottom: 1rpx solid #ddd;
				}

				.daymain:last-child {
					border: none;
				}

				.dayDesc,
				.dayAns {
					width: 95%;
					min-height: 50rpx;
					display: flex;
					margin: 10rpx auto 0;

					.dayLabel {
						font-weight: bold;
						width: 140rpx;
						font-size: 24rpx;
						text-align: right;
						margin-right: 10rpx;
					}

					.desc {
						color: #333;
						width: calc(100% - 150rpx);
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
							background-color: #efefef;
							margin-right: 20rpx;
							font-size: 22rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 10rpx;
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