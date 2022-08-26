import { defineStore } from 'pinia'
import { userData, userRegisterData } from '../types/authTypes'
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
                const response = await httpModule.post('account/users/', data)
                console.log(response)
            }
            catch(error) {
                // console.log(error)
            }
        }
    }
})