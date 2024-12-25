import { createApp } from 'vue' // 引入 createApp 方法
import App from '@/App.vue'     // 引入 App.vue 组件

import router from '@/router' // 引入路由模块
// 导入全局路由守卫 需要放在 router 之后
import '@/permission'
import '@/assets/main.css'      // 引入 main.css 样式文件
import 'animate.css'; // 引入 animate.css 动画库
import 'nprogress/nprogress.css' // 引入 nprogress.css 样式文件


// 创建应用，并将 App 根组件挂载到 <div id="#app"></div> 中
const app = createApp(App)
app.use(router) // 注册路由
app.mount('#app') // 挂载到 <div id="#app"></div> 中
