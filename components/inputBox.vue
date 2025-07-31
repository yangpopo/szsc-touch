<template>
	<view class="input-box">
		<view class="input-dom">
			<input class="input" :disabled="disabled" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" placeholder-class="placeholder" confirm-type="查询" @confirm="confirmClick"/>
			<view class="uni-icons uniui-clear" v-if="value" @click="clean"></view>
		</view>
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
			},
			clean() {
				this.$emit('input', '')
				this.$emit('clean')
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
		flex-shrink: 0;
	}
	.input-dom {
		width: calc(100% - 4vw - 20vw);
		height: 8.5vw;
		line-height: 8.5vw;
		background-color: #fff;
		position: relative;
		.input{
			width: calc(100% - 5vw - 2vw);
			height: 8.5vw;
			line-height: 8.5vw;
			position: relative;
			box-sizing: border-box;
			padding: 0.6vw 2vw;
			// position: relative;
			color: #555;
			font-size: 3vw;
			// background-color: #53A4FD;
		}
		.uni-icons {
			position: absolute;
			top: 50%;
			right: 1vw;
			width: 5.5vw;
			height: 5.5vw;
			font-family: uniicons;
			transform: translateY(-50%);
			// background-color: #53A4FD;
			&:before {
				content: "\e66d";
				font-size: 5.5vw;
				color: rgb(192, 196, 204);
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	
	
	.but {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #53A4FD;
		box-sizing: border-box;
		width: 20vw;
		height: 8.5vw;
		padding: 1vw 2vw;
		border-radius: 0 0.8vw 0.8vw 0;
		flex-shrink: 0;
		.icon {
			width: 3.5vw;
			height: 3.5vw;
			background-image: url('@/assets/imgs/search.png');
			background-size: 100% 100%;
		}
		.text {
			white-space: nowrap;
			color: #fff;
			margin-left: 1vw;
			font-size: 3.5vw;
		}
	}
}
</style>