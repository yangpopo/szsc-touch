<template>
	<scroll-view :scroll-y="true" :show-scrollbar="false" class="subject-commitment">
		<template v-if="supervisorData && supervisorData.length != 0">
			<view class="supervisor-list">
				<view class="supervisor-item" v-for="(item,index) in supervisorData" :key="index">
				  <image class="cover" :src="item.avatarArr[0]" mode="aspectFill"></image>
				  <view class="info-box">
				    <view class="name">{{item.person_name}}</view>
				    <view class="info-item">
				      <image class="icon" src="../../../assets/imgs/phone.png"></image>
				      <view class="describe">{{item.person_phone}}</view>
				    </view>
				    <view class="info-item">
							<image class="icon" src="../../../assets/imgs/location.png"></image>
				      <view class="describe">
				        {{item.supervise_name && item.supervise_name.length > 12 ? item.supervise_name.slice(0,11) + '...' : item.supervise_name}}
				      </view>
				    </view>
				  </view>
				</view>
			</view>
		</template>
		<nullDataState v-else></nullDataState>
	</scroll-view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import titleStyle from '@/components/titleStyle'
	import nullDataState from '@/components/nullDataState'

	
	
	export default {
		name: "supervisor",
		components:{
			titleStyle,
			nullDataState
		},
		data() {
			return {
				supervisorData: null, // 承诺内容
			}
		},
		computed: {
		},
		async created() {
			const supervisorData = uni.getStorageSync('supervisorData') || null;
			if (supervisorData) {
				lazyLoadCache(() => {
					this.supervisorData = supervisorData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getSupPerson',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							res.data.data.forEach(item => {
								if (item.avatar) {
									item['avatarArr'] = item.avatar.split(',')
								} else {
									item['avatarArr'] = []
								}
							})
							this.supervisorData = res.data.data
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
	// padding: 3vw;
	.supervisor-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 3vw;
		.supervisor-item {
		  width: calc(50% - 1vw);
		  box-shadow: 0 0 5rpx 0 rgba(4, 100, 202, 0.3);
		  margin-bottom: 2vw;
		  display: flex;
		  align-items: center;
			border-radius: 1vw;
		
		  .cover {
		    width: 20vw;
		    height: 28vw;
				border-radius: 1vw;
				flex-shrink: 0;
				margin-right: 1.5vw;
				display: block;
		  }
		
		  .info-box {
		    width: 60%;
		    height: 100%;
		    box-sizing: border-box;
				padding-top: 0.5vw;
		
		    .name {
		      font-size: 30rpx;
		      border-bottom: 2px solid #0464CA;
		      width: fit-content;
					font-size: 4vw;
					margin-bottom: 1vw;
		    }
		
		    .info-item {
		      display: flex;
					font-size: 3.2vw;
					margin-bottom: 1vw;
		
		      .icon {
		        width: 3vw;
		        height: 3vw;
						margin-top: 0.8vw;
		        margin-right: 0.5vw;
						flex-shrink: 0;
		      }
					.describe {
						display: -webkit-box;
						-webkit-line-clamp: 3; /* 显示的行数 */
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
		    }
		
		//     .addressBox {
		//       display: flex;
		//       height: 39%;
		//       padding-left: 10rpx;
		
		//         image {
		//           width: 30rpx;
		//           height: 35rpx;
		//         }
		//         .address {
		//           width: calc(100% - 30rpx);
		//         }
		//     }
		  }
		}
	}
}
</style>
