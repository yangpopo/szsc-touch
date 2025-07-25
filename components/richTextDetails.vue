<template>
	<view class="rich-text-details">
		<template v-if="richTextData">
			<titleStyle id="titleStyle" class="title" :fontSize="3.5" fontColor="#fff" mode="bright">{{ richTextData.title }}</titleStyle>
			<scroll-view class="scroll-rich" :style="{'height': `calc(100% - ${titleStyleHeight}px - 1vw)`}" scroll-y="true" v-if="richTextData.content">
				<rich-text class="rich-text-box" :nodes="contentData" space="nbsp"></rich-text>
			</scroll-view>
			<nullDataState v-else></nullDataState>
		</template>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import titleStyle from '@/components/titleStyle'
	import nullDataState from '@/components/nullDataState'

	
	
	export default {
		name: "richTextDetails",
		components:{
			titleStyle,
			nullDataState,
		},
		data() {
			return {
				titleStyleHeight: 0
			}
		},
		computed: {
			...mapState(['richTextData']),
			contentData() {
				if (this.richTextData) {
					return handleHideCharacterDisplay(this.richTextData.content)
				}
			}
		},
		async created() {
		},
		mounted() {
			uni.createSelectorQuery().in(this)
			  .select('#titleStyle')
			  .boundingClientRect(res => {
					this.titleStyleHeight = res.height
			  })
			  .exec()
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.rich-text-details {
	width: 100vw;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	
	.title {
		box-sizing: border-box;
		padding: 2.5vw 0;
		margin-bottom: 1vw;
	}
	.scroll-rich {
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		padding: 3vw 2vw 3vw 3vw;
	}
}
</style>
