<template>
	<detailsPage>
		<view class="home">
			<view class="terprise-introduction" @click="skipPage('companyIntroduction')">
				<view class="head">
					<view class="names">企业介绍</view>
					<view class="nexts">
						查看详情
						<image class="icon" src="../../assets/imgs/next.png"></image>
					</view>
				</view>
				<view class="foot" @click="skipPage('companyIntroduction')">
					<view class="texts">
						<template v-if="introductionData">{{ introductionData.content }}</template>
						<template v-else>暂无更多简介</template>
					</view>
					<image class="icon-mark" src="../../assets/imgs/qyjs.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="container">
				<view class="item" :class="`item${index+1}`" v-for="(item, index) in menuData" :key="index" @click="skipPage(item.url)">
					<image :src="item.icon"></image>
					<view class="">{{item.name}}</view>
				</view>
			</view>

			<!-- 投诉意见 -->
			<view class="complaint" @click="skipPage('complaintOpinion')">
				<view class="message"></view>
				<view class="text">投诉建议</view>
			</view>
		</view>
		<!-- <view class="" @click="skipPage('manageCache')">缓存</view> -->
	</detailsPage>
</template>

<script>
	import { skipPage, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import detailsPage from '@/components/detailsPage.vue' // 默认页面

	import ztzr from '@/assets/imgs/ztzr.png';
	import glry from '@/assets/imgs/glry.png';
	import aqsy from '@/assets/imgs/aqsy.png';
	import lqtx from '@/assets/imgs/lqtx.png';
	import sajc from '@/assets/imgs/sajc.png';
	import jgzr from '@/assets/imgs/jgzr.png';
	import sdzr from '@/assets/imgs/sdzr.png';
	import flfg from '@/assets/imgs/flfg.png';
	import ygsp from '@/assets/imgs/ygsp.png';
	import fxts from '@/assets/imgs/fxts.png';
	import zhgg from '@/assets/imgs/zhgg.png';

	export default {
		name: 'home',
		components: {
			detailsPage
		},
		data() {
			return {
				introductionData: '', // 企业介绍
				// 菜单数据
				menuData: [{
						name: '主体责任',
						icon: ztzr,
						url: 'principalResponsibility' // 主体责任-->主体承诺
					},
					{
						name: '管理人员',
						icon: glry,
						url: 'manager' // 管理人员
					},
					{
						name: '安全溯源',
						icon: aqsy,
						url: 'securityTraceability'
					},
					{
						name: '临期提醒',
						icon: lqtx,
						url: 'deadlineReminder'
					},
					{
						name: '食安检测',
						icon: sajc,
						url: 'foodSafetyTesting'
					},
					{
						name: '监管责任',
						icon: jgzr,
						url: 'regulatoryResponsibilities'
					},
					{
						name: '属地责任',
						icon: sdzr,
						url: 'territorialResponsibility'
					},
					{
						name: '法律法规',
						icon: flfg,
						url: 'lawsAndRegulations'
					},
					{
						name: '阳光食品',
						icon: ygsp,
						url: 'sunshineFood'
					},
					{
						name: '风险提示',
						icon: fxts,
						url: 'riskStatement'
					},
					{
						name: '召回公告',
						icon: zhgg,
						url: 'recallNotice'
					},
				]
			}
		},
		computed: {
			...mapState(['']),
		},
		onLoad() {},
		// 创建完成
		async created() {
			const introductionData = uni.getStorageSync('introductionData') || null;
			if (introductionData) {
				lazyLoadCache(() => {
					introductionData.content = this.filterHtmlTags(introductionData.content)
					this.introductionData = introductionData
				})
			} else {
				await this.getHomeData()
			}
		},
		// 被销毁前
		beforeDestroy() {},
		methods: {
			...mapMutations([]),

			// 获取首页数据
			async getHomeData() {
				await uni.request({
					url: 'touch/shop/getShopDesc',
					method: 'post',
					success: (res) => {
						if (res.data.code == 200) {
							res.data.data.content = this.filterHtmlTags(res.data.data.content)
							this.introductionData = res.data.data
						}
					}
				});
			},
			// 过滤html标签
			filterHtmlTags(str) {
				// 先过滤HTML标签
				let result = str.replace(/<\/?[^>]+(>|$)/g, '');
				// 再去除所有空格（包括连续空格）
				return result.replace(/\s+/g, '');
			},
			// 跳转页面
			skipPage(val) {
				skipPage(val, this)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100vw;
		height: 100%;
		// height: 100vh;
		position: relative;
		padding: 0 2.5vw;

		.terprise-introduction {
			background-image: url("@/assets/imgs/qyjsbg.png");
			background-size: 100% 100%;
			justify-content: start;
			box-sizing: border-box;
			padding: 1.5vw 2vw 0 2vw;
			margin-bottom: 2vw;

			.head {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-family: "PingFangM";
				border-bottom: 0.03125rem solid rgba(255, 255, 255, 0.2);
				color: #fff;
				box-sizing: border-box;
				padding-bottom: 1.5vw;
				margin-bottom: 1.5vw;

				.names {
					font-size: 4.5vw;
					font-weight: bold;
				}

				.nexts {
					display: flex;
					align-items: center;
					font-size: 3vw;

					.icon {
						width: 2vw;
						height: 3vw;
						margin-left: 1vw;
					}
				}
			}

			.foot {
				display: flex;
				align-items: flex-start;

				.texts {
					width: 100%;
					text-indent: 2em;
					height: 100%;
					font-family: "PingFangM";
					font-size: 2.8vw;
					line-height: 3.9vw;
					color: rgba(255, 255, 255, 1);
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.icon-mark {
					width: 12vw;
					height: 12vw;
					flex-shrink: 0;
					margin-left: 2vw;
				}
			}
		}

		.container {
			width: 100%;
			height: calc(100% - 26vw);
			display: grid;
			grid-template-columns: repeat(5, calc(100% / 6 - 15rpx));
			grid-template-rows: repeat(5, calc(100% / 5 - 17rpx));
			grid-template-areas:
				"item1 item1 item2 item2 item3 item3"
				"item1 item1 item4 item4 item5 item5"
				"item6 item6 item6 item7 item7 item7"
				"item8 item8 item8 item8 item8 item8"
				"item9 item9 item10 item10 item11 item11"
			;
			gap: 18rpx;
			box-sizing: border-box;

			.item {
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-position: 50% 50%;
				font-family: 'PingFangH';
				font-size: 22rpx;

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.item0 {
				grid-area: item0;
				background-image: url('@/assets/imgs/qyjsbg.png');
				justify-content: start;
				// padding: 15rpx 20rpx 0 20rpx;

				.tops {
					width: 96%;
					height: 40%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-family: 'PingFangM';
					border-bottom: 1rpx solid rgba(255, 255, 255, .2);

					.names {
						font-size: 34rpx;
						font-weight: bold;
					}

					.nexts {
						font-size: 26rpx;
						display: flex;
						align-items: center;



						image {
							width: 12rpx;
							height: 20rpx;
							margin-left: 10rpx;
						}
					}
				}

				.text {
					width: 100%;
					height: 60%;
					display: flex;
					position: relative;

					.texts {
						text-indent: 2em;
						width: calc(100% - 120rpx);
						height: 100%;
						font-family: 'PingFangM';
						font-size: 20rpx;
						color: rgba(255, 255, 255, .9);
						padding: 2rpx 0 0 10rpx;
					}

					image {
						width: 80rpx;
						height: 80rpx;
						position: absolute;
						right: 20rpx;
						bottom: 0;
					}
				}
			}

			.item1 {
				grid-area: item1;
				background-image: url('@/assets/imgs/ztzrbg.png');

				image {
					margin-bottom: 30rpx;
				}
			}

			.item2 {
				grid-area: item2;
				background-image: url('@/assets/imgs/glrybg.png');
			}

			.item3 {
				grid-area: item3;
				background-image: url('@/assets/imgs/aqsybg.png');
			}

			.item4 {
				grid-area: item4;
				background-image: url('@/assets/imgs/lqtxbg.png');
			}

			.item5 {
				grid-area: item5;
				background-image: url('@/assets/imgs/sajcbg.png');
			}

			.item6 {
				grid-area: item6;
				background-image: url('@/assets/imgs/jgzrbg.png');
			}

			.item7 {
				grid-area: item7;
				background-image: url('@/assets/imgs/sdzrbg.png');
			}

			.item8 {
				grid-area: item8;
				background-image: url('@/assets/imgs/flfgbg.png');
			}

			.item9 {
				grid-area: item9;
				background-image: url('@/assets/imgs/ygspbg.png');
			}

			.item10 {
				grid-area: item10;
				background-image: url('@/assets/imgs/fxtsbg.png');
			}

			.item11 {
				grid-area: item11;
				background-image: url('@/assets/imgs/zhggbg.png');
			}

		}


		.complaint {
			position: fixed;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			background: linear-gradient(to right, #D5E9FF, #E9F4FF);
			width: 6vw;
			// height: 20vw;
			border-radius: 10rpx 0 0 10rpx;
			box-shadow: 0 0 10rpx 0 rgba(0, 82, 169, 0.3);
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			animation-name: fluctuate;
			animation-duration: 4s;
			animation-iteration-count: infinite;
			box-sizing: border-box;
			padding: 4vw 1.5vw 1.5vw 1.5vw;
			.message {
				position: absolute;
				top: -3.5vw;
				left: 50%;
				transform: translateX(-50%);
				width: 5vw;
				height: 6vw;
				background-image: url('@/assets/imgs/message.png');
				background-size: 100% 100%;
			}
			.text {
				color: #0464CA;
				font-family: 'PingFangH';
				font-size: 3vw;
			}
		}

		@keyframes fluctuate {
			0% {
				transform: translateY(-50%);
			}

			25% {
				transform: translateY(-60%);
			}

			50% {
				transform: translateY(-40%);
			}

			75% {
				transform: translateY(-60%);
			}

			100% {
				transform: translateY(-50%);
			}
		}
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>