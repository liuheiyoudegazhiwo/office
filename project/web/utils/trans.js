//存放转换函数
import { side_itemfun } from '@/mode/side_item'

/**
 * 入参为选中的左侧菜单，输出需要的参数（菜单全路径、url、菜单名称等）
 */
export function trans_url_parmsfun(val, arr) {
    let obj = {}
    // let arr = side_itemfun()
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].children.length; j++) {
            if (arr[i].children[j].path == val) {
                obj = {
                    path: arr[i].children[j].path,
                    label: arr[i].children[j].label,
                    baseitem: [arr[i].label, arr[i].children[j].label],
                    active: true
                }
            }

        }

    }
    return obj
}

/**
 * 判断val是否存在于arr通过str这个key判断，如果存在访问所在索引
 */
export function get_indexof_flagfun(arr, val, str) {
    let obj = {
        flag: false,
        index: ''
    }
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (item[str] == val[str]) {
            obj.flag = true
            obj.index = i
        }
    }
    return obj
}

/**
 * 时间格式转换Mon Aug 15 2022 00:00:00 GMT+0800 (中国标准时间)转化为 2022-08-24
 */
export function trans_data_fun(str) {
    let d = new Date(str)
    let resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
    return resDate
}


export function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {}
    for (var key in obj) {
        //Object.prototype.hasOwnProperty.call(obj, key)
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy(obj[key])  //递归复制
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}

/**
 * 入参为对象数组和key 输出key值字符串
 */
export function trans_arr_key(val, arr) {
    let outarr = []
    for (let i = 0; i < arr.length; i++) {
        let object = arr[i]
        for (let key in object) {
            if (key === val) {
                outarr.push(object[key])
            }
        }
    }
    return outarr.join(",")
}


export function gettranskeyfun() {
    //题目类型	标题	选项1	选项2	选项3	选项4	选项5	选项6	答案	所属题库

    let keyMap = {
        '题目类型': 'tmlx',
        '标题': 'tmnr',
        '选项1': 'tmda1',
        '选项2': 'tmda2',
        '选项3': 'tmda3',
        '选项4': 'tmda4',
        '选项5': 'tmda5',
        '选项6': 'tmda6',
        '答案': 'tmzqda',
        '所属题库':'belong',
        '难度':'nandu',
        '解析':'jiexi',
        '分数':'fenshu'
        
    }
    return keyMap
}

// 111000答案转化ABC
export function getnumberda(val) {
    let strdata = val + ''
    let str = ''
    try {
        let arr = strdata.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '1') {
            if (i == 0) {
                str = str + 'A'
            }
            if (i == 1) {
                str = str + 'B'
            }
            if (i == 2) {
                str = str + 'C'
            }
            if (i == 3) {
                str = str + 'D'
            }
            if (i == 4) {
                str = str + 'E'
            }
            if (i == 5) {
                str = str + 'F'
            }
            if (i == 6) {
                str = str + 'G'
            }
            if (i == 7) {
                str = str + 'H'
            }
            if (i == 8) {
                str = str + 'I'
            }
            if (i == 9) {
                str = str + 'J'
            }
        }
    }
    } catch (error) {
        
    }
    



    return str
}



function p(s) {
    return s < 10 ? '0' + s : s
}