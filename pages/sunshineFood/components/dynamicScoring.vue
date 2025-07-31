<template>
	<view class="dynamic-scoring">
		<template v-if="dynamicScoringData.length != 0">
			<!-- <view class="title">{{ dynamicScoringData[0].shop_name }}</view> -->
			<scroll-view class="dynamic-scoring-scroll" :scroll-y="true" :show-scrollbar="false" @scrolltolower="loadMore">
				<view class="dynamic-scoring-scroll-box">
					<view class="item" v-for="(dynamicScoringItem, index) in dynamicScoringData" :key="dynamicScoringItem.rating_id">
						<view class="head">
							<view class="name">
								<image class="icon" src="../../../assets/imgs/date-icon.png" mode=""></image>
							{{ dynamicScoringItem.date || '-' }}</view>
							<view class="state">{{ dynamicScoringItem.status == 0 ? '合格' : '不合格' }}</view>
						</view>
						<view class="main">
							<view class="list-item">
								<view class="item">
									<text class="title">本次计分</text>
									<view class="content">{{ dynamicScoringItem.score || '-' }}</view>
								</view>
								<view class="item">
									<text class="title">累计计分</text>
									<view class="content">{{ dynamicScoringItem.total_score || '-' }}</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="gap" style="width: 100%; height: 2vw;"></view>
				</view>
				
				
			</scroll-view>
		</template>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import nullDataState from '@/components/nullDataState'
	import tableCustomize from '@/components/tableCustomize'

	
	
	export default {
		name: "dynamicScoring",
		components:{
			tableCustomize,
			nullDataState
		},
		data() {
			return {
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				dynamicScoringData: [], // 承诺内容
				isComplete: false,
			}
		},
		computed: {
		},
		async created() {
			const dynamicScoringData = uni.getStorageSync('dynamicScoringData') || null;
			if (dynamicScoringData) {
				lazyLoadCache(() => {
					this.dynamicScoringData = dynamicScoringData.data
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopSunRating',
					method: 'post',
					data: {
						...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							if (res.data.data.data.length == 0) {
								this.isComplete = true
							}
							res.data.data.data.forEach(item => {
								this.dynamicScoringData.push(item)
							})
						}
					},
				});
			},
			
			loadMore(e) {
				if (this.isComplete) {
					return
				}
				this.query.page++
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
.dynamic-scoring {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	// padding: 3vw;
		
	> .title {
		font-size: 4vw;
		color: #0464CA;
		white-space: nowrap;
		font-family: 'PingFangH';
		box-sizing: border-box;
		text-align: center;
		padding: 1vw;
		margin-bottom: 1vw;
	}
	
	.dynamic-scoring-scroll {
		width: 100vw;
		height: calc(100%);
		position: relative;
		background-color: #fff;
		.dynamic-scoring-scroll-box {
			width: 100%;
			height: calc(100%);
			box-sizing: border-box;
			padding: 2vw 0;
			> .item {
				width: calc(100% - 4vw);
				border: 1px solid rgba(221, 221, 221, 1);
				margin: 0 auto 3vw auto;
				border-radius: 1.5vw;
				background-image: url('@/assets/imgs/bg-item-icon.png');
				background-size: 12vw 12vw;
				background-position: right bottom;
				background-repeat: no-repeat;
				.head {
					width: 100%;
					box-sizing: border-box;
					padding: 2vw 4vw;
					background-image: linear-gradient(90deg, rgba(147, 188, 230, 0.5) 0%, rgba(147, 188, 230, 0) 100%);
					background-size: 100% 20vw;
					background-repeat: repeat-x;
					display: flex;
					justify-content: space-between;
					border-radius: 1.5vw 1.5vw 0 0;
					border-bottom: 1px solid rgba(147, 188, 230, 0.2);
					.name {
						display: flex;
						align-items: center;
						font-size: 4.2vw;
						color: rgba(4, 100, 202, 1);
						.icon {
							width: 4vw;
							height: 4vw;
							margin-right: 1vw;
						}
					}
					.state {
						font-size: 3.2vw;
						color: rgba(4, 100, 202, 1);
						box-sizing: border-box;
						padding: 0.5vw 2vw;
						line-height: 5vw;
						border: 1px solid rgba(4, 100, 202, 1);
						border-radius: 1vw;
						background-color: #fff;
						flex-shrink: 0;
						margin-left: 2vw;
					}
				}
				.main {
					width: 100%;
					box-sizing: border-box;
					padding: 2vw 4vw;
					.list-item {
						width: 100%;
						display: flex;
						.item {
							display: flex;
							align-items: baseline;
							color: rgba(119, 119, 119, 1);
							font-size: 3.6vw;
							width: 100%;
							box-sizing: border-box;
							padding: 0.5vw 0;
							
									
							.title {
								color: rgba(56, 56, 56, 1);
								font-family: "PingFangH";
								margin-right: 1.5vw;
								width: 14.5vw;
								text-align: justify;
								text-justify: inter-character;
								text-align-last: justify;
							}
							.content {
								width: calc(100% - 20vw);
								// overflow:hidden;/*内容超出后隐藏*/
								// text-overflow:ellipsis;/*超出内容显示为省略号*/
								// white-space:nowrap;/*文本不进行换行*/
							}
						}
					}
				}
			}
		}
	}
}
</style>
