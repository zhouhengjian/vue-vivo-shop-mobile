import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// 引入 axios 用于ajax请求
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入自定义的全局变量及方法
import common from './function/common.js'
Vue.prototype.$common = common

// 引入第三方插件
import '@/lib/rem/rem.js'

// 引入moment时间插件，用于格式化时间，全局使用，例：{{item.addTimer | dateformat（YYYY-MM-DD HH:mm:ss）}}
import moment from 'moment'
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

// 引入本地全局样式
import "@/assets/css/reset.css"
import "@/assets/fonts/iconfont.css"


//引入UI组件
import "./assets/css/swiper.min.css"
import "./assets/js/swiper.min.js"

import Vant from 'vant'
import { Dialog } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)


Vue.config.productionTip = false

// 进入每一条路由之前先判断是否登录
router.beforeEach((to, from, next) => {
    //获取用户登录成功后储存的登录标志
    let getFlag = JSON.parse(sessionStorage.getItem("loginInfo"))
        //如果登录标志存在且为isLogin，即用户已登录
    if (getFlag && getFlag.Flag === "isLogin") {
        //设置vuex登录状态为已登录
        store.state.isLogin = true
        next();
        //如果已登录，还想进入登录注册界面，则定向回首页
        if (to.path == "/login") {
            Dialog.alert({
                message: '请先退出登录'
            }).then(() => {
                // on close
                next({ path: '/home' })
            })
        }
    } else {
        // 如果登录标志不存在， 即未登录
        // 用户想进入需要登录的页面，则定向回首页界面
        if (to.meta.isLogin) {
            Dialog.alert({
                message: '请先登录'
            }).then(() => {
                // on close
                next({ path: '/home' })
            })
        } else {
            //用户进入无需登录的界面，则跳转继续
            next()
        }
    }
})

// 进入路由后跳到该页面顶部，多余的东西，想删就删
router.afterEach(route => { window.scroll(0, 0) })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")