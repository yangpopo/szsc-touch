<template>
	<!-- 悬浮 -->
	<movable-area class="movable-area">
		<movable-view direction="vertical" :y="coordinateY" :inertia="false" :out-of-bounds="false" @change="movableViewChange" :animation="false">
			<view class="suspension-box" :style="{top: coordinateY + 'px'}">
				<view class="upward suspension-but" @click="returnUpLevel()">
					<!-- <image class="icon" src="@/assets/imgs/back.png" mode="aspectFit"></image> -->
					<view class="icon back"></view>
					<text class="title">返回</text>
				</view>
				<view class="home suspension-but" @click="skipPage('home')">
					<!-- <image class="icon" src="@/assets/imgs/home.png" mode="aspectFit"></image> -->
					<view class="icon home"></view>
					<text class="title">首页</text>
				</view>
			</view>
		</movable-view>
	</movable-area>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"navigationPageBut",
		props:{
		},
		data() {
			return {
				heightDifference: 0, // 高度差
				coordinateY: 0, // 坐标y
			};
		},
		computed: {
			...mapState(['pageName', 'routeHistory', 'navigationPageButCoordinateY']),
		},
		mounted() {
			this.coordinateY = this.navigationPageButCoordinateY
		},
		methods: {
			...mapMutations(['updataPageName', 'updataRouteHistory', 'updateNavigationPageButCoordinateY']),
			
			// 发生变化
			movableViewChange(data) {
				this.updateNavigationPageButCoordinateY(data.detail.y)
			},
			
			// 跳转页面
			skipPage(val) {
				let routeHistory = JSON.parse(JSON.stringify(this.routeHistory))
				for (let i = 0; i < routeHistory.length; i++) {
					this.updataRouteHistory()
				}
				skipPage(val, this)
			},
			
			// 返回上一级
			returnUpLevel() {
				if (this.routeHistory.length <= 1) {
					this.skipPage('home')
					return
				}
				let targetRoute = this.routeHistory[this.routeHistory.length - 2]
				for (let i = 0; i < 2; i++) {
					this.updataRouteHistory()
				}
				skipPage(targetRoute, this)
			}
		}
	}
</script>

<style lang="scss" scoped>
.movable-area {
	position: fixed;
	top: 42%;
	right: 0%;
	transform: translateY(-50%);
	width: 50rpx;
	height: 70vh;
	pointer-events: none;
	z-index: 2;
}
.suspension-box {
	pointer-events: auto;
	background: linear-gradient(to right, #D5E9FF, #E9F4FF);
	width: 50rpx;
	border-radius: 15rpx 0 0 15rpx;
	box-shadow: 0 0 10rpx 0 rgba(0, 82, 169, 0.3);
	box-sizing: border-box;
	padding: 1vw;
	// touch-action: none; /* 这会阻止所有触摸行为 */
	.upward {
		border-bottom: 1px solid rgba(40, 140, 247, 0.2);
	}
	.suspension-but {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 2.5vw 0;
		.icon {
			width: 4vw;
			height: 4vw;;
			display: block;
			margin-bottom: 1vw;
			&.back {
				background-image: url('@/assets/imgs/back.png');
				background-size: 100% 100%;
			}
			&.home {
				background-image: url('@/assets/imgs/home.png');
				background-size: 100% 100%;
			}
		}
		.title {
			font-size: 3vw;
			line-height: 3vw;
			color: rgba(40, 140, 247, 1);
			zoom: 0.6;
			text-align: center;
		}
	}
}
</style>