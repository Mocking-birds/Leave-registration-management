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