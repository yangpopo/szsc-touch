<template>
	<view class="title-style">
		<view class="icon-image dark-l" v-if="mode == 'dark'"></view>
		<view class="icon-image bright-l" v-else-if="mode == 'bright'"></view>
		<view class="title" :style="{'fontSize': fontSize + 'vw', color: fontColor}"><slot></slot></view>
		<view class="icon-image dark-r" v-if="mode == 'dark'"></view>
		<view class="icon-image bright-r" v-else-if="mode == 'bright'"></view>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"titleStyle",
		props:{
			fontSize: {
				type: String | Number,
				default: 5.2
			},
			fontColor: {
				type: String,
				default: '#0464CA'
			},
			mode: {
				type: String,
				default: 'dark' // bright
			}
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
			
		}
	}
</script>

<style lang="scss" scoped>
.title-style {
	display: flex;
	align-items: center;
	.icon-image {
		height: 3vw;
		width: calc(50% - 0px);
		&.dark-l {
			background-image: url('@/assets/imgs/marketl.png');
			background-size: 100% 100%;
		}
		&.bright-l {
			background-image: url('@/assets/imgs/marketl-bright.png');
			background-size: 100% 100%;
		}
		&.dark-r {
			background-image: url('@/assets/imgs/marketr.png');
			background-size: 100% 100%;
		}
		&.bright-r {
			background-image: url('@/assets/imgs/marketr-bright.png');
			background-size: 100% 100%;
		}
	}
	.title {
		word-wrap: break-word; /* IE */
		overflow-wrap: break-word; /* 标准 */
		font-family: "PingFangH";
		// font-size: 5.2vw;
		margin: 0 1vw;
		max-width: 80%;
		flex-shrink: 0;
	}
}
</style>