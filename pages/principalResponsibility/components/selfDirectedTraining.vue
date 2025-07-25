<template>
	<scroll-view scroll-y="true" class="self-directed-training">
		<template v-if="selfDirectedTrainingData">
			<image class="image-item" :src="signItem"  v-for="(signItem, index) in selfDirectedTrainingData.signArr" :key="signItem" mode="widthFix" @click="previewImage(signItem)"></image>
		</template>
		<nullDataState v-else></nullDataState>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</scroll-view>
</template>

<script>
	import { formatDate, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	
	
	export default {
		name: "selfDirectedTraining",
		components:{
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				selfDirectedTrainingData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const selfDirectedTrainingData = uni.getStorageSync('selfDirectedTrainingData') || null;
			if (selfDirectedTrainingData) {
				lazyLoadCache(() => {
					this.selfDirectedTrainingData = selfDirectedTrainingData
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
					url: 'touch/shop/getShopTrain',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.train) {
								res.data.data['trainArr'] = res.data.data.train.split(',')
							} else {
								res.data.data['trainArr'] = []
							}
							if (res.data.data.sign) {
								res.data.data['signArr'] = res.data.data.sign.split(',')
							} else {
								res.data.data['signArr'] = []
							}
							this.selfDirectedTrainingData = res.data.data
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
.self-directed-training {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	background-color: #fff;
	.image-item {
		width: 100%;
		display: block;
	}
}

</style>
