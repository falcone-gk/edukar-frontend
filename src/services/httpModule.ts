import axios from 'axios'
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
    const token: string | null = authStore.token
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
  err => {
    const error: {statusCode: null | string, message: null | string} = {
      statusCode: null,
      message: null
    }
    if (!err.response) {
      error.message = 'No se pudo conectar con el servidor'
    } else {
      error.message = err.response.data.message || 'Oops!, Algo salió mal'
    }
    return Promise.reject(error)
  }
)

export default httpModule