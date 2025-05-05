<template>
	<div class="user-main" v-loading="pendingflag">
		<el-row :gutter="20">
			<el-col :span="24" class="user-demoright">
				<div class="demo-user-search">
					<el-row :gutter="20">
						<el-col :span="7">
							<div class="demo-input-suffix">
								考勤日期：
								<el-date-picker value-format="YYYY-MM-DD" v-model="search.field1" type="date" placeholder="Pick a day"  class="search-user" />
							</div>
						</el-col>
						<el-col :span="2">
							<div class="search-butgroup">
								<el-button size="mini" type="primary" round @click="searchfun">搜索
								</el-button>
								<!-- <el-button size="mini" icon="el-icon-refresh-right" round @click="resetfun">重置
                                </el-button> -->
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="demo-user-contentfu">
				<!-- 	<div class="demo-user-content">
						<el-row class="demo-user-contentbutleft">
							<el-col :span="10">
								<div class="demo-user-contentbutleftsub">
									<el-button size="mini" type="primary" @click="getLocation">打卡
									</el-button>
								</div>
							</el-col>
							<el-col :span="6">&nbsp;</el-col>
							<el-col :span="8">

							</el-col>
						</el-row>
					</div> -->
					<div class="demo-user-page">
						<el-table border :header-cell-style="{ 'text-align': 'center', 'background-color': '#f1f1f1' }"
							:cell-style="{ 'text-align': 'center' }" ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
							class="demo-user-tablemore" height="550">
							<el-table-column show-overflow-tooltip v-for="(val, i) in griddata" :key="i"
								:prop="val.prop" :label="val.label" :width="val.width">
							</el-table-column>
							<!-- <el-table-column prop="img" label="图片" width="160">
								<template v-slot="scope">
									<div class="receiveclasspic">
										<img v-for="(val, i) in scope.row.trans_Arrpic" :key="i" :src="val" alt=""
											width="45" height="45" @click="showimg(val)">
									</div>
								</template>
							</el-table-column> -->
							<!-- <el-table-column label="操作" width="160">
								<template #default="scope">

									<el-button v-if="scope.row.status == '待处理'" type="success" plain size="mini"
										@click="updatafun(scope.$index, scope.row,'已接单')">接单
									</el-button>
									<el-button v-if="scope.row.status == '已接单' &&  scope.row.userid2 == userinfo.id"
										type="warning" plain size="mini"
										@click="updatafun(scope.$index, scope.row,'已完成')">完成
									</el-button>
									<el-button v-if="scope.row.userid == userinfo.id" type="danger" plain size="mini"
										@click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column> -->
						</el-table>
						<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination> -->
					</div>
				</div>

			</el-col>
		</el-row>

		<!-- 列表查看图片 -->
		<el-dialog title="查看图片" v-model="dialogTableVisible">
			<img class="diagimg" :src="imgshow">
		</el-dialog>
	</div>
</template>
<script>
	import {
		reverseGeocoder,
		getLocation
	} from '@/utils/getaddress.js'
	import {
		querylistdata,
		insertlistdata,
		updatelistdata,
		updatebasemsgstatus,
		listdataremove,
		userQueryList
	} from '@/api/sysapi'
	import {
		deepCopy
	} from '@/utils/trans'


	export default {
		name: 'extenddevice',
		components: {

		},
		created() {
			this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user'))
			this.init()
			this.inituser()
		},
		mounted() {
			// this.excelinit()
		},
		data() {
			return {
				userarr: [],
				statusArr: ['待处理', '已接单', '已完成'],
				baseimgurl: 'http://localhost:8000/',
				inpuflag: true,
				dialogTableVisible: false,
				imgshow: '',
				dialogFormVisible: false,
				id: '',
				placeholdercontent: '',
				formvisi: {
					content: ''
				},
				userinfo: {},
				drawer: false,
				pendingflag: false,
				updatetype: '', //记录修改按钮从哪个位置点入
				single: true,
				multiple: true,
				roleinfotitle: '',
				dialogroleVisible: false,
				search: {
					field1: '',
					status: '待处理',
					// createdate: ''
				},
				griddata: [{
						prop: 'datetime1',
						label: '打卡时间',
						width: ''
					}, {
						prop: 'userName1',
						label: '打卡人',
						width: ''
					}, {
						prop: 'field2',
						label: '打卡位置',
						width: ''
					}
				],
				tableData: [],
				fileListwl: [],
				multipleSelection: [],
				currentPage: 1,
				form: {
					datetime1: '',
					datetime2: '',
					datetime3: '',
					userid: '',
					field1: '',
					field2: '',
					field3: '',
					field4: '',
					field5: '',
					field6: '',
					field7: '',
					typestr: '考勤',
					typesubstr: '',
					userid2: '',
					trans_pic1: '',
					trans_pic2: '',
					status: '',
					userid3: ''
				},
				// 表单校验
				rules: {},
				current: 1,
				size: 10,
				total: 0,
			}
		},
		methods: {
			getLocation() {
				let that = this
				this.pendingflag = true
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
								that.pendingflag = false
								console.log(res.data);
								
								
								let obj = that.userinfo
								let objadd = {
									trans_pic: '',
									userid: that.userinfo.id,
									datetime1: that.getnowdate() + " " + that.getnowtime(),
									datetime2: "",
									datetime3: '',
									field1: that.getnowdate(),
									field2: res.data.result.address,
									field3: "",
									field4: "",
									field5: '',
									field6: '',
									field7: '',
									typestr: '考勤',
									typesubstr: '',
									userid2: '',
									trans_pic1: '',
									trans_pic2: '',
									status: '待处理',
									userid3: ''
								}
								//获取当前选中的菜单，将id存入数组
								insertlistdata(objadd).then(res => {
									that.reset()
									that.query()
									that.$message.success('操作成功')
									that.pendingflag = false
								}).catch(error => {
									// this.$message.error('操作失败')
									that.pendingflag = false
									that.pendingflag = false
								})
								
								
								
								
								
							}
						});
			
					},
					fail: function(err) {
						that.pendingflag = false
						console.error('获取地理位置失败：', err);
					}
				});
			},
			init() {
				this.query()

			},
			inituser() {
				let obj = {
					status: 0
				}
				userQueryList(obj).then(res => {
					let arr = res
					this.userarr = arr.filter((val, i) => {
						return val.role == "用户"
					})
				}).catch(error => {
					// this.$message.error('查询失败')
					this.pendingflag = false
				})
			},
			searchfun() {
				this.query()
			},
			//列表查看图片
			showimg(val) {
				this.dialogTableVisible = true
				this.imgshow = val
			},
			resetfun() {
				this.search.keyword = ''
				// this.search.status = ''
				// this.search.createdate = ''
			},
			handleChange(val) {
				console.log(val)
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.single = val.length != 1
				this.multiple = !val.length
			},
			handleSizeChange(val) {
				this.size = val
				this.query()
			},
			handleCurrentChange(val) {
				this.current = val
				this.query()
			},
			headerstyle() {
				return "background-color: #f1f1f1"
			},
			query() {
				// if (this.search.createdate == null || this.search.createdate == undefined || this.search.createdate == '') {
				//     this.search.createdate = []
				// }
				// let startTime = ""
				// let endTime = ""
				// if (this.search.createdate.length > 0) {
				//     startTime = trans_data_fun(this.search.createdate[0])
				//     endTime = trans_data_fun(this.search.createdate[1])
				// }
				let obj = {
					typestr: '考勤',
					field1: this.search.field1 || '',
					status: this.search.status,
					current: this.current,
					size: this.size
				}
				// this.pendingflag = true
				querylistdata(obj).then(res => {
					this.tableData = res.map((val, i) => {
						// val.status = val.status == 0 ? true : false
						if (val.trans_pic) {
							let trans_Arrpic = val.trans_pic.split('^^^')
							val.trans_Arrpic = trans_Arrpic.map(item => this.baseimgurl + item);
						}
						return val
					})
					console.log(this.tableData)
					this.pendingflag = false
				}).catch(error => {
					// this.$message.error('操作失败')
					this.pendingflag = false
				})
			},
			getnowdate() {
				var nowDate = new Date();
				var year = nowDate.getFullYear();
				var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
				var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
				var dateStr = year + "-" + month + "-" + day;
				return dateStr;
			},
			getnowtime() {
				let date = new Date()
				let hours = date.getHours()
				let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
				let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
				let time = hours + ':' + minutes + ':' + seconds
				return time

			},
			//将json数组转化为url地址ping拼接的字符串
			transpicurl(arr) {
				let arrsub = []
				arr.forEach(element => {
					arrsub.push(element.url)
				})
				return arrsub.join('^^^')
			},
			updatedata() {
				this.dialogroleVisible = true;
				this.roleinfotitle = '修改'
				this.updatetype = 'top'
				this.form = this.multipleSelection[0]
				//this.checkedkeyArr = this.multipleSelection[0].menuIds

			},
			handleRemovewl(file, fileList) {
				this.fileListwl = fileList
			},
			handlePictureCardPreviewwl(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleSuccesswl(response, file, fileList) {
				console.log(response, file, fileList)
				let url = response
				let name = file.name
				let obj = {
					url,
					name
				}
				this.fileListwl.push(obj)
			},
			handleEdit(index, row) {
				this.updatetype = 'line'
				this.roleinfotitle = '修改'
				this.dialogroleVisible = true
				let rownew = deepCopy(row)
				this.form = rownew
				this.form.status = rownew.status ? 0 : 1
				console.log(this.form)
				//快递图片
				let trans_pic = rownew.trans_pic
				try {
					if (trans_pic.indexOf('^^^') > -1 || trans_pic) {
						let arr = trans_pic.split('^^^')
						let arrfu = []
						arr.forEach((val, i) => {
							let obj = {
								url: this.baseimgurl + val,
								name: ''
							}
							arrfu.push(obj)
						})
						this.fileListwl = arrfu
					} else {
						this.fileListwl = []
					}
				} catch (error) {
					this.fileListwl = []
				}
				//this.checkedkeyArr = row.menuIds  //赋值已有的菜单

			},
			changestatus(index, row) {
				let objedit = {
					id: row.id,
					status: row.status ? 0 : 1
				}
				updatebasemsgstatus(objedit).then(res => {
					this.query()
					this.$message.success('操作成功')
				}).catch(error => {
					// this.$message.error('操作失败')

				})

			},


			handleDelete(index, row) {
				let that = this
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.pendingflag = true
					let obj = {
						id: row.id
					}
					that.pendingflag = true
					listdataremove(obj).then(res => {
						that.query()
						that.$message.success('操作成功')

					}).catch(error => {
						that.$message.error('操作失败')
						that.pendingflag = false

					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			addtop() {
				this.dialogroleVisible = true;
				this.roleinfotitle = '新增'
				this.reset()
			},
			reset() {
				this.form.datetime1 = ""
				this.form.datetime2 = ""
				this.form.datetime3 = ""
				this.form.userid = ""
				this.form.field1 = ""
				this.form.field2 = ""
				this.form.field3 = ""
				this.form.field4 = ""
				this.form.field5 = ""
				this.form.field6 = ""
				this.form.field7 = ""
				this.form.typestr = "考勤"
				this.form.typesubstr = ""
				this.form.userid2 = ""
				this.form.trans_pic1 = ""
				this.form.trans_pic2 = ""
				this.form.status = ""
				this.form.userid3 = ""
				this.fileListwl = []
			},
		},
		watch: {},
		filters: {
			updatestatus(val) {
				switch (val) {
					case 0:
						return "离线";
						break;
					case 1:
						return "在线";
						break;
				}
			},
		},
	}
</script>

<style scoped>
	.diagimg {
		width: 100%;
		height: auto;
	}

	.user-main {
		padding: 2%;
	}

	.search-user {
		width: 70%;
	}

	.search-butgroup {
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.demo-user-tablemore {
		margin-top: 15px;
	}

	.user-demoleft,
	.user-demoright {
		height: 75vh;
	}

	.user-demoleft {
		border-right: 1px solid #f1f1f1;
	}

	.demo-user-search {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 15px;
		border-radius: 5px;
	}

	.demo-user-contentfu {
		margin-top: 15px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 15px;
		border-radius: 5px;
	}

	.demo-user-tree {
		font-size: 0.8em;
		font-weight: bold;
	}

	.dialogcolnmbut {
		margin: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dataitem-content {
		height: 300px;
		overflow: auto;
	}

	.dataitem-content::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	.dataitem-content::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}

	.dataitem-content::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}

	.itemclass {
		height: 150px;
		overflow: auto;
	}

	.itemclass::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	.itemclass::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}

	.itemclass::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
</style>


<style>
	.search-user .el-input__inner {
		height: 30px;
		line-height: 30px;
	}

	.search-user-date .el-date-editor {
		height: 30px;
		line-height: 30px;
		padding: 0px 10px;
	}

	.search-user .el-input__icon {
		line-height: 30px;
	}

	.search-user-date .el-range-separator {
		line-height: 25px;
	}

	.demo-user-contentbutleftsub {
		display: flex;
		justify-content: left;
		align-items: center;
		margin-top: 15px;
	}

	.demo-user-contentbutrightsub {
		display: flex;
		justify-content: right;
		align-items: center;
		margin-top: 15px;
	}

	.demo-user-tablemore th>.cell {
		padding-left: 14px;
		padding-right: 14px;

	}

	.user-demoleft .el-input__inner {
		height: 30px;
		line-height: 30px;
	}

	.user-demoleft .el-input__icon {
		line-height: 30px;
	}

	.demo-user-transfer .el-transfer-panel__item .el-checkbox__input {
		position: absolute;
		top: 8px;
		left: 15px;
	}

	.demo-user-transfer .el-transfer-panel__item.el-checkbox .el-checkbox__label {
		text-align: left;
	}

	.demo-user-transfer .el-transfer-panel .el-transfer-panel__header .el-checkbox {
		text-align: left;
	}

	.roledia .el-dialog__body {
		padding: 0px 20px;
		color: #606266;
		font-size: 14px;
		word-break: break-all;
	}

	.diaitemrole .el-dialog {
		margin-top: 5vh !important;
	}
</style>