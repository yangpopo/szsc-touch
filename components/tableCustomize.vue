<template>
	<view class="table-customize">
		<!-- 表头 -->
		<scroll-view class="table-head-scroll" :scroll-x="true" :scroll-left="tableHeadLeft" :show-scrollbar="false" @scroll="tableHeadScroll" @touchstart="switchValveHead">
			<view class="table-head">
				<view class="table-head-th" v-for="(tableThItem, index) in option" :key="tableThItem + index" :class="{'float': tableThItem.float}" :style="{'width': tdThWidth(tableThItem.maxWidth) + 'vw'}">{{ tableThItem.label }}</view>
			</view>
		</scroll-view>
		<!-- 表体 -->
		<scroll-view class="table-main-scroll" :scroll-x="true" :scroll-y="true" :scroll-left="tableMainLeft" :show-scrollbar="false" @scroll="tableMainScroll" @touchstart="switchValveMain" v-if="data.length > 0" :style="{ 'height': height}">
			<view class="table-main">
				<view class="table-main-tr" v-for="(itemTr, itemTrIndex) in option" :key="itemTr.prop + itemTrIndex" :style="itemTr.float ? 'position: sticky; right: 0; top: 0;' : ''">
					<view class="table-main-td" v-for="(itemTd, itemTdIndex) in data" :key="itemTd + itemTdIndex" :style="{'width': tdThWidth(itemTr.maxWidth) + 'vw'}">
						<template v-if="itemTr.prop == 'index'">{{ (itemTdIndex + 1) +indexStarting }}</template>
							<template v-else-if="itemTr.prop == 'configure'">
								<button class="operate-but" type="default" @click.stop="triggerEvent(itemTr.triggerEvent, itemTd)">{{ itemTr.butText }}</button>
							</template>
							<template v-else-if="itemTr.prop == 'customize'">{{ itemTr.renderFun(itemTd) }}</template>
							<template v-else>
								<template v-if="itemTd[itemTr.prop]">
									<tableTips :tipsData="itemTd[itemTr.prop]" :maxCharacter="itemTr.maxCharacter"></tableTips>
								</template>
								<template v-else>-</template>
							</template>
					</view>
				</view>
			</view>
		</scroll-view>
		<nullDataState v-else></nullDataState>
	</view>
</template>

<script>
	import { skipPage } from '@/tool/tool.js'
	import { mapState, mapMutations } from 'vuex'
	import tableTips from '@/components/tableTips.vue'
	import nullDataState from '@/components/nullDataState.vue'
	
	export default {
		name:"tableCustomize",
		components:{
			tableTips,
			nullDataState,
		},
		props:{
			data: {
				type: Array | null,
				default: () => []
			},
			indexStarting: {
				type: Number,
				default: 0
			},
			option: {
				type: Array,
				default: () => []
			},
			height: {
				type: String,
				default: '0vw'
			}
		},
		data() {
			return {
				scrollSwitch: false, // 滚动开关
				tableHeadLeft: 0, // 表格头
				tableMainLeft: 0, // 表格体水平
				// tableMainTop: 0, // 表格体垂直
			};
		},
		computed: {
		},
		mounted() {
			
		},
		methods: {
			switchValveHead() {
				this.scrollSwitch = true
			},
				
			switchValveMain() {
				this.scrollSwitch = false
			},
			// 表头
			tableHeadScroll(data) {
				if (!this.scrollSwitch) {
					return
				}
				this.tableMainLeft = data.detail.scrollLeft
				// console.log('表头', data)
			},
			
			// 表体
			tableMainScroll(data) {
				if (this.scrollSwitch) {
					return
				}
				this.tableHeadLeft = data.detail.scrollLeft
				// console.log('表体', data)
			},
			
			tdThWidth(maxWidth) {
				if (!maxWidth) {
					return
				} else {
					return maxWidth
				}
			},
			
			triggerEvent(eventName, data) {
				this.$emit(eventName, data)
			}
		}
	}
</script>

<style lang="scss" scoped>
.table-customize {
	width: 100%;
	background-color: #fff;
	.table-head-scroll {
		width: 100%;
		position: relative;
		.table-head {
			display: flex;
			align-items: center;
			width: max-content;
			.table-head-th {
				box-sizing: border-box;
				min-width: 15vw;
				min-height: 10vw;
				padding: 1.2vw 2.3vw;
				display: flex;
				justify-content: center;
				align-items: center;
				color: rgba(0, 82, 169, 1);
				font-size: 3.8vw;
				font-family: "PingFangH";
				flex-shrink: 0;
				border-right: 1px solid rgba(4, 100, 202, 0.2);
				background-color: #e5effa;
				white-space: nowrap; /* 不换行 */
				overflow: hidden; /* 隐藏超出的内容 */
				text-overflow: ellipsis; /* 用省略号表示被隐藏的部分 */

				&:last-child {
					border-right: none;
				}
				&.float {
					position: sticky;
					right: 0;
					top: 0;
				}
			}
		}
	}
	.table-main-scroll {
		width: 100%;
		// height: 100vw;
		position: relative;
		.table-main {
			width: max-content;
			display: flex;
			align-items: center;
			.table-main-tr {
				flex-shrink: 0;
				.table-main-td {
					box-sizing: border-box;
					min-width: 15vw;
					min-height: 10vw;
					box-sizing: border-box;
					padding: 1vw 2.3vw;
					color: #555;
					font-size: 2.8vw;
					font-family: "PingFangM";
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					&:nth-child(odd) {
						background-color: #f2f7fc;
					}
					&:nth-child(even) {
						background-color: #ffffff;
					}
					.operate-but {
						font-size: 2.6vw;
						line-height: 6.2vw;
						color: #0464CA;
						box-sizing: border-box;
						padding: 0vw 2.5vw;
					}
				}
			}
		}
	}
}
</style>