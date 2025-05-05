'use strict';
const db = uniCloud.database() //对数据库的对象获取；
exports.main = async (event, context) => {
    const collection = db.collection('uni-id-users') //对holle数据库的获取；
    //event为客户端上传的参数
    console.log('event : ', event)
    let res = await collection.where({
		    username: event.empNo
		    }).remove().then(function(res) {
		})
    return {
        code: 201,
        msg: '删除成功',
        data: res
    }
}