<template>
    <div class="indextop-mainleft">
        <el-row :gutter="20" class="indextop-left" style="margin-left: 0px;margin-right: 0px;">
            <el-col :span="5" class="indextop-leftsub">
                admin欢迎您
                <!-- <div v-if="!isCollapse" class="el-icon-s-fold indextop-lefticon" @click="foldfun"></div>
                <div v-else class="el-icon-s-unfold indextop-lefticon" @click="foldfun"></div> -->
                <!-- <el-breadcrumb separator="/">
                    <el-breadcrumb-item><span style="font-weight:bold;">首页</span></el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item, index) of selectArr.baseitem" :key="index">{{ item }}
                    </el-breadcrumb-item>
                </el-breadcrumb> -->
            </el-col>
            <el-col :span="14">
                &nbsp;
            </el-col>
            <el-col :span="5" class="indextop-right">
				<el-button type="primary" size="mini" @click="handleCommand('fanhui')">返回首页</el-button>
                <el-button type="danger" size="mini" @click="handleCommand('outlogin')">退出</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>

// import screenfull from 'screenfull'
import {
    store,
    mutations
  } from '@/uni_modules/uni-id-pages/common/store.js'
import filecard from './component/filecard.vue'
import { cleandatafun } from '@/utils/clean' 
// import { mapState } from 'vuex'

export default {
    components: {
        filecard
    },
    data() {
        return {
            userinfo:'',
            dialogpicVisible: false,
            dialogdocVisible: false,
            dialogmovieVisible: false,
            picflag: true,
            selectroleDialog: false,
            selectopt: [{ label: '个人中心', path: '/index/self/user' }, { label: '退出登录', path: '/login' }, { label: '切换角色', path: '' }],
            topitem: [],
            fit: 'fill',
            isCollapse: false,
            isFullscreen: false,
            url: '',
            roleoptions: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }],
            value: ''
        }
    },
    created() {
        // this.init()
    },
    mounted() {
        this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user')) || ''
        // this.url = obj.avatar
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        //点击视频播放弹出框
        moviediagfun(){
            this.dialogmovieVisible = true
        },
        //折叠左侧菜单
        foldfun() {
            this.$bus.$emit('fold', { isCollapse: true })
            this.isCollapse = !this.isCollapse
        },
        //屏幕缩放处理函数
        screenfun() {
            if (!screenfull.isEnabled) {
                this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
                return false
            }
            screenfull.toggle()
        },
        change() {
            this.isFullscreen = screenfull.isFullscreen
        },
        init() {
            if (screenfull.isEnabled) {
                screenfull.on('change', this.change)
            }
        },
        destroy() {
            if (screenfull.isEnabled) {
                screenfull.off('change', this.change)
            }
        },

        //跳转至个人设置页面
        handleCommand(val) {
            let that = this
            if (val == 'seeuser') {
                this.$router.push({ path: this.selectopt[0].path })
                //添加到tab
                this.$bus.$emit('firstactive', { flag: false })
                let obj = {
                    active: true,
                    baseitem: [],
                    label: this.selectopt[0].label,
                    path: this.selectopt[0].path
                }
                this.$store.commit('selectitemfun', obj)
                this.$store.commit('selectfun', obj)
            }
            if (val == 'selectrole') {
                this.selectroleDialog = true
            }
			if (val == 'fanhui') {
				
				uni.navigateTo({
				    url: '/pages/user/user'
				});
			    
			}
			
            if (val == 'outlogin') {
                this.$confirm('是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //需要清除所有数据
					uni.setStorageSync('userinfo_user', '')
					uni.setStorageSync('userinfo', '')
					mutations.logout()
					uni.navigateTo({
					    url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
					});
                }).catch(() => {
                });


            }
        }

    },
    watch: {
        dialogmovieVisible(val) {
            if(!val){
                this.$nextTick(()=>{
                console.log(this.$refs.videoref.pause())
            })
            }
        }
    },
    // computed: {
    //     ...mapState({
    //         selectArr: state => state.selectArr,
    //     }),
    // },
}
</script>

<style scoped>
.selectdia {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.indextop-mainleft {
    height: 100%;
    border-bottom: 1px solid #f1f1f1;

}

.indextop-left {
    height: 100%;
}

.indextop-leftsub {
    height: 100%;
}

.indextop-leftsub {
    display: flex;
    justify-content: left;
    align-items: center;
}

.indextop-lefticon {
    margin-right: 3%;
    font-size: 25px;
    cursor: pointer;
}

.indextop-icon {
    font-size: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
}

.indextop-iconext {
    font-size: 25px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
}

.indextop-icon:hover,
.indextop-iconext:hover {
    background-color: #f1f1f1;
}

.indextop-right {
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
}

.indextop-dropdown {
    position: relative;
    top: 5;
}

.el-popper[x-placement^=bottom] {
    margin-top: 22px;
}

.indextop-icon,
.indextop-iconext,
.el-dropdown-link {
    cursor: pointer;
}

.top-icon {
    font-size: 16px;
    margin-right: 5px;
}

.icon-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>