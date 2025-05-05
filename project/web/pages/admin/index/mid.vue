<template>
    <div class="indexmid-main">
        <el-tag size="small" @click="clicktag('first')" :effect="firstactive ? 'dark' : 'plain'" class="indexmid-tag">
            首页
        </el-tag>
        <el-tag size="small" closable @close="closetag(item)" v-on:dblclick.native="doubleclick(item)"
            @click="clicktag(item)" v-for="item in items" :key="item.label" :effect="item.active ? 'dark' : 'plain'"
            class="indexmid-tag">
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>

// import { mapState } from 'vuex'

export default {
    components: {

    },
    created() {
        this.$bus.$on('firstactive', res => {
            let { flag } = res
            this.firstactive = flag
        })

    },
    data() {
        return {
            firstactive: true
        }
    },
    methods: {
        //双击页签
        doubleclick(val) {
            console.log(val)  //   /index/chart/chart09
            if (val.path.indexOf('/index/chart/') > -1) {
                let changepath = val.path.replace("/index/chart/","/html/")
                window.open(`${changepath}/index.html`, "_blank")
            }
        },
        closetag(val) {
            let i = this.items.findIndex((item, index) => {
                return item.label == val.label
            })
            this.items.splice(i, 1)
            //剩余页签长度
            let len = this.items.length
            //当前页签被关闭时
            if (len == 0) {
                //直接跳转至首页
                this.$router.push({ path: '/index' })
                this.firstactive = true
                //修改抬头导航为首页
                this.updatetab()
            } else {
                //如果删除的页签为当前页前
                if (val.active) {
                    //获取最后一个元素
                    let lastele = this.items[this.items.length - 1]
                    this.$router.push({ path: lastele.path })
                    //切换颜色
                    this.transcolor(this.items, lastele)
                    //导航联动
                    this.$store.commit('selectfun', lastele)
                }
            }

        },
        clicktag(val) {
            if (val == 'first') {
                this.firstactive = true
                //触发首页,不显示之前高亮的菜单flag为true表示选择了“首页”页签，false表示选择其他菜单
                this.$bus.$emit('cancelhot', { flag: true })
                //修改抬头导航为首页
                this.updatetab()
                this.$router.push({ path: '/index/first' })
            } else {
                //左侧高亮继续显示
                this.$bus.$emit('cancelhot', { flag: false, path: val.path })
                //修改抬头导航
                this.$store.commit('selectfun', val)
                this.$router.push({ path: val.path })
            }
            //切换颜色
            this.transcolor(this.items, val)
            // this.items.forEach(element => {
            //     element.active = false
            //     if (element.label == val.label) {
            //         this.firstactive = false
            //         element.active = true
            //     }
            // })

        },
        //颜色切换
        transcolor(arr, val) {
            arr.forEach(element => {
                element.active = false
                if (element.label == val.label) {
                    this.firstactive = false
                    element.active = true
                }
            })
        },
        //路由和回到首页时导航联动
        updatetab() {
            let obj = {
                path: '/',
                label: '首页',
                baseitem: [],
            }
            this.$store.commit('selectfun', obj)
        }




    },
    // computed: {
    //     ...mapState({
    //         items: state => state.selectitemArr,
    //     }),
    // },
}
</script>

<style scoped>
.indexmid-main {
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 15px;
    overflow: auto;
}

.indexmid-main::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 3px;
  }
  
  .indexmid-main::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
  }
  
  .indexmid-main::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #f1f1f1;
  }



.indexmid-tag {
    margin-right: 5px;
    cursor: pointer;
}
</style>