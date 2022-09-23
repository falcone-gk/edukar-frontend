import { defineStore } from 'pinia'
import { userData } from '../types/authTypes'
import router from '../router'
import httpModule from '../services/httpModule'

// Not including isAuthenticated since is boolean.
export interface userDataStorage {
    access: string,
    refresh: string
    username: string,
    email: string,
    picture: string
}

export const useAuthStore = defineStore('auth', {
    state: (): userData => {
        return {
            isAuthenticated: false,
            access: '',
            refresh: '',
            username: '',
            email: '',   // Using this value just to render in view
            picture: '',
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
        async saveUserData(data: userData) {
            this.$patch(data)
            this.isAuthenticated = true
            localStorage.setItem('userData', JSON.stringify(this.$state))
        },
        async updateAccessToken(token: string) {
            this.access = token
            localStorage.setItem('userData', JSON.stringify(this.$state))
        },
        async logout() {
            this.$reset()
            localStorage.clear()
        }
    }
})