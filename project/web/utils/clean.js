//清除相关缓存数据

 export function cleandatafun() {
    localStorage.removeItem('AUTHORIZATIONGENERAL')
    localStorage.removeItem('userinfo')
    localStorage.removeItem('enumsdata')
    localStorage.removeItem('usermovie')
}