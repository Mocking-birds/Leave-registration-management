
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    let user = ref([])

    let setUser = (res) => {
        user.value = res
    }

    let token = ref()

    let setToken = (res) => {
        token.value = res
    }

    return { user, token, setUser, setToken }
},{
    persist: true
})
