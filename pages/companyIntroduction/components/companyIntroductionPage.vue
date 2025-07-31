<template>
	<view class="company-introduction-page">
		<template v-if="companyIntroductionData">
			<titleStyle class="main-title" :fontSize="4.2">{{ companyIntroductionData.shop_name }}</titleStyle>
			<view class="subtitle">{{ companyIntroductionData.title }}</view>
			<scroll-view class="scroll-rich" :class="{'close-honor': !isOpenHonor}" scroll-y="true" >
				<template v-if="companyIntroductionData.content">
					<rich-text class="rich-text-box" :nodes="companyIntroductionData.content" space="nbsp"></rich-text>
				</template>
				<nullDataState v-else></nullDataState>
			</scroll-view>
			<view class="honor-box" :class="{'close-honor': !isOpenHonor }">
				<image v-if="isOpenHonor" class="close-but" src="../../../assets/imgs/close-icon.png" mode="aspectFit" @click="isOpenHonor = false"></image>
				<view class="open-honor" v-else @click="isOpenHonor = true">
					<image class="expand-upward-icon" src="../../../assets/imgs/expand-upward-icon.png" mode="aspectFit"></image>
					<text class="title">超市荣誉</text>
				</view>
				<template v-if="isOpenHonor">
					<titleStyle class="main-title" :fontSize="4.2">超市荣誉</titleStyle>
					<swiper class="honor-wall" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="3000" :display-multiple-items="3">
					  <swiper-item class="honor-item" v-for="(medalItem, index) in companyIntroductionData.medalArr" :key="medalItem">
					    <image :src="medalItem || defaultHonor" class="honor-image" mode="aspectFill" @click="previewImage(medalItem)" @error="errorImage($event, index)"></image>
					  </swiper-item>
					</swiper>
				</template>
				
			</view>
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
	import defaultHonor from '@/assets/imgs/default-honor.png'
	
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
				defaultHonor,
				isOpenHonor: true,
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
					this.isOpenHonor = companyIntroductionData['medalArr'].length == 0 ? false : true
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
							// res.data.data['medalArr'] = ['https://fuwu.jlc.com/nw/thumbnail/8613816169529511936', 'https://fuwu.jlc.com/nw/thumbnail/8613816169529511936', 'https://fuwu.jlc.com/nw/thumbnail/8613816169529511936', 'https://fuwu.jlc.com/nw/thumbnail/8613816169529511936', 'https://fuwu.jlc.com/nw/thumbnail/8613816169529511936', 'https://fuwu.jlc.com/nw/thumbnail/8613816169529511936']
							this.isOpenHonor = res.data.data['medalArr'].length == 0 ? false : true
							this.companyIntroductionData = res.data.data
						}
					},
				});
			},
			
			// 图片加载错误
			errorImage(err, index) {
				this.companyIntroductionData.medalArr[index] = defaultHonor
				this.$forceUpdate()
			},
			
			// 预览图片
			previewImage(data) {
				if (!data) {
					return
				}
				if (data == defaultHonor) {
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
	padding: 3vw 0 0 0;
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
		width: calc(100% - 6vw);
		height: calc(100% - 50vw);
		margin: 0 auto 1vw auto;
		&.close-honor {
			height: calc(100% - 31vw);
		}
	}
	.honor-box {
		width: 100%;
		background-color: rgba(213, 233, 255, 0.6);
		box-sizing: border-box;
		padding-top: 2vw;
		position: relative;
		box-sizing: border-box;
		padding-bottom: 2vw;
		&.close-honor {
			border-radius: 5vw 5vw 0 0;
		}
		.close-but {
			position: absolute;
			width: 4.5vw;
			height: 4.5vw;
			top: 2.5vw;
			right: 2vw;
			z-index: 1;
		}
		.open-honor {
			display: flex;
			flex-direction: column;
			.expand-upward-icon {
				display: block;
				width: 3.5vw;
				height: 5vw;
				margin: 0 auto 1vw auto;
			}
			.title {
				width: 100%;
				text-align: center;
				font-size: 3.2vw;
				color: rgba(0, 82, 169, 1);
				margin-bottom: 2vw;
			}
		}
		.honor-wall {
			width: 100%;
			height: 24.3vw;
			.honor-item {
				width: 33.33%;
				height: 24.3vw;
				.honor-image {
					display: block;
					width: calc(100% - 2vw);
					height: 100%;
					margin: 0 auto;
				}
			}
		}
	}
	
}
</style>
