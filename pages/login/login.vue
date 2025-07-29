<template>
	<view class="login_box">
		<view class="title">
			<image src="@/assets/imgs/Vector.png" class="titleimg"></image>
			<view class="toptext">欢迎登录</view>
			<view class="toptext">重庆数字商超监管服务平台</view>
		</view>
		<view class="con_box">
			<view class="form_box">
				<view class="pass_box">
					<view class="input_box">
						<!-- <image src="@/assets/imgs/username.png" class="user"></image> -->
						<view class="user"></view>
						<input v-model="form.username" placeholder="请输入登录账号" />
					</view>
					<view class="input_box">
						<!-- <image src="@/assets/imgs/password.png" class="pass"></image> -->
						<view class="pass"></view>
						<input v-model="form.password" type="password" placeholder="请输入密码" />
					</view>
					<view class="remember">
						<checkbox-group @change="rememberChange" class="checkbox">
							<label>
								<checkbox value="1" style="transform: scale(0.9);" :checked="isRememberLoginInfo">记住账号</checkbox>
							</label>
						</checkbox-group>
					</view>
					<view class="submit" @click="submit">
						<text>登录</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tips">
			*若无账号密码，请联系上级领导或单位获取
		</view>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name: 'logon',
		components:{
		},
		data() {
			return {
				form: {
					username: "yhshgc",
					password: "654321",
				},
				isRememberLoginInfo: true,
			}
		},
		computed: {
			...mapState(['technicalSupport', 'serviceHotline']),
		},
		created() {

		},
		mounted() {
			const username = uni.getStorageSync('username') || null
			const password = uni.getStorageSync('password') || null
			if (!username || !password) {
				this.isRememberLoginInfo = false
			} else {
				this.form.username = username
				this.form.password = password
				this.isRememberLoginInfo = true
			}
		},
		methods: {
			// 登录
			submit() {
				if (!this.form.username) {
					uni.showToast({
						title: '请先输入账号!',
						icon: 'error'
					})
					return
				}
				if (!this.form.password) {
					uni.showToast({
						title: '请先输入密码!',
						icon: 'error'
					})
					return
				}
				uni.showLoading({
				  title: '登录中'
				})
				// 记住管理账户登录密码
				uni.setStorageSync('manageAccountId', this.form.password)
				
				if (this.isRememberLoginInfo) {
					// 记住密码
					uni.setStorageSync('username', this.form.username)
					uni.setStorageSync('password', this.form.password)
				} else {
					// 忘记密码
					uni.removeStorageSync('username')
					uni.removeStorageSync('password')
				}
				
				uni.request({
					url: 'touch/login/Login',
					data: this.form,
					success: res => {
						if (res.data.code == 200) {
							uni.setStorageSync('token', res.data.data.auth)
							uni.setStorageSync('shopId', res.data.data.shop_id);
							this.skipPage('home')
						}
					},
				})
			},
			// 记住状态发生变化
			rememberChange(data) {
				if (data.detail.value.length == 0) {
					this.isRememberLoginInfo = false
				} else if (data.detail.value.length == 1) {
					this.isRememberLoginInfo = true
				}
			},
			// 跳转页面
			skipPage(val) {
				skipPage(val, this)
			},
		}
	}
</script>

<style lang="scss" scoped>
/* // 清楚button的默认样式 */
	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;

		&::after {
			border: none;
		}
	}

	input::placeholder {
		color: rgba(204, 204, 204, .8);
	}

	.login_box {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		// background: linear-gradient(to bottom, #0464CA, #3181D5, #5799DE);
		// padding: 60rpx 60rpx 0;

		.title {
			font-size: 48rpx;
			color: #234584;
			width: 100%;
			height: 35%;
			background-image: url('../../assets/imgs/titlebg.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			padding: 0 80rpx;
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: center;
			box-sizing: border-box;

			.titleimg {
				width: 152rpx;
				height: 152rpx;
				margin-bottom: 20rpx;
			}

			.toptext {
				color: #fff;
				font-family: 'YouShe';
				font-size: 48rpx;
			}
		}


		.con_box {
			background-color: white;
			border-radius: 30rpx;

			.form_box {
				padding: 0 40rpx;

				.pass_box {
					.input_box {
						margin-top: 40rpx;
						padding: 5rpx 30rpx;
						border-radius: 15rpx;
						background-color: #F5F5F5;
						display: flex;
						align-items: center;

						input {
							height: 90rpx;
							margin-left: 30rpx;
						}

						.user {
							width: 50rpx;
							height: 50rpx;
							background-image: url('@/assets/imgs/username.png');
							background-size: 100% 100%;
						}
						.pass {
							width: 50rpx;
							height: 50rpx;
							background-image: url('@/assets/imgs/password.png');
							background-size: 100% 100%;
						}
					}

					.remember {
						margin-top: 20rpx;
					}

					.radio_box {
						margin: 20rpx 0;
						font-size: 28rpx;
						color: #555;
					}

					.submit {
						margin-top: 30rpx;
						display: flex;
						justify-content: center;

						text {
							width: 100%;
							height: 80rpx;
							border-radius: 50rpx;
							background: linear-gradient(to right, #0464CA, #53A4FD);
							font-weight: 400;
							font-size: 32rpx;
							color: white;
							display: flex;
							justify-content: center;
							align-items: center;
							font-family: 'PingFangM'
						}
					}
				}

				.chat_box {
					margin-top: 40rpx;

					.other {
						margin-top: 10rpx;
						text-align: center;
						font-family: Source Han Sans CN, Source Han Sans CN;
						font-size: 28rpx;
						font-weight: 700;

						.but_box {
							display: flex;
							align-items: center;
							justify-content: center;

							.desc1 {
								font-weight: 700;
								color: #4784FF;
							}
						}

						// 清楚button的默认样式
						button {
							background: none;
							color: inherit;
							border: none;
							padding: 0;
							font: inherit;
							cursor: pointer;
							outline: inherit;

							&::after {
								border: none;
							}
						}
					}
				}
			}
		}

		.tips {
			width: 100%;
			height: 70rpx;
			position: fixed;
			bottom: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba(204, 204, 204, .8);
			font-size: 26rpx;
		}

		.checkbox {
			color: #0464CA;
		}
	}
</style>
