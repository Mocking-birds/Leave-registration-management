<script setup>
import {ref} from 'vue'
import {getRecord} from '@/api/record'
import { ArrowDownBold } from '@element-plus/icons-vue'

//表格数据
let tableData = ref()


//当前所在页数
let pageNum = ref(1)

//每页的公告条数
let pageSize = ref(5)

//出校审核总数
let total = ref(0)

//渲染表格
const getRecordData = async (state) => {
    console.log(state);
    
    const res = await getRecord(pageNum.value, pageSize.value,state)
    console.log(res);

    total.value = res.data.data.total

    tableData.value = res.data.data.records
}
getRecordData('')

//筛选点击事件
const handleCommand = (command) => {
    console.log(command);
    getRecordData(command)
}
</script>

<template>
<div class="common-layout">
    <el-container>
            <el-header>
                <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        筛选<el-icon class="el-icon--right"><arrow-down-bold /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="">全部</el-dropdown-item>
                            <el-dropdown-item command="未审核">未审核</el-dropdown-item>
                            <el-dropdown-item command="已通过">已通过</el-dropdown-item>
                            <el-dropdown-item command="已驳回">已驳回</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <el-scrollbar max-height="750px">
                    <el-table :data="tableData" border style="width: 100%" fit>
                        <el-table-column prop="username" label="用户名" min-width="180" align="center" />
                        <el-table-column prop="notes" label="备注" min-width="180" align="center" />
                        <el-table-column prop="state" label="审核状态" min-width="180" align="center" />
                        <el-table-column prop="reject" label="驳回原因" min-width="180" align="center" />
                        <el-table-column prop="type" label="申请类型" min-width="180" align="center" />
                        <el-table-column prop="time" label="创建时间" min-width="180" align="center" />
                    </el-table>
                </el-scrollbar>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
                        :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total=total
                        @size-change="getRecordData('')" @current-change="getRecordData('')" />
                </div>
            </el-main>
        </el-container>
  </div>
</template>

<style scoped>
</style>
