//返校申请

import {useStudentStore} from '../store/student.js'

const baseUrl = 'http://localhost:8080/go'

export const addGo = (form) => {
	return new Promise((reslove,reject) => {
		uni.request({
			url:`${baseUrl}/add`,
			method:'post',
			data: form,
			header:{
				'Authorization':useStudentStore().token
			},
			success:(res) => {
				reslove(res.data)
			}
		})
	})
}