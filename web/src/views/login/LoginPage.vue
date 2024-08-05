<script setup>
import {ref} from 'vue'
import { userLogin,userRegister } from '../../api/user'
import {useMessageStore} from '../../stores/message.js'
import {useUserStore} from '../../stores/user.js'

//遮罩层文本
let maskText = ref('还没有注册吗？快去注册吧！')
let to = ref(true)

//登录表单
let Loginform = ref({
    username: '',
    password: ''
})

//注册表单
let Registerform = ref({
    username: '',
    password: '',
})

let clear = (data) => {
    data.username = ''
    data.password = ''
}

//登录注册跳转
let goTo = () => {
    let mask = document.querySelector('.mask')
    if(to.value){
        //to register
        maskText.value = '还没有登录吗？快去登录吧！'
        to.value = false
        mask.style.left = '300px'
        mask.style.background = 'rgb(191, 227, 241)'
        clear(Loginform.value)
    }else{
        maskText.value = '还没有注册吗？快去注册吧！'
        to.value = true
        mask.style.left = 0
        mask.style.background = 'rgb(247, 209, 215)'
        clear(Registerform.value)
    }  
}

//登录
const toLogin = async () => {
    const res = await userLogin(Loginform.value)
    console.log(res);
    useUserStore().user = res.data.data
    useUserStore().token = res.data.data.token
    useMessageStore().message(res.data)
}

//注册
const toRegister = async () => {
    const res = await userRegister(Registerform.value)
    console.log(res);
    useMessageStore().message(res.data)
    if(res.data.status == 0){
        to.value = false
        goTo()
    }
}
</script>

<template>
    <div class="box">
        <div class="all">
            <!-- 注册 -->
            <el-form :model="Registerform" label-width="auto" style="max-width: 600px">
                <el-form-item>
                    <p>注册</p>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Registerform.username" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Registerform.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="toRegister">Register</el-button>
                </el-form-item>
                <el-form-item></el-form-item>
            </el-form>
            <!-- 遮罩 -->
            <div class="mask">
                <div @click="goTo">{{ maskText }}</div>
            </div>
            <!-- 登录 -->
            <el-form :model="Loginform" label-width="auto" style="max-width: 600px">
                <el-form-item>
                    <p>登录</p>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Loginform.username" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="Loginform.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="toLogin">Login</el-button>
                </el-form-item>
                <el-form-item></el-form-item>
            </el-form>
        </div>
    </div>

</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
}

.all {
    width: 600px;
    height: 300px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
    border-radius: 10px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
}

.mask {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(247, 209, 215);
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size: 17px;
    z-index: 999;
    transition: all 1s;
}
.mask div:hover{
    cursor: pointer;
}

.el-form {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.el-button {
    width: 150px;
    height: 40px;
}

p {
    font-size: 25px;
    color: white;
}

</style>
