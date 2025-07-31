import { routes as routesData } from '@/route/index.js'
import store from '@/store/index.js'

const recursionRoutes = (routes, routeName) => {
	for (let i = 0; i < routes.length; i++) {
		if (routes[i].name == routeName) {
			return routes[i]
		}
	}
	return null
}
// 跳转页面
export const skipPage = (val, $this, readOnly = false) => {
	if (!val) {
		return
	}
	let [routes, query] = val.split('?')
	let routeNameArr = routes.split('/')
	let routeIndex = 0
	let url = `/?routePath=${routes}${decodeURIComponent(query) == 'undefined' ? '' : `&query=${decodeURIComponent(query)}`}`
	let routeInfo = routesData
	while (routeIndex < routeNameArr.length)
	{
		routeInfo = recursionRoutes(routeInfo, routeNameArr[routeIndex])
		if (routeInfo) {
			if (routeInfo.childrens) {
				if (routeIndex > (routeNameArr.length - 1)) {
					routeInfo = routeInfo.childrens
				}
				routeIndex++
			} else {
				$this.$emit('switchComponents', routeInfo.component)
				break
			}
		} else {
			uni.showToast({
				title: '路由地址错误,请核实后再试!',
				mask: true,
				icon: 'none'
			})
			return
		}
	}
	
	if (readOnly) {
		if (routeInfo) {
			return routeInfo.component
		} else {
			uni.showToast({
				title: '路由地址错误,请核实后再试!',
				mask: true,
				icon: 'none'
			})
		}
	} else {
		urlStrConvertOptions(url)
		store.commit('updataRouteHistory', {
			type: 'add',
			routePath: routes
		})
		store.commit('updataPageName', routeInfo.component)
		uni.navigateTo({
			url: url,
		})
	}
}

const urlStrConvertOptions = (str) => {
	if (!str) {
		return
	}
	let strFilter = str.replace('/?', '')
	let strArr = strFilter.split('&')
	for (let i = 0; i < strArr.length; i++) {
		strArr[i] = strArr[i].split('=')
	}
	let options = {}
	for (let i = 0; i < strArr.length; i++) {
		options[strArr[i][0]] = strArr[i][1]
	}
	store.commit('updataRouteInfo', {
		url:'/pages/entrance/entrance' + str,
		options: options
	})
}

// 格式化 时间-日期
export const formatDate = (date, format = 'YYYY-MM-DD') => {
	if (typeof date == 'number') {
		date = new Date(date)
	}
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

	return format
		.replace('YYYY', year)
		.replace('MM', month)
		.replace('DD', day)
		.replace('HH', hours)
		.replace('mm', minutes)
		.replace('ss', seconds);
}

// 延迟加载缓存
export const lazyLoadCache = (fun) => {
	uni.showLoading({
		title: '正在加载...',
		mask: true
	})
	setTimeout(() => {
		fun()
		setTimeout(() => {
			uni.hideLoading()
		}, 100)
	}, 500)
}

// 处理缩进空格不显示
export const handleHideCharacterDisplay = (data = '') => {
	if (data) {
		return data.replace(/<p>\s/g, `<p style="text-indent: 2em;">`)
		.replace(/<p>(&nbsp;)+/g, `<p style="text-indent: 2em;">`)
		.replace(/(&nbsp;){4}\s/g, `<span style="width: 2em; display: inline-block;"></span>`)
		.replace(/(&nbsp;){2}\s/g, `<span style="width: 1em; display: inline-block;"></span>`)
		.replace(/(&nbsp;){1}\s/g, `<span style="width: 0.5em; display: inline-block;"></span>`)
		.replace(/[\r\n]+/g, `<br/>`)
		.replace(/<p>\t\t/g, `<p style="text-indent: 2em;">`)
	} else {
		return ''
	}
}


/**
 * 防抖函数（Debounce）
 * @param {Function} fn - 需要防抖的目标函数
 * @param {number} delay - 延迟时间（毫秒），默认 300ms
 * @param {Object} options - 配置项
 * @param {boolean} [options.immediate=false] - 是否立即执行（首次触发时立即执行）
 * @returns {Function} 防抖后的函数
 */
export const debounce = (fn, delay = 300, immediate = false) => {
	let timer = null;

	const debounced = function(...args) {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};

	// 添加取消方法
	debounced.cancel = function() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};

	return debounced;
}


/**
 * 限流
 */
export const throttle = (fn, delay, {
	leading = true,
	trailing = true
} = {}) => {
	let lastTime = 0;
	let timer = null;

	return function(...args) {
		const now = Date.now();

		if (!lastTime && !leading) {
			lastTime = now;
		}

		const remaining = delay - (now - lastTime);

		if (remaining <= 0) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			fn.apply(this, args);
			lastTime = now;
		} else if (trailing && !timer) {
			timer = setTimeout(() => {
				fn.apply(this, args);
				lastTime = leading ? Date.now() : 0;
				timer = null;
			}, remaining);
		}
	};
}


/**
 * 根据文件地址读取ArrayBuffer
 * @param {string} filePath 文件路径或URL
 * @returns {Promise<ArrayBuffer>}
 */
export const readFileToArrayBuffer =  async function(filePath) {
  // #ifdef H5
  // H5环境 - 通过fetch获取网络文件或处理本地选择的文件
  if (filePath.startsWith('http') || filePath.startsWith('blob') || filePath.startsWith('data:')) {
    const response = await fetch(filePath);
    return await response.arrayBuffer();
  } else {
    // 本地文件需要先通过input选择，不能直接访问路径
    throw new Error('H5环境不能直接访问本地文件路径，请使用文件选择器');
  }
  // #endif
  
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
  // 小程序环境
  if (filePath.startsWith('http')) {
    // 下载网络文件
    const { tempFilePath } = await uni.downloadFile({ url: filePath });
    filePath = tempFilePath;
  }
  
  const res = await uni.getFileSystemManager().readFile({
    filePath: filePath,
    encoding: 'binary'
  });
  return res.data;
  // #endif
  
  // #ifdef APP-PLUS
  // App环境
  if (filePath.startsWith('http')) {
    // 下载网络文件
    const { tempFilePath } = await uni.downloadFile({ url: filePath });
    filePath = tempFilePath;
  }
  
  return new Promise((resolve, reject) => {
    plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
      entry.file((file) => {
        const reader = new plus.io.FileReader();
        reader.onloadend = (evt) => resolve(evt.target.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      }, reject);
    }, reject);
  });
  // #endif
}



/**
 * 数组图片字符串转图片标签Str
 * @param {array} arrayImgStr 文件路径或URL
 * @returns 数组图片标签
 */
export const arrayImgStrChangeImgLabelStr = function(arrayImgStr) {
	let imgLabelStr = ''
	for (let i = 0; i < arrayImgStr.length; i++) {
		imgLabelStr += `<img src="${arrayImgStr[i]}" >`
	}
	return imgLabelStr
}

/**
 * 页面初始化二级菜单
*/
export const initPageRoute = ($this) => {
	let routePath = uni.getLaunchOptionsSync().query.routePath || ''
	let routePathArr = routePath.split('/')
	if (routePathArr.length > 1) {
		if (routePathArr[0] == $this.selfRootRoute) {
			$this.currentTabComponent = routePathArr[1]
		}
	}
}

/**
 * 页面切换菜单
*/
export const pageSelectedMenu = (val, $this, type = 'richTextDetails') => {
	if (type == 'richTextDetails') {
		if (val != 'richTextDetails') {
			$this.currentTabComponent = val
			let url = `/?routePath=${$this.selfRootRoute}/${val}`
			urlStrConvertOptions(url)
			uni.navigateTo({
				url: url,
			})
		} else {
			$this.richTextDetails = val
			let url = `/?routePath=${store.state.routeInfo.options.routePath}/${val}`
			urlStrConvertOptions(url)
			store.commit('updataRouteHistory', {
				type: 'add',
				routePath: url
			})
			uni.navigateTo({
				url: `${url}`,
			})
		}
	} else if (type == 'secureDetail') {
		$this.currentComponent = val
		let url = `/?routePath=${store.state.routeInfo.options.routePath}/${val}`
		urlStrConvertOptions(url)
		store.commit('updataRouteHistory', {
			type: 'add',
			routePath: url
		})
		uni.navigateTo({
			url: `${url}`,
		})
	}
	
}


