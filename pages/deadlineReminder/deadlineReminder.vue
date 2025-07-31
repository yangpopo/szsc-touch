<template>
	<detailsPage>
		<menuNavigation mode="customize">
			<template #head>
				<view class="head-title">临期提醒</view>
			</template>
			<template #foot>
				<inputBox class="input-box" v-model="query.pword" placeholder="输入需要查询的商品名称" @confirm="queryData"></inputBox>
			</template>
		</menuNavigation>
		<view class="deadline-reminder">
			<template v-if="deadlineReminderData.length != 0">
				<scroll-view class="scroll-box" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMore">
					<view class="item" v-for="(item,index) in deadlineReminderData" :key="index">
						<image class="cover" :src="item.cert_url[0] || defaultDocument" @click="previewImage(item.cert_url[0])" @error="errorImage($event, index)"></image>
						<view class="info-box">
							<view class="name">
								商品名称:{{ item.goods_name || '-' }}
							</view>
							<view class="info-item">商品种类: <view class="ml10">{{item.cate_name || '-'}}</view>
							</view>
							<view class="info-item">商品单位: <view class="ml10">{{item.plu_unit || '-'}}</view>
							</view>
							<view class="info-item" style="justify-content: space-between">
								<view class="date">到期时间: <span class="ml10">{{item.end_time.split(' ')[0]}}</span></view>
								<view :class="{ 'primary': item.diff_num > 2, 'warn': item.diff_num > 0, 'danger': item.diff_num <= 0}">
									{{ item.diff_num >= 0 ? `还剩${item.diff_num}天` : `已过期${Math.abs(item.diff_num)}天` }}</view>
							</view>
						</view>
					</view>
					<view class="gap" style="width: 100%; height: 2vw;"></view>
				</scroll-view>
			</template>
			<nullDataState v-else></nullDataState>
		</view>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</detailsPage>
</template>

<script>
	import { formatDate, lazyLoadCache, pageSelectedMenu } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import menuNavigation from '@/components/menuNavigation.vue' // 选择标签菜单
	import dropDown from '@/components/dropDown.vue'
	import inputBox from '@/components/inputBox.vue'
	import inputDateBox from '@/components/inputDateBox.vue'
	import nullDataState from '@/components/nullDataState'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import defaultDocument from '@/assets/imgs/default-document.png'



	export default {
		name: "deadlineReminder",
		components: {
			detailsPage,
			dropDown,
			inputBox,
			inputDateBox,
			menuNavigation,
			nullDataState,
			kxjPreviewImage,
		},
		data() {
			return {
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				deadlineReminderData: [],
				imageUrl: '',
				defaultDocument,
				isComplete: false,
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			const deadlineReminderData = uni.getStorageSync('deadlineReminderData') || null;
			if (deadlineReminderData) {
				lazyLoadCache(() => {
					this.deadlineReminderData = deadlineReminderData.data
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updataRouteInfo', 'updataRichTextData']),
			// 查询类型发生变化
			queryTypeChange(data) {
				this.query = {
					page: 1,
					size: 15,
					pword: '',
					src_date: ''
				}
			},
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopCert',
					method: 'post',
					data: {
						...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.data.length == 0) {
								this.isComplete = true
							}
							res.data.data.data.forEach(item => {
								this.deadlineReminderData.push(item)
							})
						}
					},
				});
			},
			queryData() {
				this.query.page = 1;
				this.isComplete = false
				this.getData()
			},
			// 预览图片
			previewImage(data) {
				if (!data) {
					return
				}
				if (data == defaultDocument) {
					return
				}
				this.imageUrl = data
				this.$refs.kxjPreviewImage.show = true
			},
			// 图片加载错误
			errorImage(err, index) {
				this.deadlineReminderData[index].cert_url[0] = defaultDocument
				this.$forceUpdate()
			},
			loadMore() {
				if (this.isComplete) {
					return
				}
				this.query.page++;
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head-title {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-family: "PingFangH";
		color: #0464CA;
		background-color: #fff;

		&:before {
			content: '';
			width: 4vw;
			height: 5rpx;
			background-color: #0464CA;
			position: absolute;
			top: 85%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5rpx;
		}
	}
	
	.input-box {
		width: 72.5vw;
	}

	.deadline-reminder {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;
		.scroll-box {
			width: 100%;
			height: calc(100% - 2vw);
			box-sizing: border-box;
			padding: 2vw 0 0 0;

			.item {
				width: calc(100% - 4vw);
				display: flex;
				padding: 15rpx;
				box-shadow: 0 0 1vw rgba(4, 100, 202, 0.5);
				margin: 3vw auto 3vw auto;
				border-radius: 1.5vw;

				.cover {
					width: 23vw;
					height: 23vw;
					margin-right: 2vw;
					border-radius: 1vw;
					flex-shrink: 0;
				}

				.info-box {
					width: calc(100% - 23vw - 2vw);

					.name {
						display: flex;
						align-items: center;
						color: #0464CA;
						font-family: 'PingFangH';
						font-size: 4vw;
						width: 100%;
						white-space: nowrap;
						/* 不换行 */
						overflow: hidden;
						/* 隐藏超出的内容 */
						text-overflow: ellipsis;
						/* 用省略号表示被隐藏的部分 */
					}

					.info-item {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 3.5vw;
						margin: 0.5vw 0;
						color: #000;
					}

					.danger {
						color: #F24822;
						font-family: 'PingFangH';
					}

					.warn {
						color: #FFA54B;
						font-family: 'PingFangH';
					}

					.primary {
						color: #0464CA;
						font-family: 'PingFangH';
					}
				}
			}
		}
	}
</style>