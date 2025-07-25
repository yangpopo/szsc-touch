<template>
	<view class="secure-detail">
		<menuNavigation mode="customize">
			<template #head>
				<view class="head-title">溯源信息</view>
			</template>
		</menuNavigation>
		<scroll-view class="main-box" v-if="secureDetailData" :scroll-y="true">
			<view class="item">
				<view class="name">商品名称</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_name }}</view>
				</view>
			</view>
			<view class="item">
				<view class="name">供货商信息</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_name }}</view>
					<view class="first">{{ secureDetailData.vendor }}</view>
					<view class="second">营业执照: <span class="nocard" v-if="secureDetailData.business_license.length <= 0">暂未上传</span><span class="havecard" @click="handleClickPdf(secureDetailData.business_license[0])" v-else>查看证件</span></view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">生产地信息</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.origin_addr }}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">销售方信息</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.shop_name }}</view>
					<view class="second">地址: {{secureDetailData.shop_addr}}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">商品条码</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_sku }}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">商品规格</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_specs }}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">商品单位</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_unit }}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">商品用途</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">{{ secureDetailData.goods.goods_category }}</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">合格证明</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first">合格证: 
						<span class="nocard" v-if="!secureDetailData.goods.cert_url">暂未上传</span>
						<span class="havecard" @click="previewImage(secureDetailData.goods.cert_url[0])" v-else>查看证件</span>
					</view>
					<view class="second">检疫证: 
						<span class="nocard" v-if="!secureDetailData.goods.quarantine_cert">暂未上传</span>
						<span class="havecard" @click="previewImage(secureDetailData.goods.quarantine_cert[0])" v-else>查看证件</span>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="name">检测公示</view>
				<view class="icon"></view>
				<view class="title">
					<view class="first havecard" v-if="!secureDetailData.isNoneSamp" @click="openInspectionReport">查看详情</view>
					<view class="second nocard" v-else>暂未上传</view>
				</view>
			</view>
		</scroll-view>
		<view class="none-box" v-else>
			<nullDataState></nullDataState>
		</view>
		
		
		<!-- 檢查報告 -->
		<maskBox ref="inspectionReportMask" v-if="secureDetailData">
			<view class="inspection-report" v-if="!secureDetailData.isNoneSamp">
				<view class="title">
					{{ secureDetailData.samp.goods_name }}检测报告
				</view>
				<view class="report-number">
					报告编号:{{ secureDetailData.samp.samp_no }}
				</view>
				<view class="info-list">
					<view class="info-item">
						<view class="title">检测日期</view>
						<view class="content">{{ secureDetailData.samp.date }}</view>
					</view>
					<view class="info-item">
						<view class="title">检测单位</view>
						<view class="content">{{ secureDetailData.samp.samp_addr }}</view>
					</view>
					<view class="info-item">
						<view class="title">监测项目</view>
						<view class="content">{{ secureDetailData.samp.check_item }}</view>
					</view>
					<view class="info-item">
						<view class="title">检测标准</view>
						<view class="content">{{ secureDetailData.samp.criteria }}</view>
					</view>
					<view class="info-item">
						<view class="title">检测依据</view>
						<view class="content">{{ secureDetailData.samp.basis }}</view>
					</view>
					<view class="info-item">
						<view class="title">检测结果</view>
						<view class="content">
							<uni-tag v-if="secureDetailData.samp.outcome == 0" text="阴性" type="success" />
							<uni-tag v-else text="阳性" type="error" />
						</view>
					</view>
				</view>
			</view>
		</maskBox>
		
		
		
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</view>
</template>

<script>
	import { formatDate, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import menuNavigation from '@/components/menuNavigation'
	import maskBox from '@/components/maskBox'
	import nullDataState from '@/components/nullDataState'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	
	
	export default {
		name: "secureDetail",
		components:{
			menuNavigation,
			nullDataState,
			maskBox,
			kxjPreviewImage,
		},
		
		props:{
			goodsId: {
				type: String |Number,
				default: ''
			},
		},
		data() {
			return {
				imageUrl: '',
				secureDetailData: null,
				
			}
		},
		computed: {
		},
		async created() {
			this.getData()
		},
		methods: {
			// 获取数据
			async getData() {
				if (!this.goodsId) {
					return
				}
				await uni.request({
					url: 'touch/shop/getShopVendor',
					method: 'post',
					data: {
						goods_id: this.goodsId
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (Object.prototype.toString.call(res.data.data.samp) == '[object Array]') {
								res.data.data['isNoneSamp'] = true
							} else {
								res.data.data['isNoneSamp'] = false
							}
							this.secureDetailData = res.data.data
						}
					},
				});
			},
			
			handleClickPdf(url) {
				const file = { name: url };
				const pdf = file.name.toLowerCase().endsWith('.pdf');
				if(pdf) {
					uni.navigateTo({
						url: '/pages/pdf/pdf?url='+url
					})
				} else {
					this.previewImage(url)
				}
			},			
			// 预览图片
			previewImage(data) {
				console.log(data, '*--*---*')
				if (!data) {
					return
				}
				const pdf = data.toLowerCase().endsWith('.pdf')
				console.log(pdf, '*-*-*-*')
				if (pdf) {
					uni.navigateTo({
					  url: '/pages/pdf/pdf?url=' + data
					})
				} else {
					this.imageUrl = data
					this.$refs.kxjPreviewImage.show = true
				}
			},
			openInspectionReport() {
				this.$refs.inspectionReportMask.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
.secure-detail {
	width: 100vw;
	height: calc(100%);
	position: relative;
	.head-title {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-family: "PingFangH";
		color: #0464CA;
		background-color: #fff;
		&:before {
			content: '';
			width: 4vw;
			height: 5rpx;
			background-color: #0464CA;
			position: absolute;
			top: 85%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5rpx;
		}
	}
	
	.none-box {
		width: 100%;
		height: calc(100% - 11vw);
		background-color: #fff;
		position: relative;
		box-sizing: border-box;
	}
	
	.main-box {
		width: 100%;
		height: calc(100% - 11vw);
		background-color: #fff;
		position: relative;
		box-sizing: border-box;
		padding: 2vw 0;
		&:before {
			content: '';
			position: absolute;
			width: 1px;
			height: calc(100%);
			background-image: linear-gradient(180deg, rgba(4, 100, 202, 1), rgba(83, 164, 253, 0.5));
			top: 50%;
			left: 31.875%;
			transform: translateY(-50%);
			z-index: 1;
		}
		.item {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 3.5vw 1.5vw;
			
			
			.name {
				font-size: 3.2vw;
				width: 21vw;
				text-align: right;
				flex-shrink: 0;
			}
			.icon {
				width: 15vw;
				height: 3vw;
				margin: 0 2vw;
				flex-shrink: 0;
				background-image: url('@/assets/imgs/secbg.png');
				background-size: 100% 100%;
			}
			.title {
				width: 100%;
				font-size: 3.2vw;
				.first {
					font-size: 3.2vw;
					color: #000;
				}
				.havecard{
					color: rgba(4, 100, 202, 1);
				}
				.nocard{
					color: rgba(255, 165, 75, 1);
				}
			}
		}
	}
	
	.inspection-report {
		display: block;
		background-color: #ffffff;
		position: absolute;
		width: 90vw;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		border-radius: 2vw;
		padding: 3vw 5vw;
		
	  
		>.title {
			text-align: center;
			font-weight: bold;
			margin-bottom: 2vw;
			font-size: 4.5vw;
		}
		.report-number {
			text-align: left;
			font-size: 3vw;
			color: #999;
			margin-bottom: 2vw;
		}
		.info-list {
			width: 100%;
			max-height: calc(100vh - 80vw);
			overflow-y: auto;
			.info-item {
				width: 100%;
				display: flex;
				box-sizing: border-box;
				padding: 1vw 0;
				.title {
					width: 16vw;
					flex-shrink: 0;
					font-size: 3.5vw;
				}
				.content {
					font-size: 3.5vw;
					word-wrap:break-word; 
				}
			}
		}
	}
}


</style>
