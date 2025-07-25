<template>
	<view class="pagination-customize">
		<uni-pagination v-if="total" :page-size="size" :current="page" :total="total" @change="queryChange" />
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
		name: "paginationCustomize",
		props: {
			size: {
				type: String | Number,
				default: 0
			},
			page: {
				type: String | Number,
				default: 0
			},
			total: {
				type: String | Number,
				default: 0
			}
		},
		data() {
			return {};
		},
		computed: {},
		mounted() {},
		methods: {
			queryChange(data) {
				this.$emit('change', data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pagination-customize {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		padding: 1vw;

		::v-deep .uni-pagination {
			width: 100%;
			margin: 0 auto;
		}

		::v-deep .uni-pagination__num-tag {
			width: 30rpx;
		}


		::v-deep .uni-pagination__btn {
			// padding: 6rpx 26rpx;
			background-color: #D5E9FF;
			// box-shadow: 0 0 2rpx 0 #0464CA;

			.uni-pagination__child-btn {
				// font-size: 26rpx;
				color: #0464CA;
			}
		}
	}
</style>