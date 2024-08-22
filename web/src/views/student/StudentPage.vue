<script setup>
import { ref } from 'vue'
import { getStudent, deleteStudent, registerStudent } from '@/api/student'
import { Delete } from '@element-plus/icons-vue'
import { useMessageStore } from '@/stores/message'


//主页面表格数据
let tableData = ref([])

//总用户数
let total = ref(0)

//当前所在页数
let pageNum = ref(1)

//每页的用户条数
let pageSize = ref(5)

//添加学生表单
let form = ref({})

//对话框开关
let dialog = ref(false)

//获取基本数据
const getData = async () => {
    const res = await getStudent(pageNum.value, pageSize.value)
    console.log(res);
    tableData.value = res.data.data.records
    total.value = res.data.data.total
}

getData()


//删
const deleteOne = async (id) => {
    const res = await deleteStudent(id)
    console.log(res);
    //弹窗
    useMessageStore().message(res.data)
    getData()
}

//取消对话框
const cancel = () => {
    dialog.value = false
    form.value = []
}

//添加学生
const addStudent = async () => {
    console.log(form.value);

    const res = await registerStudent(form.value)
    console.log(res);
    useMessageStore().message(res.data)
    if (res.data.status != 1) {
        dialog.value = false
        getData()
    }
}

</script>

<template>
    <div>
        <el-container>
            <el-header>
                <el-button type="primary" @click="dialog = true">添加用户</el-button>
            </el-header>
            <el-main>
                <el-scrollbar max-height="750px">
                    <el-table :data="tableData" border style="width: 100%" fit>
                        <el-table-column prop="username" label="姓名" min-width="180" align="center" />
                        <el-table-column label="操作" min-width="180" align="center">
                            <template #default="scope">
                                <el-button type="danger" :icon="Delete" circle @click="deleteOne(scope.row.id)" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
                        :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total=total
                        @size-change="getData" @current-change="getData" />
                </div>
            </el-main>
        </el-container>

        <!-- 对话框 -->
        <el-dialog v-model="dialog" title="添加学生" width="500" align-center>
            <el-form :model="form" label-width="auto">
                <el-form-item label="姓名：">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStudent">添加</el-button>
                    <el-button type="info" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<style scoped></style>
