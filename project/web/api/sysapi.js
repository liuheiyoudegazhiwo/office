/** 
 * @author yangzijun
 */

 import request from '../utils/request'

  /**
  * post请求示例
  */
   export function post(data){
    return request({
        url: '/bit-bpc-form/domainValue/list?domainCode=CONTRACT_SYS',
        method: 'post',
        data: data
    })
}


/**
* get请求示例  //get请求测试地址：https://v.api.aa1.cn/api3/api-wenan-gaoxiao/index.php?aa1=json
* 下面为代理模拟
*/
export function get(params){
   return request({
       //url: '/bit-bpc-form/domainValue/list?domainCode=CONTRACT_SYS',         //规范
       url:`api?aa1=${params}`,
       method: 'get'
   })
}



//-

export function insertlistdata(data){
    return request({
        url: '/api3/insertlistdata',
        method: 'post',
        data: data
    })
}

export function updatelistdata(data){
    return request({
        url: '/api3/updatelistdata',
        method: 'post',
        data: data
    })
}

export function querylistdata(data){
    return request({
        url: '/api3/querylistdata',
        method: 'post',
        data: data
    })
}

export function listdataremove(data){
    return request({
        url: '/api3/listdataremove',
        method: 'post',
        data: data
    })
}


export function querysysinformation(data){
    return request({
        url: '/api3/querysysinformation',
        method: 'post',
        data: data
    })
}

export function removesysinformation(data){
    return request({
        url: '/api3/removesysinformation',
        method: 'post',
        data: data
    })
}

export function selectjxquery(data){
    return request({
        url: '/api3/selectjxquery',
        method: 'post',
        data: data
    })
}




export function addwenjuandata(data){
    return request({
        url: '/api3/addwenjuandata',
        method: 'post',
        data: data
    })
}


export function querylevel(data){
    return request({
        url: '/api3/querylevel',
        method: 'post',
        data: data
    })
}

export function addlevel(data){
    return request({
        url: '/api3/addlevel',
        method: 'post',
        data: data
    })
}

export function dellevel(data){
    return request({
        url: '/api3/dellevel',
        method: 'post',
        data: data
    })
}

export function adddetaillevel(data){
    return request({
        url: '/api3/adddetaillevel',
        method: 'post',
        data: data
    })
}

export function updatedetaillevel(data){
    return request({
        url: '/api3/updatedetaillevel',
        method: 'post',
        data: data
    })
}

export function querylevelbyid(data){
    return request({
        url: '/api3/querylevelbyid',
        method: 'post',
        data: data
    })
}



export function querybasemsg(data){
    return request({
        url: '/api3/querybasemsg',
        method: 'post',
        data: data
    })
}
export function insertbasemsg(data){
    return request({
        url: '/api3/insertbasemsg',
        method: 'post',
        data: data
    })
}
export function updatebasemsg(data){
    return request({
        url: '/api3/updatebasemsg',
        method: 'post',
        data: data
    })
}
export function updatebasemsgstatus(data){
    return request({
        url: '/api3/updatebasemsgstatus',
        method: 'post',
        data: data
    })
}
export function basemsgremove(data){
    return request({
        url: '/api3/basemsgremove',
        method: 'post',
        data: data
    })
}

export function querypaper(data){
    return request({
        url: '/api3/querypaper',
        method: 'post',
        data: data
    })
}
export function addpaper(data){
    return request({
        url: '/api3/addpaper',
        method: 'post',
        data: data
    })
}
export function updatepaper(data){
    return request({
        url: '/api3/updatepaper',
        method: 'post',
        data: data
    })
}
export function removepaper(data){
    return request({
        url: '/api3/removepaper',
        method: 'post',
        data: data
    })
}


export function queryelectron(data){
    return request({
        url: '/api3/queryelectron',
        method: 'post',
        data: data
    })
}
export function addelectron(data){
    return request({
        url: '/api3/addelectron',
        method: 'post',
        data: data
    })
}
export function updateelectron(data){
    return request({
        url: '/api3/updateelectron',
        method: 'post',
        data: data
    })
}


export function queryannouncementbyid(data){
    return request({
        url: '/api3/queryannouncementbyid',
        method: 'post',
        data: data
    })
}

export function queryusercs(data){
    return request({
        url: '/api3/queryusercs',
        method: 'post',
        data: data
    })
}


export function querykaoshiuser(data){
    return request({
        url: '/api3/querykaoshiuser',
        method: 'post',
        data: data
    })
}




export function modifyPwd(data){
    return request({
        url: '/api3/modifyPwd',
        method: 'post',
        data: data
    })
}


export function plinsertresult(data){
    return request({
        url: '/api3/plinsertresult',
        method: 'post',
        data: data
    })
}

export function removeelectron(data){
    return request({
        url: '/api3/removeelectron',
        method: 'post',
        data: data
    })
}


export function addapprase(data){
    return request({
        url: '/api3/addapprase',
        method: 'post',
        data: data
    })
}
export function deleteiscunzai(data){
    return request({
        url: '/api3/deleteiscunzai',
        method: 'post',
        data: data
    })
}


export function queryuserquestion(data){
    return request({
        url: '/api3/queryuserquestion',
        method: 'post',
        data: data
    })
}



export function plinsertque(data){
    return request({
        url: '/api3/plinsertque',
        method: 'post',
        data: data
    })
}


//添加用户
export function addSysUser(data){
    return request({
        url: '/api3/addSysUser',
        method: 'post',
        data: data
    })
}


//修改用户
export function updateSysUser(data){
    return request({
        url: '/api3/updateSysUser',
        method: 'post',
        data: data
    })
}



//删除用户
export function userremove(data){
    return request({
        url: '/api3/userremove',
        method: 'post',
        data: data
    })
}



//查询用户
export function userQueryList(data){
    return request({
        url: '/api3/userQueryList',
        method: 'post',
        data: data
    })
}

//修改用户状态
export function updateUserstatus(data){
    return request({
        url: '/api3/updateUserstatus',
        method: 'post',
        data: data
    })
}

//个人信息修改
export function updateSysUserbyme(data){
    return request({
        url: '/api3/updateSysUserbyme',
        method: 'post',
        data: data
    })
}






export function querysysnews(data){
    return request({
        url: '/api3/querysysnews',
        method: 'post',
        data: data
    })
}

export function addsysnews(data){
    return request({
        url: '/api3/addsysnews',
        method: 'post',
        data: data
    })
}

export function updatesysnews(data){
    return request({
        url: '/api3/updatesysnews',
        method: 'post',
        data: data
    })
}


export function updatesysnewsstatus(data){
    return request({
        url: '/api3/updatesysnewsstatus',
        method: 'post',
        data: data
    })
}

export function removesysnews(data){
    return request({
        url: '/api3/removesysnews',
        method: 'post',
        data: data
    })
}

export function taskverifymore(data){
    return request({
        url: '/api3/taskverifymore',
        method: 'post',
        data: data
    })
}

export function chatremove(data){
    return request({
        url: '/api3/chatremove',
        method: 'post',
        data: data
    })
}




export function questionselect(data){
    return request({
        url: '/api3/questionselect',
        method: 'post',
        data: data
    })
}

export function updatataskstatus(data){
    return request({
        url: '/api3/updatataskstatus',
        method: 'post',
        data: data
    })
}



export function taskverify(data){
    return request({
        url: '/api3/taskverify',
        method: 'post',
        data: data
    })
}


export function getclassquestion(data){
    return request({
        url: '/api3/getclassquestion',
        method: 'post',
        data: data
    })
}

export function questionupdata(data){
    return request({
        url: '/api3/questionupdata',
        method: 'post',
        data: data
    })
}

export function questionremove(data){
    return request({
        url: '/api3/questionremove',
        method: 'post',
        data: data
    })
}

export function questioninsert(data){
    return request({
        url: '/api3/questioninsert',
        method: 'post',
        data: data
    })
}


export function userQueryListbyid(data){
    return request({
        url: '/api3/userQueryListbyid',
        method: 'post',
        data: data
    })
}


export function querychatart(data){
    return request({
        url: '/api3/querychatart',
        method: 'post',
        data: data
    })
}

export function addsysinformation(data){
    return request({
        url: '/api3/addsysinformation',
        method: 'post',
        data: data
    })
}
export function updatesysinformation(data){
    return request({
        url: '/api3/updatesysinformation',
        method: 'post',
        data: data
    })
}

export function deletearticle(data){
    return request({
        url: '/api3/deletearticle',
        method: 'post',
        data: data
    })
}



export function queryarticle(data){
    return request({
        url: '/api3/queryarticle',
        method: 'post',
        data: data
    })
}

export function updatesysinformationstatus(data){
    return request({
        url: '/api3/updatesysinformationstatus',
        method: 'post',
        data: data
    })
}


//重置用户密码
export function resetPassword(data){
    return request({
        url: '/api3/resetPassword',
        method: 'post',
        data: data
    })
}



//登录操作
export function login(data){
    return request({
        url: '/api3/login',
        method: 'post',
        data: data
    })
}

//发单人填写表单
export function addSysform(data){
    return request({
        url: '/api3/addSysform',
        method: 'post',
        data: data
    })
}


//楼层相关
export function addfloor(data){
    return request({
        url: '/api3/addfloor',
        method: 'post',
        data: data
    })
}
export function updatafloor(data){
    return request({
        url: '/api3/updatafloor',
        method: 'post',
        data: data
    })
}
export function removefloor(data){
    return request({
        url: '/api3/removefloor',
        method: 'post',
        data: data
    })
}
export function queryfloor(data){
    return request({
        url: '/api3/queryfloor',
        method: 'post',
        data: data
    })
}
export function queryfloorbyid(data){
    return request({
        url: '/api3/queryfloorbyid',
        method: 'post',
        data: data
    })
}

export function queryshetuanalllist(data){
    return request({
        url: '/api3/queryshetuanalllist',
        method: 'post',
        data: data
    })
}

export function updatashetuanstatus(data){
    return request({
        url: '/api3/updatashetuanstatus',
        method: 'post',
        data: data
    })
}

export function queryallfeelist(data){
    return request({
        url: '/api3/queryallfeelist',
        method: 'post',
        data: data
    })
}

export function updatafeestatus(data){
    return request({
        url: '/api3/updatafeestatus',
        method: 'post',
        data: data
    })
}

export function queryallnewslist(data){
    return request({
        url: '/api3/queryallnewslist',
        method: 'post',
        data: data
    })
}

export function updatanewsstatus(data){
    return request({
        url: '/api3/updatanewsstatus',
        method: 'post',
        data: data
    })
}


export function queryallarticle(data){
    return request({
        url: '/api3/queryallarticle',
        method: 'post',
        data: data
    })
}








//座位相关
export function addseat(data){
    return request({
        url: '/api3/addseat',
        method: 'post',
        data: data
    })
}
export function updataseat(data){
    return request({
        url: '/api3/updataseat',
        method: 'post',
        data: data
    })
}
export function removeseat(data){
    return request({
        url: '/api3/removeseat',
        method: 'post',
        data: data
    })
}
export function queryseatbyfloor(data){
    return request({
        url: '/api3/queryseatbyfloor',
        method: 'post',
        data: data
    })
}
export function queryseatbyid(data){
    return request({
        url: '/api3/queryseatbyid',
        method: 'post',
        data: data
    })
}

//任务相关
export function addtask(data){
    return request({
        url: '/api3/addtask',
        method: 'post',
        data: data
    })
}
export function updatatask(data){
    return request({
        url: '/api3/updatatask',
        method: 'post',
        data: data
    })
}
export function removetask(data){
    return request({
        url: '/api3/removetask',
        method: 'post',
        data: data
    })
}
export function querytask(data){
    return request({
        url: '/api3/querytask',
        method: 'post',
        data: data
    })
}
export function querytaskbyid(data){
    return request({
        url: '/api3/querytaskbyid',
        method: 'post',
        data: data
    })
}


//物品相关
export function addwupin(data){
    return request({
        url: '/api3/addwupin',
        method: 'post',
        data: data
    })
}
export function updatawupin(data){
    return request({
        url: '/api3/updatawupin',
        method: 'post',
        data: data
    })
}
export function removewupin(data){
    return request({
        url: '/api3/removewupin',
        method: 'post',
        data: data
    })
}
export function querywupin(data){
    return request({
        url: '/api3/querywupin',
        method: 'post',
        data: data
    })
}
export function querywupinbyid(data){
    return request({
        url: '/api3/querywupinbyid',
        method: 'post',
        data: data
    })
}

//预约相关
export function addyuyue(data){
    return request({
        url: '/api3/addyuyue',
        method: 'post',
        data: data
    })
}

export function updatayuyue(data){
    return request({
        url: '/api3/updatayuyue',
        method: 'post',
        data: data
    })
}

export function removeyuyue(data){
    return request({
        url: '/api3/removeyuyue',
        method: 'post',
        data: data
    })
}

export function queryyuyue(data){
    return request({
        url: '/api3/queryyuyue',
        method: 'post',
        data: data
    })
}

export function queryyuyuebyid(data){
    return request({
        url: '/api3/queryyuyuebyid',
        method: 'post',
        data: data
    })
}

export function insertchat(data){
    return request({
        url: '/api3/insertchat',
        method: 'post',
        data: data
    })
}


export function queryyuyuebyuser(data){
    return request({
        url: '/api3/queryyuyuebyuser',
        method: 'post',
        data: data
    })
}
export function querychat(data){
    return request({
        url: '/api3/querychat',
        method: 'post',
        data: data
    })
}
export function removeannouncement(data){
    return request({
        url: '/api3/removeannouncement',
        method: 'post',
        data: data
    })
}
export function updateannostatus(data){
    return request({
        url: '/api3/updateannostatus',
        method: 'post',
        data: data
    })
}
export function updateannouncement(data){
    return request({
        url: '/api3/updateannouncement',
        method: 'post',
        data: data
    })
}
export function addannouncement(data){
    return request({
        url: '/api3/addannouncement',
        method: 'post',
        data: data
    })
}
export function queryannouncement(data){
    return request({
        url: '/api3/queryannouncement',
        method: 'post',
        data: data
    })
}




export function deleteresult(data){
    return request({
        url: '/api3/deleteresult',
        method: 'post',
        data: data
    })
}


export function addkaoshiresult(data){
    return request({
        url: '/api3/addkaoshiresult',
        method: 'post',
        data: data
    })
}


export function queryresult(data){
    return request({
        url: '/api3/queryresult',
        method: 'post',
        data: data
    })
}

export function updatasubmitdata(data){
    return request({
        url: '/api3/updatasubmitdata',
        method: 'post',
        data: data
    })
}

export function selectsubmit(data){
    return request({
        url: '/api3/selectsubmit',
        method: 'post',
        data: data
    })
}

export function fankuiremove(data){
    return request({
        url: '/api3/fankuiremove',
        method: 'post',
        data: data
    })
}















//查询发单人填写表单数据
export function searchSysform(data){
    return request({
        url: '/api3/searchSysform',
        method: 'post',
        data: data
    })
}

/**
 * 调用邮箱发送验证码
 */
 export function send_ketnum_email(data){
    return request({
        url:`/api3/send_ketnum_email`,
        method: 'post',
        data: data
    })
}


/**
 * 发单人数据修改
 */
 export function updataSysform(data){
    return request({
        url:`/api3/updataSysform`,
        method: 'post',
        data: data
    })
}


/**
 * 发单人数据删除
 */
 export function sysformremove(data){
    return request({
        url:`/api3/sysformremove`,
        method: 'post',
        data: data
    })
}


/**
 * 认领与非认领修改
 */
 export function updateFormlock(data){
    return request({
        url:`/api3/updateFormlock`,
        method: 'post',
        data: data
    })
}


/**
 * 接单人数据补充修改
 */
 export function updatagetform(data){
    return request({
        url:`/api3/updatagetform`,
        method: 'post',
        data: data
    })
}


/**
 * 出库人数据补充修改
 */
 export function updatagetoutform(data){
    return request({
        url:`/api3/updatagetoutform`,
        method: 'post',
        data: data
    })
}


/**
 * 出库人标记修改
 */
 export function updateFormoutlock(data){
    return request({
        url:`/api3/updateFormoutlock`,
        method: 'post',
        data: data
    })
}



/**
 * 查询接单人员
 */
 export function searchuserjd(data){
    return request({
        url:`/api3/searchuserjd`,
        method: 'post',
        data: data
    })
}


/**
 * 创建修改人员时校验是否已经存在
 */
 export function searchbyno(data){
    return request({
        url:`/api3/searchbyno`,
        method: 'post',
        data: data
    })
}

//日志查询
export function operateLogquery(data){
    return request({
        url:`/api3/operateLogquery`,
        method: 'post',
        data: data
    })
}

//通过账号获取邮箱

export function getemailbyid(data){
    return request({
        url:`/api3/getemailbyid`,
        method: 'post',
        data: data
    })
}

//通过账号获取邮箱

export function test(data){
    return request({
        url:`/api3/test`,
        method: 'post',
        data: data
    })
}

//修改订单状态
export function updateFormfinish(data){
    return request({
        url:`/api3/updateFormfinish`,
        method: 'post',
        data: data
    })
}







