<template>
    <div class="user-main">

    </div>
</template>



<script setup>
import { ref, onUnmounted } from 'vue';
import eventBus from '@/utils/eventBus.js';

const message = ref('');

const handleMessage = (msg) => {
    message.value = msg;
};

// 监听事件
eventBus.on('message', handleMessage);

// 组件卸载时移除事件监听
onUnmounted(() => {
    eventBus.off('message', handleMessage);
});
</script>


<script>

import { deepCopy } from '@/utils/trans'


// 引入自定义的事件总线
import eventBus from '@/utils/eventBus.js';


export default {
    name: 'extenddevice',
    components: {

    },
    created() {
        eventBus.on('valueSent', handleValueReceived);
        this.userinfo = JSON.parse(uni.getStorageSync('userinfo_user'))
    },
    
    data() {
        return {
            receivedValue: ''
        }
    },
    methods: {


        // 定义处理接收到值的函数
        handleValueReceived(value) {
            console.log('接收到的值:', value);
            // 将接收到的值赋值给响应式变量
            this.receivedValue = value;
            console.log('111',this.receivedValue)
        },


        reset() {
            this.form.title = ''
            this.form.mdd = ''
            this.form.jtfs = ''
            this.form.fee = ''
            this.form.xingcheng = ''
            this.form.zhuyi = ''
            this.fileListwl = []
        }
    },
    watch: {
    },
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
.user-main {
    padding: 2%;
}
</style>