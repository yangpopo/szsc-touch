import store from '../store/index.js'
import { skipPage } from '../tool/tool.js'

const requestHeader = 'http://192.168.0.122:8093/'; // 本地地址
// const requestHeader = 'http://tt.zhnyst.com/'; // 线上测试地址


// 拦截器
uni.addInterceptor('request', {
	invoke(args) {
		let header = {
			'Content-Type': 'application/json',
		}
		if (uni.getStorageSync('token')) {
			header['Authorization'] = uni.getStorageSync('token') // 添加token
		}
		// request 触发前拼接 url
		args.url = args.url.indexOf('http') == 0 ? args.url : requestHeader + args.url
		args['method'] = args['method'] ? args['method'] : 'post'
		args['header'] = header;
		args['timeout'] = 10000;
		args['isComplete'] = false;
		args['sslVerify'] = false;
		if (args.isShowLoading !== false) {
			// 默认显示加载状态
			args['timer'] = setTimeout(() => {
				if (args['isComplete'] == false) {
					uni.showLoading({
						title: '请求中...',
						mask: true
					})
				}
			}, 1000)
		}
	},
	success(res, args) {
		args['isComplete'] = true
		clearTimeout(args['timer'])
		uni.hideLoading()
		// 请求成功后，修改code值为1
		// console.log('请求成功后', 	res)
		if (res.data.code === 5001 && res.statusCode === 200) {
			// 提示重新登录
			uni.showToast({
				title: res.data.msg,
				icon: 'none'
			})
			uni.setStorageSync('token', ''); // 清除token
			setTimeout(() => {
				uni.reLaunch({
					url: '/?routePath=login'
				})
				store.commit('updatePageName', 'login')
			}, 1000)
		}
		if (res.statusCode === 500) {
			uni.showToast({
				title: '请求错误!',
				icon: 'none'
			})
		}
		if (res.data.status === 500) {
			uni.showToast({
				title: res.data.error,
				icon: 'none'
			})
		}
		if (res.data.code === 500) {
			uni.showToast({
				title: res.data.msg,
				icon: 'none'
			})
		}
	},
	fail(err, args) {
		args['isComplete'] = true
		clearTimeout(args['timer'])
		uni.hideLoading()
		if (args.isShowErrInof !== false) {
			uni.showToast({
				icon: 'none',
				// title: JSON.stringify(err.errMsg)
				title: '网络请求失败!'
			})
		}
		console.log('请求错误', err)
	},
	complete(res, args) {
		args['isComplete'] = true
		clearTimeout(args['timer'])
		uni.hideLoading()
	},
})