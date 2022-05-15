import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入Font-Awesome样式
import 'font-awesome/css/font-awesome.css'
// 引入封装的请求
import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'

import {initMenu} from "./utils/menus";

// 关闭浏览器控制台关于环境的一个相关提示 默认 false 为关闭
Vue.config.productionTip = false
// 使用ElementUI
Vue.use(ElementUI);

// 插件的形式使用封装的请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

// 配置路由导航守卫
router.beforeEach((to, from, next) => {
  // 通过判断存储在sessionStorage中的 tokenStr 看是否登录了
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store);
    next();
  } else {
      next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');