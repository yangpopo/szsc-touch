<template>
	<view class="null-data-state" :style="{ 'background-color': backgroundColor }">
		<image class="icon-state" src="@/assets/imgs/null-data-icon.png" mode="widthFix"></image>
		<view class="title">{{ title }}</view>
	</view>
</template>

<script>
	import { } from '@/tool/tool.js'
	import { } from 'vuex'
	
	export default {
		name:"nullDataState",
		props:{
			title: {
				type: String,
				default: '暂无数据'
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {
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
.null-data-state {
	width: 100%;
	position: relative;
	.icon-state {
		width: 50%;
		display: block;
		margin: 0 auto 2vw auto;
	}
	.title {
		font-size: 3.2vw;
		color: #999;
		font-family: "PingFangM";
		position: absolute;
		left: 50%;
		bottom: 1.5vw;
		transform: translateX(-50%);
	}
}
</style>