<template>
	<view class="supervision-and-inspection">
		<template v-if="supervisionAndInspectionData">
			<scroll-view class="scroll-box" scroll-y="true" >
				<image class="image-item" :src="pdfUrlItem" v-for="(pdfUrlItem, index) in supervisionAndInspectionData.pdf_urlArr" :key="pdfUrlItem" mode="widthFix" @click="previewImage(pdfUrlItem)"></image>
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
		name: "supervisionAndInspection",
		components:{
			titleStyle,
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				supervisionAndInspectionData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const supervisionAndInspectionData = uni.getStorageSync('supervisionAndInspectionData') || null;
			if (supervisionAndInspectionData) {
				lazyLoadCache(() => {
					this.supervisionAndInspectionData = supervisionAndInspectionData
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
					url: 'touch/Supervise/getSupCheck',
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
							this.supervisionAndInspectionData = res.data.data
							
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
.supervision-and-inspection {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	.scroll-box {
		width: 100%;
		height: calc(100%);
		.image-item {
			width: 100%;
			display: block;
		}
	}
	
}

</style>
