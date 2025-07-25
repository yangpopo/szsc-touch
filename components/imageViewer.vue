<template>
	<view class="image-mask" v-if="isShow">
		{{rangeDeg}}
		<view class="image-box">
			<image src="@/assets/imgs/close.png" class="close" @click="close"></image>
			<image src="@/assets/imgs/range.png" class="range" @click="range"></image>
			
			<image :style="{ transform: `rotate(${rangeDeg}deg)` }" :src="url" class="image" mode="heightFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "imageViewer",
		props: {
			url: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isShow: false,
				rangeDeg: 0
			}
		},
		computed: {
		},
		async created() {
			
		},
		methods: {
			close() {
				this.isShow = false
				this.rangeDeg = 0
			},
			range(){
				this.rangeDeg += 45
			}
		}
	}
</script>

<style lang="scss" scoped>
.image-mask {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	z-index: 999;

	.image-box {
		width: 90%;
		background-image: url('../assets/imgs/imageviewer.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 15vw 2vw;

		.close {
			position: absolute;
			top: 15rpx;
			right: 15rpx;
			width: 50rpx;
			height: 50rpx;
		}

		.range {
			width: 50rpx;
			height: 48rpx;
			position: absolute;
			bottom: 15rpx;
			left: 45%;
		}

		.image {
			width: 100%;
			position: relative;
			display: block;
			transition: all 1s;
		}
	}
}
</style>