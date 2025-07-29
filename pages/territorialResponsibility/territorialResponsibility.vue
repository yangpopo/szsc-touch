<template>
	<detailsPage>
		<menuNavigation mode="customize">
			<template #head>
				<view class="head-title">属地责任</view>
			</template>
		</menuNavigation>
		<view class="territorial-responsibility">
			<scroll-view class="scroll-box" v-if="territorialResponsibilityData != null" :scroll-y="true" :show-scrollbar="false">
				<view class="info-box">
					<view class="info-item name">{{ territorialResponsibilityData.duty_name }}</view>
					<view class="info-item">职务: {{ territorialResponsibilityData.job_name }}</view>
					<view class="info-item">电话: {{ territorialResponsibilityData.tel }}</view>
				</view>
				<view class="picture-list" v-if="territorialResponsibilityData.pdf_urlArr.length != 0">
					<image class="picture-item" :src="pdfUrlItem" v-for="(pdfUrlItem, index) in territorialResponsibilityData.pdf_urlArr" :key="index" @click="previewImage(pdfUrlItem)" mode="widthFix">
					</image>
				</view>
				<nullDataState v-else></nullDataState>
			</scroll-view>
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
	import nullDataState from '@/components/nullDataState'
	import kxjPreviewImage from '@/components/kxj-previewImage'


	export default {
		name: "territorialResponsibility",
		components: {
			detailsPage,
			menuNavigation,
			nullDataState,
			kxjPreviewImage
		},
		data() {
			return {
				territorialResponsibilityData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState(['routeInfo'])
		},
		async created() {
			const territorialResponsibilityData = uni.getStorageSync('territorialResponsibilityData') || null;
			if (territorialResponsibilityData) {
				lazyLoadCache(() => {
					this.territorialResponsibilityData = territorialResponsibilityData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updataRouteInfo', 'updataRichTextData']),

			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getSupDuty',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.pdf_url) {
								if (Object.prototype.toString.call(res.data.data.pdf_url) == '[object Array]') {
									res.data.data['pdf_urlArr'] = res.data.data.pdf_url
								} else {
									res.data.data['pdf_urlArr'] = res.data.data.pdf_url.split(',')
								}
							} else {
								res.data.data['pdf_urlArr'] = []
							}
							this.territorialResponsibilityData = res.data.data
						}
					},
				});
			},
			
			// 预览图片
			previewImage(data) {
				if (!data) {
					return
				}
				this.imageUrl = data
				this.$refs.kxjPreviewImage.show = true
			}
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

	.territorial-responsibility {
		width: 100vw;
		height: calc(100% - 10vw);
		position: relative;
		background-color: #fff;
		box-sizing: border-box;
		padding: 3vw;
		.scroll-box {
			width: 100%;
			height: 100%;
			.info-box {
				width: 100%;
				.info-item {
					width: 100%;
					position: relative;
					box-sizing: border-box;
					padding-left: 4vw;
					font-size: 3.8vw;
					margin-bottom: 2vw;
					&.name {
						// border-bottom: 1rpx solid #0464CA;
						width: fit-content;
						color: #0464CA;
						font-size: 4vw;
						font-family: 'PingFangH';
						background-image: linear-gradient(0deg, #0464CA, #0464CA);
						background-repeat: no-repeat;
						background-size: calc(100% - 4vw) 1px;
						background-position: right bottom;
						&:before {
							display: none;
						}
					}
					&:before {
						content: '';
						width: 1.5vw;
						height: 1.5vw;
						border-radius: 1.5vw;
						background: linear-gradient(to bottom, #0464CA, #FFFFFF);
						position: absolute;
						left: 0;
						top: 46%;
					}
				}
			}
			.picture-list {
				width: 100%;
				.picture-item {
					width: 100%;
				}
			}
		}
	}
</style>