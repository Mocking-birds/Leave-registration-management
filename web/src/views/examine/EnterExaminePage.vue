<script setup>
import {ref} from 'vue'
import {getEnter, updateEnter} from '@/api/enter'
import { ArrowDownBold } from '@element-plus/icons-vue'


//表格数据
let tableData = ref()

//对话框开关
let dialog = ref(false)

//驳回理由
let rejectReason = ref()

//当前选中的审核
let examineData = ref({})

//当前所在页数
let pageNum = ref(1)

//每页的公告条数
let pageSize = ref(5)

//出校审核总数
let total = ref(0)


//渲染表格
const getGoData = async (state) => {
    console.log(state);
    
    const res = await getEnter(pageNum.value, pageSize.value,state)
    console.log(res);

    total.value = res.data.data.total

    tableData.value = res.data.data.records
}
getGoData('')

//筛选点击事件
const handleCommand = (command) => {
    console.log(command);
    getGoData(command)
    
}

//通过与驳回
const updateData = async (text, data) => {
    examineData.value = { ...data }
    if (text == '驳回') {
        dialog.value = true
    } else {
        examineData.value.state = '已通过'
        const res = await updateEnter(examineData.value)
        console.log(res);
        getGoData('')
    }
}

//驳回
const submitReject = async () => {
    console.log(examineData.value);
    examineData.value.state = '已驳回'
    examineData.value.reject = rejectReason.value
    console.log(examineData.value);

    const res = await updateEnter(examineData.value)
    console.log(res);

    dialog.value = false

    getGoData('')

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
                        <el-table-column prop="time" label="创建时间" min-width="180" align="center" />
                        <el-table-column label="操作" min-width="180" align="center">
                            <template #default="scope">
                                <el-button type="primary" @click="updateData('通过', scope.row)"
                                    :disabled="scope.row.state != '未审核' ? true : false">通过</el-button>
                                <el-button type="danger" @click="updateData('驳回', scope.row)"
                                    :disabled="scope.row.state != '未审核' ? true : false">驳回</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>

                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
                        :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                        @size-change="getGoData('')" @current-change="getGoData('')" />
                </div>

                <el-dialog v-model="dialog" title="驳回" width="500">
                    <el-input v-model="rejectReason" autocomplete="off" placeholder="请输入你的驳回理由" />
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialog = false">取消</el-button>
                            <el-button type="primary" @click="submitReject">
                                确认
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped></style>
