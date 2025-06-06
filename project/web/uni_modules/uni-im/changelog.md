## 3.4.54（2025-02-17）
- 更新 丰富群公告管理功能
- 修复 在部分 iOS 系统下，切换表情包后再聚焦，会导致键盘高度不正确的问题
- 修复 web-pc 端部分文件类型消息点击后不会自动下载的问题，并新增下载进度提示
- 修复 私聊历史记录发到群聊后，显示的标题不正确的问题
- 修复 部分情况下，创建本地临时会话时，会话标题不可见的问题
- 修复 解决折叠屏下，会话分类标题过大的问题
- 解决 web-pc 端群信息模块，由于 css 包含块错误，引起在部分显示器下看不到退群按钮的问题
- 更新 将 msg-content 从 uni-im-msg 中独立出来，方便在部分场景下渲染消息格式数据
- 新增 支持配置 loginAfterHookUrl，用于实现用户登录到 uni-im 后通知外部服务器
- 新增 uni-im-co 增加 getUserIdByExtUid 方法，实现通过外部用户 ID 获取 uni-id-users._id 的功能
## 3.4.53（2025-01-21）
- 更新 修复 web-pc 端切换会话没有重置lastMsgIsShow的值，导致消息列表不显示最新消息的问题
## 3.4.52（2025-01-20）
- 修复 解决部分角色账号查 msg 表会报没有权限的问题
- 修复 在腾讯云版 unicloud 下uni-im-co.login 方法，部分情况下会报错的问题
- 更新 uni-im-conversation表相关的索引字段类型
## 3.4.51（2025-01-18）
- 更新 废弃uni-im-co的httpApi方法，引入beforeHttp.js。实现在请求uni-im-co的url接口调用任意方法时，验证合法性，定义当前用户信息及客户端信息 [详情查看](https://doc.dcloud.net.cn/uniCloud/uni-im.html#httpcallimco)
- 更新 uni-im-msg 表新增发送消息的用户的 ip 地址
## 3.4.50（2025-01-16）
- 更新 uni-im-co.login 方法use-param的判断条件
## 3.4.49（2025-01-16）
- 更新 解决编译到微信小程序端报错的问题
## 3.4.48（2025-01-15）
- 更新 uni-im-co新增getUnreadCount方法，实现通过uni-im-web-load插件集成的项目，可通过httpApi调用此方法获取会话未读消息数 
- 更新 uni-im-co.login不依赖uni-id-users.identities，解决部分服务空间不支持数组查询的问题
- 更新 优化样式，使界面更紧凑，显示更多消息内容
- 更新 优化进入话题的功能
- 新增 支持显示历史@消息
- 更新 会话筛选类型新增 @我的
- 新增 web-pc端支持设置用户别名与备注
- 修复 部分情况下，客户端将会话设置为免打扰后，未读消息总数计算错误的问题
## 3.4.47（2025-01-03）
修复 App端点击输入框上的完成按钮，键盘收起，但是输入框不收起的问题
## 3.4.46（2024-12-31）
- 更新 优化App端 切换表情与文本两种输入模式时会失去焦点，输入框高度没有固定等体验的问题
- 更新 拆开联表查询为多次查询，解决慢查询问题
## 3.4.45（2024-12-27）
更新 uni-im-co.login中字段名user info 统一为 userInfo，解决部分情况下报mainAppInfo找不到的问题
## 3.4.44（2024-12-26）
- 新增 uni-im-co/login适配http请求，新增支持传mainAppInfo实现将主app的push client id记录至uni-id-device表，实现离线推送
- 新增 消息输入框自定义撤销快捷键，实现更合理的撤回逻辑
- 优化 语音消息组件的性能
- 修复 部分情况下，富文本消息中包含多张图片时出现上传失败的问题
- 修复 处理文件名称大小写问题，解决在cli模式下运行报错的问题
## 3.4.43（2024-12-23）
更新 修复部分情况下web-pc端消息列表滚动条未置底时新消息气泡不显示的问题
## 3.4.42（2024-12-20）
- 更新 消息中包含的网络链接如果指向app的内部页面，则直接跳转到指定页面，不再打开浏览器新窗口
- 修复 ios 端消息输入时，输入框可以被向上拖动的问题
- 修复 分享名片功能出错的问题
- 修复 解决 App 端全屏播放视频时关闭按钮不显示的问题
## 3.4.41（2024-11-25）
- 更新 消息分享功能支持移动端
- 更新 优化部分情况下，多余的uni-id-users查询逻辑
- 修复 部分低版本iOS设备下，消息输入框不能获取焦点的问题
## 3.4.40（2024-11-18）
uni-im-co 新增 httpApi 方法，方便外部服务器调用其url化后的方法
## 3.4.39（2024-11-15）
- 新增 客户端错误日志收集功能
- 修复 由3.4.37更新引起的解散群功能出错的问题
## 3.4.38（2024-11-14）
更新 去掉可选链，兼容 Nodejs12
## 3.4.36（2024-11-12）
修复 弱网的情况下，消息含图片等资源上传失败后，点击重发后接收方收到的消息资源错误的问题
更新 查找好友页面不再显示当前用户自己
更新 uni-im-co的_after存在error时，新增输出“stack”方便定位到错误代码位置
## 3.4.35（2024-11-11）
修复 因3.4.33 更新引起的部分情况下 web-pc 端点击私信会话的详情拿到的信息错误的问题
## 3.4.34（2024-11-08）
修复 因3.4.33 更新引起的点击群聊的成员打开的新会话不正确的问题
## 3.4.33（2024-11-08）
- 新增 配置项增加check_mobile，用于配置发起会话和申请加入群聊时是否校验手机号码
- 修复 会话最后一条消息带action时，界面刷新/重启后会重复触发action的问题
- 修复 web端部分情况下本地创建的单聊临时会话相关页面打开后直接刷新出错的问题
- 修复 conversation_grade为100且customer_service_uids未配置时未拦截非好友通讯的问题
## 3.4.32（2024-11-07）
更新 修复部分情况下，视频封面获取失败的问题
## 3.4.31（2024-11-07）
- 【重要】优化架构，进一步提高内聚性，降低耦合度，同时提升性能，解决点开超大群会话卡顿等问题
- 新增 会话分类功能，方便用户对会话进行查找
- 新增 被@的人如果是当前用户，则显示蓝色背景以凸显的功能，增强交互提示
- 新增 引用回复时自动加 @消息发送人功能
- 新增 支持设置会话为星标会话，便于用户对重要会话进行标记
- 更新 拉群用户进群功能，候选列表不再隐藏已加群的用户，且默认选中状态下不可编辑，优化用户操作逻辑
- 更新 退出群聊后，自动移除相关会话并删除相关聊天数据
- 更新 在web pc端，群成员不再一次性展开，改为点击一次加载一部分，并判断云端是否有更多数据，若有则拉取并展示，优化页面加载性能
- 更新 兼容最新版uni-popup
- 更新 消息中冗余用户昵称和头像信息
- 修复 置顶会话数超过一页时，拉取会话会出现数据缺失的问题
- 修复 在部分特殊情况（如弱网、服务器宕机等）下，重发消息接收方无法收到的问题
- 修复 当群已经解散后，用户访问加群链接直接抛出异常的问题
- 修复 用户申请加强后，被其他管理员被动拉入群聊，管理员再点击同意（过期的）加群申请后报错的问题
- 修复 消息输入框粘贴时，未删除选中内容的问题
- 修复 粘贴内容文本包含< >时内容丢失的问题
- 修复 app端长按消息和滚动列表同时触发的问题
- 解决 消息内容含\n被转义的问题
- 解决 previewImage误触发onShow、onHide的问题
- 修复 用户主动退群、被踢出群聊、群解散时，不会自动删除群列表和会话列表相关数据的问题
- 修复 删除和添加好友未实时刷新好友列表的问题
- 修复 消息本身是is_mute的情况下，仍会收到离线通知的问题
- 修复 点击富文本消息中的图片，当图片为多张时，无法直接定位到第n张的问题
## 3.1.6（2024-06-24）
- 修复 解决了会话列表的滚动与长按事件冲突的问题
- 修复 App端 “会话操作菜单”弹出后，侧滑返回时未关闭菜单而直接关闭会话页面的问题
- 修复 移动端 代码类型消息显示宽度不正确的问题
- 修复 被解散/踢出群的群成员，收不到相关事件通知的问题
- 修复 解决了 msg note 中存在 &nbsp;符号的问题
- 修复 web移动端 修复了会话列表高度错误的问题
## 3.1.5（2024-06-21）
- 新增 数据库索引文件
- 新增 支持用户设置自己的会话为已读/未读
- 新增 unipush 的channel相关配置，防止应用被避免被限量推送、静默推送（静音且需下拉系统通知栏才可见通知内容）
- 修复 由于将“user_id”错误地改为“uid”而导致在群聊场景下“@用户”的功能中，消息内容里的已读未读图标无法显示的问题。
- 修复 部分情况下，APP 端所登录的账号于其他端同时进行登录后发送消息时，也会在 APP端创建通知栏消息的问题
- 修复 会话列表的 note 存在&nbsp;的问题
- 优化样式
## 3.1.4（2024-06-19）
- 优化 web-pc 端样式
- 修复 web-pc 的消息菜单扩展点，传入的会话数据找不到的问题
- 修复 因整体样式调整引起的，当前用户自己发的消息，显示到左边的问题
## 3.1.3（2024-06-18）
- 优化 解决部分消息文本没有换行的问题
- 更新 uni-im 的相关组件，不再使用 scoped，App和小程序端页面引用的baseStyle也不再使用 ::v-deep（Web 端由于框架 bug，暂时保留::v-deep，后续会进行拉平处理）
## 3.1.2（2024-06-18）
- 修复 微信小程序端样式错误
## 3.1.1（2024-06-18）
- 删除 多余的文件
## 3.1.0（2024-06-17）
- 【重要】去掉所有nvue页面，消息输入框改用renderjs实现，消息列表改用翻转消息列表实现
- 更新 新增群成员活跃时间（最后一场发消息时间）的字段，后续将利用此字段时间优化群消息送达顺序，群会话打开速度等
- 修复 本地不存在的会话收到 1 条消息，角标会+2 的问题
## 3.0.5（2024-06-05）
修复 编译到App端报`Cannot assign to "fileType" because it is a constant`的问题
## 3.0.4（2024-05-09）
- 优化 对于含有图片的消息数据，新增了图片的宽高值，使图片加载前可以固定容器高度，从而避免列表抖动
- 优化 多个会话切换的草稿功能，提升性能消息输入的性能
- 优化 消息列表滚动到底时，自动隐藏“有新消息”提示
- 优化 微调“有新消息”提示的样式
## 3.0.3（2024-05-08）
- 修复 代码错误导致云端扩展框架缓存无效的问题
## 3.0.2（2024-05-08）
- 修复 解决部分云厂商的uniCloud环境不支持写缓存文件引起的问题
## 3.0.1（2024-05-08）
- 修复 解决在低版本 Node.js 环境中不支持可选链的问题
## 3.0.0（2024-05-06）
【重要】更新整体架构，支持子插件
## 2.0.11（2023-06-12）
-  修复 当引用的内容较长且包含换行符时，引用内容会盖住输入框的问题
## 2.0.10（2023-05-25）
- 修复 时间错误
## 2.0.10（2023-05-25）
- 修复 Vue3-web-pc端 敲完回车会先执行换行再发送消息的问题
## 2.0.9（2023-05-25）
- 修复 因为`2.0.8`优化sqlite，引起的web端报`ReferenceError: sqlite is not defined`的问题
## 2.0.8（2023-05-24）
- 修复 app-android端 部分情况下发送消息会卡在发送中，再次点击雪花图标后才能发送的问题
## 2.0.7（2023-05-23）
- 修复 当聊天对话输入框，文字内容超过一行时，切换到语音输入模式；录音按钮位置不正确的问题。
- 修复 不选择任何好友直接创建群聊，客户端不显示创建者的加群记录的问题
- 优化 当会话为群聊时，标题栏显示群人数
- 优化 代码浏览功能的tab-size为4
## 2.0.6（2023-05-22）
- 修复 Vue3下报 `ReferenceError: Cannot access 'getCloudMsgIng' before initialization`的问题
## 2.0.5（2023-05-19）
- 修复 iOS端 应用切换到后台之后收到消息，再打开应用，部分情况下会丢消息的问题
- 修复 微信小程序端 播放语音报错的问题
- 修复 微信小程序端 发送视频，显示为文件格式，没有用video组件显示的问题
- 修复 微信小程序端 打开对话窗口 偶尔不能自动滚动到最新一条消息的问题
- 修复 微信小程序端 在非tabbar界面收到消息或系统通知后tabbar的角标不更新的问题
- 重构 app-nvue代码浏览模块
- 修复 云存储临时链接过期后播放视频语音等报错的问题
- 修复 部分情况下 tabbar角标不更新的问题
## 2.0.4（2023-04-24）
- 修复 web端 部分情况下 收到新消息需要延迟滚动到最新消息的问题
## 2.0.3（2023-04-20）
- 新增 限制只能撤回2分钟内的消息（群主不受任何限制）
- 修复 微信小程序端发送图片报错的问题
- 修复 Vue2 H5端dom加载慢时，showLast报错
- 修复 新发送的消息 时间不刷新的问题
## 2.0.2（2023-04-18）
- 修复 Vue2模式 聊天时间当消息过长会消失的问题
## 2.0.1（2023-04-17）
1. 修复 当用户接收到消息后关闭im，消息发送者再撤回消息。且在push指令离线消息时效过期后，用户再打开im，撤回无效的问题。
2. 修复 微信小程序端滑动快的时候会抖动的问题
3. 修复 部分情况下，群聊消息发不出去的问题
4. 修复 Vue2模式下 消息不满一屏插入消息无效
5. 修复 创建群聊时，如果没有选择任何用户。报res 不存在的错误
6. 修复 部分情况下群聊消息必须刷新后才能撤回的问题
## 2.0.0（2023-04-14）
【重要】v2版正式发布
## 1.6.3（2023-03-06）
- 新增 移动APP端，应用桌面角标数，动态同步未读消息数
- 修复 同一个账号同时在多台设备登录，其中一台设备发送消息，其他设备未同步消息的问题
- 修复 当应用被切换到后台时，应用进程未被关闭，但socket进程被关闭的情况下。切回到前台，期间的消息丢失的问题
## 1.6.2（2023-03-03）
- 修复 当项目一启动且token无效时，直达与某个用户对话。跳转至登录页面后返回会话页面报`无效的conversation_id`的问题
## 1.6.1（2023-02-27）
- 修复 因版本号1.5.9引起的微信小程序端拿不到globalData的问题
## 1.5.9（2023-02-24）
- 修复 群聊消息时间不显示的问题
- 修复 部分情况下 加好友不显示昵称的问题
- 修复 部分情况下 web手机端创建群聊后不会自动返回的问题
## 1.5.8（2023-02-23）
- 修复 部分情况下 非uniCloud项目接入uni-im 联登成功后报找不到uniIdCo的问题
## 1.5.7（2023-02-22）
- 更新 优化会话表查询性能，防止数据量大时慢查询
## 1.5.6（2023-02-20）
- 修复 部分情况下 群聊功能，提示有新用户进群的消息样式不正确的问题
## 1.5.5（2023-02-17）
- 修复 Vue2下不支持“可选链操作符”导致的报错问题
## 1.5.4（2023-02-16）
- 修复 pc端 当消息不满一页时，来回切换同一个用户 会一直提示正在加载历史消息的问题
## 1.5.3（2023-02-15）
- 修复 在safari浏览器下的兼容问题
- 修复 快速滚动消息列表 偶发加载不了更多消息的问题
## 1.5.2（2023-02-15）
- 修复 iOS端 部分情况下不会自动滚动到最后一条消息的问题
## 1.5.1（2023-02-14）
- 修复 部分情况下会话列表页面 最新一条消息不刷新，未读消息数不递增的问题
## 1.5.0（2023-02-11）
- 更新示例项目 演示分包加载 uni-im
- 更新 抽离聊天对话页面的消息列表，为独立组件； 分层简化代码 更清晰方便二开
- 修复 因iOS端 微信小程序平台 键盘弹出后 引起的输入框偶尔位置不正确的问题
## 1.4.4（2023-02-03）
- 更新示例项目 采用分包使用uni-id-pages
- 更新 默认不启用代码浏览模块
## 1.4.3（2023-01-29）
- 注释多余的`console.log`代码
## 1.4.2（2023-01-29）
- 优化 微信小程序平台 部分全面屏挡住UI操作不方便的问题
- 修复 因iOS端 微信小程序平台 键盘弹出后 调用 pageScrollTo 偶尔会导致 textarea 组件的 adjust-position=false 失效，而引起的 输入框错位的问题（兼容方案，后续微信小程序官方修复后可移除相关代码）
## 1.4.1（2023-01-28）
- 优化 切换发送消息类型的性能（软键盘不再频繁收起和弹出）
- 修复 iOS端 微信小程序平台 键盘弹出后 连续发送消息输入框跟随移动的问题
- 修复 iOS端 部分机型 发送语音功能 蒙版显示不完整的问题
- 修复 uni-im-co 某些情况下调用this.uniIdCommon 报错的问题
## 1.4.0（2023-01-18）
- 【重要】新增 群聊功能
- 【重要】新增 好友关系管理功能
**注意：** 这是一个不兼容的更新，需要执行jql修改相关字段，详情查看:[升级旧项目为 uni-im 1.4.0（群聊版） 注意事项](https://uniapp.dcloud.net.cn/uniCloud/uni-im.html#%E5%8D%87%E7%BA%A7%E6%97%A7%E9%A1%B9%E7%9B%AE%E4%B8%BA-uni-im-1-4-0-%E7%BE%A4%E8%81%8A%E7%89%88-%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
## 1.3.3（2022-12-05）
- 新增 移动端支持emoji表情
## 1.3.2（2022-12-05）
- 修复 因vue2与vue3下 :key 的位置要求不同 引起的chat页面报错问题
## 1.3.1（2022-12-05）
- 修复 1.3.0版引起的截图粘贴发送失败的问题
- 修复 集成到 uni-admin 中样式设置失败的问题
## 1.3.0（2022-12-02）
- 修复 APP端当消息未满半屏时，弹出的键盘会将消息顶出界面外
- 新增 消息类型支持代码模式
- 新增 支持超长文本（仅代码模式支持，后续会支持普通消息模式）
- 新增 多媒体消息（含：语音、图片、视频、任意文件），App和小程序端支持使用第三方程序打开文件
## 1.2.1（2022-11-25）
- 修复 某些情况下 非uniCloud 开发的项目 接入uni-im 登录后会话列表不更新的问题
## 1.2.0（2022-11-23）
- 【重要】全端支持Vue3
- 修复 当历史消息超长时，APP端键盘弹起，不能滚动到最后一条消息
- 修复 键盘收起时，会自动滚动到最后一条消息的问题
- 修复 部分情况下，切换登录的账号，会话列表没有更新的问题
## 1.1.2（2022-11-21）
修复 某些情况下 iOS端 输入框内容发生变化时 页面重新排版，导致输入框被键盘挡住的问题
## 1.1.1（2022-11-18）
修复 向长时间未登录的用户（push_clientid已过期）发送消息，引起的报错问题。将数据写入云数据库，当用户再次登录时从服务端拉取
## 1.1.0（2022-11-18）
- 新增 支持 非uniCloud（比如：应用服务端的开发语言是php、java、go、c#、python等）或 不基于uni-id-pages 开发的项目 接入uni-im
- 简化部署流程 app.vue 页面仅需init uni-im即可（更加模块化，内部：监听应用生命周期onShow、onHidden实现相关功能、初始化依赖的globalData等）
## 1.0.3（2022-11-15）
降低uni-im使用的HBuilderX版本为`3.6.4`。 注意**APP端**：仅支持Vue2，且HBuilderX的版本为3.6.9+，否则chat页面存在滚动锚定问题（后续会修复此问题）
## 1.0.2（2022-11-14）
使用 1.2.3 版的 uni-list-chat 解决部署在腾讯云版uniCloud的uni-im项目 头像不能显示的问题
## 1.0.1（2022-11-14）
修复 因nvue下行间样式无法覆盖导致的 样式错误
## 0.0.1（2022-11-04）
init