// 返校审核api

import request from "@/utils/request";


//改
export const updateEnter = (form) => {
    return request.put('/enter',form)
}

//分页查询
export const getEnter = (pageNum,pageSize,state) => {
    return request.get('/enter/get',{
        params:{
            pageNum,
            pageSize,
            state
        }
    })
}

