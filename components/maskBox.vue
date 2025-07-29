<template>
	<view class="mask-box" v-if="isShow" @click="isShow = false">
		<slot calss="slot"></slot>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"maskBox",
		props:{
		},
		data() {
			return {
				isShow: false,
			};
		},
		computed: {
		},
		watch: {
			isShow(newVal) {
				if (newVal) {
					this.updateIsShowNav(false)
				} else {
					this.updateIsShowNav(true)
				}
			}
		},
		mounted() {
		},
		methods: {
			...mapMutations(['updateIsShowNav']),
		}
	}
</script>

<style lang="scss" scoped>
.mask-box {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.8);
}
</style>