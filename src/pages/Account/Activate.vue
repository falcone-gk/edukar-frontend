<template>
  <Announcement :title="title" :imageName="imgSrc">
    <p class="mb-4">Felicidades por registrarte a la comunidad de Edukar, tu cuenta ha sido activada
      satisfactorimente!</p>
    <p>Tienes disponible el participar en el foro de Edukar tanto mandando ejercicios como resolviendo ejercicios,
      además puedes suscribirte a nuestras clases particulares o grupales.</p>
  </Announcement>
</template>

<script lang="ts" setup>
import Announcement from '@/components/Announcement.vue'

const title: string = 'Activación de cuenta satisfactoria'
const imgSrc: string = 'fireworks.png'    // Image to use in announcement
</script>