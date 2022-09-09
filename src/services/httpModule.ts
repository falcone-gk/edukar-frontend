import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

// Algun dia se solucionara xd
// const env: string = process.env.ENX || "dev"

const endpoints = {
    'dev': 'http://127.0.0.1:8000/',
    'PRODUCTION': '',
    'default': 'http://127.0.0.1:8000/'
}

const httpModule = axios.create({
  baseURL: endpoints.dev
})

httpModule.interceptors.request.use(
  config => {
    //let state = store.getState() // para obtener el store de pinia y jalar auth
    const authStore = useAuthStore()
    const token: string | null = authStore.access
    if (config.headers && token) {
      config.headers['Authorization'] = 'JWT ' + token;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

httpModule.interceptors.response.use(
  response => {
    return response
    // Vscode marca error cuando se quiere tomar los datos del response
    // return response.data
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/account/token/create" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const authStore = useAuthStore()
        try {
          // Send refresh token to get new access token
          const response = await httpModule.post("/account/token/refresh/", {
            refresh: authStore.refresh,
          });
          // Update access token
          const { access } = response.data;
          authStore.updateAccessToken(access)
          return httpModule(originalConfig);
        } catch (_error) {
          authStore.logout()
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
)

export default httpModule