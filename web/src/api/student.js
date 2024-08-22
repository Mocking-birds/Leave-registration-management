//学生信息api

import request from "@/utils/request";


//增
export const registerStudent = (form) => {
    return request.post('/student/register',form)
}

//删
export const deleteStudent = (id) => {
    return request.delete('/student/delete',{
        params:{
            id
        }
    })
}


//查
export const getStudent = (pageNum,pageSize) => {
    return request.get('/student/get',{
        params:{
            pageNum,
            pageSize
        }
    })
}