<template>
  <div class="grid place-items-center">
    <div class="w-[350px] p-4 border-t border-t-gray-100 shadow-md">
      <div class="mb-4 w-full">
        <img class="mx-auto h-8 w-auto" src="@/assets/logo-edukar.png" alt="logo">
      </div>
      <form>
        <div class="mb-6">
          <label class="label-control" for="username">Nombre de usuario</label>
          <input id="username" class="form-control" type="text" name="username" v-model="loginForm.username">
        </div>
        <div class="mb-6">
          <label class="label-control" for="password">Contraseña</label>
          <input id="password" class="form-control" type="password" name="password" v-model="loginForm.password">
        </div>
        <p v-if="loginError" class="text-xs text-red-600 mb-3">Nombre o contraseña incorrectos.</p>
        <input class="w-full btn-primary" type="submit" value="Iniciar sesión"
          @click.prevent="onLogin(loginForm)">
      </form>
      <p class="text-sm mt-3">¿Se ha olvidado su contraseña? <a class="text-blue-400 underline cursor-pointer" @click="router.push({name: 'reset-password'})">Recuperar contraseña</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { userLoginData } from '../../types/authTypes';
import httpModule from '../../services/httpModule'

const authStore = useAuthStore()
const router = useRouter()

const loginForm = reactive<userLoginData>({
  username: '',
  password: ''
})

const loginError = ref<boolean>(false)

const onLogin = async (data: userLoginData) => {
  try {
    const response = await httpModule.post('account/token/create', data)

    loginError.value = false
    // After success in login, user data is stored.
    authStore.isAuthenticated = true
    authStore.token = response.data.access
    authStore.username = response.data.username
    authStore.email = response.data.email
    authStore.picture = response.data.picture

    // pushing to home view.
    router.push({ name: 'home' })
  } catch (error) {
    loginError.value = true
  }
}
</script>