//外出请假

import {useStudentStore} from '../store/student.js'

const baseUrl = 'http://localhost:8080/record'

//查（分页）
export const getGo = (pageNum,pageSize) => {
	return new Promise((reslove,reject) => {
		uni.request({
			url:`${baseUrl}/get/student`,
			method: 'get',
			data: {
				pageNum,
				pageSize,
				username: useStudentStore().student.username
			},
			header:{
				'Authorization': useStudentStore().token
			},
			success:(res) => {
				reslove(res.data)
			}
		})
	})
}
