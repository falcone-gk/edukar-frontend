<template>
  <!-- Modal used to show that a no logged user can't comment a post -->
  <ModalDialog :show="isShownLoginModalError"> 
    <template #title>Credenciales incorrectas</template>
    <template #default>
      <p>El nombre de usuario o contraseña son incorrectos!</p>
    </template>
    <template #buttons>
      <button @click="() => isShownLoginModalError=false" class="btn-primary">Cerrar</button>
    </template>
  </ModalDialog>
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
        <input class="w-full btn-primary" type="submit" value="Iniciar sesión"
          @click.prevent="onLogin(loginForm)">
      </form>
      <p class="text-sm mt-3">¿Se ha olvidado su contraseña? <a class="text-blue-400 underline cursor-pointer" @click="router.push({name: 'reset-password'})">Recuperar contraseña</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { userLoginData } from '../../types/authTypes';
import ModalDialog from '@/components/ModalDialog.vue';
import httpModule from '../../services/httpModule'

const authStore = useAuthStore()
const router = useRouter()

const loginForm = reactive<userLoginData>({
  username: '',
  password: ''
})

const isShownLoginModalError = ref(false)

const onLogin = async (data: userLoginData) => {
  try {
    const response = await httpModule.post('account/token/create', data)

    // After success in login, user data is stored.
    authStore.saveUserData(response.data)

    // pushing to home view.
    router.push({ name: 'home' })
  } catch (error) {
    isShownLoginModalError.value = true
  }
}
</script>