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
				goodsClassPid: null, // 商品类的Pid
				currentIndex: 0, // 当前索引
				isCacheIng: false, // 是否正在缓存
				cacheCatalogue: [{
						name: "首页",
						interfaceName: "touch/shop/getShopDesc",
						queryParameters: {}, // 查询
						state: "", // 状态
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: "content",
							cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}],
						cacheName: "introductionData", // 缓存记录名
					},
					{
						name: "企业介绍",
						interfaceName: "touch/shop/getShopDesc",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: "content",
							cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}, {
							keyName: "medal",
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
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
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'dataList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}],
						}],
						cacheName: "systemManagementData", // 缓存记录名
					},
					{
						name: "主体承诺",
						interfaceName: "touch/shop/getShopInfo",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: "content",
							cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}, {
							keyName: "touch_thumb",
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}],
						cacheName: "subjectCommitmentData", // 缓存记录名
					},
					{
						name: "企业自主培训",
						interfaceName: "touch/shop/getShopTrain",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: "train",
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}, {
							keyName: "sign",
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}],
						cacheName: "selfDirectedTrainingData", // 缓存记录名
					},
					{
						name: "管理人员->组织结构",
						interfaceName: "touch/shop/getShopJob",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}],
						cacheName: "managerMenuData", // 缓存记录名
					},
					{
						name: "管理人员->企业主要负责人",
						interfaceName: "touch/shop/getShopPerson",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'dataList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							childKeyName: [{
								keyName: 'avatar',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}],
						}],
						cacheName: "managerData", // 缓存记录名
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
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存
						}],
						cacheName: "securityTraceabilityData", // 缓存记录名
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
						// 要缓存的字段
						cacheKey: [{
							keyName: "data",
							cacheType: 'pagingList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							childKeyName: [{
								keyName: 'cert_url',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							}],
						}],
						cacheName: "deadlineReminderData", // 缓存记录名
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
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "foodSafetyTestingData", // 缓存记录名
					},
					{
						name: "监管责任-监管人员",
						interfaceName: "touch/Supervise/getSupPerson",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							childKeyName: [{
								keyName: 'avatar',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							}],
						}],
						cacheName: "supervisorData", // 缓存记录名
					},
					{
						name: "监管责任-风险等级",
						interfaceName: "touch/Supervise/getSupRisk",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "riskLevelData", // 缓存记录名
					},
					{
						name: "监管责任-监督检查",
						interfaceName: "touch/Supervise/getSupCheck",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "supervisionAndInspectionData", // 缓存记录名
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
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "supervisionAndSpotChecksData", // 缓存记录名
					},
					{
						name: "属地责任",
						interfaceName: "touch/Supervise/getSupDuty",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: 'pdf_url',
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "territorialResponsibilityData", // 缓存记录名
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
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'dataList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}],
						}],
						cacheName: "lawsAndRegulationsData", // 缓存记录名
					},
					{
						name: "阳光食品-日管控",
						interfaceName: "touch/shop/getShopSunDay",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "dailyControlData", // 缓存记录名
					},
					{
						name: "阳光食品-周排查",
						interfaceName: "touch/shop/getShopSunWeek",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'dataList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
							maxLimit: 1,
							childKeyName: [{
								keyName: 'pdf_url',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}],
						}],
						cacheName: "weeklyInvestigationData", // 缓存记录名
					},
					{
						name: "阳光食品-月调度",
						interfaceName: "touch/shop/getShopSunMonth",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							keyName: "pdf_url",
							cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "monthlySchedulingData", // 缓存记录名
					},
					{
						name: "阳光食品-动态评分",
						interfaceName: "touch/shop/getShopSunRating",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表  default 默认缓存  pagingList 分页列表
						}],
						cacheName: "dynamicScoringData", // 缓存记录名
					},
					{
						name: "风险提示",
						interfaceName: "touch/shop/getShopRisk",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'dataList', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							childKeyName: [{
								keyName: 'content',
								cacheType: 'richText', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}, {
								keyName: 'touch_thumb',
								cacheType: 'picture', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
							}],
						}],
						cacheName: "riskStatementData", // 缓存记录名
					},
					{
						name: "召回公告", 
						interfaceName: "touch/Supervise/getShopRecall",
						queryParameters: {
						},
						state: "",
						isCompleteCache: false,
						// 要缓存的字段
						cacheKey: [{
							cacheType: 'default', // 缓存类型 richText: 富文本  picture 图片  dataList 数据列表
						}],
						cacheName: "recallNoticeData", // 缓存记录名
					},
				],
			};
		},
		onLoad(e) {},
		// 销毁前
		beforeDestroy() {
			uni.hideLoading() // 关闭全部加载状态
		},
		// 创建完成
		created() {
			for (let i = 0; i < this.cacheCatalogue.length; i++) {
				let completeCache = true;
				const cacheValue = uni.getStorageSync(this.cacheCatalogue[i].cacheName) || null;
				if (!cacheValue || cacheValue.length <= 0) {
					completeCache = false;
					uni.removeStorageSync(this.cacheCatalogue[i].cacheName)
					continue // 退出当前循环
				}
				if (!cacheValue) {
					completeCache = false;
					continue // 退出当前循环
				}

				if (completeCache) {
					// 完成缓存
					this.cacheCatalogue[i].isCompleteCache = true;
				} else {
					// 没有缓存
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
			/**
			 * 清除全部
			 */
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

			/**
			 * 缓存全部
			 */
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

			/**
			 * 提取资源URL
			 * @param htmlString html字符串
			 */
			extractResourceURLs(htmlString) {
				const regex = /<img[^>]+src=["']?([^"'\s>]+)/gi;
				const matches = [];

				let match;
				while ((match = regex.exec(htmlString)) !== null) {
					// 提取 src 值（去除可能的引号）
					const src = match[1].replace(/^['"]|['"]$/g, '');
					matches.push(src);
				}
				return matches;
			},


			/**
			 * 退出返回
			 */
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

			/**
			 * 清除缓存
			 * @param {number}cacheInfo 索引
			 */
			clearCache() {
				uni.removeStorageSync(this.cacheCatalogue[this.currentIndex].cacheName)
				this.cacheCatalogue[this.currentIndex].isCompleteCache = false;
			},

			/**
			 * 开始缓存
			 * @param {number}index 索引
			 * @param cacheInfo 缓存信息
			 */
			startCache(index, cacheInfo) {
				if (this.isCacheIng) {
					uni.showToast({
						title: '当前正在缓存请稍后',
						icon: 'none'
					})
					return
				}
				this.isCacheIng = true
				this.currentIndex = index // 设置当前索引
				this.clearCache() // 清除缓存
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
								// 处理富文本
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'richText') {
									let richTextResult = await this.handleRichText(res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName]) // 富文本返回结果
									if (richTextResult.returnStatus) {
										res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName] = richTextResult.data
										this.cacheLocalData(res)
									} else {
										allCompleteCache = false
									}
								}
								
								// 处理图片
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
								
								// 处理数据列表
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'dataList') {
									let maxLimit = this.cacheCatalogue[this.currentIndex].cacheKey[i].maxLimit ||res.length
									for (let k = 0; k < maxLimit; k++) {
										for (let j = 0; j < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; j++) {
											// 处理富文本
											if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].cacheType == 'richText') {
												let richTextResult = await this.handleRichText(res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName]) // 富文本返回结果
												if (richTextResult.returnStatus) {
													res[k][this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[j].keyName] = richTextResult.data
													this.cacheLocalData(res)
												} else {
													allCompleteCache = false
												}
											}
											// 处理图片
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
								
								// 处理默认数据
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'default') {
									if (Object.prototype.toString.call(res) == '[object Array]') {
										if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName) {
											for(let j = 0; j < res.length; j++) {
												for (let k = 0; k < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; k++) {
													// 处理图片
													if (this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName[k].cacheType == 'picture') {
														// console.log()
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
								
								// 处理分页列表
								if (this.cacheCatalogue[this.currentIndex].cacheKey[i].cacheType == 'pagingList') {
									for (let j = 0; j < res[this.cacheCatalogue[this.currentIndex].cacheKey[i].keyName].length; j++) {
										for (let k = 0; k < this.cacheCatalogue[this.currentIndex].cacheKey[i].childKeyName.length; k++) {
											// 处理图片
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


							// 全部完成缓存切换状态
							if (allCompleteCache) {
								console.log(allCompleteCache, '全部缓存成功')
								this.cacheCatalogue[this.currentIndex].isCompleteCache = true;
								this.cacheCatalogue[this.currentIndex].state = '全部缓存成功!'
								this.isCacheIng = false // 解除正在缓存
								resolve()
							} else {
								this.cacheCatalogue[this.currentIndex].state = '缓存失败,请稍后再试!'
								this.isCacheIng = false // 解除正在缓存
								reject()
							}
						}
					);
				})
			},

			/**
			 * 发送请求
			 * @param {object}cacheData
			 * @returns {void}
			 */
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

	

			/**
			 * 下载保存
			 * @param {string}url 资源地址
			 * @param {object}cacheData 缓存资源
			 * @returns {void}
			 */
			downloadSave(url) {
				let $this = this;
				return new Promise((resolve, reject) => {
					this.cacheCatalogue[this.currentIndex].state = "开始下载..";
					let downloadTask = uni.downloadFile({
						url: url,
						timeout: 180000,
						success: (res) => {
							// console.log('临时文件路径:', res.tempFilePath)
							// 本地存储
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


			// 处理富文本
			handleRichText(text) {
				return new Promise(async(resolve, reject) => {
					let cacheResults = {
						data: '',
						returnStatus: true
					}
					let textPictureArr = this.extractResourceURLs(text)
					for (let i = 0; i < textPictureArr.length; i++) {
						let saveResult = await this.downloadSave(textPictureArr[i])
						// 不考虑缓存失败的问题
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
			
			// 长处理图片
			handlePicture(pictureArr) {
				return new Promise(async(resolve, reject) => {
					let cacheResults = {
						data: '',
						returnStatus: true
					}
					for (let i = 0; i < pictureArr.length; i++) {
						let saveResult = await this.downloadSave(pictureArr[i])
						// 不考虑缓存失败的问题
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

			// 缓存本地data
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