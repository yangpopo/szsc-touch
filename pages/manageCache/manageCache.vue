<template>
	<view class="manage-cache">
		<view class="tag-list">
			<uni-tag text="退出" @click="exitReturn"></uni-tag>
			<uni-tag text="清除缓存" type="error" @click="clearCacheAll"></uni-tag>
			<uni-tag text="全部缓存" type="success" @click="startCacheAll"></uni-tag>
		</view>
		<scroll-view class="scroll-box" :scroll-y="true">
			<view class="interface-item" v-for="(cacheItem, index) in cacheCatalogue" :key="cacheItem.name">
				<view class="head">
					<uni-tag class="name" :text="cacheItem.name" type="success" size="mini"></uni-tag>
					<!-- <text class="interface-name">{{ cacheItem.interfaceName }}</text> -->
					<text class="state" v-if="cacheItem.state">{{
            cacheItem.state
          }}</text>
				</view>
				<view class="footing">
					<uni-tag text="清除" v-if="cacheItem.isCompleteCache" type="error" @click="clearCache(cacheItem)"
						size="mini"></uni-tag>
					<uni-tag class="start-cache" text="缓存" type="success" @click="startCache(index, cacheItem)"
						size="mini"></uni-tag>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { formatDate, skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "manageCache",
		components: {},
		data() {
			return {
				goodsClassPid: null,
				currentIndex: 0,
				isCacheIng: false,
				cacheCatalogue: [{
						name: "首页",
						interfaceName: "touch/shop/getShopDesc",
						queryParameters: {},
						state: "",
						isCompleteCache: false,
						cacheKey: [{
							keyName: "content",
							cacheType: 'richText',
						}],
						cacheName: "introductionData",
					},
					{
						name: "企业介绍",
						interfaceName: "touch/shop/getShopDesc",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						cacheKey: [{
							keyName: "content",
							cacheType: 'richText',
						}, {
							keyName: "medal",
							cacheType: 'picture',
						}],
						cacheName: 'companyIntroductionData'
					},
					{
						name: "制度管理",
						interfaceName: "touch/shop/getShopIsm",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'dataList',
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText',
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture',
							}],
						}],
						cacheName: "systemManagementData",
					},
					{
						name: "主体承诺",
						interfaceName: "touch/shop/getShopInfo",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: "content",
							cacheType: 'richText',
						}, {
							keyName: "touch_thumb",
							cacheType: 'picture',
						}],
						cacheName: "subjectCommitmentData",
					},
					{
						name: "企业自主培训",
						interfaceName: "touch/shop/getShopTrain",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: "train",
							cacheType: 'picture',
						}, {
							keyName: "sign",
							cacheType: 'picture',
						}],
						cacheName: "selfDirectedTrainingData",
					},
					{
						name: "管理人员->组织结构",
						interfaceName: "touch/shop/getShopJob",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "managerMenuData",
					},
					{
						name: "管理人员->企业主要负责人",
						interfaceName: "touch/shop/getShopPerson",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'dataList',
							childKeyName: [{
								keyName: 'avatar',
								cacheType: 'picture',
							}],
						}],
						cacheName: "managerData",
					},
					{
						name: "安全溯源",
						interfaceName: "touch/shop/getShopOrigin",
						queryParameters: {
							"page":1,
							"size":15,
							"pword":"",
							"src_date":""
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default', 
						}],
						cacheName: "securityTraceabilityData",
					},
					{
						name: "临期提醒",
						interfaceName: "touch/shop/getShopCert",
						queryParameters: {
							"page":1,
							"size":15,
							"pword":""
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: "data",
							cacheType: 'pagingList',
							childKeyName: [{
								keyName: 'cert_url',
								cacheType: 'picture',
							}],
						}],
						cacheName: "deadlineReminderData",
					},
					{
						name: "食安检测",
						interfaceName: "touch/shop/getShopSamp",
						queryParameters: {
							"page":1,
							"size":15,
							"pword":"",
							"src_date":""
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "foodSafetyTestingData",
					},
					{
						name: "监管责任-监管人员",
						interfaceName: "touch/Supervise/getSupPerson",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
							childKeyName: [{
								keyName: 'avatar',
								cacheType: 'picture',
							}],
						}],
						cacheName: "supervisorData",
					},
					{
						name: "监管责任-风险等级",
						interfaceName: "touch/Supervise/getSupRisk",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture',
						}],
						cacheName: "riskLevelData",
					},
					{
						name: "监管责任-监督检查",
						interfaceName: "touch/Supervise/getSupCheck",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture',
						}],
						cacheName: "supervisionAndInspectionData",
					},
					{
						name: "监管责任-监督抽查",
						interfaceName: "touch/Supervise/getSupSamp",
						queryParameters: {
							"page":1,
							"size":15,
							"pword":""
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "supervisionAndSpotChecksData",
					},
					{
						name: "属地责任",
						interfaceName: "touch/Supervise/getSupDuty",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture',
						}],
						cacheName: "territorialResponsibilityData",
					},
					{
						name: "法律法规",
						interfaceName: "touch/Supervise/getSupIsm",
						queryParameters: {
							"page":1,
							"size":15,
							"pword":""
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'dataList',
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText',
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture',
							}],
						}],
						cacheName: "lawsAndRegulationsData",
					},
					{
						name: "阳光食品-日管控",
						interfaceName: "touch/shop/getShopSunDay",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "dailyControlData",
					},
					{
						name: "阳光食品-周排查",
						interfaceName: "touch/shop/getShopSunWeek",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'dataList',
							maxLimit: 1,
							childKeyName: [{
								keyName: 'pdf_url',
								cacheType: 'picture',
							}],
						}],
						cacheName: "weeklyInvestigationData",
					},
					{
						name: "阳光食品-月调度",
						interfaceName: "touch/shop/getShopSunMonth",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							keyName: "pdf_url",
							cacheType: 'picture',
						}],
						cacheName: "monthlySchedulingData",
					},
					{
						name: "阳光食品-动态评分",
						interfaceName: "touch/shop/getShopSunRating",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "dynamicScoringData",
					},
					{
						name: "风险提示",
						interfaceName: "touch/shop/getShopRisk",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'dataList',
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText',
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture',
							}],
						}],
						cacheName: "riskStatementData",
					},
					{
						name: "召回公告", 
						interfaceName: "touch/Supervise/getShopRecall",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,

						cacheKey: [{
							cacheType: 'default',
						}],
						cacheName: "recallNoticeData",
					},
				],
			};
		},
		onLoad(e) {},

		beforeDestroy() {
			uni.hideLoading()
		},

		created() {
			for (let i = 0; i < this.cacheCatalogue.length; i++) {
				let completeCache = true;
				const cacheValue = uni.getStorageSync(this.cacheCatalogue[i].cacheName) || null;
				if (!cacheValue || cacheValue.length <= 0) {
					completeCache = false;
					uni.removeStorageSync(this.cacheCatalogue[i].cacheName)
					continue
				}
				if (!cacheValue) {
					completeCache = false;
					continue
				}

				if (completeCache) {
					this.cacheCatalogue[i].isCompleteCache = true;
				} else {
					this.cacheCatalogue[i].isCompleteCache = false;
				}
			}
		},
		watch: {},
		computed: {
			...mapState(["pageName"]),
		},
		methods: {
			...mapMutations([
				"updatePageName",
				"updateTwoPageName",
				"updateThreePageName",
			]),
			clearCacheAll() {
				if (this.isCacheIng) {
					uni.showModal({
						title: '正在缓存,请稍后操作',
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击确认');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				uni.showLoading({
					title: '正在清除..',
					mask: true
				})
				for (let i = 0; i < this.cacheCatalogue.length; i++) {
					this.currentIndex = i
					this.clearCache()
				}
				uni.hideLoading()
			},


			async startCacheAll() {
				uni.showLoading({
					title: '正在缓存..',
					mask: true
				})
				for (let i = 0; i < this.cacheCatalogue.length; i++) {
					await this.startCache(i, this.cacheCatalogue[i])
				}
				uni.hideLoading()
			},


			extractResourceURLs(htmlString) {
				const regex = /<img[^>]+src=["']?([^"'\s>]+)/gi;
				const matches = [];

				let match;
				while ((match = regex.exec(htmlString)) !== null) {

					const src = match[1].replace(/^['"]|['"]$/g, '');
					matches.push(src);
				}
				return matches;
			},


	
			exitReturn() {
				if (this.isCacheIng) {
					uni.showModal({
						title: '正在缓存,确认放弃缓存?',
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								skipPage("system", this);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				}
				skipPage("system", this);
			},


			clearCache() {
				uni.removeStorageSync(this.cacheCatalogue[this.currentIndex].cacheName)
				this.cacheCatalogue[this.currentIndex].isCompleteCache = false;
			},


			startCache(index, cacheInfo) {
				if (this.isCacheIng) {
					uni.showToast({
						title: '当前正在缓存请稍后',
						icon: 'none'
					})
					return
				}
				this.isCacheIng = true
				this.currentIndex = index
				this.clearCache()
				return new Promise((resolve, reject) => {
					let allCompleteCache = true
					this.requestOccurred(this.cacheCatalogue[this.currentIndex]).then(
						async (res) => {
							if (!res) {
								this.cacheCatalogue[this.currentIndex].state = '请求失败/暂无数据可以缓存!'
								this.isCacheIng = false
								return resolve(false)
							}
							for (let i = 0; i < this.cacheCatalogue[this.currentIndex].cacheKey.length; i++) {
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'richText') {
									let richTextResult = await this.handleRichText(res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName])
									if (richTextResult.returnStatus) {
										res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName] = richTextResult.data
										this.cacheLocalData(res)
									} else {
										allCompleteCache = false
									}
								}
								

								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'picture') {
									let pictureData = res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName]
									let pictureDataArr = []
									if (pictureData) {
										if (Object.prototype.toString.call(pictureData) == '[object Array]') {
											pictureDataArr = pictureData
										} else if (Object.prototype.toString.call(pictureData) == '[object String]') {
											pictureDataArr = pictureData.split(',')
										}
									}
									let pictureResult =	await this.handlePicture(pictureDataArr)
									if (pictureResult.returnStatus) {
										res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName + 'Arr'] = pictureResult.data
										this.cacheLocalData(res)
									} else {
										allCompleteCache = false
									}
								}
								
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'dataList') {
									let maxLimit = this.cacheCatalogue[this.currentIndex].cacheKey[i].maxLimit ||res.length
									for (let k = 0; k < maxLimit; k++) {
										for (let j = 0; j < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; j++) {
											if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].cacheType == 'richText') {
												let richTextResult = await this.handleRichText(res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName])
												if (richTextResult.returnStatus) {
													res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName] = richTextResult.data
													this.cacheLocalData(res)
												} else {
													allCompleteCache = false
												}
											}
											if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].cacheType == 'picture') {
												let pictureData = res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName]
												let pictureDataArr = []
												if (pictureData) {
													if (Object.prototype.toString.call(pictureData) == '[object Array]') {
														pictureDataArr = pictureData
													} else if (Object.prototype.toString.call(pictureData) == '[object String]') {
														pictureDataArr = pictureData.split(',')
													}
												}
												let pictureResult =	await this.handlePicture(pictureDataArr)
												if (pictureResult.returnStatus) {
													res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName + 'Arr'] = pictureResult.data
													this.cacheLocalData(res)
												} else {
													allCompleteCache = false
												}
											}
										}
									}
								}
								
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'default') {
									if (Object.prototype.toString.call(res) == '[object Array]') {
										if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName) {
											for(let j = 0; j < res.length; j++) {
												for (let k = 0; k < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; k++) {
													if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].cacheType == 'picture') {
														let pictureData = res[j][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].keyName]
														let pictureDataArr = []
														if (pictureData) {
															if (Object.prototype.toString.call(pictureData) == '[object Array]') {
																pictureDataArr = pictureData
															} else if (Object.prototype.toString.call(pictureData) == '[object String]') {
																pictureDataArr = pictureData.split(',')
															}
														}
														let pictureResult =	await this.handlePicture(pictureDataArr)
														if (pictureResult.returnStatus) {
															res[j][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].keyName + 'Arr'] = pictureResult.data
															this.cacheLocalData(res)
														} else {
															allCompleteCache = false
														}
													}
												}
											}
										}
									}
									this.cacheLocalData(res)
								}
								
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'pagingList') {
									for (let j = 0; j < res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName].length; j++) {
										for (let k = 0; k < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; k++) {
											if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].cacheType == 'picture') {
												let pictureData = res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName][j][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].keyName]
												let pictureDataArr = []
												if (pictureData) {
													if (Object.prototype.toString.call(pictureData) == '[object Array]') {
														pictureDataArr = pictureData
													} else if (Object.prototype.toString.call(pictureData) == '[object String]') {
														pictureDataArr = pictureData.split(',')
													}
												}
												let pictureResult =	await this.handlePicture(pictureDataArr)
												if (pictureResult.returnStatus) {
													res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName][j][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].keyName + 'Arr'] = pictureResult.data
													this.cacheLocalData(res)
												} else {
													allCompleteCache = false
												}
											}
										}
									}
								}
							}


							if (allCompleteCache) {
								console.log(allCompleteCache, '全部缓存成功')
								this.cacheCatalogue[this.currentIndex].isCompleteCache = true;
								this.cacheCatalogue[this.currentIndex].state = '全部缓存成功!'
								this.isCacheIng = false
								resolve()
							} else {
								this.cacheCatalogue[this.currentIndex].state = '缓存失败,请稍后再试!'
								this.isCacheIng = false
								reject()
							}
						}
					);
				})
			},


			async requestOccurred(cacheData) {
				return new Promise((resolve, reject) => {
					this.cacheCatalogue[this.currentIndex].state = "发送请求..";
					uni.request({
						url: cacheData.interfaceName,
						isShowLoading: false,
						data: {
							...cacheData.queryParameters,
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.cacheCatalogue[this.currentIndex].state = "请求完成";
								resolve(res.data.data);
							} else {
								this.isCacheIng = false
								this.cacheCatalogue[this.currentIndex].state = "请求失败";
								resolve(false);
							}
						},
						fail: (err) => {
							this.isCacheIng = false
							this.cacheCatalogue[this.currentIndex].state = "请求失败";
							resolve(false);
						},
					});
				});
			},

	


			downloadSave(url) {
				let $this = this;
				return new Promise((resolve, reject) => {
					this.cacheCatalogue[this.currentIndex].state = "开始下载..";
					let downloadTask = uni.downloadFile({
						url: url,
						timeout: 180000,
						success: (res) => {
										uni.saveFile({
								tempFilePath: res.tempFilePath,
								success(res) {
									console.log("文件保存路径:", res.savedFilePath);
									$this.cacheCatalogue[$this.currentIndex].state = "子文件缓存成功!";
									resolve(res.savedFilePath);
								},
								fail: (err) => {
									console.log("缓存错误:", err);
									$this.cacheCatalogue[$this.currentIndex].state = "缓存错误, 请重试.";
									reject(false);
								},
							});
						},
						fail: (err) => {
							console.log("下载错误:", err);
							$this.cacheCatalogue[$this.currentIndex].state =
								"下载错误, 请重试.";
							reject(false);
						},
					});
					downloadTask.onProgressUpdate((res) => {
						$this.cacheCatalogue[
							$this.currentIndex
						].state = `..${url.slice(url.length - 17)}:${res.progress}%`;
					});
				});
			},


			handleRichText(text) {
				return new Promise(async(resolve, reject) => {
					let cacheResults = {
						data: '',
						returnStatus: true
					}
					let textPictureArr = this.extractResourceURLs(text)
					for (let i = 0; i < textPictureArr.length; i++) {
						let saveResult = await this.downloadSave(textPictureArr[i])
						if (saveResult) {
							const regex = new RegExp(textPictureArr[i], "g");
							text = text.replace(regex, saveResult)
						} else {
							cacheResults.returnStatus = false
						}
					}
					cacheResults.data = text
					resolve(cacheResults)
				})
			},
			
			handlePicture(pictureArr) {
				return new Promise(async(resolve, reject) => {
					let cacheResults = {
						data: '',
						returnStatus: true
					}
					for (let i = 0; i < pictureArr.length; i++) {
						let saveResult = await this.downloadSave(pictureArr[i])
						if (saveResult) {
							pictureArr[i] = saveResult
						} else {
							cacheResults.returnStatus = false
						}
					}
					cacheResults.data = pictureArr
					resolve(cacheResults)
				})
			},

			cacheLocalData(data) {
				uni.setStorageSync(
					this.cacheCatalogue[this.currentIndex].cacheName,
					data
				);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.manage-cache {
		width: 100vw;
		height: 100vh;

		.tag-list {
			width: 100%;
			box-sizing: border-box;
			padding: 8vw 2vw 2vw 2vw;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}

		.scroll-box {
			width: 100vw;
			height: calc(100vh - 18vw);
			box-sizing: border-box;
			padding-bottom: 10vw;

			.interface-item {
				padding: 3vw;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ececec;

				.head {
					display: flex;
					align-items: center;
					width: 70%;

					.name {
						margin-right: 1vw;
					}

					.interface-name {
						width: 32vw;
						font-size: 3vw;
						zoom: 0.9;
						overflow: hidden;
						/* 隐藏溢出内容 */
						white-space: nowrap;
						/* 强制文本不换行 */
						text-overflow: ellipsis;
						/* 超出部分显示省略号 */
					}

					.state {
						font-size: 3vw;
						zoom: 0.8;
						color: #999999;
						margin-left: 1vw;
						white-space: nowrap;
					}
				}

				.footing {
					display: flex;
					align-items: center;

					.start-cache {
						margin-left: 1vw;
					}
				}
			}
		}
	}
</style>