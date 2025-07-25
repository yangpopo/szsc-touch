<template>
	<view class="input-box">
		<input class="input" :disabled="disabled" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" placeholder-class="placeholder"/>
		<view class="but" @click="confirmClick">
			<view class="icon"></view>
			<!-- <image class="icon" src="@/assets/imgs/search.png" mode="aspectFit"></image> -->
			<view class="text">查询</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"inputBox",
		props:{
			value: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '搜索'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: '请输入搜索关键字'
			},
		},
		data() {
			return {
			};
		},
		created() {
					},
		methods: {
			confirmClick() {
				if (this.disabled) {
					return
				}
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
.input-box {
	width: 100%;
	display: flex;
	align-items: stretch;
	font-size: 3vw;
	&:before {
		content: '';
		display: block;
		background-image: url("@/assets/imgs/inputbg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 4vw;
		height: 8.5vw;
		margin-right: - 1px;
	}
	.input{
		width: 46vw;
		height: 8.5vw;
		line-height: 8.5vw;
		position: relative;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0.6vw 2vw;
		position: relative;
		color: #555;
		font-size: 3vw;
	}
	
	.but {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #53A4FD;
		box-sizing: border-box;
		height: 8.5vw;
		padding: 1vw 2vw;
		border-radius: 0 0.8vw 0.8vw 0;
		flex-shrink: 0;
		.icon {
			width: 3.8vw;
			height: 3.8vw;
			background-image: url('@/assets/imgs/search.png');
			background-size: 100% 100%;
		}
		.text {
			white-space: nowrap;
			color: #fff;
			margin-left: 1vw;
			font-size: 4vw;
		}
	}
}
</style>