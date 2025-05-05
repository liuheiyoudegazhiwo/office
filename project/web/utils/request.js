import axios from 'axios'

// 临时方案, 配置baseURL地址
const baseURL = '/'
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 60000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  transformRequest: [function (data) {
    return data
  }]
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['platform'] = 'PC'
    try {
      let userobj = JSON.parse(uni.getStorageSync('userinfo_user')) 
      config.headers['empNo'] = userobj.empNo
    } catch (error) {
      
    }
    // config.headers['TenantId'] = 0 //JSON.parse(localStorage.getItem('userinfo')).tenantId

    if (localStorage.getItem('AUTHORIZATIONGENERAL') && localStorage.getItem('AUTHORIZATIONGENERAL') != '') {
      config.headers['Authorization'] = localStorage.getItem('AUTHORIZATIONGENERAL')
    } else {
      config.headers['Authorization'] = ""
    }
    if (config.data) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.data = JSON.stringify(config.data)
    }
    if (config.method == 'get') {
      config.params = config.params || {}
      config.params.t = new Date().getTime()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    let data = {}
    if (response.status === 200) {
      let code = response.data.code
      if (code == 1000) {
        localStorage.setItem('AUTHORIZATIONGENERAL', "")
        location.href = '#/login?' + Math.random()
        return Promise.reject(data) 
      } else if (code == 2001) {
        return Promise.reject(data)
      } else if (code == 5000) {
        return Promise.reject(response.data.userMsg)
      } else {
        return Promise.resolve(response.data)
      }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // location.href = 'error?'+Math.random()
    return Promise.reject(error)

  }
)

export default service
