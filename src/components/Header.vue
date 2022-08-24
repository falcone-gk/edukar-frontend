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
              <router-link to="/foro">Foro</router-link>
            </li>
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24 [&>a]:w-full [&>a]:h-full [&>a]:grid [&>a]:place-items-center">
              <router-link to="/services">Servicios</router-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-6">
          <button @click="router.push({name: 'login'})" class="rounded border-2 border-primary-color hover:bg-indigo-50 whitespace-nowrap px-2 py-1">Iniciar
            Sesión</button>
          <button @click="router.push({name: 'signup'})" class="btn-primary">Registrarse</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Router, useRouter } from 'vue-router';

const navShown = ref<boolean>(false)
const toggleMenu = () => {
  navShown.value = !navShown.value
}
const classComputed = computed(() => ({
  'transform translate-y-full md:transform-none': navShown.value
}))

const router: Router = useRouter()
</script>