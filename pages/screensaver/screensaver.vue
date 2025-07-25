<template>
	<view class="screen-saver" @click="skipPage">
	  <view class="top"></view>
	  <view class="title">
	    <view class="line1">重庆数字商超</view>
	    <view class="line2">监管服务平台</view>
	  </view>
	  <image src="@/assets/imgs/xline2.png" mode="" class="xline"></image>
	  <view class="tip1">
	    <view class="">食安重庆</view>
	    <view class="">为您保驾护航</view>
	  </view>
	  <view class="tip2">
	    <view class="">投诉电话: </view>
	    <view class="">12315</view>
	  </view>
	  <image src="@/assets/imgs/finger.png" mode="widthFix" class="imgs"></image>
	  <view class="bottom">
	    <view class="bottomtitle">
	      <view class="bottomtitle1">"食品安全</view>
	      <view class="bottomtitle2">查询终端"</view>
	    </view>
	    <view class="bottomtag">全链条数字化监管模式</view>
	    <view class="bottomtext">全力推进"数字商超"建设、构建食品安全共治新格局</view>
	  </view>
	  <view class="foot">
	    <view>技术指导: {{ technicalSupport }}</view>
	    <view>联系电话: {{ serviceHotline }}</view>
	  </view>
	</view>
</template>

<script>
	import {
		skipPage
	} from '@/tool/tool.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		name: "screensaver",
		components: {},
		data() {
			return {
				currentIndex: 0,
				dotStyle: {
					backgroundColor: '#53a4fd',
					border: 'none',
					color: '#fff',
					selectedBackgroundColor: '#0464ca',
					selectedBorder: 'none'
				},
				// 广告list
				adList: ['', '', ''],
			}
		},
		computed: {
			...mapState(['pageName', 'twoPageName', 'technicalSupport', 'serviceHotline']),
		},
		created() {

		},
		mounted() {},
		methods: {
			...mapMutations(['updateId']),
			// 切换Swiper
			changeSwiper(data) {
				this.currentIndex = data.detail.current;
			},
			
			// 向前
			afterClick() {
				if (this.currentIndex < (this.adList.length - 1)) {
					this.currentIndex++
				}
			},
			// 向后
			backClick() {
				if(this.currentIndex > 0) {
					this.currentIndex--
				}
			},
			
			skipPage() {
				skipPage('home', this)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.screen-saver {
	  width: 100%;
	  height: 100vh;
	  background-image: url('@/assets/imgs/loadingbg.png');
	  background-repeat: no-repeat;
	  position: absolute;
	  top: 0;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	}
	
	.top {
	  width: 100%;
	  height: 25%;
	  background-image: url('@/assets/imgs/topbg.png');
	  background-repeat: no-repeat;
	  background-size: contain;
	  position: absolute;
	  top: 0;
	}
	
	.title {
	  width: 80%;
	  margin: 25rpx auto;
	
	  .line1 {
	    width: fit-content;
	    font-size: 90rpx;
	    color: #FFF;
	    font-family: 'YouShe';
	    text-shadow: 0rpx 8rpx 8rpx rgba(0, 82, 169, 1);
	  }
	
	  .line2 {
	    width: fit-content;
	    font-size: 90rpx;
	    color: #FFF;
	    font-family: 'YouShe';
	    margin-left: auto;
	    text-shadow: 0rpx 8rpx 8rpx rgba(0, 82, 169, 1);
	    margin-top: -15rpx;
	  }
	}
	
	.xline {
	  width: 100%;
	  height: 3rpx;
	  margin: 0 auto 20rpx;
	}
	
	.tip1 {
	  width: 90%;
	  height: 40rpx;
	  display: flex;
	  background: linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.01));
	  margin: 0 auto 10rpx;
	  font-size: 30rpx;
	  justify-content: center;
	  align-items: center;
	
	  view {
	    color: #0052A9;
	    font-family: 'PingFangH';
	    margin: 0 10rpx;
	  }
	}
	
	.tip2 {
	  width: 80%;
	  height: 40rpx;
	  display: flex;
	  background: linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.01));
	  margin: 0 auto 5rpx;
	  font-size: 30rpx;
	  justify-content: center;
	  align-items: center;
	
	  view {
	    margin: 0 10rpx;
	    color: #0052A9;
	    font-family: 'PingFangH';
	  }
	}
	
	.imgs {
	  width: 100%;
	  margin-top: -90rpx;
	}
	
	.bottom {
	  width: 95%;
	  height: 27%;
	  background-image: url('@/assets/imgs/bottombg.png');
	  background-repeat: no-repeat;
	  background-size: 100% 100%;
	  margin: 0 auto;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  margin-top: -110rpx;
	  z-index: 2;
	
	  .bottomtitle {
	    width: 50%;
	
	    .bottomtitle1 {
	      width: fit-content;
	      font-size: 50rpx;
	      font-family: 'YouShe';
	      color: #FFF;
	    }
	
	    .bottomtitle2 {
	      width: fit-content;
	      margin-left: auto;
	      font-size: 50rpx;
	      font-family: 'YouShe';
	      color: #FFF;
	    }
	  }
	
	  .bottomtag {
	    width: 50%;
	    height: 50rpx;
	    background-image: url('@/assets/imgs/tag.png');
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
	    text-align: center;
	    line-height: 50rpx;
	    color: #FFF;
	    font-size: 24rpx;
	    font-family: 'PingFangM';
	    margin: 20rpx 0;
	  }
	
	  .bottomtext {
	    font-size: 22rpx;
	    color: #FFF;
	  }
	
	}
	
	.foot {
	  width: 100%;
	  height: 2%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 14px;
	  background: rgba(4, 100, 202, .5);
	  // border-top: 4rpx solid rgba(255, 255, 255, .5);
	  border-bottom: 4rpx solid rgba(255, 255, 255, .5);
	  position: absolute;
	  bottom: 10rpx;
	
	  view {
	    margin: 0 10rpx;
	    color: rgba(255, 255, 255, .8);
	    font-family: 'PingFangM';
	  }
	}
</style>