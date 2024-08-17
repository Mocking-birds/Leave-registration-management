<script setup>
import TabBar from '../../components/TabBar.vue'
import {ref} from 'vue'
import {getRecord} from '../../api/record.js'
import { onShow } from '@dcloudio/uni-app'

//顶部导航栏列表
let tabList = ref([
	{name: '全部'},
	{name: '请假申请'},
	{name: '返校申请'},
	{name: '未审核'},
	{name: '已通过'},
	{name: '已驳回'}
])

//全部
let allList = ref([])

//请假申请
let goList = ref([])

//返校申请
let enterList = ref([])

//未审核
let noList = ref([])

//已通过
let passList = ref([])

//已驳回
let noPassList = ref([])

//当前顶部tab所在的位置
let tabName = ref('全部')

//点击改变顶部导航栏
const changeTab = (index) => {
	tabName.value = index.name
}


//获得全部的申请信息
let getGoData = async () => {
	const res = await getRecord()
	console.log(res);
	allList.value = res.data
	allList.value.forEach(item => item.time = item.time.replace('T',' '))
	
	
	goList.value = allList.value.filter(item => item.type == '出校申请')
	enterList.value = allList.value.filter(item => item.type == '返校申请')
	noList.value = allList.value.filter(item => item.state == '未审核')
	passList.value = allList.value.filter(item => item.state == '已通过')
	noPassList.value = allList.value.filter(item => item.state == '已驳回')
}

// 监听页面显示，页面每次出现在屏幕上都触发(必须使用他，
//因为直接调用方法的话当切换其他页面后再切换回来的话不会再次调用)
onShow(() => {
	getGoData()
})

//通过顶部tab判断渲染哪个数组
let replaceTab = () => {
	if(tabName.value == '全部'){
		return allList.value
	}else if(tabName.value == '请假申请'){
		return goList.value
	}else if(tabName.value == '返校申请'){
		return enterList.value
	}else if(tabName.value == '未审核'){
		return noList.value
	}else if(tabName.value == '已通过'){
		return passList.value
	}else if(tabName.value == '已驳回'){
		return noPassList.value
	}
}

//获取折叠面板下的数据
let getText = (item) => {
	let text = {
		"姓名": item.username,
		"审核状态": item.state,
		"时间": item.time,
		"申请类型": item.type,
	}
	
	if(item.reject){
		text.驳回原因 = item.reject
	}
	if(item.reason){
		text.出校原因 = item.reason
	}
	if(item.notes){
		text.返校理由 = item.notes
	}
	console.log(text);
	return Object.entries(text)
	
	
	
}
</script>

<template>
	<view class="all">
		<up-sticky bgColor="#fff">
		    <up-tabs :list="tabList" @click="changeTab"></up-tabs>
		</up-sticky>
		
		<up-collapse>
			<up-list-item
				v-for="(item,index) in replaceTab()"
				:key = "index"
			>
				<up-collapse-item
					:title="`${item.type}----${item.state}----${item.time}`"
					@click = "open"
				>
					<view v-for="(value,key) in getText(item)" :key = "key">{{value[0]}}  :   {{value[1]}}</view>
				</up-collapse-item>
			</up-list-item>
		</up-collapse>
		
		
		<TabBar></TabBar>
	</view>
	
</template>

<style scoped>
	.all{
		height: 100vh;
		background:#f1f1f1;
	}
	::v-deep .u-collapse{
		background-color: #ffffff;
	}
</style>