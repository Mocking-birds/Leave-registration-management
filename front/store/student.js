// stores/student.js
import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useStudentStore = defineStore('student', () => {
	let token = ref('')
	let student = ref()
	const setToken = (newToken) => {
		token.value = newToken
	}
	const setStudent = (newStudent) => {
		student.value = newStudent
	}
	
	return {token,student,setToken,setStudent}
});