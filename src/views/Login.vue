<!-- 页面代码 -->
<template>
    <div>
        <el-form :rules="rules"
                 v-loading="loading"
                 ref="loginForm"
                 :model="loginForm"
                 class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <!-- 用户名框 -->
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username"
                          placeholder="请输入用户名">
                </el-input>
            </el-form-item>
            <!-- 密码框 -->
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password"
                          placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <!-- 验证码框 -->
            <el-form-item prop="code">
                <el-input type="text" auto-complete="false" v-model="loginForm.code"
                          placeholder="点击图片更换验证码" style="width: 250px; margin-right: 5px">
                </el-input>
                <!-- 使用v-bind把img标签的src属性与数据绑定 -->
                <img :src="captchaUrl" @click="updateCaptcha"> <!-- 验证码图片，需要请求后台接口获取 -->
            </el-form-item>
            <!-- 记住我 -->
            <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
            <!-- 登录按钮 -->
            <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<!-- js代码 -->
<script>
    export default {
        name: "Login",
        data() {
            return {
                //请求后台获取验证码接口时，加个time参数，确保点击更换验证码能够刷新
                captchaUrl: '/captcha?time=' + new Date(),
                loginForm: {
                    username: 'admin',
                    password: '123456',
                    code: ''
                },
                loading: false,  // 是否显示loading
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            // 点击更换验证码
            updateCaptcha() {
                this.captchaUrl = '/captcha?time=' + new Date();
            },

            // 登录 点击事件方法
            submitLogin() {
                // 利用this.$refs反射找到 ref="loginForm" 取得表单进行校验
                this.$refs.loginForm.validate((valid) => {
                    if (valid) { // 提交表单, postRequest() 是在api.js已经定义axios请求
                        this.loading = true; // 显示loading
                        this.postRequest('/login', this.loginForm).then(resp => {
                            // alert(JSON.stringify(resp)); // 打印查看返回json对象
                            this.loading = false; // 关闭loading
                            if (resp) {
                                console.log(JSON.stringify(resp));
                                // 拼接登录成功后返回的 tokenHead 和 token
                                const tokenStr = resp.object.tokenHead + resp.object.token;
                                // 存储用户token，就可以在api.js的请求拦截器的config中获取了
                                window.sessionStorage.setItem('tokenStr', tokenStr);
                                //清空菜单
                                this.$store.commit('initRoutes', []);
                                // 页面跳转，处理未登录访问其他页面的问题
                                this.$router.replace('/home');
                            }
                        });
                    } else {
                        this.$message.error('请输入所有字段！');
                        return false;
                    }
                });
            }
        }
    }
</script>

<!-- 样式代码 -->
<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 188px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 0px auto 20px auto;
        text-align: center;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }

    /*设置输入验证码框，与验证码图片在一行*/
    .el-form-item__content {
        display: flex;
        align-items: center;
    }
</style>