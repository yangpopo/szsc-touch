<template>
	<view class="input-date-box">
		<uni-datetime-picker class="input" :disabled="disabled" :type="type" :value="currentValue" :start="start" :end="end" @change="change" :placeholder="placeholder" :return-type="returnType" />
		<view class="but" @click="confirmClick">
			<view class="icon"></view>
			<!-- <image class="icon" src="@/assets/imgs/search.png" mode="aspectFit"></image> -->
			<view class="text">查询</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"inputDateBox",
		props:{
			value: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'date'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			start: {
				type: String | Number,
				default: ''
			},
			end:{
				type: String | Number,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请选择日期'
			},
			returnType: {
				type: String,
				default: 'string'
			}
		},
		data() {
			return {
				currentValue: ''
			};
		},
		created() {
					},
		methods: {
			change(data) {
				this.$emit('input', data)
				this.$emit('change')
			},
			confirmClick() {
				if (this.readonly) {
					return
				}
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
.input-date-box {
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
		// position: relative;
		color: #555;
		font-size: 3.8vw;
		padding-right: 2vw;
		::v-deep .uni-date-x--border {
			border: none;
			border-radius: 0;
		}
		::v-deep .uni-date-x {
			font-size: 3.8vw;
			border-radius: 0;
		}
		::v-deep .uni-date__x-input {
			height: 8.5vw;
			line-height: 8.5vw;
		}
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