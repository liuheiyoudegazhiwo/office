<template>
    <div class="main">

        <el-dialog title="登录" v-model="dialogTableVisible" width="25%" :close-on-click-modal="false">
            <el-input prefix-icon="el-icon-user" v-model="formup.empNo" placeholder="账号" class="inputclass"></el-input>
            <el-input show-password prefix-icon="el-icon-lock" type="password" v-model="formup.password"
                placeholder="密码" class="inputclass"></el-input>
            <el-button type="primary" class="login-allsubmit" @click="tologinfun">登录</el-button>
        </el-dialog>


        <el-dialog title="账号验证" v-model="dialogyzVisible" width="25%" :close-on-click-modal="false">
            <el-input prefix-icon="el-icon-user" v-model="formext.empNo" placeholder="账号" class="inputclass"></el-input>
            <el-input show-password prefix-icon="el-icon-lock" type="password" v-model="formext.password"
                placeholder="密码" class="inputclass"></el-input>
            <el-button type="primary" class="login-allsubmit" @click="toyanzheng">验证</el-button>
        </el-dialog>

        <el-dialog title="修改密码" v-model="dialogpwdVisible" width="25%" :close-on-click-modal="false">
            <el-input disabled prefix-icon="el-icon-user" v-model="formpwd.empNo" placeholder="账号"
                class="inputclass"></el-input>
            <el-input show-password prefix-icon="el-icon-lock" type="password" v-model="formpwd.oldPassword"
                placeholder="新密码" class="inputclass"></el-input>
            <el-input show-password prefix-icon="el-icon-lock" type="password" v-model="formpwd.password"
                placeholder="确认密码" class="inputclass"></el-input>
            <el-button type="primary" class="login-allsubmit" @click="tosubmitpwd">提交</el-button>
        </el-dialog>


        <!-- 选择题库 -->
        <el-dialog title="选择题库" v-model="dialogyzVisible02" width="25%" :close-on-click-modal="false">
            <el-select style="width: 100%;" prefix-icon="el-icon-user" v-model="form02.belong" placeholder="请选择"
                class="inputclass">
                <el-option v-for="(item, i) in options" :key="i" :label="item.title" :value="item.title">
                </el-option>
            </el-select>
            <el-button type="primary" class="login-allsubmit" @click="tosubmit02">确认</el-button>
        </el-dialog>

        <!-- 选择题目类型 -->
        <el-dialog title="选择题库" v-model="dialogyzVisible03" width="25%" :close-on-click-modal="false">
            <el-select prefix-icon="el-icon-user" v-model="form03.tmlx" placeholder="请选择" class="inputclass">
                <el-option v-for="item in tmlxArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" class="login-allsubmit" @click="tosubmit03">确认</el-button>
        </el-dialog>

        <!-- 选择题目类型 -->
        <el-dialog title="选择考场" v-model="dialogyzVisible04" width="25%" :close-on-click-modal="false">
            <el-select prefix-icon="el-icon-user" v-model="form04.kaochangid" placeholder="请选择" class="inputclass">
                <el-option v-for="item in kaochangArr" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" class="login-allsubmit" @click="tosubmit04">确认</el-button>
        </el-dialog>




        <div class="main-sub">
            <div class="topclass">
                <div class="topleft">用户端系统</div>
                <div class="topright">
                    <el-link class="topright-1" type="primary" @click="outlogin">{{ userinfo.empNo
                    }},欢迎您</el-link>
                    <!-- <el-link v-else class="topright-1" type="info" @click="tologin">点我登录</el-link> -->
                    <!-- <div class="topright-1">{{ dateobj.date }} &nbsp;&nbsp;{{ dateobj.week }} </div>
                    <div class="topright-2">{{ dateobj.time }}</div> -->
                </div>
            </div>
            <el-divider></el-divider>
            <el-row :gutter="20" style="color: aliceblue;">
				<el-col :span="2">&nbsp</el-col>
                <el-col :span="10">
                    <div class="grid-content">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple"
                                    @click="goto('/uni_modules/uni-im/pages/index/index', 'url')">
                                    <img src="@/assets/newicon/chat.png" alt="Your Image" class="image">
                                    <p class="text">沟通协作</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple2"
                                    @click="goto('/pages/user/meeting/meeting', 'url')">
                                    <img src="@/assets/newicon/meeting.png" alt="Your Image" class="image">
                                    <p class="text">视频会议</p>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <div style="height: 30px;"></div> -->
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="grid-content bg-purple3"
                                    @click="goto('/pages/user/tablelist/tablelist', 'url')">
                                    <img src="@/assets/icon/03.png" alt="Your Image" class="image">
                                    <p class="text">文档协作</p>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <div style="height: 30px;"></div> -->
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple"
                                    @click="goto('/pages/user/tasklist/tasklist', 'url')">
                                    <img src="@/assets/icon/04.png" alt="Your Image" class="image">
                                    <p class="text">任务管理</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple2"
                                    @click="goto('/pages/user/meetingoff/meetingoff', 'url')">
                                    <img src="@/assets/newicon/off.png" alt="Your Image" class="image">
                                    <p class="text">线下会议管理</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple3"
                                            @click="goto('/pages/user/kaoqin/kaoqin', 'url')">
                                            <img src="@/assets/newicon/kaoqin.png" alt="Your Image" class="image">
                                            <p class="text">考勤打卡</p>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple"
                                            @click="goto('/pages/user/jixiao/jixiao', 'url')">
                                            <img src="@/assets/newicon/jixiao.png" alt="Your Image" class="image">
                                            <p class="text">我的绩效</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purpleext"
                                    @click="goto('/pages/admin/admin?selectkey=user', 'url-admin')">
                                    <img src="@/assets/newicon/admin.png" alt="Your Image" class="image">
                                    <p class="text">管理端入口</p>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <div style="height: 30px;"></div> -->
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="grid-content bg-purple2"
                                    @click="goto('/pages/user/shenqing/shenqing', 'url')">
                                    <img src="@/assets/icon/02.png" alt="Your Image" class="image">
                                    <p class="text">我的申请</p>
                                </div>
                            </el-col>
							<el-col :span="12">
							    <div class="grid-content bg-purple5"
							        @click="goto('/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true', 'url')">
							        <img src="@/assets/newicon/touxiang.png" alt="Your Image" class="image">
							        <p class="text">设置头像</p>
							    </div>
							</el-col>
                        </el-row>

                    </div>
                </el-col>
				 <el-col :span="2">&nbsp</el-col>
                <!-- <el-col :span="4">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple" @click="goto('/pages/user/kaoqin/kaoqin', 'url')">
                                <img src="@/assets/icon/01.png" alt="Your Image" class="image">
                                <p class="text">考勤打卡</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple3" @click="goto('uppwd', 1)">
                                <img src="@/assets/icon/06.png" alt="Your Image" class="image">
                                <p class="text">修改密码</p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple" @click="goto('/pages/admin/admin', 'url-admin')">
                                <img src="@/assets/icon/03.png" alt="Your Image" class="image">
                                <p class="text">管理后台</p>
                            </div>
                        </el-col>
                    </el-row>
                </el-col> -->
            </el-row>


        </div>
    </div>
</template>

<script>

import { login, modifyPwd, querysysnews, queryannouncementbyid, queryannouncement } from '@/api/sysapi'
import {
    store,
    mutations
  } from '@/uni_modules/uni-id-pages/common/store.js'
export default {
    mounted() {
        this.getclasstmlx()
        this.getkaochang()
        try {

            this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user')) || ''
        } catch (error) {
            this.userinfo = ""
        }
    },
    components: {

    },
    data() {
        return {
            kaochangArr: [],
            dialogyzVisible04: false,
            dialogyzVisible03: false,
            form03: {
                tmlx: ''
            },
            tmlxArr: [{
                value: '1',
                label: '单选题'
            }, {
                value: '2',
                label: '多选题'
            }, {
                value: '3',
                label: '判断题'
            }, {
                value: '4',
                label: '填空题'
            }, {
                value: '999',
                label: '所有题型'
            }],
            options: [],
            dialogyzVisible02: false,
            form02: {
                belong: ''
            },
            form04: {
                kaochangid: ''
            },
            dialogyzVisible: false,
            userinfo: {
                empNo: '',
                userName: '',
                role: '',
                id: ''
            },
            pendingflag: false,
            formext: {
                empNo: '',
                password: ''
            },
            formpwd: {
                empNo: '',
                oldPassword: '',
                password: ''
            },
            formup: {
                empNo: '',
                password: ''
            },
            dialogTableVisible: false,
            dialogpwdVisible: false,
            dateobj: {
                date: '',
                time: '',
                week: ''
            },
            chuankou: '01号'
        }
    },
    methods: {
        goto(url, type) {
            try {
                this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user')) || ''
            } catch (error) {
                this.userinfo = ""
            }

            // if (type == 'url-admin' && this.userinfo.role == '管理员') {
            //     this.gourl(url, type)
            //     return false
            // }
			
			

            //直接跳转
             this.gourl(url, type)

        },
        getkaochang() {
            let obj = {
                current: 1,
                keyword: "",
                size: 1000,
                status: 0
            }
            queryannouncement(obj).then(res => {
                this.kaochangArr = res
            }).catch(error => {
                // this.$message.error('操作失败')
            })
        },
        getclasstmlx() {
            let obj = {
                current: 1,
                keyword: "",
                size: 1000,
                status: 0
            }
            querysysnews(obj).then(res => {
                this.options = res
            }).catch(error => {
                // this.$message.error('操作失败')
            })
        },
        tosubmit02() {
            if (this.form02.belong == '') {
                this.$message.error('请选择题库再提交')
                return false
            }
            this.dialogyzVisible02 = false
            this.$router.push({ path: '/shunxilianxi', query: { belong: this.form02.belong } })
        },
        tosubmit03() {
            if (this.form03.tmlx == '') {
                this.$message.error('请选择题目类型再提交')
                return false
            }
            this.dialogyzVisible03 = false
            this.$router.push({ path: '/tixinglianxi', query: { tmlx: this.form03.tmlx } })
        },
        tosubmit04() {
            if (this.form04.kaochangid == '') {
                this.$message.error('请选择考场再提交')
                return false
            }
            this.dialogyzVisible04 = false
            let obj = {
                id: this.form04.kaochangid
            }
            queryannouncementbyid(obj).then(res => {
                let belong = res[0].detail
                this.$router.push({ path: '/kaoshi', query: { belong: belong, kaochangid: this.form04.kaochangid } })
            }).catch(error => {
                // this.$message.error('操作失败')
            })
        },
        tosubmitpwd() {
            // console.log(userinfo)
            if (this.formpwd.empNo == '' || this.formpwd.oldPassword == '' || this.formpwd.password == '') {
                this.$message.error('账号密码为必填项')
                return false
            }
            if (this.formpwd.oldPassword != this.formpwd.password) {
                this.$message.error('密码不一致请检查')
                return false
            }
            let obj = {
                id: this.userinfo.id,
                oldPassword: this.formpwd.oldPassword,
                password: this.formpwd.password
            }
            modifyPwd(obj).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
                this.dialogpwdVisible = false

                this.pendingflag = false
            }).catch(error => {
                this.pendingflag = false
                this.dialogpwdVisible = false
                console.log(error)
            })
        },
        toyanzheng() {
            let flag = false
            if (this.formext.empNo == '' || this.formext.password == '') {
                this.$message.error('账号密码为必填项')
                return false
            }
            let obj = {
                empNo: this.formext.empNo,
                password: this.formext.password
            }
            login(obj).then(res => {
                let arr = res
                if (res.length > 0) {
                    sessionStorage.setItem('userinfo_user', JSON.stringify(arr[0]))
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 1000
                    });
                    // setTimeout(() => {
                    //     this.$router.push({ name: 'systemuser' })
                    // }, 1000);
                } else {
                    this.$message.error('登录错误请重试')
                }
            }).catch(error => {
                console.log(error)
            })


        },
        gourl(url, type) {
            let that = this

            if (type == 'url' || type == 'url-admin') {
                uni.navigateTo({
                    url: url
                });
                return
            }


            if (type == 'outlogin') {
                this.$confirm('此操作将清除登录数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    uni.setStorageSync('userinfo_user', '')
                    mutations.logout()
                    uni.navigateTo({
                        url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
                    });

                    that.userinfo.empNo = ''
                    that.userinfo.userName = ''
                    that.userinfo.role = ''
                    that.userinfo.id = ''
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
            if (type == 'uppwd') {
                this.formpwd.empNo = this.userinfo.empNo
                this.dialogpwdVisible = true
            }
        },
        tologin() {
            console.log(111)
            this.dialogTableVisible = true
        },
        outlogin() {
            this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                uni.setStorageSync('userinfo_user', '')
                mutations.logout()
                uni.navigateTo({
                    url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
                });
            }).catch(() => {
            });
        },
        tologinfun() {
            if (this.formup.empNo == '' || this.formup.password == '') {
                this.$message.error('账号密码为必填项')
                return false
            }
            this.pendingflag = true
            let obj = {
                empNo: this.formup.empNo,
                password: this.formup.password
            }

            login(obj).then(res => {
                let arr = res
                if (res.length > 0) {
                    this.dialogTableVisible = false
                    sessionStorage.setItem('userinfo_user', JSON.stringify(arr[0]))
                    this.userinfo = arr[0]
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 1000
                    });
                    // setTimeout(() => {
                    //     this.$router.push({ name: 'systemuser' })
                    // }, 1000);
                } else {
                    this.$message.error('登录错误请重试')
                }
            }).catch(error => {
                console.log(error)
            })

        },
        getnowdatetime() {
            let nowDate = new Date();
            let year = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
            let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
            let dateStr = year + "年" + month + "月" + day + "日";

            let hours = nowDate.getHours()
            let minutes = nowDate.getMinutes() < 10 ? ('0' + nowDate.getMinutes()) : nowDate.getMinutes()
            let seconds = nowDate.getSeconds() < 10 ? ('0' + nowDate.getSeconds()) : nowDate.getSeconds()
            let timeStr = hours + ':' + minutes + ':' + seconds

            let arr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            let week = new Date().getDay();
            let weekStr = arr[week];
            let obj = {}
            obj.date = dateStr
            obj.time = timeStr
            obj.week = weekStr
            return obj
        }

    }
}
</script>

<style scoped>
.inputclass {
    margin-bottom: 5%;
    width: 100%;
}

.login-allsubmit {
    margin-top: 5%;
    width: 100%;
}

.bg-purple {
    height: 21vh;
    background: linear-gradient(to bottom left, #00eeff, #1414e0);
    /* 渐变背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.bg-purple2 {
    height: 21vh;
    background: linear-gradient(to bottom left, #00eeff, #14e02f);
    /* 渐变背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.bg-purple5 {
    height: 21vh;
    background: linear-gradient(to bottom left, #14e02f, #ff55ff);
    /* 渐变背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.bg-purple3 {
    height: 21vh;
    background: linear-gradient(to bottom left, #ff000d, #f0f405);
    /* 渐变背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.image {
    width: 11vh;
    /* 根据需要设置图片的宽度 */
}

.text {
    font-size: 1.5em;
    margin-top: 10px;
    /* 文字与图片之间的间距 */
    font-weight: bold;
    /* 文字加粗 */
}





.bg-purpleext {
    background: linear-gradient(to bottom left, orange, rgb(255, 60, 0));
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 44vh;
    /* background: #d3dce6; */
}



.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}




.main {
    background-image: url("@/assets/bg2.png");
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;

}

.main-sub {
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
}

.topclass {
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.topleft {
    font-size: 3em;
    color: aliceblue;
    font-weight: bold;
}

.topright-1,
.topright-2 {
    font-size: 1.5em;
    /* color: aliceblue; */
    font-weight: bold;
}

.topright {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
</style>