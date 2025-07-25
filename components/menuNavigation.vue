<template>
	<view class="menu-navigation">
		<view class="head">
			<view class="title" v-if="mode == 'title'">
				<slot name="head"></slot>
			</view>
			<view class="box" v-else>
				<slot name="head"></slot>
			</view>
		</view>
		<view class="foot">
			<slot name="foot"></slot>
		</view>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'

	export default {
		name: "menuNavigation",
		props: {
			mode: {
				type: String,
				default: 'title'
			}
			// menuData: {
			// 	type: Array,
			// 	default: []
			// },
			// defaultMenuValue: {
			// 	type: String | Number,
			// 	default: ''
			// }
		},
		components: {},
		data() {
			return {
			}
		},
		created() {
		},
		// 被销毁前
		beforeDestroy() {

		},
		computed: {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.menu-navigation {
		width: 100%;
		background-color: transparent;
		display: flex;
		align-items: center;
		.head {
			min-width: 20%;
			flex-shrink: 0;
			font-size: 3.8vw;
			font-family: "PingFangH";
			height: 10vw;
			box-sizing: border-box;
			position: relative;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			color: #fff;
			.title {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
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
			.box {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				background-color: #fff;
				position: relative;
			}
			&:before {
				content: '';
				flex-shrink: 0;
				width: 3vw;
				display: block;
				border-radius: 2vw 0 0 0;
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
		.foot {
			width: max-content;
			margin: -0.5vw 0 0 -2vw;
			box-sizing: border-box;
			padding-right: 2vw;
			// transform: translate(-2vw, -0.5vw);
		}
	}
</style>