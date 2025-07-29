<template>
	<view class="supervision-and-spotChecks">
		<template v-if="supervisionAndSpotChecksData">
			<view class="input-search-box">
			  <input type="text" placeholder="请输入需要查询的商品名称" class="input" placeholder-class="inputplaceholder" v-model="query.pword" />
			  <view class="search-but" @click="inputSearch">
			    <image class="icon" src="@/assets/imgs/search.png" mode="aspectFit"></image>
					<text class="search">查询</text>
			  </view>
			</view>
			
			<tableCustomize :data="supervisionAndSpotChecksData.data" :indexStarting="(query.page - 1) * query.size" :height="tableHeight" :option="supervisionAndSpotChecksOption" ></tableCustomize>
			
			<paginationCustomize :size="query.size" :current="query.page" :total="supervisionAndSpotChecksData.total" @change="queryChange" ></paginationCustomize>
		</template>
		<nullDataState v-else></nullDataState>
		<kxjPreviewImage :saveBtn="false" ref="kxjPreviewImage" :imgs="[imageUrl]"></kxjPreviewImage>
	</view>
</template>

<script>
	import { formatDate, lazyLoadCache } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import titleStyle from '@/components/titleStyle'
	import kxjPreviewImage from '@/components/kxj-previewImage'
	import nullDataState from '@/components/nullDataState'
	import tableCustomize from '@/components/tableCustomize'
	import paginationCustomize from '@/components/paginationCustomize'
	
	
	export default {
		name: "supervisionAndSpotChecks",
		components:{
			titleStyle,
			kxjPreviewImage,
			nullDataState,
			tableCustomize,
			paginationCustomize
		},
		data() {
			return {
				supervisionAndSpotChecksData: null,
				supervisionAndSpotChecksOption: [{
					prop: 'index',
					label: '序号',
					maxWidth: 5,
					maxCharacter: 3,
				}, {
					prop: 'check_no',
					label: '抽检编号',
					maxWidth: 50,
					maxCharacter: 40,
				}, {
					prop: 'check_year',
					label: '年度',
					maxWidth: 32,
					maxCharacter: 10,
				}, {
					prop: 'goods_name',
					label: '样品名称',
					maxWidth: 68,
					maxCharacter: 20,
				}, {
					prop: 'region_name',
					label: '地区(市/州)',
					maxWidth: 35,
					maxCharacter: 10,
				}, {
					prop: 'shop_name',
					label: '被抽检单位',
					maxWidth: 68,
					maxCharacter: 20,
				}, {
					prop: 'check_no',
					label: '检测报告编号',
					maxWidth: 45,
					maxCharacter: 20,
					butText:'查询',
				}, {
					prop: 'date',
					label: '报告日期',
					maxWidth: 30,
					maxCharacter: 10,
				}, {
					prop: 'results_txt',
					label: '结论',
					maxWidth: 25,
					maxCharacter: 10,
				}],
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				tableHeight: '0vw',
				imageUrl: ''
			}
		},
		computed: {
			...mapState([]),
		},
		async created() {
			this.tableHeight = `calc(100vh - 41vw - 20vw - 38vw)`
			
			const supervisionAndSpotChecksData = uni.getStorageSync('supervisionAndSpotChecksData') || null;
			if (supervisionAndSpotChecksData) {
				lazyLoadCache(() => {
					this.supervisionAndSpotChecksData = supervisionAndSpotChecksData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updateId']),
			
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/Supervise/getSupSamp',
					method: 'post',
					data: {
						...this.query
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.supervisionAndSpotChecksData = res.data.data
							
							// if (res.data.data.sign) {
							// 	res.data.data['signArr'] = res.data.data.sign.split(',')
							// } else {
							// 	res.data.data['signArr'] = []
							// }
							// this.selfDirectedTrainingData = res.data.data
							// this.selfDirectedTrainingData.signArr = ['https://cdn.pixabay.com/photo/2024/02/24/20/48/palais-royal-8594719_1280.jpg', 'https://cdn.pixabay.com/photo/2025/02/02/13/07/rope-9376701_1280.jpg']
						}
					},
				});
			},
			
			inputSearch() {
				this.query.page = 1
				this.getData()
			},
			
			queryChange(data) {
				this.query.page = data.current
				this.getData()
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
.supervision-and-spotChecks {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw 0 0 0;
	.input-search-box {
	  width: 100%;
	  height: 9vw;
	  display: flex;
	  align-items: center;
		margin-bottom: 2vw;
		box-sizing: border-box;
		padding: 0 3vw;
	
	  .input {
	    width: 82%;
	    height: 98%;
	    box-shadow: 0 0 4rpx 0 rgba(4, 100, 202, 0.4);
	    padding-left: 15rpx;
	    border-radius: 10rpx 0 0 10rpx;
	    font-size: 24rpx;
	  }
	
	  .search-but {
	    width: 20vw;
	    height: 100%;
	    background-color: #53A4FD;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    color: #fff;
	    border-radius: 0 10rpx 10rpx 0;
	    font-size: 24rpx;
	
	    .icon {
	      width: 3.2vw;
	      height: 3.2vw;
	      margin-right: 1vw;
	    }
	
	    .search {
	      font-size: 3.5vw;
	    }
	  }
	
	  .inputsearch:active {
	    background-color: rgba(4, 100, 202, 0.7);
	  }
	}
	
}

</style>
