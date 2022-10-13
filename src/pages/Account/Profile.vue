<template>
  <div>
    <div class="flex gap-4 flex-col mx-auto w-2/3 p-4 rounded border shadow-sm mb-4 md:flex-row">
      <div class="md:w-1/4">
        <div class="flex">
          <img class="mx-auto rounded-full w-24 h-24" :src="userData.picture" alt="profile">
        </div>
        <div class="text-center mt-4">
          <h1 class="text-xl text-primary-color">Perfil</h1>
          <p class="text-sm">{{ userData.about_me }}</p>
        </div>
      </div>
      <div class="w-full">
        <div class="flex flex-col h-full">
          <h1 class="text-primary-color">Datos de usuario</h1>
          <div class="flex flex-col gap-4">
            <div class="flex">
              <div class="w-1/2">
                <h2>Nombre de usuario:</h2>
                <span class="font-light">{{ userData.username }}</span>
              </div>
              <div class="w-1/2">
                <h2>Email:</h2>
                <span class="font-light">{{ userData.email }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2">
                <h2>Nombre:</h2>
                <span class="font-light">{{ userData.first_name }}</span>
              </div>
              <div class="w-1/2">
                <h2>Apellido:</h2>
                <span class="font-light">{{ userData.last_name }}</span>
              </div>
            </div>
          </div>
          <div class="mt-auto">
            <button class="btn-primary">Editar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col mx-auto w-2/3">
      <div class="tabs">
        <label :class="tab === 'post' ? 'text-white bg-primary-color': 'border hover:bg-gray-50'" class="rounded-t-lg inline-block p-2" for="post">Lista de posts</label>
        <input class="hidden" v-model="tab" value="post" type="radio" name="post" id="post" checked />
        <label :class="tab === 'notification' ? 'text-white bg-primary-color': 'border hover:bg-gray-50'" class="rounded-t-lg inline-block p-2" for="notification">Notificaciones</label>
        <input class="hidden" v-model="tab" value="notification" type="radio" name="notification" id="notification" />
      </div>
      <div class="rounded-b-lg border shadow-sm">
        <div v-show="tab === 'post'">
          <p>Lista de post</p>
        </div>
        <div v-show="tab === 'notification'">
          <p>Lista de Notificaciones</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import httpModule from '../../services/httpModule';

const res = await httpModule.get('account/users/me')
const userData = await res.data
const tab = ref("post")
</script>