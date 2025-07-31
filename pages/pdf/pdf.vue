<template>
	<view>
		<uni-nav-bar class="nav-bar" shadow right-text="返回" :border="false" title="预览PDF" @clickRight="exitReturn"></uni-nav-bar>
		<web-view class="web-view-style" :src="pdfUrl" :fullscreen="false" :webview-styles="webviewStyles" :update-title="false"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl:'',
				webviewStyles: {
					zIndex: 1,
					top: 45,
					left: 0,
					right: 0,
					bottom: 0
					// width: '100vw',
					// height: '100vw'
				}
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true); // 隐藏电量
			// plus.navigator.hideSystemNavigation() //隐藏虚拟按键
			// uni.setNavigationBarTitle({
			// 	title: 'pdf预览'
			// })
			// #endif
			this.pdfUrl = '/hybrid/html/web/viewer.html?file=' + encodeURIComponent(e.url)
      console.log(this.pdfUrl);
		},
		methods: {
			exitReturn() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.nav-bar{
	position: relative;
	z-index: 2;
}
.web-view-style {
	position: relative;
	top: 0px;
	width: 100vw;
	height: calc(100vh - 12.1vw);
	::v-deep iframe {
		width: 100vw !important;
		height: calc(100vh - 12.1vw) !important;
	}
}
</style>
