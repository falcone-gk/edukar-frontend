<template>
  <Announcement :title="title" :imageName="imgSrc">
    <p class="mb-4">Felicidades por registrarte a Edukar, para poder logearte tienes que verificar tu cuenta, para ello te hemos enviado un email a tu correo.</p>
  </Announcement>
</template>

<script lang="ts" setup>
import Announcement from '@/components/Announcement.vue'

const title: string = 'Verificación de email'
const imgSrc: string = 'message.png'
</script>