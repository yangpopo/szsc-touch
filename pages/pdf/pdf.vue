<template>
	<view>
		<web-view :src="pdfUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfUrl:'',
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
			
		}
	}
</script>

<style>

</style>
