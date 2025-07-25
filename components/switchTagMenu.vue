<template>
	<scroll-view class="switch-tag-menu" :scroll-x="true" :show-scrollbar="false" :scroll-left="scrollLeft">
		<view class="tag-box">
			<template v-if="menuData.length > 0">
				<view class="tag" :class="{ selected: currentMenuValue == menuItem.value}" v-for="(menuItem, index) in menuData" :key="menuItem.title + index" @click="switchMenu(menuItem, $event)"><text class="title">{{ menuItem.title }}</text></view>
			</template>
		</view>
	</scroll-view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'

	export default {
		name: "switchTagMenu",
		props: {
			menuData: {
				type: Array,
				default: () => {
					return []
				}
			},
			defaultMenuValue: {
				type: String | Number,
				default: ''
			}
		},
		components: {},
		data() {
			return {
				currentMenuValue: '', // 是否打开
				scrollLeft: 0,
				viewportWidth: uni.getSystemInfoSync().screenWidth, // 获取视口宽度
			}
		},
		created() {
			if (this.menuData.length > 0) {
				this.currentMenuValue = this.menuData[0].value
			}
			if (this.defaultMenuValue) {
				this.currentMenuValue = this.defaultMenuValue
			}
		},
		// 被销毁前
		beforeDestroy() {

		},
		computed: {
		},
		methods: {
			// 选中菜单
			switchMenu(menuData, $event) {
				this.scrollLeft = $event.target.offsetLeft - (this.viewportWidth / 100 * 25) * 2
				this.currentMenuValue = menuData.value;
				this.$emit('selectedMenu', menuData.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.switch-tag-menu {
		width: 100%;
		background-color: transparent;

		.tag-box {
			display: flex;
			align-items: center;

			.tag {
				font-size: 3.6vw;
				font-family: "PingFangH";
				width: 100%;
				max-width: 50%;
				min-width: 25%;
				height: 10vw;
				box-sizing: border-box;
				position: relative;
				flex-shrink: 1;
				display: flex;
				justify-content: center;
				align-items: stretch;
				.title {
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					white-space: nowrap;
				}
				&.selected {
					&:after {
						content: '';
						background-image: url("@/assets/imgs/twol.png");
						background-size: 100% 100%;
						width: 10vw;
						display: block;
					}
					&:before {
						content: '';
						background-image: url("@/assets/imgs/twor.png");
						background-size: 100% 100%;
						width: 10vw;
						display: block;
					}
					
					.title {
						color: #0464CA;
						background-color: #fff;
						position: relative;
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
					
					&:first-child {
						&:before {
							content: '';
							flex-shrink: 0;
							width: 3vw;
							display: block;
							border-radius: 3vw 0 0 0;
							background-color: #fff;
						}
						&:after {
							content: '';
							background-image: url("@/assets/imgs/twol.png");
							background-size: 100% 100%;
							width: 10vw;
							display: block;
						}
					}
					&:last-child {
						&:before {
							content: '';
							background-image: url("@/assets/imgs/twor.png");
							background-size: 100% 100%;
							width: 10vw;
							display: block;
						}
						&:after {
							content: '';
							flex-shrink: 0;
							width: 3vw;
							display: block;
							border-radius: 0 3vw 0 0;
							background-color: #fff;
						}
					}
				}
			}
		}
	}
</style>