// utils/cloud.js
export function callFunction(name, data = {}) {
	uni.showLoading({
		title: '请求中'
	});
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: name,
			data: data,
			success: res => {
				console.log(res)
				uni.hideLoading();
				if (res.result.code == 200) {
					uni.showToast({
						title: res.result.msg,
						icon: 'success',
						duration: 1500
					})
				}
				if (res.result.code == 1000) {
					uni.showToast({
						title: res.result.msg,
						icon: 'none',
						duration: 1500
					})
				}
				resolve(res.result);
			},
			fail: err => {
				uni.hideLoading();
				reject(err);
			}
		});
	});
}