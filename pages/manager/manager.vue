<template>
	<detailsPage>
		<menuNavigation>
			<template #head>
				企业主要负责人
			</template>
		</menuNavigation>
		<view class="manager">
			<scroll-view class="scroll-box" :scroll-y="true" :show-scrollbar="false" v-if="managerData && managerData.length">
				<view class="item" v-for="(managerItem,index) in managerData" :key="managerItem.job_id">
					<image class="profile-picture" :src="managerItem.avatarArr[0] || defaultAvatar" mode="aspectFill"></image>
					<view class="info-box">
						<view class="name-box">
							<view class="name">{{managerItem.person_name}}</view>
							<view class="position">{{managerItem.job_name}}</view>
						</view>
						<view class="info-item">性别: {{ managerItem.person_sex == 0 ? '男' : '女' }}</view>
						<view class="info-item">联系电话: {{ managerItem.person_phone || '-' }}</view>
						<view class="info-item">健康证: <text class="primary" v-if="managerItem.health_url" @click="previewImage(managerItem.health_url)">查看</text> <text class="danger" v-if="!managerItem.health_url">暂无</text></view>
					</view>
				</view>
				<view class="gap" style="width: 100%; height: 3vw;"></view>
			</scroll-view>
			<nullDataState v-else></nullDataState>
		</view>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</detailsPage>
</template>

<script>
	import { formatDate, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面
	import menuNavigation from '@/components/menuNavigation.vue' // 选择标签菜单
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	import defaultAvatar from '@/assets/imgs/default-avatar.png'; 
	
	
	export default {
		name: "manager",
		components:{
			detailsPage,
			menuNavigation,
			kxjPreviewImage,
			nullDataState,
		},
		data() {
			return {
				managerData: [],
				defaultAvatar,
				imageUrl: ''
			}
		},
		computed: {
		},
		async created() {
			const managerData = uni.getStorageSync('managerData') || null;
			console.log(managerData)
			if (managerData) {
				lazyLoadCache(() => {
					this.managerData = managerData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopPerson',
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
							this.managerData = res.data.data
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
.manager {
	width: 100vw;
	height: calc(100% - 10vw);
	position: relative;
	background-color: #fff;
	.scroll-box {
		width: 100%;
		height: calc(100%);
		box-sizing: border-box;
		padding: 2vw 0;
		.item {
			width: calc(100% - 4vw);
			display: flex;
			padding: 15rpx;
			box-shadow: 0 0 1vw rgba(4, 100, 202, 0.5);
		  margin: 3vw auto 3vw auto;
		
			.profile-picture {
				width: 21vw;
				height: 28vw;
				margin-right: 2vw;
				border-radius: 1vw;
				flex-shrink: 0;
			}
		
			.info-box {
				width: calc(100% - 21vw - 2vw);
				.name-box {
					display: flex;
					height: 8vw;
					.name {
						// letter-spacing: 10rpx;
						height: 100%;
		        min-width: 14vw;
						display: flex;
						align-items: center;
						position: relative;
						margin-right: 2vw;
						color: #0464CA;
						font-family: 'PingFangH';
						font-size: 4vw;
						box-sizing: border-box;
						padding-right: 2vw;
						&::after {
							content: "";
							width: 100%;
							height: 2px;
							background: linear-gradient(to right, #0464CA, #53A4FD);
							position: absolute;
							bottom: 0;
						}
					}
					.position {
						padding: 0 2vw;
						height: 90%;
						background: linear-gradient(to right,#0464CA, #3181D5);
						color: #fff;
						font-family: 'PingFangM';
						font-size: 22rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 4rpx;
					}
				}
				.info-item {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 3.2vw;
					margin: 1vw 0;
					font-family: "PingFangM";
					&:last-child {
						margin-bottom: 0;
					}
				}
				.danger {
					font-size: 3.2vw;
					color: #F24822;
					font-family: 'PingFangH';
					margin-left: 1vw;
				}
		    .primary {
					font-size: 3.2vw;
		      color: #0464CA;
		      font-family: 'PingFangH';
					margin-left: 1vw;
		    }
			}
		}
	}
}
</style>
