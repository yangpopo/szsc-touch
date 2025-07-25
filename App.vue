<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true); // 隐藏电量
			// plus.navigator.hideSystemNavigation() //隐藏虚拟按键
			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overscroll-behavior: none;
	}

	/*每个页面公共css */
	@font-face {
		font-family: 'YouShe';
		src: url('@/assets/font/YouSheBiaoTiHei-2.ttf');
	}

	@font-face {
		font-family: 'PingFangM';
		src: url('@/assets/font/PingFangMedium.ttf');
	}

	@font-face {
		font-family: 'PingFangH';
		src: url('@/assets/font/PingFangHeavy.ttf');
	}
</style>
