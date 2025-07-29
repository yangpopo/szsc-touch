<template>
	<view class="system-management">
		<scroll-view class="system-scroll-box" scroll-y="true" show-scrollbar="false" v-if="systemManagementData && systemManagementData.length != 0" @scroll="scrollChanges">
			<articleListItem v-for="(item, index) in systemManagementData" :key="item.article_id" @bubblingClick="openDetails(item)">
				<image class="cover" :src="item.touch_thumbArr[0] || defaultDocument" mode="aspectFill" @error="errorImage($event, index)"></image>
				<view class="info">
					<view class="title">{{ item.title }}</view>
					<view class="info-list">
						<view class="info-item">状态：<text class="tag ordinary">正常</text></view>
						<view class="info-item">时间：{{ item.date }}</view>
					</view>
				</view>
			</articleListItem>
		</scroll-view>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { lazyLoadCache, handleHideCharacterDisplay } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import nullDataState from '@/components/nullDataState'
	import articleListItem from '@/components/articleListItem'
	import defaultDocument from '@/assets/imgs/default-document.png'
	
	
	export default {
		name: "systemManagement",
		components:{
			articleListItem,
			nullDataState
		},
		data() {
			return {
				systemManagementData: null, // 承诺内容
				defaultDocument,
			}
		},
		computed: {
		},
		async created() {
			const systemManagementData = uni.getStorageSync('systemManagementData') || null;
			if (systemManagementData) {
				lazyLoadCache(() => {
					this.systemManagementData = systemManagementData
				})
			} else {
				await this.getData()
			}
		},
		methods: {
			...mapMutations(['updataRichTextData']),
			// 获取数据
			async getData() {
				await uni.request({
					url: 'touch/shop/getShopIsm',
					method: 'post',
					data: {
					},
					success: (res) => {
						if (res.data.code == 200) {
							res.data.data.forEach(item => {
								if (item.touch_thumb) {
									item['touch_thumbArr'] = item.touch_thumb.split(',')
								} else {
									item['touch_thumbArr'] = []
								}
							})
							this.systemManagementData = res.data.data
						}
					},
				});
			},
			// 打开详情
			openDetails(detailsData) {
				this.updataRichTextData(detailsData)
				this.$emit('selectedMenu', 'richTextDetails')
			},
			
			scrollChanges(e) {
				console.log(e, '***---***')
			},
			// 图片加载错误
			errorImage(err, index) {
				this.systemManagementData[index].touch_thumbArr[0] = defaultDocument
			},
		}
	}
</script>

<style lang="scss" scoped>
.system-management {
	width: 100vw;
	height: calc(100%);
	position: relative;
	box-sizing: border-box;
	padding: 3vw;
	background-color: #fff;
	.system-scroll-box {
		width: 100%;
		// height: 50vw;
	}
}
</style>
