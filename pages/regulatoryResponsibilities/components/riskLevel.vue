<template>
	<view class="risk-level">
		<template v-if="riskLevelData">
			<titleStyle class="title-box">本次风险评定:{{ riskLevelData.level_name }}级</titleStyle>
			<scroll-view class="scroll-box" scroll-y="true" >
				<image class="image-item" :src="pdfUrlItem" v-for="(pdfUrlItem, index) in riskLevelData.pdf_urlArr" :key="pdfUrlItem" mode="widthFix" @click="previewImage(pdfUrlItem)"></image>
			</scroll-view>
		</template>
		<nullDataState v-else></nullDataState>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</view>
</template>

<script>
	import { formatDate, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import titleStyle from '@/components/titleStyle'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	
	
	export default {
		name: "riskLevel",
		components:{
			titleStyle,
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				riskLevelData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const riskLevelData = uni.getStorageSync('riskLevelData') || null;
			console.log(riskLevelData, '***---***')
			if (riskLevelData) {
				lazyLoadCache(() => {
					this.riskLevelData = riskLevelData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updateId']),
			
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getSupRisk',
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
							this.riskLevelData = res.data.data
							
							// if (res.data.data.sign) {
							// 	res.data.data['signArr'] = res.data.data.sign.split(',')
							// } else {
							// 	res.data.data['signArr'] = []
							// }
							// this.selfDirectedTrainingData = res.data.data
							// this.selfDirectedTrainingData.signArr = ['https://cdn.pixabay.com/photo/2024/02/24/20/48/palais-royal-8594719_1280.jpg', 'https://cdn.pixabay.com/photo/2025/02/02/13/07/rope-9376701_1280.jpg']
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
.risk-level {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	.title-box {
		margin: 2vw;
	}
	.scroll-box {
		width: 100%;
		height: calc(100vh - 76vw - 2vw);
		.image-item {
			width: 100%;
			display: block;
		}
	}
	
}

</style>
