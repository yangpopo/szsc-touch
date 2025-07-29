<template>
	<view class="system">
		<uni-nav-bar shadow right-text="返回" :border="false" title="管理配置页" @clickRight="exitReturn"></uni-nav-bar>
		<uni-list :border="true">
			<uni-list-item :title="'屏保 -- ' + (openScreensaverState ? '开' : '关')" clickable>
				<template v-slot:footer>
					<switch :checked="openScreensaverState" style="zoom: 0.6;" @change="switchScreensaverState" />
				</template>
			</uni-list-item>
			<uni-list-item  title="退出登录" clickable link @click="logOut"></uni-list-item>
			<uni-list-item  title="设置缓存" clickable link @click="skipPage('manageCache')"></uni-list-item>
			<uni-list-item  title="切换版本" clickable :rightText="currentVersion" link @click="isShowVersionPopup = true" ></uni-list-item>
		</uni-list>
		
		<!-- 版本弹窗 -->
		<view class="pop-up" v-if="isShowVersionPopup">
			<view class="version-options-list">
				<radio-group class="radio-box" @change="changeVersion">
					<label class="option" v-for="(item, index) in versionOptions" :key="item">
						<radio style="transform:scale(0.7)" :value="item" :checked="item === currentVersion" />
						<view>{{item}}</view>
					</label>
				</radio-group>
				<view class="but-fun">
					<button class="but" size="mini" type="primary" @click="confirmVersion">确定</button>
					<button class="but" size="mini" type="" @click="isShowVersionPopup = false">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatDate, skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "system",
		components: {},
		data() {
			return {
				isShowVersionPopup: false,
				currentVersion: '默认版本',
				versionOptions:['默认版本']
			};
		},
		onLoad(e) {},
		// 销毁前
		beforeDestroy() {

		},
		// 创建完成
		created() {
			const isLogonAdministrators = uni.getStorageSync('isLogonAdministrators') || null;
			if (isLogonAdministrators) {
				// 登录了就退出
				return
			}
			uni.showModal({
				title: '请输入管理密码',
				editable: true,
				success: (data) => {
					// 点了确认
					if (data.confirm) {
						if (!data.content) {
							uni.showToast({
								icon: 'none',
								title: '密码不能为空!',
								mask: true
							})
							setTimeout(() => {
								this.exitReturn()
							}, 1400)
							return
						}
						const manageAccountId = uni.getStorageSync('manageAccountId') || null
						if (manageAccountId != data.content) {
							uni.showToast({
								icon: 'none',
								title: '密码错误!',
								mask: true
							})
							setTimeout(() => {
								this.exitReturn()
							}, 1400)
						} else {
							uni.setStorageSync('isLogonAdministrators', true)
						}
					}
					// 点了取消
					if (data.cancel) {
						this.exitReturn()
					}
				},
			})
			console.log(this.openScreensaverState, '000000',  uni.getStorageSync('openScreensaverState'))
		},
		watch: {},
		computed: {
			...mapState(["pageName", 'openScreensaverState']),
		},
		methods: {
			...mapMutations([
				"updateId",
				"updatePageName",
				"updateTwoPageName",
				"updateThreePageName",
				"updateOpenScreensaver"
			]),
			
			/**
			 * 切换屏保状态
			 */
			switchScreensaverState(val) {
				this.updateOpenScreensaver(val.target.value)
				uni.setStorageSync('openScreensaverState', val.target.value);
			},
			
			/**
			 * 切换版本
			 */
			changeVersion(data) {
				this.currentVersion = data.detail.value
			},
			
			/**
			 * 确认切换版本
			 */
			confirmVersion() {
				uni.setStorageSync('currentVersion', this.currentVersion);
				plus.runtime.restart(); // 重启app
			},
			
			/**
			 * 跳转页面
			*/
			skipPage(data) {
				skipPage(data, this)
			},
			
			/**
			 * 退出登录
			*/
			logOut() {
				uni.setStorageSync('token', ''); // 清除token
				uni.removeStorageSync('isLogonAdministrators'); // 删除登录管理员状态
				skipPage('login', this)
			},
			
			/**
			 * 退出返回
			 */
			exitReturn() {
				uni.removeStorageSync('isLogonAdministrators'); // 删除登录管理员状态
				skipPage('home', this)
			},
		},
	};
</script>

<style lang="scss" scoped>
	.system {
		width: 100vw;
		height: 100vh;
		.pop-up {
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 9;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			.version-options-list {
				width: 80vw;
				height: 100vw;
				box-sizing: border-box;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: #fff;
				padding: 5vw;
				border-radius: 2vw;
				
				.radio-box {
					width: 100%;
					height: 77vw;
					overflow-y: scroll;
					margin-bottom: 5vw;
					.option {
						display: flex;
						// justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						padding: 2vw 0;
						font-size: 3.2vw;
						border-bottom: 1px solid #ececec;
					}
				}
				.but-fun {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.but {
						display: block;
						width: 20vw;
						margin: 0 auto;
						transform: scale(0.8);
					}
				}
			}
		}
	}
</style>