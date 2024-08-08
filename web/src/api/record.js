//申请记录管理api

import request from "@/utils/request";

export const getRecord = (pageNum,pageSize,state) => {
    return request.get('/record/get',{
        params:{
            pageNum,
            pageSize,
            state
        }
    })
}