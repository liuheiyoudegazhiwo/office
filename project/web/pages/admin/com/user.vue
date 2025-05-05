<template>
	<div class="user-main" v-loading="pendingflag">
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" class="user-demoright">
				<div class="demo-user-search">
					<el-row :gutter="20">
						<el-col :md="12" :lg="8">
							<div class="demo-input-suffix">
								用户名：
								<el-input placeholder="请输入内容" v-model="search.username" class="search-user">
								</el-input>
							</div>
						</el-col>
						<el-col :md="12" :lg="8">
							<div class="demo-input-suffix">
								状态：
								<el-select v-model="search.status" placeholder="请选择" class="search-user">
									<el-option label="正常" value="正常"></el-option>
									<el-option label="停用" value="停用"></el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :md="12" :lg="8">
							<div class="search-butgroup">
								<el-button size="mini" type="primary" round @click="searchfun">搜索
								</el-button>
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="demo-user-contentfu">
					<!-- <div class="demo-user-content">
                        <el-row class="demo-user-contentbutleft">
                            <el-col :span="10">
                                <div class="demo-user-contentbutleftsub">
                                    <el-button size="mini" type="primary" @click="adddata">新增
                                    </el-button>

                                </div>
                            </el-col>
                            <el-col :span="6">&nbsp;</el-col>
                            <el-col :span="8"></el-col>
                        </el-row>
                    </div> -->
					<div class="demo-user-page">
						<el-table border :header-cell-style="{ 'text-align': 'center', 'background-color': '#f1f1f1' }"
							:cell-style="{ 'text-align': 'center' }" ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
							class="demo-user-tablemore" height="550">
							<!-- <el-table-column type="selection" width="55">
                            </el-table-column> -->
							<el-table-column prop="empNo" label="账号"></el-table-column>
							<el-table-column prop="userName" label="用户名"></el-table-column>
							<!-- <el-table-column label="是否为管理员">
                                <template #default="scope">
                                    <el-tag size="mini" type="success" effect="dark" v-if="scope.row.isadmin == 0">{{
                                            '管理员'
                                    }}</el-tag>
                                    <el-tag size="mini" type="info" effect="dark" v-else>员&nbsp;&nbsp;&nbsp;工</el-tag>
                                </template>
</el-table-column> -->
							<el-table-column v-for="(val, i) in griddata" :key="i" :prop="val.prop" :label="val.label"
								:width="val.width">
							</el-table-column>
							<el-table-column label="角色">
								<template #default="scope">
									<el-tag type="success" v-if="scope.row.role == '管理员'">{{ scope.row.role }}</el-tag>
									<el-tag type="danger" v-else>{{ scope.row.role }}</el-tag>
								</template>
							</el-table-column>
							<el-table-column label="状态" width="65">
								<template #default="scope">
									<el-switch v-model="scope.row.status" active-color="#13ce66"
										inactive-color="#ff4949" @change="changestatus(scope.$index, scope.row)">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="350">
								<template #default="scope">
									<el-button type="success" plain size="mini"
										@click="handleEdit(scope.$index, scope.row)">修改
									</el-button>
									<el-button type="danger" plain size="mini"
										@click="handleDelete(scope.$index, scope.row)">删除
									</el-button>
<!-- 
									<el-button type="warning" plain size="mini"
										@click="resetpass(scope.$index, scope.row)">重置密码</el-button> -->

								</template>
							</el-table-column>
						</el-table>
						<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination> -->
					</div>
				</div>

			</el-col>
		</el-row>
		<!-- 重置密码 -->
		<el-dialog title="提示" v-model="repassDialogVisible" width="30%" center>
			<span>{{ repassstr }}</span>
			<el-input placeholder="请输入密码" v-model="repassvalue" show-password style="width:80%;margin-top: 15px;">
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="repassDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="setrepass">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 用户信息弹框 -->
		<!-- 添加或修改用户配置对话框 -->
		<el-dialog class="diaitemuser" :title="userinfotitle" v-model="dialoguserVisible" width="600px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row>
					<el-col :span="24">
						<el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
							<el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
                            <el-input :disabled="passworddisable" v-model="form.password" placeholder="请输入用户密码"
                                type="password" maxlength="20" show-password />
                        </el-form-item>
                    </el-col> -->
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="用户账号" prop="empNo">
							<el-input v-model="form.empNo" @blur="validempno" placeholder="请输入账号" maxlength="30" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色">
							<el-select v-model="form.role" placeholder="请选择角色">

								<el-option v-for="item in optionsrole" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
                        <el-form-item label="管理员">
                            <el-select v-model="form.isadmin" placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in optionsadmin" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
				</el-row>
				<!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                        </el-form-item>
                    </el-col>
                </el-row> -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="状态">
							<el-radio-group v-model="form.status">
								<el-radio :label="0">正常</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="12">
                        <el-form-item label="积分">
                            <el-input-number v-model="form.jifen" :precision="2" :step="0.1" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-col> -->
					<!-- <el-col :span="12">
                        <el-form-item label="能力" :label-width="formLabelWidth">
                            <el-select style="width:100%;" v-model="form.nandu" placeholder="请选择">
                                <el-option label="简单" value="简单"></el-option>
                                <el-option label="一般" value="一般"></el-option>
                                <el-option label="复杂" value="复杂"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
				</el-row>
				<!-- <el-row>
                    <el-col :span="24">
                        <el-form-item label="解析">
                            <el-input v-model="form.jiexi" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="userinfosubmit">确 定</el-button>
				<el-button @click="dialoguserVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { callFunction } from '@/api/unirequest.js'
	
	import {
		searchbyno,
		userQueryList,
		addSysUser,
		updateSysUser,
		userremove,
		resetPassword,
		updateUserstatus
	} from '@/api/sysapi'
	import {
		deepCopy
	} from '@/utils/trans'

	export default {
		name: 'systemuser',
		components: {

		},
		created() {
			this.init()
		},
		mounted() {
			this.excelinit()
		},
		data() {
			return {
				inpuflag: true,
				pendingflag: false,
				reuserid: '',
				repassvalue: '',
				repassstr: '',
				passworddisable: false,
				repassDialogVisible: false,
				updatetype: '',
				current: 1,
				size: 10,
				total: 0,
				single: true,
				multiple: true,
				userinfotitle: '',
				dialogcolnmVisible: false,
				dialoguserVisible: false,
				search: {
					username: '',
					status: '正常'
				},
				griddata: [
					// { prop: 'mobile', label: '手机号', width: '' },
					// { prop: 'nandu', label: '能力', width: '' }
				],
				tableData: [],
				multipleSelection: [],
				currentPage: 1,
				form: {
					userName: '',
					empNo: '',
					email: '',
					mobile: '',
					remark: '',
					nandu: '',
					status: 0,
					role: ''
				},
				// 表单校验
				rules: {
					userName: [{
							required: true,
							message: "用户名称不能为空",
							trigger: "blur"
						},
						{
							min: 2,
							max: 20,
							message: '用户名称长度必须介于 2 和 20 之间',
							trigger: 'blur'
						}
					],
					empNo: [{
						required: true,
						message: "账号不能为空",
						trigger: "blur"
					}],
					email: [{
						type: "email",
						message: "请输入正确的邮箱地址",
						trigger: ["blur", "change"]
					}],
					mobile: [{
						pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
						message: "请输入正确的手机号码",
						trigger: "blur"
					}]
				},
				optionsadmin: [{
					value: 0,
					label: '是'
				}, {
					value: 1,
					label: '否'
				}],
				optionsrole: [{
					label: '用户',
					value: '用户'
				}],

			}
		},
		methods: {
			init() {
				this.query()
			},
			query() {
				let obj = {
					userName: this.search.username || '',
					status: this.search.status || 0,
					current: this.current,
					searchType: "",
					size: this.size,
					status: this.search.status == "正常" ? 0 : 1
				}
				this.pendingflag = true
				userQueryList(obj).then(res => {
					let arr = res
					arr = arr.filter((val, i) => {
						return val.role == "用户"
					})
					this.tableData = arr.map((val, i) => {
						val.status = val.status == 0 ? true : false
						return val
					})
					this.total = res.data.total
					this.pendingflag = false
				}).catch(error => {
					// this.$message.error('查询失败')
					this.pendingflag = false
				})

			},
			//创建账号时检测是否有相同的账号
			validempno(val) {
				let obj = {
					empNo: this.form.empNo
				}
				searchbyno(obj).then(res => {
					if (res.length > 0) {
						this.$message.error('该账号已存在')
						this.form.empNo = ''
					}
				}).catch(error => {
					// this.$message.error('查询失败')
				})
			},
			setrepass() {
				this.pendingflag = true
				let id = this.reuserid
				let password = this.repassvalue
				let obj = {
					id,
					password
				}
				resetPassword(obj).then(res => {
					this.repassDialogVisible = false
					this.$message.success('操作成功')
					this.pendingflag = false
				}).catch(error => {
					// this.$message.error('操作失败')
					this.pendingflag = false
				})
			},
			updatedata() {
				this.passworddisable = true
				this.dialoguserVisible = true;
				this.userinfotitle = '修改用户'
				this.updatetype = 'top'
				this.form = this.multipleSelection[0]

			},
			searchfun() {
				this.query()
			},
			resetfun() {
				this.search.username = ''
				this.search.status = ''
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
			deletedata() {
				let that = this
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arrid = []
					that.multipleSelection.forEach((val, i) => {
						arrid.push(val.id)
					})
					let obj = {
						ids: arrid
					}
					that.pendingflag = true
					userremove(obj).then(res => {
						that.query()
						that.$message.success('操作成功')

					}).catch(error => {
						that.$message.error('操作失败')
						that.pendingflag = false
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			resetpass(index, row) {
				this.repassDialogVisible = true
				this.repassstr = `请输入“${row.userName}”的新密码`
				this.reuserid = row.id
			},
			//用户信息修改提交
			userinfosubmit() {
				this.pendingflag = true
				if (this.userinfotitle == "新增用户") {
					let objadd = {
						empNo: this.form.empNo,
						mobile: this.form.mobile,
						password: "123456",
						remark: this.form.remark || '',
						nandu: this.form.nandu,
						role: this.form.role, //数组
						isadmin: 0,
						userName: this.form.userName,
						email: this.form.email,
						jifen: this.form.jifen,
						status: this.form.status,
						deptdesc: "",
						zhicheng: ""
					}
					//新增
					addSysUser(objadd).then(res => {
						this.query()
						this.$message.success('操作成功')
						this.dialoguserVisible = false
						this.reset()
					}).catch(error => {
						// this.$message.error('操作失败')
						this.dialoguserVisible = false
						this.pendingflag = false
					})
				} else {
					let id
					if (this.updatetype == 'top') {
						id = this.multipleSelection[0].id
					}
					if (this.updatetype == 'line') {
						id = this.form.id
					}
					//修改
					let objedit = this.form
					objedit.id = id
					objedit.remark = this.form.remark || ''
					updateSysUser(objedit).then(res => {
						this.query()
						this.$message.success('操作成功')
						this.dialoguserVisible = false
						this.reset()
					}).catch(error => {
						// this.$message.error('操作失败')
						this.dialoguserVisible = false
						this.pendingflag = false
					})
				}
			},
			adddata() {
				this.passworddisable = false
				this.reset()
				this.dialoguserVisible = true
				this.userinfotitle = '新增用户'
			},
			reset() {
				this.form = {}
			},
			changestatus(index, row) {
				let objedit = {
					id: row.id,
					status: row.status ? 0 : 1
				}
				updateUserstatus(objedit).then(res => {
					this.query()
					this.$message.success('操作成功')
				}).catch(error => {
					// this.$message.error('操作失败')
				})
			},
			handleEdit(index, row) {
				this.passworddisable = true
				this.updatetype = 'line'
				this.userinfotitle = '修改用户'
				this.dialoguserVisible = true
				let rownew = deepCopy(row)
				this.form = rownew

				this.form.status = rownew.status ? 0 : 1
			},
			handleDelete(index, row) {
				let that = this
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let obj = {
						id: row.id
					}
					that.pendingflag = true

					//调用远程删除
					let objext = {
						empNo: row.empNo
					}
					callFunction('delete_user', objext)
						.then(res => {
							userremove(obj).then(res => {
								that.query()
								that.$message.success('操作成功')

							}).catch(error => {
								that.$message.error('操作失败')
								that.pendingflag = true
							})
						})
						.catch(err => {
							console.error('调用云函数失败:', err);
						});



				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//excel相关函数
			excelinit() {
				let that = this
				let jsono = ''
				//首先监听input框的变动，选中一个新的文件会触发change事件
				document.querySelector("#file").addEventListener("change", function() {
					//获取到选中的文件
					var file = document.querySelector("#file").files[0];
					var type = file.name.split('.');
					if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
						alert('只能选择excel文件导入');
						return false;
					}
					const reader = new FileReader();
					reader.readAsBinaryString(file);
					reader.onload = (e) => {
						const data = e.target.result;
						const zzexcel = window.XLS.read(data, {
							type: 'binary'
						});
						const result = [];
						for (let i = 0; i < zzexcel.SheetNames.length; i++) {
							const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[
								i]]);
							result.push(...newData)
						}
						console.log('result', result)
						jsono = result
						//处理数组(转化为包含所有key的数组)
						let jsonall = result.map((val, i) => {
							// val.tmzqdatext = getnumberda(val.tmzqda)
							return val
						})

						//删除表单数据数据
						that.$confirm('此操作将将追加数据, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {

							let obj = {}
							that.pendingflag = true
							saveuserexcel(jsonall).then(res => {
								location.reload()
								// that.inpuflag = false
								// setTimeout(() => {
								//     that.inpuflag = true
								// }, 500)
								console.log(res)
								//查询表单数据
								that.query()
								that.pendingflag = false
							}).catch(error => {
								that.pendingflag = false
							})

						}).catch(() => {
							that.$message({
								type: 'info',
								message: '已取消'
							});
						});


					}
				});

			},
			//如果使用 FileSaver.js 就不要同时使用以下函数
			saveAs(obj, fileName) {
				//当然可以自定义简单的下载文件实现方式 
				var tmpa = document.createElement("a");
				tmpa.download = fileName || "下载";
				tmpa.href = URL.createObjectURL(obj);
				//绑定a标签
				tmpa.click();
				//模拟点击实现下载
				setTimeout(function() {
					//延时释放
					URL.revokeObjectURL(obj);
					//用URL.revokeObjectURL()来释放这个object URL
				}, 100);
			},
			downloadExl(data, type) {
				let that = this
				const wb = {
					SheetNames: ['Sheet1'],
					Sheets: {},
					Props: {}
				};
				wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);
				//通过json_to_sheet转成单页(Sheet)数据
				let wopts = {
					bookType: 'xlsx',
					bookSST: false,
					type: 'binary'
				}; //这里的数据是用来定义导出的格式类型
				console.log(wopts)
				this.saveAs(new Blob([that.s2ab(XLSX.write(wb, wopts))], {
					type: "application/octet-stream"
				}), "这里是下载的文件名" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
			},
			s2ab(s) {
				if (typeof ArrayBuffer !== 'undefined') {
					var buf = new ArrayBuffer(s.length);
					var view = new Uint8Array(buf);
					for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
					return buf;
				} else {
					var buf = new Array(s.length);
					for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
					return buf;
				}
			}

		},
		watch: {
			// filterText(val) {
			//     this.$refs.tree.filter(val);
			// }
		},
	}
</script>

<style scoped>
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

	.user-demoright {
		height: 75vh;
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
</style>


<style>
	.demo-user-tablemore .el-table__row td {
		padding: 7px 0 !important;
	}

	.demo-user-tablemore {
		margin-bottom: 10px;
	}

	.diaitemuser .el-dialog {
		margin-top: 7vh !important;
	}

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
</style>