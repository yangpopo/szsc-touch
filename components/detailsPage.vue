<template>
	<view class="details-page">
		<view class="head">
			<view class="state-box">
				<view class="before">
					<view class="national-emblem" @touchstart="handleTouchStart" @touchend="handleTouchEnd"></view>
					<!-- <image class="gh" src="@/assets/imgs/gh.png" mode="widthFix" ></image> -->
					<view class="info">
						<view class="title">市场监督管理局</view>
						<view class="subtitle">MARKET REGULATION</view>
					</view>
				</view>
				<view class="after">
					<view class="time">{{ timeDate.time }}</view>
					<view class="date">{{ timeDate.date }}</view>
				</view>
			</view>
			<view class="title-box">
				<view class="title">重庆数字商超监管服务平台</view>
				<view class="subtitle-box">
					<view class="subtitle">食安重庆 为您保驾护航</view>
					<view class="subtitle">投诉电话: 12315</view>
				</view>
			</view>
		</view>
		<scroll-view :scroll-y="true" class="content-box" :show-scrollbar="false">
			<slot></slot>
		</scroll-view>
		<view class="footer">
			<view class="information">技术支持：{{technicalSupport}}&nbsp;&nbsp;&nbsp;&nbsp;服务热线：{{serviceHotline}}</view>
		</view>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"detailsPage",
		components: {
		},
		props: {
		},
		data() {
			return {
				delayObj: null, // 延迟
				timerObj: null, // 定时器对象
				timeDate: {
					time: '', // 时间
					date: '', // 日期
				},
			}
		},
		created() {
			this.getTimeDate();
			this.timerObj = setInterval(() => {
				this.getTimeDate();
			}, 1000)
		},
		// 被销毁前
		beforeDestroy() {
			clearInterval(this.timerObj)
			clearInterval(this.delayObj)
		},
		computed: {
			...mapState(['technicalSupport', 'serviceHotline']),
		},
		methods: {
			...mapMutations([]),
			// 获取日期时间
			getTimeDate() {
				// 创建一个表示当前日期和时间的Date对象
				let now = new Date();
					
				// 获取当前年份、月份、日期
				let year = now.getFullYear();
				let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并使用padStart补零
				let day = String(now.getDate()).padStart(2, '0'); // 使用padStart补零
					
				// 获取当前是星期几
				let weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				let weekday = weekdays[now.getDay()];
					
				// 获取当前时间
				let hours = String(now.getHours()).padStart(2, '0');
				let minutes = String(now.getMinutes()).padStart(2, '0');
				let seconds = String(now.getSeconds()).padStart(2, '0');
					
				// 组合日期、时间和星期几为字符串
				let dateTimeWithWeekday = year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds + " " + weekday;
				
				this.timeDate.time = `${hours}:${minutes}`
				this.timeDate.date = `${year}/${month}/${day} ${weekday}`
				
			},
			// 长按事件触发
			handleTouchStart() {
			    this.delayObj = setTimeout(() => {
			      // uni.showToast({
			      //   title:'长按事件触发'
			      // })
						skipPage('system', this)
			    }, 1500)
			},
			// 长按结束
			handleTouchEnd() {
			  clearTimeout(this.delayObj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.details-page {
		width: 100vw;
		height: 100vh;
		position: relative;
		.head-bg {
			width: 100vw;
			height: 35vw;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
		.head {
			width: 100vw;
			height: 41vw;
			position: relative;
			z-index: 1;
			box-sizing: border-box;
			padding: 3vw;
			background-image: url('@/assets/imgs/bg-head.png');
			background-size: 100% 100%;
			.state-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 3vw;
				.before {
					display: flex;
					align-items: center;
					.national-emblem {
						width: 10vw;
						height: 10vw;
						margin-right: 2vw;
						background-image: url('@/assets/imgs/gh.png');
						background-size: 100% 100%;
						// background-color: #0052A9;
					}
					.info {
						color: #0052A9;
						font-family: "PingFangH";
						.title {
							font-size: 3.8vw;
						}
						.subtitle {
							font-size: 2.6vw;
						}
					}
				}
				.after {
					text-align: right;
					color: #0052A9;
					font-family: "PingFangH";
					.time {
						font-size: 4vw
					}
					.date {
						font-size: 2.8vw
					}
				}
			}
			.title-box {
				width: 100%;
				text-align: center;
				.title {
					width: 100%;
					text-align: center;
					font-size: 5.3vw;
					font-family: "PingFangH";
					color: #0052A9;
					text-shadow: 0 0 0.25rem #FFF;
					box-sizing: border-box;
					padding-bottom: 1.5vw;
					background-image: linear-gradient(90deg, rgba(0, 82, 169, 0), rgba(0, 82, 169, 1), rgba(0, 82, 169, 0));
					background-size: 75% 0.5vw;
					background-repeat: no-repeat;
					background-position: center bottom;
					margin-bottom: 2vw;
				}
				.subtitle-box {
					width: 50%;
					box-sizing: border-box;
					padding: 0.5vw 0;
					background: linear-gradient(to right, rgba(255, 255, 255, 0.1), white, rgba(255, 255, 255, 0.1));
					margin: 0 auto;
					.subtitle {
						font-size: 2.3vw;
						text-align: center;
						color: #0052A9;
						font-family: "PingFangH";
					}
				}
			}
		}
		.content-box {
			width: 100vw;
			height: calc(100vh - 41vw - 8.4vw);
			position: relative;
			z-index: 1;
			display: flex;
			flex-wrap: nowrap;
			align-items: stretch;
			background-image: url('@/assets/imgs/bg-main.png');
			background-size: 100% 100%;
		}
		.footer {
			width: 100vw;
			height: 8vw;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 0;
			background-size: 100% 100%;
			background-color: #7cacdf;
			.information {
				width: 100%;
				box-sizing: border-box;
				padding: 1vw;
				font-size: 2.8vw;
				text-align: center;
				color: #fff;
				background-color: rgba(4, 100, 202, 0.5);
				zoom: 0.8;
			}
		}
	}
</style>
