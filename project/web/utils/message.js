/** 
 * @author yangzijun
 * @date 2022-10-11
 * @description 重写element-ui $message 解决消息多次弹出的问题
 */
import { Message } from "element-ui"
  
let messageInstance = null
const overRideMessage = (options) => {
  if(messageInstance) {
    messageInstance.close()
  }
}
let typeMsg = ["error","success","info","warning"]
typeMsg.forEach(type => {
  overRideMessage[type] = options => {
    if (typeof options === "string") {
      options = {
        message: options
      }
    }
    options.type = type
    return overRideMessage(options)
  }
})

export const message = overRideMessage