//出校审核api

import request from "@/utils/request";


//改
export const updateGo = (form) => {
    return request.put('/go',form)
}


//分页查询
export const getGo = (pageNum,pageSize,state) => {
    return request.get('/go/get',{
        params:{
            pageNum,
            pageSize,
            state
        }
    })
}