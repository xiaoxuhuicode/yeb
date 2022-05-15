<template>
    <el-container>
        <!-- header -->
        <el-header class="homeHeader" >
            <div class="title">云E办系统</div>
            <el-dropdown class="userInfo" @command="commandHandler">
                <span class="el-dropdown-link">{{user.name}}<img :src="user.userFace"></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </el-header>

        <el-container>
            <!-- aside -->
            <el-aside width="200px">
                <!-- 左侧导航菜单 -->
                <el-menu router unique-opened>
                    <!-- 循环出菜单 -->
                    <el-submenu :index="index + ''" v-for="(item, index) in routes" :key="index"
                                v-if="!item.hidden">
                        <!-- 一级菜单 -->
                        <template slot="title">
                            <i :class="item.iconCls" style="color:#1accff; margin-right:5px;"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="children.path" v-for="(children, indexj) in item.children" :key="indexj">
                            {{children.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- Main -->
            <el-main>
<!--                &lt;!&ndash; 面包屑 &ndash;&gt;-->
<!--                <el-breadcrumb separator-class="el-icon-arrow-right"-->
<!--                               v-if="this.$router.currentRoute.path!='/home'">-->
<!--                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--                    <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>-->
<!--                </el-breadcrumb>-->
<!--                <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">-->
<!--                    欢迎来到云E办系统！-->
<!--                </div>-->
                <!-- 路由 -->
                <router-view />
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
          return{
              user:JSON.parse(window.sessionStorage.getItem("user"))
          }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(command) {
                if (command == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => { // 点击确定按钮执行这里
                        // 调用后台注销登录接口
                        this.postRequest('/logout');
                        // 清除浏览器sessionStorage的数据
                        window.sessionStorage.removeItem('tokenStr');
                        window.sessionStorage.removeItem('user');
                        // 清空vuex里存储的菜单列表数据
                        this.$store.commit('initRoutes', []);
                        // 跳转到登录页
                        this.$router.replace('/');
                    }).catch(() => { // 点击取消按钮执行这里
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        })
                    });
                }
            }
        }
    }
</script>

<style>
    .homeHeader {
        background: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    /* 给homeHeader下面的title设置样式*/
    .homeHeader .title {
        font-size: 30px;
        font-family: 华文楷体;
        color: white;
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 40px;
        height: 40px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文楷体;
        color: #409eff;
        padding-top: 50px;
    }

    .homeRouterView {
        margin-top: 10px;
    }
</style>