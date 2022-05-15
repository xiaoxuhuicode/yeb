import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true  // 在循环显示菜单时不显示这个的标志
    }

];

const router = new VueRouter({
    routes
});

export default router;