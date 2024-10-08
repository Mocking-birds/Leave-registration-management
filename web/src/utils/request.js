import axios from 'axios'
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { ElMessage } from 'element-plus';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  });

  // 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    config.headers.Authorization = useUserStore().token || ''
    if(!useUserStore().token){
      router.push('/login')
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    
    if(response.data.status == 404){
      router.push("/login")
      ElMessage.error(response.data.message)
      localStorage.clear()
    }
    
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default request;