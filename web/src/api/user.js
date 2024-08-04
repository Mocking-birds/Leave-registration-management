import request from "@/utils/request";

export const userLogin = (form) => {
    return request.post('/user/login',form)
}

export const userRegister = (form) => {
    return request.post('/user/register',form)
}