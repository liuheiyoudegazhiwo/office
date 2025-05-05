//侧菜单的菜单数据模型
export function side_itemfun() {
    let arr = [
        {
            label: "系统管理",
            path: "/index/system",
            icon: 'el-icon-coordinate',
            svg: 'system.svg',
            children: [{
                label: "用户管理",
                path: "/index/system/user",
                icon: 'el-icon-coordinate',
                svg: 'user.svg'
            }, {
                label: "角色管理",
                path: "/index/system/role",
                icon: 'el-icon-coordinate',
                svg: 'peoples.svg'
            }, {
                label: "菜单管理",
                path: "/index/system/meun",
                icon: 'el-icon-coordinate',
                svg: 'tree-table.svg'
            }, {
                label: "部门管理",
                path: "/index/system/dept",
                icon: 'el-icon-coordinate',
                svg: 'tree.svg'
            }]
        }, {
            label: "日志管理",
            path: "/index/log",
            icon: 'el-icon-document',
            svg: 'log.svg',
            children: [{
                label: "操作日志",
                path: "/index/log/operation",
                icon: 'el-icon-document',
                svg: 'log.svg',
            }]
        }, {
            label: "系统设置",
            path: "/index/set",
            icon: 'el-icon-document',
            svg: 'tool.svg',
            children: [{
                label: "主页设置",
                path: "/index/set/index",
                icon: 'el-icon-document',
                svg: 'guide.svg',
            }]
        }, {
            label: "系统监控",
            path: "/index/monitor",
            icon: 'el-icon-document',
            svg: 'monitor.svg',
            children: [{
                label: "在线用户",
                path: "/index/monitor/onlineuser",
                icon: 'el-icon-document',
                svg: 'online.svg',
            },{
                label: "服务监控",
                path: "/index/monitor/server",
                icon: 'el-icon-document',
                svg: 'server.svg',
            }]
        }]

    return arr
}