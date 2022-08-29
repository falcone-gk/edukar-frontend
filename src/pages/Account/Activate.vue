<template>
  <Announcement v-if="activeSuccess" title="Activación de cuenta satisfactoria" imageName="fireworks.png">
    <p class="mb-4">Felicidades por registrarte a la comunidad de Edukar, tu cuenta ha sido activada
      satisfactorimente!</p>
    <p>Tienes disponible el participar en el foro de Edukar tanto mandando ejercicios como resolviendo ejercicios,
      además puedes suscribirte a nuestras clases particulares o grupales.</p>
  </Announcement>
  <Announcement v-else title="Error en activación de cuenta" imageName="oops.png">
    <p>Hubo un error al momento de activar la cuenta. Posiblemente esto se debe a que el link usado para activar la
      cuenta no es el correcto o este link ya ha sido usado para activar una cuenta (posiblemente la cuenta ya ha sido
      activada).</p>
  </Announcement>
</template>

<script lang="ts" setup>
import Announcement from '@/components/Announcement.vue'
import httpModule from '../../services/httpModule'
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const activeSuccess = ref<boolean | null>(null)

const route = useRoute()
onBeforeMount(async () => {
  try {
    await httpModule.post('account/users/activation/', route.params)
    activeSuccess.value = true
  } catch (error) {
    activeSuccess.value = false
  }
})
</script>