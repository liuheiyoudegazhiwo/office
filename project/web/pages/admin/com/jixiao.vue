<template>
	<div class="index-main">
		<div id="appbody">
			<div id="appbodysub">
				<h2 class="tit">员工绩效考核</h2>
				<div id="app">
					<div id="bord">
						<div id="bordtitle">请对员工个方便信息进行综合评价。 </div>

						<div class="content">
							<div>
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div class="imgtit16"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>请选择月份
									</div>
								</div>
								</p>
								<div class="contenttitselect">
									<el-date-picker value-format="YYYY-MM" v-model="month" type="month" placeholder="月份" />
								</div>
							</div>
						</div>
						<div class="content">
							<div>
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div class="imgtit16"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>请选择员工
									</div>
								</div>
								</p>
								<div class="contenttitselect">
									<el-select v-model="yguserid" placeholder="请选择">
										<el-option v-for="(item,i) in userarr" :key="i" :label="item.userName"
											:value="item.id"></el-option>
									</el-select>
								</div>
							</div>
						</div>


						<div class="content" v-for="(item, index) of arr" :key="index">
							<!-- 单选框统一管理 -->
							<div v-if="item.type == 'radio'">
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div :class="'imgtit' + (++index) + ''"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>{{ item.title }}
									</div>
								</div>
								</p>
								<div class="contenttitselect">
									<el-radio-group style="display: flex;" v-model="item.radio"
										@change="changeradio(item.radio, index)">
										<div class="radiobut" v-for="(itemsub, indexsub) of item.optionArr"
											:key="indexsub">
											<el-radio :label="itemsub"></el-radio>
										</div>
									</el-radio-group>
								</div>
							</div>
							<!-- 多选选框统一管理 -->
							<div v-else>
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div :class="'imgtit' + (++index) + ''"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>{{ item.title }}
									</div>
								</div>

								</p>
								<div class="contenttitselect">
									<el-checkbox-group style="display: flex;" v-model="item.checkList">
										<div class="checkListbut" v-for="(itemsub, indexsub) of item.optionArr"
											:key="indexsub">
											<el-checkbox :label="itemsub"></el-checkbox>
										</div>
									</el-checkbox-group>
								</div>
							</div>
						</div>
						<div class="content">
							<div>
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div class="imgtit15"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>该员工的绩效目标
									</div>
								</div>
								</p>
								<div class="contenttitselect">
									<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jxmb">
									</el-input>
								</div>
							</div>
						</div>

						<div class="content">
							<div>
								<p class="contentTitle">
								<div class="titlsubcontent">
									<div class="imgtit16"></div>
									<div class="contenttit">
										<span class="requiredbj">*</span>该员工的综合评价
									</div>
								</div>
								</p>
								<div class="contenttitselect">
									<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="zhpj">
									</el-input>
								</div>
							</div>
						</div>




						<div id="submitOne">
							<el-button type="success" style="width: 18%;" @click="submitOne">提交</el-button>
						</div>
					</div>
					<!-- <p class="butup upimg" @click="backtop"></p> -->
					<!-- <el-button type="success" style="width: 18%;" class="butup " @click="backtop">回到顶部</el-button> -->
				</div>
			</div>
			<div>

			</div>
		</div>

	</div>
</template>
<script>
	import {
		getform
	} from '@/utils/question'
	import {
		addwenjuandata,
		userQueryList,
		selectjxquery
	} from '@/api/sysapi'
	import {
		deepCopy
	} from '@/utils/trans'


	export default {
		created() {
			window.addEventListener("scroll", this.showbtn, true);
			this.arr = getform()
			this.inituser()

		},
		components: {

		},
		data() {
			return {
				userarr: [],
				arr: [],
				countryoptions: [],
				region: '',
				isCollapse: false,
				jxmb: '',
				zhpj: '',
				yguserid: '',
				month:''
			}
		},
		methods: {

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

			showbtn() {
				let that = this;
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				that.scrollTop = scrollTop
			},
			backtop() {
				console.log("1212");
				var timer = setInterval(function() {
					let osTop = document.documentElement.scrollTop || document.body.scrollTop;
					let ispeed = Math.floor(-osTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
					this.isTop = true;
					if (osTop === 0) {
						clearInterval(timer);
					}
				}, 30)
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
			changeradio(val, index) {
				console.log(val, index);
				index = index - 1
				//查看点击事件
				let arrdata = this.arrbak
				if (arrdata[index].type == "radio") {
					arrdata[index].radio = val
				} else {
					arrdata[index].checkList = val
				}
				this.arr = arrdata
			},
			submitOne() {
				let that = this
				if (!this.yguserid) {
					this.$message.error('请选择员工');
					return false
				}
				if (!this.month) {
					this.$message.error('请选择月份');
					return false
				}
				
				//查询之前是否存在记录
				let objext = {
					userid:this.yguserid,
					datestr:this.month
				}
				selectjxquery(objext).then(res => {
					if(res.length > 0){
						this.$message.error('当前员工已录入指定月份的绩效信息')
					}else{
						
						//必填项目校验
						let arr = this.arr
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].type == "radio" && arr[i].radio == "") {
								this.$message.error('有必填项目没填写，请完善');
								return false
							}
							if (arr[i].type == "checkList" && arr[i].checkList.length == 0) {
								this.$message.error('有必填项目没填写，请完善');
								return false
							}
						}
						//将结果放入数组中
						let arrresult = []
						for (let j = 0; j < arr.length; j++) {
							let type = arr[j].type
							let result = ""
							if (type == "radio") {
								result = arr[j].radio
							} else {
								result = arr[j].checkList.join(",")
							}
							arrresult.push(result)
						}
						let len = arrresult.length
						let sub = 25 - len
						let resultArray = new Array(sub).fill(0)
						let resultArr = [...arrresult, ...resultArray]
						
						let objresult = {}
						resultArr.forEach((item, index) => {
							let n = ++index
							let prop = "result" + n;
							let value = item
							let obj = {
								[prop]: value
							}
							objresult = {
								...objresult,
								...obj
							};
						})
						let objtitle = {
							title: 0,
							typestr: objresult.result8
						}
						let objall = {
							...objresult,
							...objtitle
						}
						objall.datetime = this.getnowdate() + " " + this.getnowtime()
						objall.userid = this.yguserid
						objall.datestr = this.month
						objall.result14 = this.jxmb
						objall.result15 = this.zhpj
						
						this.$confirm('即将提交, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: ''
						}).then(() => {
							addwenjuandata(objall).then(res => {
								this.$message.success('提交成功')
							}).catch(error => {
								// this.$message.error('查询失败')
							})
						
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消提交'
							});
						});
						
						
						
					}
				}).catch(error => {
					// this.$message.error('查询失败')
				})
				
				
				
				
			}


		}
	}
</script>

<style scoped>
	.el-tabs__item {
		font-size: 28px !important;
	}

	::v-deep .el-tabs__nav-scroll {
		width: 50% !important;
		margin: 0 auto !important;
	}

	.el-tabs__nav.is-stretch {
		min-width: 25% !important;
		FONT-WEIGHT: 150 !important;
	}

	#app {
		display: flex;
		align-items: center;
		/*实现上下居中*/
		justify-content: center;
		/*实现文字换行居中*/
	}

	#bord {
		border-top: #f1f1f1 1px solid;
		width: 95%;
	}

	.titleOne {
		font-size: 1.3em;
		font-weight: 600;
		text-align: center;
	}

	.titleTwo {
		font-size: 0.8em;
		font-weight: 200;
		text-align: center;
	}

	.contentTitle {
		border-top: 1px solid #f1f1f1;
		padding-top: 10px;
		font-weight: bold;
	}


	.contentTitletop {
		padding-top: 10px;
		font-weight: bold;
	}

	.radiobut {
		margin-bottom: 20px;
		margin-left: 20px;
	}

	.checkListbut {
		margin-bottom: 20px;
		margin-left: 20px;
	}

	#appbody::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	#appbody::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}

	#appbody::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}

	#submitOne,
	#submitTwo {
		margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		/*实现上下居中*/
		justify-content: center;
		/*实现文字换行居中*/
	}

	.requiredbj {
		color: red;
	}

	.tit {
		text-align: center;
		font-size: 2.5em;
		margin-top: 20px
	}

	#appbody {
		background-color: #f1f1f1;
		display: flex;
		align-items: center;
		/*实现上下居中*/
		justify-content: center;
		/*实现文字换行居中*/

	}


	#appbodysub {
		background-color: #fff;
		width: 98%;
		margin-top: 1%;
		margin-bottom: 1%;
	}

	#bordtitle {
		font-size: 1em;
		border-bottom: #f1f1f1 1px solid;
		padding-top: 2%;
		padding-bottom: 2%;
	}

	.titlsubcontent {
		display: flex;
		align-items: center;
		/*实现上下居中*/
	}

	.contenttit {
		margin-left: 3%;
	}

	.contenttitselect {
		margin-left: 5%;
	}

	.imgtit1 {
		width: 40px;
		height: 40px;
		background: url('../img/1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit2 {
		width: 40px;
		height: 40px;
		background: url('../img/2.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit3 {
		width: 40px;
		height: 40px;
		background: url('../img/3.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit4 {
		width: 40px;
		height: 40px;
		background: url('../img/4.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit5 {
		width: 40px;
		height: 40px;
		background: url('../img/5.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit6 {
		width: 40px;
		height: 40px;
		background: url('../img/6.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit7 {
		width: 40px;
		height: 40px;
		background: url('../img/7.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit8 {
		width: 40px;
		height: 40px;
		background: url('../img/8.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit9 {
		width: 40px;
		height: 40px;
		background: url('../img/9.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit10 {
		width: 40px;
		height: 40px;
		background: url('../img/10.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit11 {
		width: 40px;
		height: 40px;
		background: url('../img/11.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit12 {
		width: 40px;
		height: 40px;
		background: url('../img/12.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit13 {
		width: 40px;
		height: 40px;
		background: url('../img/13.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit14 {
		width: 40px;
		height: 40px;
		background: url('../img/14.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit15 {
		width: 40px;
		height: 40px;
		background: url('../img/15.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit16 {
		width: 40px;
		height: 40px;
		background: url('../img/16.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit17 {
		width: 40px;
		height: 40px;
		background: url('../img/17.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit18 {
		width: 40px;
		height: 40px;
		background: url('../img/18.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit19 {
		width: 40px;
		height: 40px;
		background: url('../img/19.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit20 {
		width: 40px;
		height: 40px;
		background: url('../img/20.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit21 {
		width: 40px;
		height: 40px;
		background: url('../img/21.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.imgtit22 {
		width: 40px;
		height: 40px;
		background: url('../img/22.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}

	.butup {
		position: fixed;
		right: 50px;
		bottom: 50px;
	}

	.upimg {
		width: 80px;
		height: 80px;
		background: url('../img/up.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-origin: content-box;
	}
</style>