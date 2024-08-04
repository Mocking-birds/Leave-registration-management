
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
 const message = (data) => {
    data.status == 0 ? ElMessage.success(data.message) : ElMessage.error(data.message)
 }

  return { message }
})
