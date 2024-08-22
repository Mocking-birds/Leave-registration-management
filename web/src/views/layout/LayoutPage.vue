<script setup>
import { User, Postcard, Menu, Files, School, ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

let username = useUserStore().user.username

//退出登录
const quit = () => {
    localStorage.clear()
    router.push('/login')
}

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col>
                        <h5 class="title">请假管理系统</h5>
                        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                            text-color="rgb(255,255,255)" router active-text-color="rgb(224, 240, 12)"
                            background-color="rgb(0, 97, 161)" @close="handleClose">
                            <el-menu-item index="/student">
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span>用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="/notice">
                                <el-icon>
                                    <Postcard />
                                </el-icon>
                                <span>公告管理</span>
                            </el-menu-item>
                            <el-sub-menu index="">
                                <template #title>
                                    <el-icon>
                                        <Menu></Menu>
                                    </el-icon>
                                    <span>审核管理</span>
                                </template>
                                <el-menu-item index="/examine/go"><el-icon>
                                        <School />
                                    </el-icon>出校审核</el-menu-item>
                                <el-menu-item index="/examine/enter"><el-icon>
                                        <School />
                                    </el-icon>返校审核</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item index="/record">
                                <el-icon>
                                    <Files />
                                </el-icon>
                                <span>申请记录管理</span>
                            </el-menu-item>

                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ username }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-aside {
    height: 100vh;
    background: rgb(0, 97, 161);
}

.title {
    font-size: 20px;
    font-weight: bolder;
    color: white;
    text-align: center;
}

.el-menu {
    background: rgb(0, 97, 161);
    border: none;
}

.el-header {
    background: rgb(0, 97, 161);
    display: flex;
    align-items: center;
    justify-content: end;
}

.el-main {
    height: calc(100vh - 60px);
}

.el-dropdown {
    color: white;
    cursor: pointer;
    border: none;
}
</style>
