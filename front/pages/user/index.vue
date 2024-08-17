<script setup>
	import TabBar from '../../components/TabBar.vue'
	import {ref} from 'vue'
	import {useStudentStore} from '../../store/student.js'
	import {getRecord} from '../../api/record.js'
	import {studentInformation} from '../../api/student.js'
	import { onShow } from '@dcloudio/uni-app'
	
	//头像
	let src = ref()
	
	//头像列表
	let avatarList = ref()
	
	//昵称
	let username = ref()
	
	//总申请记录
	let allList = ref([])
	
	//请假申请
	let goList = ref([])

	//返校申请
	let enterList = ref([])
	
	//已通过审核
	let passList = ref([])
	
	//申请记录的列表
	let modifyList = ['修改基本信息','退出登录']
	
	//退出登录弹出框开关
	let exitShow = ref(false)
	
	//修改基本信息开关
	let informationShow = ref(false)
	
	//表单数据
	let formData = ref({
		"password":'',
		"avatar":''
	})
	
	
	//点击表单里的任何一项打开对应弹出层
	const click = (item) => {
		console.log(item);
		if(item == '退出登录'){
			exitShow.value = true
		}else if(item == '修改基本信息'){
			informationShow.value = true
		}
	}
	
	
	//上传头像
	const afterRead = (e) => {
		avatarList.value[0].url = e.file[0].url
	}
	
	//获取基本数据
	const getData = async () => {
		console.log(useStudentStore().student);
		//通过拼接获得static下保存的图片地址
		if(useStudentStore().student.avatar){
			src.value = "../../../../static/" + useStudentStore().student.avatar.split("\\").pop()
		}
		username.value = useStudentStore().student.username
		
		formData.value = useStudentStore().student
		formData.value.password = ''
		avatarList.value = [{url:src.value}]
		
		let res = await getRecord(0,0)
		allList.value = res.data
		allList.value.forEach(item => item.time = item.time.replace('T',' '))
		goList.value = allList.value.filter(item => item.type == '出校申请')
		enterList.value = allList.value.filter(item => item.type == '返校申请')
		passList.value = allList.value.filter(item => item.type == '已通过')
		
	}
	
	// 监听页面显示，页面每次出现在屏幕上都触发(必须使用他，
	//因为直接调用方法的话当切换其他页面后再切换回来的话不会再次调用)
	onShow(() => {
		getData()
	})
	
	//模态框点击取消
	const cancel = () => {
		informationShow.value = false
		getData()
	}
	
	//退出登录点击确认
	const confirm = () => {
		exitShow.value = false
		uni.redirectTo({
			url: '/pages/login/index'
		})
	}
	
	//修改基本信息确认
	const informationConfirm = () => {
		uni.downloadFile({
			url:avatarList.value[0].url,
			success:(res)=>{
				
				const tempFilePath = res.tempFilePath
				
				uni.uploadFile({
					url:'http://localhost:8080/student/avatar',
					filePath:tempFilePath,
					name:'file',
					formData:formData.value,
					success: async (res) => {
						console.log(formData.value);
						const result = await studentInformation(formData.value.id)
						console.log(result);
						useStudentStore().setStudent(result.data)
						console.log(useStudentStore().student);
						cancel()
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			}
		})
	}
</script>

<template>
	<view class="user">
		<view class="avatar">
			<up-avatar :src="src" size="90"></up-avatar>
			<view class="username">{{username}}</view>
		</view>
		<view class="record">
			<view class="main">
				<view class="record-title">
					<up-icon name="grid-fill" color="rgb(0, 170, 255)"></up-icon>
					<view class="record-title-text">
						申请记录
					</view>
				</view>
				<view class="content">
					<view class="content-item">
						<view class="num">
							{{goList.length}}
						</view>
						<view>
							出校申请
						</view>
					</view>
					<view class="content-item">
						<view class="num">
							{{enterList.length}}
						</view>
						<view>
							返校申请
						</view>
					</view>
					<view class="content-item">
						<view class="num">
							{{passList.length}}
						</view>
						<view>
							已通过审核
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="modify-userinfo">
			<up-list>
				<up-list-item
					v-for="(item, index) in modifyList"
					:key="index"
				>
					<view class="list-item-content" @click='click(item)'>
						<up-cell :title="item">
						</up-cell>
						<up-icon name="arrow-right"></up-icon>
					</view>
				</up-list-item>
			</up-list>
			
			<!-- 修改基本信息弹出层 -->
			<view >
				<up-modal 
					:show="informationShow" 
					showCancelButton="true"
					title = '修改个人信息'
					@cancel = "cancel"
					@confirm = "informationConfirm"
				>
				<view>
						<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
						<up-form
								labelPosition="left"
								:model="formData"
						>
							<up-form-item
									label="请输入新密码："
									prop = 'password'
									borderBottom
							>
								<up-input
									v-model = 'formData.password'
									border="none"
								></up-input>
							</up-form-item>
							<up-form-item
									label="更换头像"
									prop = 'avatar'
									borderBottom
							>
								<up-upload
									:fileList="avatarList"
									@afterRead = 'afterRead'
									multiple
									:maxCount="2"
									:previewFullImage="true"
								></up-upload>
							</up-form-item>
						</up-form>
					</view>
				</up-modal>
			</view>
			
			<!-- 退出登录弹出层 -->
			<view >
				<up-modal 
					:show="exitShow" 
					showCancelButton="true"
					@cancel = "exitShow = false"
					@confirm = "confirm"
					content = '确定要退出登录吗？'
				>
				</up-modal>
			</view>
		</view>
		<TabBar></TabBar>
	</view>
</template>

<style lang="scss" scoped>
	::v-deep .u-cell__body.data-v-3fd6feca{
		height:50px;
	}
	
	.user{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f1f1f1;
		.avatar{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: rgb(0, 170, 255);
			border-radius:0 0 20px 20px ;
			height: 200px;
			.username{
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				text-align: center;
				width: 40%;
				margin:10px 0;
				padding:10px 0;
				font-size: 18px;
				font-weight: bold;
				color:white;
			}
		}
		.record{
			width: 90%;
			border-radius: 10px;
			background-color: white;
			margin-top: -40px;
			.main{
				padding:10px;
				.record-title{
					display: flex;
					.record-title-text{
						margin-left:5px;
					}
				}
				.content{
					display: flex;
					justify-content: space-around;
					padding:20px 0;
					.num{
						text-align: center;
						line-height: 30px;
					}
				}
			}
		}
		.modify-userinfo{
			width: 90%;
			border-radius: 10px;
			background-color: white;
			margin-top: 20px;
			.list-item-content{
				display: flex;
				justify-content: space-between;
				padding:0 10px;
			}
			::v-deep scroll-view{
				height: auto !important;
			}
		}
	}
	
</style>