//查询vuex的值是否为空 true表示有值，false表示空(主要用于查看大厅维护界面的大厅是否被选中)
import store from '@/store/index'

export function getvuexhall() {
    let result = false
    let hallId = store.state.selecthallObj.id
    if(Object.prototype.toString.call(hallId) != '[object Undefined]') {
        result = true
    }
    return result
}
