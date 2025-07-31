<template>
	<view @touchstart="findInteraction">
		<component style="position: relative; z-index: 1;" v-bind:is="currentTabComponent" @switchComponents="switchComponents"></component>
		<!-- 更新弹窗 -->
		<view class="update-popup" v-if="isShowUpdatePopup">
			<view class="update-box">
				<view class="update-info-box">
					<ul class="update-info" v-if="appInfo">
						<li>版本号: v{{ appInfo.configValue }}</li>
						<!-- <li>更新时间: {{ appInfo.updateTime }}</li>
						<li>更新说明: {{ appInfo.remark }}</li> -->
					</ul>
				</view>
				<view class="operate-box">
					<view class="browser-download-but" @click="installAppMode('externalLinks')">浏览器下载</view>
					<view class="direct-download-but" v-if="downloadProgress == 0" @click="installAppMode('local')">直接下载</view>
					<view class="direct-download-but" v-else>正在下载{{downloadProgress}}%</view>
				</view>
			</view>
		</view>
		<navigationPageBut v-if="isShowNav"></navigationPageBut>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import navigationPageBut from '@/components/navigationPageBut.vue'
	import login from '../login/login.vue' // 登录
	import home from '../home/home.vue' // 主页
	import screensaver from '../screensaver/screensaver.vue' // 屏保
	import principalResponsibility from '../principalResponsibility/principalResponsibility.vue' // 主体责任
	import companyIntroduction from '../companyIntroduction/companyIntroduction.vue' // 企业介绍
	import manager from '../manager/manager.vue' // 管理人员
	import securityTraceability from '../securityTraceability/securityTraceability.vue' // 安全溯源
	import deadlineReminder from '../deadlineReminder/deadlineReminder.vue' // 临期提醒
	import foodSafetyTesting from '../foodSafetyTesting/foodSafetyTesting.vue' // 食安檢測
	import regulatoryResponsibilities from '../regulatoryResponsibilities/regulatoryResponsibilities.vue' // 监管责任
	import territorialResponsibility from '../territorialResponsibility/territorialResponsibility.vue' // 属地责任
	import lawsAndRegulations from '../lawsAndRegulations/lawsAndRegulations.vue' // 属地责任
	import sunshineFood from '../sunshineFood/sunshineFood.vue' // 阳光食品
	import riskStatement from '../riskStatement/riskStatement.vue' // 风险提示
	import recallNotice from '../recallNotice/recallNotice.vue' // 风险提示
	import system from '../system/system.vue' // 管理配置页
	import manageCache from '../manageCache/manageCache.vue' // 缓存页面
	import complaintOpinion from '../complaintOpinion/complaintOpinion.vue' // 投诉意见
	
	import keymap from '@/tool/keymap.js'

	export default {
		name: "entrance",
		components:{
			navigationPageBut,
			login,
			home,
			screensaver,
			principalResponsibility,
			companyIntroduction,
			manager,
			securityTraceability,
			deadlineReminder,
			foodSafetyTesting,
			regulatoryResponsibilities,
			territorialResponsibility,
			lawsAndRegulations,
			sunshineFood,
			riskStatement,
			recallNotice,
			system,
			manageCache,
			complaintOpinion,
			scanKeyData:''
		},
		data() {
			return {
				currentTabComponent: 'login',
				timerValue: 1, // 计时器
				timerObj: null, // 定时器
				isShowUpdatePopup: false, // 是否显示升级框
				waitUpdateAppUrl: '', // 待更新app地址
				downloadProgress: 0, // 下载进度
				appInfo: null, // app信息
				routePath: '', // 路由路径
				entranceScanKeyData: '', // 入口扫描key数据
			}
		},
		onLoad(query) {
			this.routePath = query.routePath || ''
			uni.removeStorageSync('isLogonAdministrators'); // 删除登录管理员状态
		},
		created() {
			this.getBottomInfo(); // 获取底部信息
			this.checkQueryParams(true); // 初始化
			if (this.openScreensaverState) {
				this.findInteraction(); // 打开监控交互
			}
			
			// #ifdef APP-PLUS
			this.inspectAppUpdate() // 检查版本号
			plus.key.addEventListener("keyup", this.keypress) // 监听键盘
			// #endif
			
			// // #ifdef H5
			// document.addEventListener("keyup", this.keypress);
			// // #endif
			
		},
		watch:{
			pageName(newVal) {
				if (newVal == 'login' || newVal == 'system' || newVal == 'manageCache' || newVal == 'home' || newVal == 'screensaver') {
					this.updateIsShowNav(false)
				} else {
					this.updateIsShowNav(true)
				}
				this.checkQueryParams()
			},
			openScreensaverState(newVal) {
				if (this.openScreensaverState) {
					this.findInteraction(); // 打开监控交互
				} else {
					// 关闭
					clearInterval(this.timerObj)
					this.timerValue = 1
				}
			}
		},
		computed: {
			...mapState(['pageName', 'openScreensaverState', 'technicalSupport', 'serviceHotline', 'isShowNav']),
		},
		methods: {
			...mapMutations(['updataPageName', 'updateTechnicalSupport', 'updateServiceHotline', 'updateIsShowNav', 'updateScanKeyData']),
			// 键盘
			keypress(e) {
				// console.log(e);
				if (e.keyCode === 66 || e.key =='Enter') {
					this.updateScanKeyData(this.entranceScanKeyData)
					this.entranceScanKeyData = ''
					if (this.pageName != 'securityTraceability') {
						skipPage('securityTraceability', this)
					} else {
						
					}
				} else {
					this.entranceScanKeyData += keymap[e.keyCode] || ''
				}
			},

			
			checkQueryParams(initial = false) {
				let defaultPageName = '' // 默认页面名称
				if (uni.getStorageSync('token')) {
					if (this.routePath && initial) {
						 // 初始话路由
						let [routes, query] = this.routePath.split('?')
						let routeNameArr = routes.split('/')
						defaultPageName = skipPage(routeNameArr[0], this, true) // 只初始化第一级
					} else {
						defaultPageName = 'home'
					}
				} else {
					defaultPageName = 'login'
					uni.navigateTo({
						url: `/?routePath=login`,
					})
				}
				this.currentTabComponent = this.pageName || defaultPageName
				this.updataPageName(this.currentTabComponent)
			},
			
			// 切换菜单
			switchComponents(val) {
				this.currentTabComponent = val;
			},
			
			// 发生了交互
			findInteraction() {
				if (!this.openScreensaverState) {
					clearInterval(this.timerObj)
					return
				}
				clearInterval(this.timerObj)
				this.timerValue = 1
				this.timerObj = setInterval(() => {
					if ((this.pageName != 'manageCache') && (this.pageName != 'configuration')) {
						this.timerValue++
					}
					// 3 * 60
					if (this.timerValue >= (3 * 60)) {
						clearInterval(this.timerObj)
						this.switchComponents('screensaver')
						skipPage('screensaver', this)
					}
				}, 1000)
			},
			
			// 获取 底部信息
			getBottomInfo() {
				// 获取--->技术支持
				uni.request({
					url: 'touch/index/getSupport',
					method: 'post',
					isShowLoading: false,
					success: (res) => {
						if (res.data.code == 200) {
							uni.setStorageSync('technicalSupport', res.data.data.name)
							this.updateTechnicalSupport(res.data.data.name)
							uni.setStorageSync('serviceHotline', res.data.data.tel)
							this.updateServiceHotline(res.data.data.tel)
						}
					}
				});
			},
			
			// 更新在线状态
			upOnline(version, uuid) {
				if (!uni.getStorageSync('token')) {
					return
				}
				console.log('version:' + version, 'uuid:' + uuid)
				uni.request({
					url: 'touch/shop/upOnline',
					method: 'post',
					sslVerify: false,
					isShowLoading: false,
					data: {
						version,
						uuid
					},
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					success: (result) => {
						console.log('upOnline--成功:', result);
					},
					fail: (err) => {
						console.log('upOnline--失败:', err);
					}
				})
			},
			
			// 获取服务器app信息
			inspectAppUpdate() {
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					// 获取uuid
					plus.device.getInfo({
						success:(e) => {
							this.upOnline(widgetInfo.version, e.uuid) // 初始化第一次
							setInterval(() => {
								this.upOnline(widgetInfo.version, e.uuid)
							}, 30 * 60 * 1000)
							// 30 * 60 * 1000
						},
						fail:function(e){
							console.log('upOnline: '+JSON.stringify(e));
						}
					});
					
					// 获取服务器最新版本
					uni.request({
						url: 'touch/index/getTouchVer',
						method: 'post',
						isShowLoading: false,
						data: {
							version: widgetInfo.version,
							name: widgetInfo.name
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.appInfo = {
									configValue: res.data.data.ver
								}
								if (this.compareVersion(res.data.data.ver, uni.getSystemInfoSync().appVersion) == 1) {
									// 需要安装
									this.isShowUpdatePopup = true
									this.waitUpdateAppUrl = res.data.data.url
								} else {
									// // 不需要安装
									// this.isShowUpdatePopup = true
									// this.waitUpdateAppUrl = res.data.data.url
								}
							}
						},
						fail:(e) => {
							console.log('index-getTouchVer: '+JSON.stringify(e));
						}
					});
				})
			},
			
			// 下载安装app
			downloadInstallApp() {
				let downloadTask = uni.downloadFile({
					url: this.waitUpdateAppUrl,
					success:(res) => {
						uni.showLoading({
							title: '正在安装...',
							mask: true
						})
						plus.runtime.install(res.tempFilePath, { force:true }, function(){
							uni.hideLoading()
							plus.runtime.restart(); // 重启app
							 // console.log("安装wgt文件成功！");
						},function(e){
							uni.hideLoading()
							 // console.log("安装wgt文件失败["+e.code+"]："+e.message);
							 uni.showToast({
							 	title: `安装失败${e.code}:${e.message}`,
							 	icon: 'none'
							 })
						});
					},
					fail: (err) => {
						console.log("下载错误:", err)
					},
				})
				
				downloadTask.onProgressUpdate((res) => {
					this.downloadProgress = res.progress
					console.log(`${res.progress}%`)
				});
			},
			
			// 安装app模式
			installAppMode(mode = 'local' ) {
				if (mode == 'local') {
					this.downloadInstallApp()
				} else {
					plus.runtime.openURL(this.waitUpdateAppUrl);
				}
			},
			
			/**
			 * 版本号大小对比 返回值为1 需要更新
			 * @param {string} v1 服务器本号
			 * @param {string} v2 本机本号
			 * @returns {number} 1 需要更新 0 -1 不需要更新
			 */
			compareVersion(v1, v2) {
				v1 = v1.split('.')
				v2 = v2.split('.')
				const len = Math.max(v1.length, v2.length)
				while (v1.length < len) {
					v1.push('0')
				}
				while (v2.length < len) {
					v2.push('0')
				}
				for (let i = 0; i < len; i++) {
					const num1 = parseInt(v1[i])
					const num2 = parseInt(v2[i])
					if (num1 > num2) {
						return 1
					} else if (num1 < num2) {
						return -1
					}
				}
				return 0
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.update-popup{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.5);
		.update-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-image: url('@/assets/imgs/update-popup-bg.png');
			background-size: 100% 100%;
			width: 75vw;
			height: 92.5vw;
			box-sizing: border-box;
			padding: 30vw 10vw 0 10vw;
			.update-info-box {
				width: 100%;
				height: 37vw;
				margin-bottom: 10vw;
				position: relative;
				.update-info {
					// position: absolute;
					// top: 50%;
					// transform: translateY(-50%);
					box-sizing: border-box;
					width: 100%;
					max-height: 37vw;
					margin-bottom: 10vw;
					padding-inline-start: 7vw;
					font-size: 3.2vw;
					line-height: 5.5vw;
					overflow-y: auto;
					font-weight: normal;
				}
			}
			.operate-box {
				width: 120%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: -10%;
				.browser-download-but {
					font-size: 3.5vw;
					font-weight: normal;
					border: 1px solid #0464ca;
					color: #0464ca;
					width: 30vw;
					height: 9vw;
					line-height: 9vw;
					text-align: center;
					border-radius: 10vw;
					background-color: #fff;
				}
				.direct-download-but {
					font-size: 3.5vw;
					font-weight: normal;
					border: 1px solid #0464ca;
					color: #fff;
					width: 30vw;
					height: 9vw;
					line-height: 9vw;
					text-align: center;
					border-radius: 10vw;
					background-color: #0464ca;
				}
			}
		}
	}
</style>
