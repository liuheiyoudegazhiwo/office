<template>
	<view>
		<button @click="getLocation">获取地理位置</button>
		<view class="">
			{{textA}}
		</view>
	</view>
</template>

<script>
	import {
		reverseGeocoder,
		getLocation
	} from '@/utils/getaddress.js'
	export default {
		data() {
			return {
				textA: ''
			}
		},
		methods: {
			getLocation() {
				let that = this
				uni.getLocation({
					type: 'wgs84',
					success: function(resp) {
						console.log(resp)
						console.log('当前位置的经度：' + resp.longitude);
						console.log('当前位置的纬度：' + resp.latitude);
						let latitude = resp.latitude;
						let longitude = resp.longitude;
						// that.textA = longitude + "," + latitude
						uni.request({
							url: '/proxy', // Spring Boot 代理服务器地址
							method: 'POST', // 指定请求方式为 POST
							data: {
								latitude : resp.latitude,
								longitude : resp.longitude
							},
							header: {
								'custom-header': 'hello' // 自定义请求头信息
							},
							success: (res) => {
								console.log(res.data);
								that.textA = res.data.result.address;
							}
						});



						// that.getLocationInfo({
						// 	longitude,
						// 	latitude
						// })
					},
					fail: function(err) {
						console.error('获取地理位置失败：', err);
					}
				});
			},
			// 获取位置信息--通过经纬度获取
			getLocationInfo(location) {
				reverseGeocoder(location)
					.then(res => {
						console.log('当前位置信息：', res)
						// const address = res.result.pois[0].title
						this.textA = res.result.address
					})
					.catch(err => {

					})
			},
		}
	}
</script>