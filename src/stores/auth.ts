import { defineStore } from 'pinia'
import { userData } from '../types/authTypes'
import router from '../router'
import httpModule from '../services/httpModule'

export const useAuthStore = defineStore('auth', {
    state: (): userData => {
        return {
            isAuthenticated: false,
            token: null,
            username: null,
            email: 'example@example.com',   // Using this value just to render in view
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