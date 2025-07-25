<template>
	<view class="table-tips" @click="switchShowTips">
		{{ showTips }}<template v-if="isExceed">..</template>
		<view class="mask" v-if="isExceed" v-show="isShowTips" @click.stop="switchShowTips">
		</view>
		<view class="tips" :class="{ 'tips-bottom': isFirst, 'max-left': isLeft, 'max-right': isRight }" v-if="isExceed" v-show="isShowTips" @click.stop="switchShowTips">{{ tipsData }}</view>
	</view>
</template>

<script>
	export default {
		name: "tableTips",
		props: {
			tipsData: {
				type: String | Number,
				default: '',
			},
			maxCharacter: {
				type: Number,
				default: 20,
			},
			isLast: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showTips: '',
				isExceed: false,
				isShowTips: false,
				isFirst: false,
				isLeft: false,
				isRight: false,
				nodeInfo: {
					bottom: 0,
					height: 23,
					left: 0,
					right: 0,
					top: 0,
					width: 0
				},
				windowWidth: 0,
				windowHeight: 0,
			};
		},
		watch: {
			tipsData(newVal) {
				this.info(newVal)
			}
		},
		mounted() {
			this.info(this.tipsData)
			uni.getSystemInfo({
			  success: (res) => {
					this.windowWidth = res.windowWidth;
					this.windowHeight = res.windowHeight
			  }
			});
		},
		methods: {
			info(tipsData) {
				if (!this.maxCharacter) {
					this.showTips = tipsData
					this.isExceed = false
					return
				}
				tipsData = tipsData.toString()
				if (tipsData.length <= this.maxCharacter) {
					this.showTips = tipsData
					this.isExceed = false
				} else {
					this.showTips = tipsData.slice(0, this.maxCharacter)
					this.isExceed = true
				}
			},
			switchShowTips() {
				uni.createSelectorQuery().in(this).select('.table-tips')
				.boundingClientRect(data => {
					this.nodeInfo = data
					if (this.windowHeight * 0.6 > data.top) {
						this.isFirst = true
					} else {
						this.isFirst = false
					}
					if (data.left < 0) {
						this.isLeft = true
					} else {
						this.isLeft = false
					}
					if (data.right > this.windowWidth) {
						this.isRight = true
					} else {
						this.isRight = false
					}
					this.isShowTips = !this.isShowTips
				})
				.exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table-tips {
		position: relative;
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			// background-color: #ff2c2c;
			z-index: 8;
		}
		.tips {
			position: absolute;
			background-color: #333;
			border-radius: 2vw;
			color: #fff;
			font-size: 2.8vw;
			line-height: 3.8vw;
			padding: 1.5vw 1.5vw;
			bottom: 8vw;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			// height: min-content;
			word-wrap:break-word !important;
			white-space: normal !important;
			word-break:break-all !important;
			z-index: 9;
			box-sizing: border-box;
			overflow: visible;
			display: block;
			&:before {
				content: "";
				width: 2vw;
				height: 2vw;
				background-color: #333;
				position: absolute;
				left: 50%;
				bottom: -0.8vw;
				transform: translateX(-50%) rotate(45deg);
			}
		}
		.tips-bottom {
			top: 8vw;
			bottom: initial;
			&:before {
				top: -0.8vw;
			}
		}
		.max-left {
			left: 105%;
			&:before {
				left: 10%;
			}
		}
		.max-right {
			left: -25%;
			&:before {
				left: 90%;
			}
		}
	}
</style>