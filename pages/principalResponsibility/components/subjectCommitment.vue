<template>
	<view class="subject-commitment">
		<template v-if="subjectCommitmentData">
			<titleStyle class="title" :fontSize="4.5">{{ subjectCommitmentData.shop_name ||'-' }}</titleStyle>
			<view class="subtitle">{{ subjectCommitmentData.title }}</view>
			<scroll-view class="scroll-rich" scroll-y="true" v-if="subjectCommitmentData.content">
				<rich-text class="rich-text-box" :nodes="subjectCommitmentData.content" space="nbsp"></rich-text>
			</scroll-view>
			<nullDataState v-else></nullDataState>
		</template>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import titleStyle from '@/components/titleStyle'
	import nullDataState from '@/components/nullDataState'

	
	
	export default {
		name: "subjectCommitment",
		components:{
			titleStyle,
			nullDataState
		},
		data() {
			return {
				subjectCommitmentData: null, // 承诺内容
			}
		},
		computed: {
		},
		async created() {
			const subjectCommitmentData = uni.getStorageSync('subjectCommitmentData') || null;
			if (subjectCommitmentData) {
				lazyLoadCache(() => {
					subjectCommitmentData.content = handleHideCharacterDisplay(subjectCommitmentData.content)
					this.subjectCommitmentData = subjectCommitmentData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopInfo',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							res.data.data.content = handleHideCharacterDisplay(res.data.data.content)
							this.subjectCommitmentData = res.data.data
						}
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.subject-commitment {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	background-color: #fff;
	.title {
		margin-bottom: 1vw;
	}
	.subtitle {
		color: #0052A9;
		font-family: "PingFangM";
		font-size: 3.8vw;
		text-align: center;
		margin-bottom: 1vw;
	}
	.scroll-rich {
		height: calc(100% - 15vw);
	}
}
</style>
