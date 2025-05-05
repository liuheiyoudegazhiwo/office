<template>
	<div class="user-main" v-loading="pendingflag">
		<el-row :gutter="20">
			<el-col :span="24" class="user-demoright">
				<!-- <div class="demo-user-search">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="demo-input-suffix">
                                关键词：
                                <el-input placeholder="健康名称、导演、演员" v-model="search.keyword" class="search-user">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="search-butgroup">
                                <el-button size="mini" type="primary" icon="el-icon-search" round @click="searchfun">搜索
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div> -->
				<div class="demo-user-contentfu">
					<div class="demo-user-content">
						<el-row class="demo-user-contentbutleft">
							<el-col :span="6">&nbsp;</el-col>
							<el-col :span="8">
								<div class="demo-user-contentbutrightsub">
									<!-- <el-tooltip class="item" effect="dark" content="设置查看列" placement="bottom">
                                        <el-button size="mini" icon="el-icon-setting" circle
                                            @click="dialogcolnmVisible = true"></el-button>
                                    </el-tooltip> -->
								</div>
							</el-col>
						</el-row>
					</div>
					<div class="demo-user-page">
						<el-table border :header-cell-style="{ 'text-align': 'center', 'background-color': '#f1f1f1' }"
							:cell-style="{ 'text-align': 'center' }" ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
							class="demo-user-tablemore" height="550">
							<el-table-column show-overflow-tooltip v-for="(val, i) in griddata" :key="i"
								:prop="val.prop" :label="val.label" :width="val.width">
							</el-table-column>
							<el-table-column label="操作" width="150">
								<template #default="scope">
									<el-button type="success" plain size="mini"
										@click="handleEdit(scope.$index, scope.row)">查看
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div style="margin-top:10px;">
							<el-pagination background @size-change="handleSizeChange"
								@current-change="handleCurrentChange" :current-page="current"
								:page-sizes="[10, 20, 30, 50]" :page-size="size"
								layout="total, sizes, prev, pager, next, jumper" :total="total">
							</el-pagination>
						</div>
					</div>
				</div>

			</el-col>
		</el-row>


		<!-- 信息弹框  -->
		<el-dialog :title="roleinfotitle" v-model="dialogroleVisible" width="70%" append-to-body class="diaitemrole">
			<el-table border :header-cell-style="{ 'text-align': 'center', 'background-color': '#f1f1f1' }"
				:cell-style="{ 'text-align': 'center' }" ref="multipleTable" :data="tablesubData" tooltip-effect="dark"
				style="width: 100%" @selection-change="handleSelectionChange" class="demo-user-tablemore" height="550">
				<el-table-column prop="que" label="考核"></el-table-column>
				<el-table-column prop="ans" label="结果"></el-table-column>
			</el-table>
		</el-dialog>

	</div>
</template>
<script>
	import {
		getform
	} from '@/utils/question'
	import {
		querysysinformation,
		removesysinformation
	} from '@/api/sysapi'
	import {
		deepCopy
	} from '@/utils/trans'


	export default {
		name: 'extenddevice',
		components: {

		},
		created() {
			this.arr = getform()
			this.userinfo = ""
			this.init()
		},
		data() {
			return {
				tablesubData: [],
				arr: [],
				rateext: '',
				movidetail: '',
				centerDialogVisible: false,
				centerDialogVisibleext: false,
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
				textarea: '',
				pendingflag: false,
				updatetype: '', //记录修改按钮从哪个位置点入
				single: true,
				multiple: true,
				roleinfotitle: '',
				dialogcolnmVisible: false,
				dialogroleVisible: false,
				dataTree: [],
				search: {
					keyword: '',
					status: '正常',
					// createdate: ''
				},

				griddata: [{
						prop: 'datetime',
						label: '提交时间',
						width: ''
					},
					{
						prop: 'datestr',
						label: '月份',
						width: ''
					},
					{
						prop: 'userName',
						label: '人员',
						width: ''
					},
					{
						prop: 'result14',
						label: '绩效目标',
						width: '400'
					}
				],
				tableData: [],
				fileListwl: [],
				multipleSelection: [],
				currentPage: 1,
				form: {
					title: "",
					detail: "",
					titlesub: "",
					picurl: "",
					mvurl: '',
					kclxid: '',
					typeext: '图文'
				},
				// 表单校验
				rules: {},
				current: 1,
				size: 10,
				total: 0,
				dataitem: [],
			}
		},
		methods: {
			init() {
				this.query()

			},
			searchfun() {
				this.current = 1
				this.size = 10
				this.total = 0
				this.tableData = []
				this.query()
			},
			//列表查看图片
			showimg(val) {
				this.dialogTableVisible = true
				this.imgshow = 'https://images.weserv.nl/?url=' + val
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
			//自定义列提交
			colnmsubmit() {
				this.dialogcolnmVisible = false
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
					current: this.current,
					keyword: this.search.keyword,
					size: this.size,
					status: this.search.status == "正常" ? 0 : 1
				}
				this.pendingflag = true
				querysysinformation(obj).then(res => {
					// console.log(JSON.stringify(res.data))
					this.tableData = res.data
					this.total = res.count
					// this.tableData = res.map((val, i) => {
					//     val.status = val.status == 0 ? true : false
					//     if (val.trans_pic) {
					//         val.trans_Arrpic = val.trans_pic.split('^^^')
					//     }
					//     return val
					// })

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
			handleRemovewl(file, fileList) {
				this.fileListwl = fileList
			},
			handlePictureCardPreviewwl(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleSuccesswl(response, file, fileList) {
				console.log(response, file, fileList)
				let url = response.data
				let name = file.name
				let obj = {
					url,
					name
				}
				this.fileListwl.push(obj)
			},
			handleEdit(index, row) {
				// 设置更新类型为 'line'
				this.updatetype = 'line';
				// 设置角色信息标题为 '查看'
				this.roleinfotitle = '查看';
				// 显示对话框
				this.dialogroleVisible = true;

				// 初始化子表格数据数组
				let tablesubData = [];
				// 遍历 this.arr 数组，将问题和对应的答案组合成对象添加到 tablesubData 中
				for (let i = 0; i < this.arr.length; i++) {
					let j = i + 1;
					let objsub = {
						que: this.arr[i].title,
						ans: row['result' + j]
					};
					tablesubData.push(objsub);
				}
				// 创建综合评价对象
				let obj2 = {
					que: '该员工的综合评价',
					ans: row.result15
				};
				// 将综合评价对象添加到 tablesubData 数组中
				tablesubData.push(obj2);
				// 将更新后的 tablesubData 赋值给 this.tablesubData
				this.tablesubData = tablesubData;
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
						id: [row.id]
					}
					that.pendingflag = true
					removesysinformation(obj).then(res => {
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
				this.roleinfotitle = '新增课程'
				this.reset()
			},
			reset() {
				this.form.title = ""
				this.form.titlesub = ""
				this.form.kcaddress = ""
				this.form.detail = ""
				this.fileListwl = []
				this.form.picurl = ""
				this.form.mvurl = ""
				this.form.kclxid = ""
				this.form.typeext = "图文"
			}
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