import {useStudentStore} from '../store/student.js'

const baseUrl = 'http://localhost:8080/student'


//登录
export const studentLogin = (form) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: `${baseUrl}/login`,
			method: 'post',
			data: form,
			success: (res) => {
				console.log(res);
				if(res.data.status == 0){
					useStudentStore().setToken(res.data.data.token)
					useStudentStore().setStudent(res.data.data)
				}
				reslove(res.data)
			}
		})
	})
}

//注册
export const studentRegister = (form) => {
	return new Promise((reslove,reject) => {
		uni.request({
			url:`${baseUrl}/register`,
			method:'post',
			data: form,
			success: (res) => {
				console.log(res);
				reslove(res.data)
			}
		})
	})
}

//查询个人信息
export const studentInformation = (id) => {
	return new Promise((reslove,reject) => {
		uni.request({
			url:`${baseUrl}/${id}`,
			method:'get',
			success: (res) => {
				console.log(res);
				reslove(res.data)
			}
		})
	})
}