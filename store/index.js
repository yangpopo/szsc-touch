// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		'Authorization': '',
		'pageName': '', // 页面名字
		// 路由信息
		'routeInfo': {
			url: '',
			options: {}
		},
		'routeHistory': [], // 路由历史
		'id': null, // id
		'currentVersion': uni.getStorageSync('currentVersion') || '默认版本', // 当前版本
		'openScreensaverState': uni.getStorageSync('openScreensaverState') === '' ? true : uni.getStorageSync('openScreensaverState'), // 打开屏保--初始化时候默认打开屏保
		'navigationPageButCoordinateY': uni.getSystemInfoSync().screenHeight * 0.6, // 导航按钮坐标y 初始化高度
		'popupQuantity': 0, // 弹窗数据
		'technicalSupport': uni.getStorageSync('technicalSupport') || '', // 技术支持
		'serviceHotline': uni.getStorageSync('serviceHotline') || '', // 服务热线
		'richTextData': null, // 富文本
		'isShowNav': false, // 是否显示导航
		'scanKeyData': '', // 扫描key数据
	},
	mutations: {
		// 更新扫描key数据
		updateScanKeyData(state, val) {
			state.scanKeyData = val
		},
		// 更新显示导航状态
		updateIsShowNav(state, val) {
			state.isShowNav = val
		},
		// 更新技术支持
		updateTechnicalSupport(state, val) {
			state.technicalSupport = val
		},
		// 更新服务热线
		updateServiceHotline(state, val) {
			state.serviceHotline = val
		},
		// 更新弹窗数据
		updatePopupQuantity(state, val) {
			state.popupQuantity = state.popupQuantity + val
		},
		// 更新屏保状态
		updateOpenScreensaver(state, val) {
			state.openScreensaverState = val
		},
		// 更新导航按钮坐标y
		updateNavigationPageButCoordinateY(state, val) {
			state.navigationPageButCoordinateY = val
		},
		// 更新3级页面名字
		updateId(state, val) {
			state.id = val
		},
		// 更新Authorization
		updateAuthorization(state, val) {
			state.Authorization = val
		},
		// 更新页面名称
		updataPageName(state, val) {
			state.pageName = val
		},
		// 更新路由历史
		updataRouteHistory(state, val) {
			if (val?.type == 'add') {
				state.routeHistory.push(val.routePath)
			} else {
				state.routeHistory.pop()
			}
		},
		// 更新路由信息
		updataRouteInfo(state, val) {
			state.routeInfo = val
		},
		// 富文本数据
		updataRichTextData(state, val) {
			state.richTextData = val
		}
	}
})
export default store

