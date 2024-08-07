//公告api
import request from "@/utils/request";

//增
export const addNotice = (form) => {
    return request.post('/notice/add',form)
}

//删
export const deleteNotice = (id) => {
    return request.delete('/notice/delete',{
        params:{
            id
        }
    })
}

//修改
export const editNotice = (form) => {
    return request.put('/notice',form)
}

//分页查询
export const getNotice = (pageNum,pageSize) => {
    return request.get('/notice/get',{
        params:{
            pageNum,
            pageSize
        }
    })
}

//根据id查询
export const getNoticeById = (id) => {
    return request.get(`/notice/${id}`)
}