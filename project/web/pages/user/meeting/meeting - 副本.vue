<template>
	<div style="padding: 2%;">
		<h2 style="text-align: center;margin-bottom: 20px;">视频会议</h2>
		<ConferenceMainView></ConferenceMainView>
		
		<div style="width: 100%;margin-top: 5vh;display: flex;align-items: center;justify-content: space-around;">
			<el-button type="primary" @click="startConference" style="width: 250px;height: 100px;font-size: 40px;">发起会议</el-button>
			   <el-button type="success" @click="joinConference" style="width: 250px;height: 100px;font-size: 40px;">进入会议</el-button>
		</div>
		 
	</div>
</template>

<script>
	import LibGenerateTestUserSig from '@/utils/lib-generate-test-usersig-es.min';
	import {
		ConferenceMainView,
		conference
	} from '@tencentcloud/roomkit-web-vue3';
	export default {
		onShow() {
			let result = this.genTestUserSig('1')
			console.log('1111111-11111111111', result)
			conference.login({
				// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
				sdkAppId: 1600074117,
				// 用户在您业务中的唯一标示 Id
				userId: '1',
				// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
				userSig: result.userSig,
			});
		},
		components: {
			ConferenceMainView,
		},
		data() {
			return {

			}
		},
		methods: {
			
			async startConference(){
				let result = this.genTestUserSig('1')
			    await conference.login({
					// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
					sdkAppId: 1600074117,
					// 用户在您业务中的唯一标示 Id
					userId: '1',
					// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
					userSig: result.userSig,
				});
			    await conference.start('123456', {
			      roomName: 'TestRoom',
			      isSeatEnabled: false,
			      isOpenCamera: false,
			      isOpenMicrophone: false,
			    });
			},

			async joinConference() {
				let result = this.genTestUserSig('1')
				await conference.login({
					// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
					sdkAppId: 1600074117,
					// 用户在您业务中的唯一标示 Id
					userId: '1',
					// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
					userSig: result.userSig,
				});
				await conference.join('111222', {
					isOpenCamera: false,
					isOpenMicrophone: false,
				});
			},




			genTestUserSig(userId) {

				const SDKAPPID = 1600074117;
				const EXPIRETIME = 604800;
				const SDKSECRETKEY = 'd0c7db5ca9d9acd8dd954fecae6eb0079ed87de5e954f4be49629e82ea8e625e';
				// a soft reminder to guide developer to configure sdkAppId/SDKSecretKey
				if (SDKAPPID === '' || SDKSECRETKEY === '') {
					alert(
						'Please configure your SDKAPPID/SDKSECRETKEY in js/debug/GenerateTestUserSig.js'
					);
				}
				const generator = new LibGenerateTestUserSig(SDKAPPID, SDKSECRETKEY, EXPIRETIME);
				const userSig = generator.genTestUserSig(userId);
				return {
					sdkAppId: SDKAPPID,
					userSig: userSig
				};
			}

		}
	}
</script>

<style>

</style>