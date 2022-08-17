<template>
  <header class="h-14 bg-white shadow-md relative z-30">
    <div class="flex container items-center justify-between px-3 py-2 w-full h-full bg-white mx-auto md:py-0">
      <div class="flex-shrink-0 mr-12 object-contain h-6">
        <img src="@/assets/logo-edukar.png" class="h-6 w-auto" alt="edukar">
      </div>
      <button @click="toggleMenu" class="md:hidden">
        <span>Menu</span>
      </button>
      <nav
        :class="classComputed"
        class="absolute w-full left-0 bottom-0 py-2 flex flex-col gap-4 transition-transform duration-300 items-center -z-10 border-2 bg-white md:static md:z-0 md:h-full md:py-0 md:flex-row md:border-none">
        <div class=" w-full md:mr-auto md:h-full">
          <ul class="flex h-full flex-col md:flex-row">
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24">
              <router-link to="/">Inicio</router-link>
            </li>
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24">
              <router-link to="/foro">Foro</router-link>
            </li>
            <li
              class="flex w-full h-12 justify-center items-center text-gray-400 bg-transparent hover:text-gray-500 md:h-full md:w-24">
              <router-link to="/service">Servicios</router-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-6">
          <button class="rounded border-2 border-indigo-500 hover:bg-indigo-50 whitespace-nowrap px-2 py-1">Iniciar
            Sesión</button>
          <button class="rounded bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-white">Registrarse</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const navShown = ref<boolean>(false)
const toggleMenu = () => {
  navShown.value = !navShown.value
}
const classComputed = computed(() => ({
  'transform translate-y-full md:transform-none': navShown.value
}))
</script>