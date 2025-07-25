<template>
	<view class="title-style">
		<image class="icon-image" v-if="mode == 'dark'" src="@/assets/imgs/marketl.png" mode="heightFix"></image>
		<image class="icon-image" v-else-if="mode == 'bright'" src="@/assets/imgs/marketl-bright.png" mode="heightFix"></image>
		<view class="title" :style="{'fontSize': fontSize + 'vw', color: fontColor}"><slot></slot></view>
		<image class="icon-image" v-if="mode == 'dark'" src="@/assets/imgs/marketr.png" mode="heightFix"></image>
		<image class="icon-image" v-else-if="mode == 'bright'" src="@/assets/imgs/marketr-bright.png" mode="heightFix"></image>
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
	}
	.title {
		word-wrap: break-word; /* IE */
		overflow-wrap: break-word; /* 标准 */
		font-family: "PingFangH";
		// font-size: 5.2vw;
		margin: 0 2vw;
		max-width: 80%;
		flex-shrink: 0;
	}
}
</style>