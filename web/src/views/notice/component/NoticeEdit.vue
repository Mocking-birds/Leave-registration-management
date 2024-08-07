<script setup>
import { ref } from 'vue'
import { getNoticeById, editNotice,addNotice } from '@/api/notice'
import { useMessageStore } from '@/stores/message'

let form = ref([])

let dialog = ref(false)

let submit = ref()

//调用父组件方法
const emit = defineEmits(['page-start'])

//打开对话框
const openDialog = async (type, scope) => {
    //type判断是添加还是修改
    dialog.value = true
    submit.value = type

    if (type == 'edit') {
        const res = await getNoticeById(scope.row.id)
        console.log(res);
        form.value = res.data.data
    } else {
        form.value = {
            title: null,
            content: null
        }
    }
}


//提交
const onSubmit = async () => {
    if (submit.value == 'edit') {
        const res = await editNotice(form.value)

        //ElMessage弹窗
        useMessageStore().message(res.data)
        dialog.value = false

        //调用父组件渲染函数让页面刷新
        emit('page-start')
    } else {

        const res = await addNotice(form.value)

        //ElMessage弹窗
        useMessageStore().message(res.data)
        dialog.value = false

        //调用父组件渲染函数让页面刷新
        emit('page-start')
        
    }
}

//暴露openDialog方法
defineExpose({
    openDialog
})

</script>

<template>
    <el-dialog v-model="dialog" title="公告" width="500" align-center>
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item label="公告标题">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input v-model="form.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="dialog = false">Cancel</el-button>
                <el-button type="primary" @click="onSubmit">
                    提交
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped></style>
