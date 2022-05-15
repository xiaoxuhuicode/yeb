import axios from 'axios'
// 引入Message消息框
import {Message} from 'element-ui';
import router from '../router';

// 请求拦截器
axios.interceptors.request.use(config => {
    // 如果存在token，请求携带这个token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;

}, error => {
    //
    console.log(error);
});

// 响应拦截器，方便请求失败或者响应失败的情况进行统一的处理，进行封装
axios.interceptors.response.use(success => {  ///// 调用成功情况
    // 调用成功，但业务逻辑错误
    if (success.status && success.status == 200) {
        //
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;

}, error => {  ///// 调用失败情况
    // 访问接口失败的情况
    if (error.response.code == 504 || error.response.code == 400) {
        Message.error({message: '服务器被吃了o(╯□╰)o'});
    } else if (error.response.code == 403) {
        Message.error({message: "权限不足，请联系管理员！"});
    } else if (error.response.code == 401) {
        Message.error({message: "尚未登录，请登录！"});
        // 跳转到登录页
        router.replace('/');
    } else {
        if (error.response.data.message) { // 有响应信息就打印出来
            Message.error({message: error.response.data.message});
        } else { // 没有响应信息，打印未知错误！
            Message.error({message: '未知错误！'});
        }
    }
    return;

});

let base = '';  // let类型是ES6的写法

// 导出 传送json格式的 post 请求，参数是 url 和 params
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`, // 注意这里不是一个单引号
        data: params
    })
};

// 导出 传送json格式的 put 请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
};

// 导出 传送json格式的 get 请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
};

// 导出 传送json格式的 delete 请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
};