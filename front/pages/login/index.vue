<script setup>
	import {
		ref
	} from 'vue'
	
	import {studentLogin,studentRegister} from '../../api/student.js'
	import {useStudentStore} from '../../store/student.js'

	//form表单数据
	let form = ref({})
	
	//消息提示
	const uToastRef = ref(null)
	
	//登录
	const toLogin = async () => {
		console.log(form.value);
		const res = await studentLogin(form.value)
		console.log(res);
		uToastRef.value.show({
			message:res.message,
			type: res.status == 1 ? 'error' : 'success'
		})
		
		if(res.status == 0){
			useStudentStore().setStudent(res.data)
			console.log(useStudentStore().student);
			uni.switchTab({
				url: '/pages/home/index'
			})
		}else{
			form.value.username = '',
			form.value.password = ''
		}
		
	}
	
	//注册
	const toRegister = async () => {
		const res = await studentRegister(form.value)
		uToastRef.value.show({
			message:res.message,
			type: res.status == 1 ? 'error' : 'success'
		})
	}
	
</script>

<template>
	<view class="login">
		<view class="title">
			请假登记管理系统前台
		</view>
		
		<up-toast ref="uToastRef"></up-toast>

		
		<up-form :model="form">
			<up-form-item>
				<up-input 
					placeholder="请输入用户名" 
					prefixIcon="account-fill" 
					v-model="form.username"
				></up-input>
			</up-form-item>
			<up-form-item>
				<up-input 
					placeholder="请输入密码" 
					prefixIcon="lock-fill" 
					v-model="form.password"
				></up-input>
			</up-form-item>
			<up-form-item>
				<up-button type="primary" text="确定" @click="toLogin">登录</up-button>
			</up-form-item>
			<up-form-item>
				<up-button type="success" text="确定" @click="toRegister">注册</up-button>
			</up-form-item>
		</up-form>
	</view>
</template>

<style scoped>
	.login{
		height: 100vh;
		background-color: #f5f5dc;
	}
	.title {
		text-align: center;
		font-size: 18px;
		font-weight: 900;
		color: #32B9FF;
		padding: 30px 5px;
		padding-top: 60px;
	}
	/* 深度选择器 */
	/deep/ .u-button--square{
		width: 550rpx !important;
		border-radius: 40rpx !important;
	}
	/deep/ .u-form-item{
		width: 550rpx !important;
	}
	/deep/ .u-form{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>