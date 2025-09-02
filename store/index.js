
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
	state:{
		'Authorization': '',
		'pageName': '', 
		'routeInfo': {
			url: '',
			options: {}
		},
		'routeHistory': [],
		'id': null, 
		'currentVersion': uni.getStorageSync('currentVersion') || '默认版本', 
		'openScreensaverState': uni.getStorageSync('openScreensaverState') === '' ? true : uni.getStorageSync('openScreensaverState'), 
		'navigationPageButCoordinateY': uni.getSystemInfoSync().screenHeight * 0.5, 
		'popupQuantity': 0, 
		'technicalSupport': uni.getStorageSync('technicalSupport') || '', 
		'serviceHotline': uni.getStorageSync('serviceHotline') || '', 
		'richTextData': null, 
		'isShowNav': false, 
		'scanKeyData': '', 
	},
	mutations: {
		
		updateScanKeyData(state, val) {
			state.scanKeyData = val
		},
		
		updateIsShowNav(state, val) {
			state.isShowNav = val
		},
		
		updateTechnicalSupport(state, val) {
			state.technicalSupport = val
		},
		
		updateServiceHotline(state, val) {
			state.serviceHotline = val
		},
		
		updatePopupQuantity(state, val) {
			state.popupQuantity = state.popupQuantity + val
		},
		
		updateOpenScreensaver(state, val) {
			state.openScreensaverState = val
		},
		
		updateNavigationPageButCoordinateY(state, val) {
			state.navigationPageButCoordinateY = val
		},
		
		updateId(state, val) {
			state.id = val
		},
		
		updateAuthorization(state, val) {
			state.Authorization = val
		},
		
		updataPageName(state, val) {
			state.pageName = val
		},
		
		updataRouteHistory(state, val) {
			if (val?.type == 'add') {
				state.routeHistory.push(val.routePath)
			} else {
				state.routeHistory.pop()
			}
		},
		
		updataRouteInfo(state, val) {
			state.routeInfo = val
		},
		
		updataRichTextData(state, val) {
			state.richTextData = val
		}
	}
})
export default store

