<template>
	<view>
		<unicloud-db ref="udb" @load="handleLoad" v-slot:default="{ data, loading, pagination, error, options }"
			collection="uni-id-users" field="_id,nickname,avatar_file" :where="udbWhere">
			<view v-if="error" class="error">
				<text>{{ error.message }}</text>
			</view>
			<uni-list v-else :border="false">
				<uni-im-info-card v-for="(item, index) in data" :key="item._id" link
					:title="item.nickname"
					:avatar="item.avatar_file?.url || '/uni_modules/uni-im/static/avatarUrl.png'"
					@click="toChat(item._id)"></uni-im-info-card>
			</uni-list>
			<uni-im-load-state :status="loading ? 'loading' : loadMoreStatus"></uni-im-load-state>
		</unicloud-db>
	</view>
</template>
<script>
import uniIm from '@/uni_modules/uni-im/sdk/index.js';
	export default {
		onLoad() {
		},
		computed: {
			//是否为pc宽屏（width>960px）
			isWidescreen(){
				return uniIm.isWidescreen
			},
		},
		data() {
			return {
				loadMoreStatus: 'more',
				udbWhere: '', //'_id != $cloudEnv_uid',
			};
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
					clear: true
				},
				() => {
					uni.stopPullDownRefresh();
				}
			);
		},
		onReachBottom() {
			this.$refs.udb.loadMore();
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			if (e.index) {
				let data = uni.getStorageInfoSync();
				console.log('data.keys', JSON.stringify(data.keys));
				data.keys.forEach(item => {
					if (item.includes('uni-im-msg:') || item.includes('uni-im-conversation')) {
						// console.log(item);
						uni.removeStorageSync(item);
						console.log(uni.getStorageSync(item));
					}
				});
				uni.showToast({
					title: 'clear storage ok',
					icon: 'none'
				});
			} else {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd',
					complete: e => {
						console.log(e);
					}
				});
			}
		},
		methods: {
			handleLoad(data, ended) {
				this.loadMoreStatus = ended ? 'noMore' :
				'more'; // oading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
			},
			async toChat(user_id) {
				// 当前用户给对方发个消息
				if (this.isWidescreen) {
					//若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新详情
          location.href = '/#/uni_modules/uni-im/pages/index/index?user_id=' + user_id
				} else {
					// 若为窄屏，则打开新窗体，在新窗体打开详情页面
					uni.navigateTo({
						url: '/uni_modules/uni-im/pages/chat/chat?user_id=' + user_id
					});
				}
			},
			toAdd() {
				uni.navigateTo({
					url: '../uni-id-users/add',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							});
						}
					}
				});
			}
		}
	};
</script>
<style lang="scss">
  @import "@/uni_modules/uni-im/common/baseStyle.scss";
</style>