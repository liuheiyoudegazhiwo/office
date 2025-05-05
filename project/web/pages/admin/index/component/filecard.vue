<template>
    <div class="cardfile">

        <el-carousel :interval="5000" arrow="always"  trigger="click"  height="450px"  :autoplay="false" @change="changeindex">
            <el-carousel-item v-for="item in listArr" :key="item.id">
                <img class="imgclass" :src="item.url">
            </el-carousel-item>
        </el-carousel>
        <div class="biglunbotitle">{{bigtitle}}</div>
        <div class="xmlunbotitle">{{smalltitle}}</div>
    </div>
</template>
<script>


export default {
    created() {
    },
    components: {
    },
    data() {
        return {
            bigtitle: '步骤一：',
            smalltitle: '新增大厅数据（也可以进行“新增”、“修改”、“删除”等操作）',
            listArr: [
                {
                    id: 1,
                    url: '/image/index/01.png',
                    big: '步骤一：',
                    small: '新增大厅数据（也可以进行“新增”、“修改”、“删除”等操作）'
                },
                {
                    id: 2,
                    url: '/image/index/02.png',
                    big: '步骤二：',
                    small: '新增设备数据（也可以进行“新增”、“修改”、“删除”等操作）'
                },
                {
                    id: 3,
                    url: '/image/index/03.png',
                    big: '步骤三：',
                    small: '配置人员信息（也可以进行“新增”、“修改”、“删除”等操作）'
                },
                {
                    id: 4,
                    url: '/image/index/04.png',
                    big: '步骤四：',
                    small: '配置窗口相关信息'
                },
                {
                    id: 5,
                    url: '/image/index/05.png',
                    big: '步骤五：',
                    small: '窗口人员配置'
                },
                {
                    id: 6,
                    url: '/image/index/06.png',
                    big: '步骤六：',
                    small: '登录好差评APP'
                }
            ]
        }
    },
    methods: {
        changeindex(val) {
            console.log(val)
            console.log(this.listArr[val])
            this.bigtitle = this.listArr[val].big
            this.smalltitle = this.listArr[val].small
        }

    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.biglunbotitle {
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;

}

.xmlunbotitle {
    font-size: 20px;

}

.imgclass {
    display: block;
    width: 100%;
    height: 100%;
}
</style>