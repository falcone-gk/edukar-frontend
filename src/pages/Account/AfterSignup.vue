<template>
  <Announcement :title="title" :imageName="imgSrc">
    <p class="mb-4">Felicidades por registrarte a Edukar, para poder logearte tienes que verificar tu cuenta, para ello
      te hemos enviado un email a tu correo <span class="text-primary-color">{{ authStore.email }}</span>.</p>
    <p>¿No te llegó el link de verificación? Recuerda verificar en spam o dar click al siguiente botón para volver a
      enviar el link:</p>
    <button @click.prevent="resendEmailVerification" class="btn-primary mt-4">Reenviar link de verificación</button>
  </Announcement>
</template>

<script lang="ts" setup>
import Announcement from '@/components/Announcement.vue'
import httpModule from '../../services/httpModule';
import { useAuthStore } from '../../stores/auth';

const title: string = 'Verificación de email'
const imgSrc: string = 'message.png'
const authStore = useAuthStore()

const resendEmailVerification = () => {
  try {
    const response = httpModule.post('account/users/resend_activation/')
  } catch (error) {
    console.log(error)
  }
}
</script>