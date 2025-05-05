//人员菜单的树形结构
export function user_dept_tree_fun() { 
    let arr = [{
        id: 1,
        label: '四川分公司',
        type:'fold',
        children: [{
            id: 4,
            label: '成都分公司',
            type:'fold',
            children: [{
                id: 9,
                label: '市场部'
            }, {
                id: 10,
                label: '技术部'
            }]
        }]
    }, {
        id: 2,
        label: '云南分公司',
        type:'fold',
        children: [{
            id: 5,
            label: '昆明分公司'
        }, {
            id: 6,
            label: '曲靖分公司'
        }]
    }, {
        id: 3,
        label: '贵州分公司',
        type:'fold',
        children: [{
            id: 7,
            label: '贵阳分公司'
        }, {
            id: 8,
            label: '毕节分公司'
        }]
    }]

    return arr
}