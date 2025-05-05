//公共函数
const md5 = require("md5")

/**
 * 将当前时间戳加密
 */
export function now_md5_fun() {
    let ret = ''
    let timestamp = new Date().getTime()
    ret = md5(timestamp)
    return ret

}
