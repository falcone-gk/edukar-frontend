<template>
  <header class="sticky top-0 h-14 bg-white shadow-md z-30">
    <div class="flex container items-center justify-between px-3 py-2 w-full h-full bg-white mx-auto md:py-0">
      <div class="flex-shrink-0 mr-12 object-contain h-6">
        <img src="@/assets/logo-edukar.png" class="h-6 w-auto" alt="edukar">
      </div>
      <button @click="toggleMenu" class="flex justify-center items-center h-[20px] w-[30px] text-lg md:hidden">
        <font-icon v-if="!navShown" class="text-primary-color h-full" icon="fa-solid fa-bars" />
        <font-icon v-if="navShown" class="text-primary-color h-full" icon="fa-solid fa-xmark" />
      </button>
      <nav
        :class="classComputed"
        class="absolute w-full left-0 bottom-0 py-2 flex flex-col gap-4 transition-transform duration-300 items-center -z-10 border-2 bg-white md:static md:z-0 md:h-full md:py-0 md:flex-row md:border-none">
        <div class=" w-full md:mr-auto md:h-full">
          <ul class="flex h-full flex-col md:flex-row">
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24 [&>a]:w-full [&>a]:h-full [&>a]:grid [&>a]:place-items-center">
              <router-link to="/">Inicio</router-link>
            </li>
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24 [&>a]:w-full [&>a]:h-full [&>a]:grid [&>a]:place-items-center">
              <router-link to="/forum">Foro</router-link>
            </li>
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24 [&>a]:w-full [&>a]:h-full [&>a]:grid [&>a]:place-items-center">
              <router-link to="/services">Servicios</router-link>
            </li>
          </ul>
        </div>
        <hr class="w-full md:hidden">
        <div v-if="!authStore.isAuthenticated" class="flex items-center gap-6">
          <button @click="router.push({name: 'login'})" class="rounded border-2 border-primary-color hover:bg-indigo-50 whitespace-nowrap px-2 py-1">Iniciar
            Sesión</button>
          <button @click="router.push({name: 'signup'})" class="btn-primary">Registrarse</button>
        </div>
        <div v-else class="w-full relative px-4 md:w-auto md:px-0">
          <div class="flex gap-2">
            <button @click.prevent="toggleMenuAccount">
              <img class="rounded-full h-[40px] w-[40px] max-w-none" :src="authStore.picture" alt="picture">
            </button>
            <div class="flex flex-col md:hidden">
              <span class="text-lg leading-none text-primary-color">{{ authStore.username }}</span>
              <span class="text-sm text-gray-400">{{ authStore.email }}</span>
            </div>
          </div>
          <div class="flex flex-col mt-2 gap-2 origin-top md:border md:border-primary-color rounded p-2 md:bg-white md:absolute md:whitespace-nowrap md:right-0" :class="classAccountMenu">
            <ul class="leading-8">
              <li class="px-2 hover:bg-primary-color hover:text-white">
                <button @click.prevent="router.push({name: 'profile'})">Perfil</button>
              </li>
              <li class="px-2 hover:bg-primary-color hover:text-white">
                <button @click.prevent="onLogout">Cerrar sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
const router: Router = useRouter()

// Navbar toggle workflow
const navShown = ref<boolean>(false)
const toggleMenu = () => {
  navShown.value = !navShown.value
}
const classComputed = computed(() => ({
  'transform translate-y-full md:transform-none': navShown.value
}))

// Account Menu toggle workflow
const menuAccountShown = ref<boolean>(false)
const toggleMenuAccount = () => {
  menuAccountShown.value = !menuAccountShown.value
}
const classAccountMenu = computed(() => ({
  'md:block': menuAccountShown.value,
  'md:hidden': !menuAccountShown.value
}))

const onLogout = () => {
  authStore.logout()
  router.push({name: 'login'})
}

</script>