<template>
	<view class="notification-box">
		<text class="tips" v-if="tips">{{tips}}</text>
		<uni-list :border="false">
			<template v-if="notificationDatas && notificationDatas.length">
				<uni-im-info-card v-for="(item,index) in notificationDatas" :key="item.id" :avatarCircle="true"
					:clickable="true" :badge="item.is_read?'':'dot'" badgePositon="left"
					:title="item.payload.title || item.title" :note="item.payload.content||item.content||'无'"
					:avatar="item.payload?.avatar_file?.url || '/uni_modules/uni-im/static/noticeIcon/notification2.png'"
					@click.native="clickHandle(index,item)" direction="column" :time="friendlyTime(item.create_time)">
					<view class="handle-box">
						<template v-if="item.payload.state">
							<text class="handle done">
								{{'已'+(item.payload.state == 'confirm'?item.payload.confirmText:item.payload.cancelText)}}
							</text>
						</template>
						<template v-else>
							<text class="handle" @click.stop="doAction(index,0)"
								v-if="item.payload.cancelText">{{item.payload.cancelText}}</text>
							<text class="handle" @click.stop="doAction(index,1)"
								v-if="item.payload.confirmText">{{item.payload.confirmText}}</text>
							<uni-icons v-if="!item.payload.cancelText && !item.payload.confirmText && item.path" type="right"
								color="#cccccc"></uni-icons>
						</template>
					</view>
				</uni-im-info-card>
			</template>
			<uni-list-item v-else class="load-more">
				<template v-slot:body>
					<uni-im-load-state :contentText="contentText" class="tip" :status="hasMore?'loading':'noMore'"></uni-im-load-state>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniIm from '@/uni_modules/uni-im/sdk/index.js';
	import action from './action.js';
	const db = uniCloud.database();
	export default {
		data() {
			return {
				contentText: {
					"contentrefresh": "加载中...",
					"contentnomore": "- 暂无相关数据 -"
				},
				filterNotice: {},
				tips: "",
				hasMore: true
				// notificationDatas:[]
			}
		},
		async onLoad({
			param
		}) {
			// console.log(param,decodeURIComponent(param))
			param = JSON.parse(decodeURIComponent(param))
			// console.log(param)
			this.setParam(param)
		},
		computed: {
			//是否为pc宽屏（width>960px）
			isWidescreen() {
				return uniIm.isWidescreen
			},
			notificationDatas() {
				let notificationDatas = uniIm.notification.get(this.filterNotice)
				if (notificationDatas.length == 0) {
					setTimeout(() => {
						this.hasMore = false
					}, 100);
				}
				return notificationDatas
			}
		},
		mounted() {
			this.hasMore = uniIm.notification.hasMore
		},
		methods: {
			setParam({
				filterNotice,
				title
			}) {
				if (typeof filterNotice == 'string') {
					filterNotice = JSON.parse(decodeURIComponent(filterNotice))
				}
				this.filterNotice = filterNotice
				console.log('filterNotice', filterNotice)
				uni.setNavigationBarTitle({
					title
				})

				if (title == '新朋友' && !this.isWidescreen) {
					this.tips = '好友请求通知'
				}
			},
			async setItem({
				_id
			}, param) {
				const datas = uniIm.notification.get(this.filterNotice)
				for (let i = 0; i < datas.length; i++) {
					if (datas[i]._id == _id) {
						datas[i] = deepAssign(datas[i], param)
						uniIm.notificationDatas = datas
						console.log('uniIm.notificationDatas', uniIm.notificationDatas)
						break;
					}
				}

				let ares = await db.collection('uni-im-notification')
					.where(`"_id" == "${_id}" && "user_id" == $cloudEnv_uid`)
					.get()
				// console.log(13231,ares);
				let res = await db.collection('uni-im-notification')
					.where(`"_id" == "${_id}" && "user_id" == $cloudEnv_uid`)
					.update(param)
				// console.log('res---66666',param,res.result.updated);

				/**
				 *判断对象是否是一个纯粹的对象
				 */
				function isPlainObject(obj) {
					return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
				}
				/**
				 *深度合并多个对象的方法
				 */
				function deepAssign() {
					let len = arguments.length,
						target = arguments[0]
					if (!isPlainObject(target)) {
						target = {}
					}
					for (let i = 1; i < len; i++) {
						let source = arguments[i]
						if (isPlainObject(source)) {
							for (let s in source) {
								if (s === '__proto__' || target === source[s]) {
									continue
								}
								if (isPlainObject(source[s])) {
									target[s] = deepAssign(target[s], source[s])
								} else {
									target[s] = source[s]
								}
							}
						}
					}
					return target
				}
			},
			async clickHandle(index, item) {
				// console.log('index',index,item);
				//如果未读，设置为已读
				if (!item.is_read) {
					this.setItem(item, {
						is_read: true
					})
				}
				//存在链接就跳转
				let path = item.path || item.payload.path
				if (path) {
					uni.navigateTo({
						url: path,
						fail: (e) => {
							console.error(e);
						}
					})
				}
				// let item = this.notificationDatas[index]
				// item.data.is_read = true
				// this.notificationDatas[index] = Object.assign({},item)
				// console.log(this.notificationDatas);
			},
			doAction(index, type) {
				let item = this.notificationDatas[index]
				let e = {
					subType: item.payload.subType,
					confirm: type === 1,
					cancel: type === 0,
					item
				}
				action(e, data => {
					console.log('doAction', data)
					this.setItem(item, {
						is_read: true,
						payload: {
							state: type === 1 ? 'confirm' : 'cancel'
						}
					})
				})
				// console.log(index);
			},
			friendlyTime(timestamp) {
				return uniIm.utils.toFriendlyTime(timestamp)
			},
			handleText(state) {
				switch (state) {
					case 0:
						return '同意'
						break;
					case 100:
						return '已同意'
						break;
					case -100:
						return '已拒绝'
						break;
					default:
						return '其他'
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
  @import "@/uni_modules/uni-im/common/baseStyle.scss";
	.notification-box {
		height: 100vh;
		background-color: #f5f5f5;
    .tips {
    	height: 40px;
    	line-height: 40px;
    	padding-left: 20rpx;
    	font-size: 26rpx;
    	color: #666;
    }
    
    .handle-box {
    	flex-direction: row;
    	height: 40px;
    	align-items: center;
    }
    
    .handle {
    	width: 50px;
    	text-align: center;
    	height: 25px;
    	line-height: 25px;
    	background-color: #efefef;
    	border-radius: 50px;
    	font-size: 12px;
    	margin: 0 5px;
    	/* #ifdef H5 */
    	cursor: pointer;
    	/* #endif */
    }
    
    .done {
    	width: 50px;
    	background-color: #FFF;
    	color: #aaa;
    	/* #ifdef H5 */
    	cursor: default;
    	/* #endif */
    }
    
    .load-more {
    	background-color: #f5f5f5 !important;
    	justify-content: center;
    }
    
    .tip {
    	position: relative;
    	left: -15px;
    	width: 750rpx;
    	/* pc宽屏时需要使用100vw */
    	width: 100%;
    }
    
    /* #ifdef MP-WEIXIN */
    .load-more ::v-deep .uni-list-item {
    	background-color: #f5f5f5 !important;
    }
    
    /* #endif */
	}
</style>