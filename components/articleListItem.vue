<template>
	<view class="article-list-item" @click="bubblingClick">
		<slot calss="slot"></slot>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"articleListItem",
		props:{
			fontSize: {
				type: String | Number,
				default: 5.2
			},
			fontColor: {
				type: String,
				default: '#0464CA'
			},
		},
		data() {
			return {
				heightDifference: 0, // 高度差
				coordinateY: 0, // 坐标y
			};
		},
		computed: {
		},
		mounted() {
		},
		methods: {
			bubblingClick() {
				this.$emit('bubblingClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
.article-list-item {
	width: 100%;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 2vw 0;
	border-bottom: 1px solid #DDD;
	::v-deep .cover{
		width: 21vw;
		height: 21vw;
		margin-right: 2vw;
		flex-shrink: 0;
		border-radius: 1.5vw;
	}
	::v-deep .info {
		width: calc(100% - 23vw - 2vw);
		.title {
			font-size: 3.6vw;
			font-family: "PingFangH";
			white-space: nowrap;
			color: #0464CA;
			margin-bottom: 1vw;
			white-space: nowrap; /* 防止文本换行 */
			overflow: hidden; /* 隐藏溢出的内容 */
			text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */		}
		.info-list {
			width: 100%;
			font-size: 3.4vw;
			font-family: "PingFangM";
			color: rgba(25, 25, 25, 1);
			
			.info-item {
				white-space: nowrap; /* 防止文本换行 */
				overflow: hidden; /* 隐藏溢出的内容 */
				text-overflow: ellipsis; /* 显示省略符号来代表被修剪的文本 */
				margin-bottom: 1vw;
				width: 100%;
				.tag {
					&.ordinary {
						color: #53A4FD;
					}
				}
			}
		}
	}
}
</style>