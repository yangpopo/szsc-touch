<template>
	<view class="drop-down" @click="switchShow">
		<view class="current">
			<view class="value">{{value}}</view>
			<view class="downward-icon"></view>
			<!-- <image class="downward-icon" src="@/assets/imgs/dropdown.png" mode="aspectFit"></image> -->
		</view>
		<view class="option-list" v-show="isOpen">
			<view class="mask"></view>
			<view class="option-item" :class="{selected: value == option.label}" @click.stop="selected(option)" v-for="option in options" :key="option.value">{{ option.label }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"dropDown",
		props:{
			value: {
				type: String,
				default: null
			},
			// 默认值
			defaultValue: {
				type: String,
				default: null
			},
			// 选项
			options: {
				type: Array,
				default: () => []
			},
			// title: {
			// 	type: String,
			// 	default: null
			// }
		},
		data() {
			return {
				isOpen: false, // 是否打开
			};
		},
		created() {
			for(let i = 0; i < (this.options.length - 1); i++) {
				if (this.options[i].label == this.defaultValue) {
					// this.value = this.options[i].label
					this.$emit('input', this.defaultValue)
				}
			}
		},
		methods: {
			// 选中菜单
			selected(data) {
				this.$emit('input', data.label)
				this.$emit('change', data)
				this.switchShow()
			},
			switchShow() {
				this.isOpen = !this.isOpen
			}
		}
	}
</script>

<style lang="scss" scoped>
.drop-down {
	width: 100%;
	// border: 1px solid rgba(66, 160, 225, 1);
	position: relative;
	// background-color: rgba(66, 160, 225, 1);
	box-sizing: border-box;
	padding: 0.6vw 1vw;
	background-color: #fff;
	.current {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		.value {
			width: calc(100% - 4vw);
			height: 5vw;
			line-height: 5vw;
			text-align: center;
			display: block;
			color: #0464CA;
			font-family: "PingFangH";
			font-size: 3.4vw;
			white-space: nowrap; /* 禁止文本换行 */
			overflow: hidden; /* 隐藏溢出内容 */
			text-overflow: ellipsis; /* 使用省略号表示被截断的内容 */
		}
		.downward-icon {
			width: 4vw;
			height: 3vw;
			margin-left: 1vw;
			background-image: url('@/assets/imgs/dropdown.png');
			background-size: 100% 100%;
		}
	}
	.option-list {
		width: 100%;
		display: block;
		position: absolute;
		top: calc(6.5vw);
		left: -1px;
		border-top: none;
		z-index: 9;
		background-color: #3181D5;
		.mask {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background-color: transparent;
			z-index: 0;
		}
		
		.option-item {
			font-size: 3vw;
			width: 100%;
			box-sizing: border-box;
			text-align: center;
			// padding: 1.2vw 5vw 1.2vw 1vw;
			padding: 1.2vw 1vw 1.2vw 1vw;
			color: #fff;
			position: relative;
			z-index: 1;
			border-bottom: 1px solid rgba(229, 229, 229, 1);;
			&.selected {
				color: #fff;
				background-color: #0464CA;
			}
		}
	}
}
</style>