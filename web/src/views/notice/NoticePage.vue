<script setup>
import { ref } from 'vue'
import { getNotice, deleteNotice } from '@/api/notice'
import dayjs from 'dayjs'
import { Edit, Delete } from '@element-plus/icons-vue'
import NoticeEdit from './component/NoticeEdit.vue'
import { useMessageStore } from '@/stores/message'

//主页面表格数据
let tableData = ref([])

//总公告数
let total = ref(0)

//当前所在页数
let pageNum = ref(1)

//每页的公告条数
let pageSize = ref(5)




//子传父
let child = ref(null)


//渲染页面
const getNoticeData = async () => {
    const res = await getNotice(pageNum.value, pageSize.value)

    console.log(res);

    total.value = res.data.data.total


    //遍历公告，将里面的时间按照指定格式改变
    res.data.data.records.forEach(element => {
        element.time = dayjs(element.time).format('YYYY-MM-DD HH:mm:ss')

    });

    tableData.value = res.data.data.records

}
getNoticeData()

//删除
const deleteOne = async (id) => {

    const res = await deleteNotice(id)
    //弹窗
    useMessageStore().message(res.data)
    //重新渲染页面
    getNoticeData()
}
</script>

<template>

    <div class="common-layout">
        <el-container>
            <el-header>
                <el-button type="primary" class="add" @click="child.openDialog('add')">添加公告</el-button>
            </el-header>
            <NoticeEdit ref="child" @page-start="getNoticeData"></NoticeEdit>
            <el-main>
                <el-scrollbar max-height="750px">
                    <el-table :data="tableData" border style="width: 100%" fit>
                        <el-table-column prop="title" label="公告标题" min-width="180" align="center" />
                        <el-table-column prop="content" label="公告内容" min-width="180" align="center" />
                        <el-table-column prop="time" label="创建时间" min-width="180" align="center" />
                        <el-table-column label="操作" min-width="180" align="center">
                            <template #default="scope">
                                <el-button type="primary" :icon="Edit" circle
                                    @click="child.openDialog('edit', scope)" />
                                <el-button type="danger" :icon="Delete" circle @click="deleteOne(scope.row.id)" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize"
                        :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total=total
                        @size-change="getNoticeData" @current-change="getNoticeData" />
                </div>
            </el-main>
        </el-container>
    </div>

</template>

<style scoped>
:deep(.el-table__row) {
    height: 100px;
}

:deep(.cell) {
    /* 隐藏溢出的内容 */
    overflow: hidden;
    /* 确保文本不会换行 */
    white-space: nowrap;
    /* 使用省略号表示被截断的文本 */
    text-overflow: ellipsis;
}

.add {
    margin-left: 70px;
}

.demo-pagination-block {
    margin-top: 20px;
}
</style>
