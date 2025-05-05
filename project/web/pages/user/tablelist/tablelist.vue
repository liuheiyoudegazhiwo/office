<template>
	<div class="index-main" style="padding: 2%;">
		<el-row>
			<el-col :xs="4" :sm="4" :md="4" :lg="4">
				<div class="custom-tree-container">
					<div class="block">
						<p>在线文档</p>
						<el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false"
							@node-click="handleNodeClick">
							<!-- 使用 <template> 标签包裹插槽内容并接收作用域数据 -->
							<template #default="{ node, data }">
								<span class="custom-tree-node">
									<span>{{ node.label }}</span>
									<span>
										<el-button type="text" size="mini" @click="() => append(data)">
											新增
										</el-button>
										<el-button type="text" size="mini" @click="() => remove(node, data)">
											删除
										</el-button>

										<el-button type="text" size="mini" @click="() => setting(node, data)">
											初始化
										</el-button>
									</span>
								</span>
							</template>
						</el-tree>
					</div>
				</div>
			</el-col>


			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-divider style="min-height: 80vh;" direction="vertical" />
			</el-col>

			<el-col :xs="19" :sm="19" :md="19" :lg="19">
				<el-table :header-cell-style="headerstyle" ref="multipleTable" :data="tableData" height="80vh"
					tooltip-effect="dark" style="width: 100%" class="demotb1">

					<el-table-column show-overflow-tooltip v-for="(val, i) in griddata" :key="i" :prop="val.prop"
						:label="val.label" :width="val.width">
						<template #default="scope">
							<!-- 动态绑定 v-model -->
							<el-input v-model="scope.row[val.prop]" auto-complete="off" @input="timeupdate"></el-input>
						</template>
					</el-table-column>



					<!-- <el-table-column label="aa1" width="110">
						<template #default="scope">
							<el-input v-model="scope.row.a1" auto-complete="off"></el-input>
						</template>
					</el-table-column>

					<el-table-column label="aa2" width="110">
						<template #default="scope">
							<el-input v-model="scope.row.a2" auto-complete="off"></el-input>
						</template>
					</el-table-column> -->

					<!-- <el-table-column label="操作" width="110">
						<template #default="scope">

							<el-button type="success" plain size="mini" @click="handleEdit(scope.$index, scope.row)">修改
							</el-button>
							<el-button type="danger" plain size="mini"
								@click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</el-col>
		</el-row>


		<el-dialog title="文档名称" v-model="dialogFormVisible">
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
	import {
		querylevelbyid,
		querylevel,
		addlevel,
		dellevel,
		adddetaillevel,
		updatedetaillevel
	} from '@/api/sysapi'
	let id = 1000;

	export default {
		mounted() {
			this.initlevel()
		},
		data() {
			return {
				selectlevelid:'',
				selectdata: '',
				formvisi: {
					content: ''
				},
				dialogFormVisible: false,
				flag: false,
				griddata: [],
				tableData: [],
				data: [{
					id: 0,
					label: '根目录',
					children: []
				}]
			};
		},
		methods: {
			handleNodeClick(data) {
				this.selectlevelid = data.id
				this.griddata = []
				this.tableData = []
				this.initbylevelid(data.id)
			},
			initbylevelid(levelid) {
				let obj = {
					levelid:levelid
				}
				querylevelbyid(obj).then(res => {
					let objext = JSON.parse(res[0].detail) 
					this.griddata = objext.propArray
					this.tableData = objext.originalArray
				}).catch(error => {
					console.log(error)
				})
			},
			initlevel() {
				let obj = {}
				querylevel(obj).then(res => {
					this.data[0].children = this.groupArrayByParentId(res)
				}).catch(error => {
					console.log(error)
				})
			},
			submitsubfun() {


				// const newChild = {
				// 	id: id++,
				// 	label: 'testtest',
				// 	children: []
				// };
				// if (!data.children) {
				// 	// 不需要使用 this.$set
				// 	data.children = [];
				// }
				// data.children.push(newChild);


				if (!this.formvisi.content) {
					this.$message.error('请填写文档名称')
					return false
				}
				let obj = {
					label: this.formvisi.content,
					parentid: this.selectdata.id
				}
				addlevel(obj).then(res => {
					this.dialogFormVisible = false
					this.initlevel()
				}).catch(error => {
					console.log(error)
				})
			},
			generateArrayObject(width, height) {
				const result = [];
				for (let i = 0; i < height; i++) {
					const obj = {};
					for (let j = 1; j <= width; j++) {
						obj[`a${j}`] = '';
					}
					result.push(obj);
				}

				const propArray = [];
				for (let j = 1; j <= width; j++) {
					propArray.push({
						prop: `a${j}`,
						label: `a${j}`,
						width: '150'
					});
				}

				return {
					originalArray: result,
					propArray: propArray
				};
			},


			append(data) {
				//新增的时候
				// 弹框显示
				console.log(data)
				this.selectdata = data
				this.dialogFormVisible = true
			},
			remove(node, data) {
				if (data.id == 0) {
					this.$message.error('根节点不允许删除')
					return false
				}
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex((d) => d.id === data.id);
				// children.splice(index, 1);
				this.selectlevelid = data.id
				let objext = {
					id: data.id
				}
				dellevel(objext).then(res => {
					this.initlevel()
				}).catch(error => {
					console.log(error)
				})
				
				
			},
			setting(node, data) {
				console.log(node, data)
				this.selectlevelid = data.id
				let obj = this.generateArrayObject(10, 30)
				this.griddata = obj.propArray
				this.tableData = obj.originalArray
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex((d) => d.id === data.id);
				// children.splice(index, 1);
				let objext = {
					levelid: data.id,
					detail: JSON.stringify(obj)
				}
				adddetaillevel(objext).then(res => {
					this.initbylevelid(data.id)
				}).catch(error => {
					console.log(error)
				})


			},
			//实时修改
			timeupdate() {
				let obj1 = {
					propArray:this.griddata,
					originalArray:this.tableData
				}
				let obj = {
					levelid:this.selectlevelid,
					detail:JSON.stringify(obj1)
				}
				updatedetaillevel(obj).then(res => {
				}).catch(error => {
					console.log(error)
				})
			},
			
			
			
			
			
			groupArrayByParentId(arr) {
				// 首先创建一个空对象来存储每个元素的引用，键为元素的 id
				const map = {};
				const result = [];

				// 第一次遍历数组，将每个元素存储到 map 中
				arr.forEach(item => {
					map[item.id] = {
						...item,
						children: []
					};
				});

				// 第二次遍历数组，根据 parentid 建立父子关系
				arr.forEach(item => {
					const parentId = item.parentid;
					if (parentId === 0) {
						// 如果 parentid 为 0，说明是顶级元素，直接添加到结果数组中
						result.push(map[item.id]);
					} else {
						// 找到父元素并将当前元素添加到其父元素的 children 数组中
						const parent = map[parentId];
						if (parent) {
							parent.children.push(map[item.id]);
						}
					}
				});

				return result;
			}
		}
	};
</script>

<style>
	.demotb1 .cell {
		padding: 0px;
	}

	.demotb1 .el-table__cell {
		padding: 0px !important;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>