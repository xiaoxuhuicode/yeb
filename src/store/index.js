import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 导出 vuex 让别的地方可以使用
 export default new Vuex.Store({
    // state可以理解为一个全局的对象，用来保存所有组件的一个公共的数据
    state: {
        routes: []
    },

    mutations: { // mutations 同步执行
        // 初始化路由
        initRoutes(state, data) {
            state.routes = data;
        }
    },

    actions: { // actions 异步执行

    }


});

