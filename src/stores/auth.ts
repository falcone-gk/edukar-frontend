import { defineStore } from 'pinia'
import { userData, userLoginData } from '../types/authTypes'
import router from '../router'
import httpModule from '../services/httpModule'

export const useAuthStore = defineStore('auth', {
    state: (): userData => {
        return {
            isAuthenticated: false,
            token: null,
            username: null,
        }
    },
    actions: {
        async signup(data: FormData) {
            try {
                await httpModule.post('account/users/', data)
                router.push({ name: 'after-signup' })
            }
            catch(error) {
                console.log(error)
            }
        },
    }
})