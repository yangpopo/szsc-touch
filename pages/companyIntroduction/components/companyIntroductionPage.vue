<template>
	<view class="company-introduction-page">
		<template v-if="companyIntroductionData">
			<titleStyle class="main-title" :fontSize="4.2">{{ companyIntroductionData.shop_name }}</titleStyle>
			<view class="subtitle">{{ companyIntroductionData.title }}</view>
			<scroll-view class="scroll-rich" scroll-y="true" >
				<template v-if="companyIntroductionData.content">
					<rich-text class="rich-text-box" :nodes="companyIntroductionData.content" space="nbsp"></rich-text>
				</template>
				<nullDataState v-else></nullDataState>
			</scroll-view>
			<titleStyle class="main-title" :fontSize="4.2">超市荣誉</titleStyle>
			<swiper class="honor-wall" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="3000" :display-multiple-items="3">
			  <swiper-item class="honor-item" v-for="medalItem in companyIntroductionData.medalArr" :key="medalItem">
			    <image :src="medalItem" class="honor-image" mode="aspectFit" @click="previewImage(medalItem)"></image>
			  </swiper-item>
			</swiper>
		</template>
		<nullDataState v-else></nullDataState>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</view>
</template>

<script>
	import { formatDate, lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import titleStyle from '@/components/titleStyle'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	
	
	export default {
		name: "companyIntroductionPage",
		components:{
			titleStyle,
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				companyIntroductionData: null,
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			const companyIntroductionData = uni.getStorageSync('companyIntroductionData') || null;
			if (companyIntroductionData) {
				lazyLoadCache(() => {
					companyIntroductionData.content = handleHideCharacterDisplay(companyIntroductionData.content)
					this.companyIntroductionData = companyIntroductionData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations([]),
			
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopDesc',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.medal) {
								res.data.data['medalArr'] = res.data.data.medal.split(',')
							} else {
								res.data.data['medalArr'] = []
							}
							res.data.data.content = handleHideCharacterDisplay(res.data.data.content)
							this.companyIntroductionData = res.data.data
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
.company-introduction-page {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	background-color: #fff;
	.main-title {
		margin-bottom: 1vw;
	}
	.subtitle {
		width: 100%;
		color: #0052A9;
		font-family: "PingFangM";
		text-align: center;
		font-size: 3.8vw;
		margin-bottom: 1vw;
	}
	.scroll-rich{
		height: calc(100% - 50vw);
		margin-bottom: 1vw;
	}
	.honor-wall {
		width: 100%;
		height: 31vw;
		.honor-item {
			width: 33.33%;
			height: 31vw;
			.honor-image {
				display: block;
				width: calc(100% - 2vw);
				height: 100%;
				margin: 0 auto;
			}
		}
	}
}
</style>
