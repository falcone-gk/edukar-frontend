<template>
  <!-- Modal used to show that email was sent successfully -->
  <ModalDialog :show="isShownSuccessModal"> 
    <template #title>Restablecer contraseña</template>
    <template #default>
      <p>Se ha enviado un correo a {{ email }} para restablecer su contraseña de manera exitosa. Revisar su bandeja de entrada.</p>
    </template>
    <template #buttons>
      <button @click="() => isShownSuccessModal=false" class="btn-primary">Cerrar</button>
    </template>
  </ModalDialog>

  <!-- Modal used to show that an error ocurred -->
  <ModalDialog :show="isShownErrorModal"> 
    <template #title>Error al restablecer contraseña</template>
    <template #default>
      <p>Hubo un problema al enviar el correo a {{ email }}. Esto puede deberse a que dicho correo no está registrado.</p>
    </template>
    <template #buttons>
      <button @click="() => isShownErrorModal=false" class="btn-primary">Cerrar</button>
    </template>
  </ModalDialog>

  <div class="grid place-items-center">
    <div class="w-[350px] p-4 border-t border-t-gray-100 shadow-md">
      <div class="mb-4 w-full">
        <img class="mx-auto h-8 w-auto" src="@/assets/logo-edukar.png" alt="logo">
      </div>
      <form>
        <div class="mb-6">
          <label class="label-control" for="email">Email</label>
          <input id="email" class="form-control" type="text" name="email" v-model="email">
        </div>
        <input class="w-full btn-primary" type="submit" @click.prevent="sendUrlResetPassword" value="Enviar link de recuperación">
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import httpModule from '../../services/httpModule';
import ModalDialog from '../../components/ModalDialog.vue';

const email = ref<string>('')

const isShownSuccessModal = ref(false)
const isShownErrorModal = ref(false)
const sendUrlResetPassword = async () => {
  try {
    await httpModule.post('account/users/reset_password/', {'email': email.value})
    isShownSuccessModal.value = true
  } catch(error) {
    isShownErrorModal.value = true
  }
}
</script>