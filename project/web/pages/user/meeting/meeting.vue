<template>
	<div style="padding: 2%;">
		<h2 style="text-align: center;margin-bottom: 20px;">视频会议</h2>
		<ConferenceMainView></ConferenceMainView>

		<div style="width: 100%;margin-top: 5vh;display: flex;align-items: center;justify-content: space-around;">
			<el-button type="primary" @click="startConference"
				style="width: 250px;height: 100px;font-size: 40px;">发起会议</el-button>
			<el-button type="success" @click="joinConference"
				style="width: 250px;height: 100px;font-size: 40px;">进入会议</el-button>
		</div>


		<el-dialog title="会议号" v-model="dialogFormVisible">
			<el-form :model="formvisi">
				<el-form-item>
					<el-input v-model="formvisi.content" placeholder="请填写名称" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitsubfun">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import LibGenerateTestUserSig from '@/utils/lib-generate-test-usersig-es.min';
	import {
		ConferenceMainView,
		conference
	} from '@tencentcloud/roomkit-web-vue3';
	export default {
		created() {
			this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user'))
			this.userid = this.userinfo.id + ''
		},
		onShow() {
			// let result = this.genTestUserSig('1')
			// conference.login({
			// 	// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
			// 	sdkAppId: 1600079944,
			// 	// 用户在您业务中的唯一标示 Id
			// 	userId: '1',
			// 	// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
			// 	userSig: result.userSig,
			// });
		},
		components: {
			ConferenceMainView,
		},
		data() {
			return {
				userid:'',
				formvisi:{
					content:''
				},
				userinfo: '',
				dialogFormVisible:false
			}
		},
		methods: {

			generateSixDigitRandomWithoutZero() {
				let result = '';
				for (let i = 0; i < 6; i++) {
					// 生成 1 到 9 之间的随机整数
					const digit = Math.floor(Math.random() * 9) + 1;
					result += digit;
				}
				return result;
			},

			async startConference() {
				
				let that = this
				let result = this.genTestUserSig(that.userid)
				let meetingid = this.generateSixDigitRandomWithoutZero()
				await conference.login({
					// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
					sdkAppId: 1600079944,
					// 用户在您业务中的唯一标示 Id
					userId: that.userid,
					// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
					userSig: result.userSig,
				});
				await conference.start(meetingid, {
					roomName: 'TestRoom',
					isSeatEnabled: false,
					isOpenCamera: false,
					isOpenMicrophone: false,
				});


				this.$confirm(`当前会议号为：${meetingid}`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

				}).catch(() => {

				});


			},

			async joinConference() {
				this.dialogFormVisible = true
			},

			async submitsubfun() {
				let that = this
				if (!this.formvisi.content) {
					this.$message.error('请输入会议号')
					return false
				}
				this.dialogFormVisible = false

				let result = this.genTestUserSig(that.userid)
				await conference.login({
					// 获取 sdkAppId 可参考文档开通服务部分，https://cloud.tencent.com/document/product/647/104842
					sdkAppId: 1600079944,
					// 用户在您业务中的唯一标示 Id
					userId: that.userid,
					// 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
					userSig: result.userSig,
				});
				await conference.join(this.formvisi.content, {
					isOpenCamera: false,
					isOpenMicrophone: false,
				});
			},




			genTestUserSig(userId) {

				const SDKAPPID = 1600079944;
				const EXPIRETIME = 604800;
				const SDKSECRETKEY = '993059967e81888234043350cf1ab9a1c363cf2612783efc7f1fb0fe49c728e8';
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