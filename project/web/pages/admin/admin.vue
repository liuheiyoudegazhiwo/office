<template>
    <div class="index-main">
        <el-row>
            <el-col :xs="6" :sm="5" :md="4" :lg="3">
                <div class="index-left" style="height:100vh">
                    <div class="index-left-top">
                        <div class="index-title">后台管理</div>
                    </div>
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        @select="handleSelect" :default-openeds="defaultOpeneds" text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="false">
                        <el-sub-menu :index="i" v-for="(item, i) in itemArr" :key="i">
                            <template #title>{{ item.menuName }}</template>
                            <el-menu-item :index="itemsub.path" v-for="(itemsub, j) in item.children" :key="j">
                                {{ itemsub.menuName }}
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </div>
            </el-col>
            <el-col :xs="18" :sm="19" :md="20" :lg="21">
                <top style="height:50px;"></top>
				
				 <user v-if="selectkey == 'user'" class="contentnew"></user>
				<dakalist v-if="selectkey == 'dakalist'" class="contentnew"></dakalist>
				<jixiao v-if="selectkey == 'jixiao'" class="contentnew"></jixiao>
				<meetinglist v-if="selectkey == 'meetinglist'" class="contentnew"></meetinglist>
				<shenqing v-if="selectkey == 'shenqing'" class="contentnew"></shenqing>
				<tasklist v-if="selectkey == 'tasklist'" class="contentnew"></tasklist>
                <basepage v-if="selectkey == 'basepage'" class="contentnew"></basepage>
				<jixiaolist v-if="selectkey == 'jixiaolist'" class="contentnew"></jixiaolist>
				
                
            </el-col>
        </el-row>
    </div>
</template>
<script>
import top from './index/top.vue'
import mid from './index/mid.vue'
import user from './com/user.vue'
import dakalist from './com/dakalist.vue'
import jixiao from './com/jixiao.vue'
import jixiaolist from './com/jixiaolist.vue'
import meetinglist from './com/meetinglist.vue'
import shenqing from './com/shenqing.vue'
import tasklist from './com/tasklist.vue'
import basepage from './com/basepage.vue'
import { get_leftmeum03 } from '@/utils/leftmeum'

export default {
    created() {
        let obj = get_leftmeum03()
        this.itemArr = obj.data
        try {
            this.selectkey = this.$route.query.selectkey
        } catch (error) {
            this.selectkey = 'dianzi'
        }
        let defaultOpeneds = []
        for (let i = 0; i < this.itemArr.length; i++) {
            defaultOpeneds.push(i)
        }
        this.defaultOpeneds = defaultOpeneds
    },
    components: {
        top,
        mid,
        user,
		dakalist,
		jixiao,
		meetinglist,
		shenqing,
		tasklist,
        basepage,
		jixiaolist
    },
    data() {
        return {
            defaultOpeneds: [],
            selectkey: '',
            itemArr: [],
            isCollapse: false
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            console.log('点击的菜单项 key:', key);
            uni.navigateTo({
                url: `/pages/admin/admin?selectkey=${key}`
            });



            // this.selectkey = key;
            // console.log('当前 selectkey:', this.selectkey);
        }
    }
}
</script>

<style scoped>
.index-main {
    height: 100vh;
}

.contentnew {
    height: 87vh;
    overflow: auto;
}

.contentnew::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.contentnew::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.contentnew::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
}




.el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 92%;
    overflow: auto;
}

.el-menu-vertical-demo {
    margin-block-start: 0px;
    margin-block-end: 0px;
}

.el-menu-vertical-demo::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.el-menu-vertical-demo::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.el-menu-vertical-demo::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #555;
}

.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 0px;
    min-width: 100px;
}

.index-left-top {
    background-color: #555c64;
    color: #fff;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.el-submenu__title,
.el-menu-item {
    display: flex;
    justify-content: left;
    align-items: center;
    /* background-color: #1f2d3d!important; */
}

.img {
    margin-right: 5px;
}

.img img {
    width: 30px;
    height: auto;
}

.index-title {
    font-weight: bold;
    font-size: 0.9em;
}

.index-left {
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);
    background-color: rgb(84, 92, 100);
}


.el-menu {
    border-right: 0px;
}

.indexleft-icon {
    margin-right: 10px;
}



.user-main {
    padding: 2%;
}
</style>