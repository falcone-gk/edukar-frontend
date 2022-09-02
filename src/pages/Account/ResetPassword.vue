<template>
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
        <input class="w-full btn-primary" type="submit" @click="sendUrlResetPassword" value="Enviar link de recuperación">
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import httpModule from '../../services/httpModule';

const email = ref<string>('')
const sendUrlResetPassword = () => {
  try {
    const response = httpModule.post('account/users/reset_password/', {'email': email})
    console.log(response)
  } catch(error) {
    console.log(error)
  }
}
</script>