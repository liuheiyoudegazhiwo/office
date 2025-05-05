import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import { get_indexof_flagfun } from '@/utils/trans'

export default new Vuex.Store({
  state: {
    //存贮点击过的左侧菜单（菜单全路径、url、菜单名称等）
    selectitemArr: [],
    //存贮最后一次的点击的左侧菜单（菜单全路径）
    selectArr: {},
    selecthallObj: {}
  },
  getters: {
  },
  mutations: {
    //存贮点击过的左侧菜单
    selectitemfun(state, data) {
      let arr = state.selectitemArr
      state.selectitemArr.forEach(element => {
        element.active = false
      });
      let obj = get_indexof_flagfun(arr, data, 'path')
      if (obj.flag) {
        state.selectitemArr[obj.index].active = true
      } else {
        state.selectitemArr.push(data)
      }
    },
    //存贮最后一次的点击的左侧菜单（菜单全路径）
    selectfun(state, data) {
      state.selectArr = data
    },
    //存贮大厅的
    selecthallfun(state, data) {
      state.selecthallObj = data
    }
  },
  actions: {
  },
  modules: {
  }
})
