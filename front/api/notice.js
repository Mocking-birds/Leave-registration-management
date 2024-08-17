//公告

import {useStudentStore} from '../store/student.js'

const baseUrl = 'http://localhost:8080/notice'

export const getNotice = () => {
	return new Promise((reslove,reject) => {
		uni.request({
			url:`${baseUrl}/get`,
			method: 'get',
			data: {
				pageNum: 1,
				pageSize: 5,
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