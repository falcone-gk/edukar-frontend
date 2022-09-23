<template>
  <ModalDialog
  :show="modalData.showModal"
  :title="modalData.title"
  :message="modalData.message"
  @closeModal="() => {modalData.showModal = false}" />
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

const modalData = reactive({
  showModal: false,
  title: '',
  message: ''
})
const email = ref<string>('')
const sendUrlResetPassword = async () => {
  try {
    await httpModule.post('account/users/reset_password/', {'email': email.value})
    modalData.showModal = true
    modalData.title = 'Restablecer contraseña'
    modalData.message = `Se ha enviado un correo a ${email.value} para restablecer su contraseña de manera exitosa. Revisar su bandeja de entrada.`
  } catch(error) {
    modalData.showModal = true
    modalData.title = 'Restablecer contraseña'
    modalData.message = `Hubo un problema al enviar el correo a ${email.value}. Esto puede deberse a que dicho correo no está registrado.`
  }
}
</script>