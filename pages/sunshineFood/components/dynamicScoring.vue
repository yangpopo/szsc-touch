<template>
	<view class="dynamic-scoring">
		<template v-if="dynamicScoringData">
			<view class="title">{{ dynamicScoringData.data[0].shop_name }}</view>
			<tableCustomize :data="dynamicScoringData.data" :indexStarting="(query.page - 1) * query.size" :height="tableHeight" :option="dynamicScoringOption" ></tableCustomize>
			<paginationCustomize :size="query.size" :current="query.page" :total="dynamicScoringData.total" @change="queryChange" ></paginationCustomize>
		</template>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import nullDataState from '@/components/nullDataState'
	import tableCustomize from '@/components/tableCustomize'
	import paginationCustomize from '@/components/paginationCustomize'

	
	
	export default {
		name: "dynamicScoring",
		components:{
			tableCustomize,
			paginationCustomize,
			nullDataState
		},
		data() {
			return {
				query: {
					page: 1,
					size: 15,
					pword: '',
				},
				tableHeight: '0vw',
				dynamicScoringData: null, // 承诺内容
				dynamicScoringOption: [{
					prop: 'index',
					label: '序号',
					maxWidth: 5,
					maxCharacter: 3,
				}, {
					prop: 'date',
					label: '考核时间',
					maxWidth: 36,
					maxCharacter: 10,
				}, {
					prop: 'score',
					label: '本次得分',
					maxWidth: 25,
					maxCharacter: 3,
				}, {
					prop: 'total_score',
					label: '累计得分',
					maxWidth: 25,
					maxCharacter: 3,
				}, {
					prop: 'customize',
					label: '考核状态',
					maxWidth: 25,
					maxCharacter: 5,
					renderFun(data) {
						return data.status == 0 ? '合格' : '不合格'
					}
				}],
			}
		},
		computed: {
		},
		async created() {
			this.tableHeight = `calc(100vh - 41vw - 53vw)`
			
			const dynamicScoringData = uni.getStorageSync('dynamicScoringData') || null;
			console.log(dynamicScoringData, '-*-*-*')
			if (dynamicScoringData) {
				lazyLoadCache(() => {
					this.dynamicScoringData = dynamicScoringData
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
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.dynamicScoringData = res.data.data
						}
					},
				});
			},
			
			queryChange(data) {
				this.query.page = data.current
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
		
	.title {
		font-size: 4vw;
		color: #0464CA;
		white-space: nowrap;
		font-family: 'PingFangH';
		box-sizing: border-box;
		text-align: center;
		padding: 1vw;
		margin-bottom: 1vw;
	}
}
</style>
