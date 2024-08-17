<script setup>
	import TabBar from '../../components/TabBar.vue'
	import {ref} from 'vue'
	import {getNotice} from '../../api/notice.js'
	import {addGo} from '../../api/go.js'
	import {addEnter} from '../../api/center.js'
	import {useStudentStore} from '../../store/student.js'
	import { onShow } from '@dcloudio/uni-app'
	
	//轮播图列表
	let swiperList = ref([
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',  
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',  
		'https://cdn.uviewui.com/uview/swiper/swiper3.png'
	])
	
	//分段器列表
	let subsectionList = ref(['出校申请','返校申请'])
	
	//申请表单
	let applyForm = ref({
		reason:'',
		username:''
	})
	
	//公告数组
	let noticeText = ref([])
	
	//消息提示按钮
	let show = ref(false)
	
	//消息提示文本
	let message = ref()
	
	//判断当前为出校申请还是返校申请
	let subsectionIndex = ref('0')
	
	//获得基本数据
	const getData = async () => {
		const res = await getNotice()
		console.log(res);
		res.data.records.forEach((item)=>{
			noticeText.value.push(item.content)
		})
		console.log(noticeText.value);
		
		applyForm.value.username = useStudentStore().student.username
	}
	
	// 监听页面显示，页面每次出现在屏幕上都触发(必须使用他，
	//因为直接调用方法的话当切换其他页面后再切换回来的话不会再次调用)
	onShow(() => {
		getData()
	})
	
	//点击公告打开弹出层
	const open = (index) => {
		message.value = noticeText.value[index]
		show.value = true
		console.log(message.value);
	} 
	
	//关闭弹出层
	const close = () => {
		show.value = false
	}
	
	//分段器改变
	const subsectionChange = (index) => {
		applyForm.value.reason = ''
		subsectionIndex.value = index
	}
	
	//提交申请
	const submitApply = async () => {
		console.log('123');
		console.log(subsectionIndex.value);
		if(subsectionIndex.value == '0'){
			//出校申请
			let form = {
				username: applyForm.value.username,
				reason: applyForm.value.reason
			}
			const res = await addGo(form)
			console.log(res);
		}else if(subsectionIndex.value == '1'){
			//返校申请
			let form = {
				username: applyForm.value.username,
				reject: applyForm.value.reason
			}
			const res = await addEnter(form)
			console.log(res);
		}
	}
</script>

<template>
	<view class="home">
		<!-- 轮播图 -->
		<up-swiper
		            :list="swiperList"
					:autoplay="true"
					circular
					displayMultipleItems = '1'
		    ></up-swiper>
			
		<!-- 公告 -->
		<view class='notice'>
			<up-notice-bar 
				direction = "column"
				:text="noticeText"
				@click="open"
			></up-notice-bar>
		</view>
			
		<!-- 弹出层 -->
		<up-popup :show="show" mode="top">
		        <view style="padding:20px;margin:20px;max-width: 100vw;">
		            <view style="margin:10px 0">{{message}}</view>
					<up-button type="primary" text="确定" @click="close">关闭</up-button>
		        </view>
		</up-popup>
		
		<!-- 分段器 -->
		<view class='subsection'>
			<up-subsection :list="subsectionList" @change="subsectionChange"></up-subsection>
			<up-form
				:model="applyForm"
			>
				<up-form-item
					label="申请理由："
					prop="reason"
					borderBottom
				>
					<up-input
						v-model="applyForm.reason"
						border="none"
					></up-input>
				</up-form-item>
				<up-form-item
					borderBottom
				>
					<up-button type="primary" text="确定" @click='submitApply'>申请</up-button>
				</up-form-item>
			</up-form>
		</view>
			
		<TabBar></TabBar>
	</view>
</template>

<style lang="scss" scoped>
	.home{
		height: 100vh;
		background-color: #f1f1f1;
		.notice{
			margin-top:20px;
			margin-left: auto;
			margin-right: auto;
			width: 80%;
			border-radius: 20px;
		}
		.subsection{
			margin-top:40px;
			::v-deep .u-form{
				background-color: #ffffff;
			}
		}
	}
</style>