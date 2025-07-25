<template>
	<detailsPage>
		<view class="container">
		  <view class="saoBox">
		    <!-- <image src="@/assets/imgs/sao.png" class="sao"></image> -->
				<view class="sao"></view>
		    <view class="text">微信扫一扫</view>
		    <!-- <image src="@/assets/imgs/down.png" class="down"></image> -->
				<!-- <view class="down"></view> -->
		  </view>
		  <view class="main">
		    <view class="outItem">
		      <view class="qrcode">
		        <view class="codebg">
		          <!-- <image :src="QrCodeUrl" mode="aspectFit"></image> -->
		   
							<yz-qr class="qr-code" v-if="shopId" :text="`http://szsc.zhnyst.com/app/advice/index.html?id=${shopId}#/`" :size="50 * viewportWidth / 100" @update:qrStart="qrStart" @update:qrPath="sdfsad"></yz-qr>
							<view class="none-data" v-else>shopId为空</view>
		        </view>
		      </view>
		      <view class="botBox">
		        <image src="@/assets/imgs/totop.png"></image>
		        <view class="text">有意见码上说</view>
		      </view>
		    </view>
		  </view>
		</view>
	</detailsPage>
	
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import yzQr from "@/components/yz-qr/yz-qr.vue"
	
	export default {
		name: 'complaintOpinion',
		components:{
			yzQr,
			detailsPage
		},
		data() {
			return {
				viewportWidth: uni.getSystemInfoSync().screenWidth, // 获取视口宽度
				shopId: null
			}
		},
		created() {
			this.shopId = uni.getStorageSync('shopId')
		},
		computed: {
			...mapState(['technicalSupport', 'serviceHotline']),
		},
		methods: {
			qrStart() {
				uni.showLoading({
					title: '生成中..'
				})
			},
			sdfsad(data) {
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
/* // 清楚button的默认样式 */
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &::after {
    border: none;
  }
}

input::placeholder {
  color: rgba(204, 204, 204, .8);
}

.container {
    width: 100%;
    height: 100%;

    .saoBox {
      height: 100rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFF;

      .sao {
        width: 50rpx;
        height: 50rpx;
				background-image: url('@/assets/imgs/sao.png');
				background-size: 100% 100%;
      }

      .text {
        margin: 0 15rpx;
        font-size: 40rpx;
      }

      .down {
        width: 34rpx;
        height: 20rpx;
				background-image: url('@/assets/imgs/down.png');
				background-size: 100% 100%;
      }
    }

    .main {
      width: 100%;
      height: calc(100% - 100rpx);
      padding: 20rpx;

      .outItem {
        width: 100%;
        height: 97%;
        background-image: url('@/assets/imgs/saobg.png');
        background-size: 100% 100%;

        .qrcode {
          width: 100%;
          height: 67%;
          display: flex;
          justify-content: center;
          align-items: center;
          .codebg {
            width: 50vw;
            height: 50vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #FFF;
            border-radius: 25rpx;
          }
          image, canvas {
            // width: 450rpx;
            // height: 450rpx;
            border-radius: 20rpx;
          }
        }

        .botBox {
          width: 100%;
          height: 33%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;

          image {
            width: 60rpx;
            height: 90rpx;
          }

          .text {
            font-size: 56rpx;
            color: #0464CA;
            font-family: 'PingFangH';
          }
        }
      }
    }
  }

::v-deep .uni-easyinput__content-input {
  padding: 0 !important;
  height: 70rpx !important;
  font-size: 24rpx;
}
::v-deep .uni-easyinput {
  border-bottom: 2rpx solid rgb(246,246,246);
  flex: 0;
}
::v-deep .uni-easyinput__content {
  background-color: #FFF !important;
}
::v-deep .uni-easyinput__placeholder-class {
  color: #333 !important;
  font-size: 24rpx;
}
::v-deep input {
  color: #333 !important;
}
</style>
