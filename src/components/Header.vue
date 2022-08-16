<template>
  <header class="px-2 sm:px-4 h-14 bg-white shadow-md">
    <nav class="container h-full flex flex-wrap items-center mx-auto">
      <div class="mr-12 object-contain h-6">
        <img src="@/assets/logo-edukar.png" class="h-6 w-auto" alt="edukar">
      </div>
      <div class="mr-auto h-full">
        <ul class="flex h-full flex-row">
          <li class="flex w-24 justify-center items-center text-gray-400 h-full bg-transparent hover:text-gray-500">
            <router-link to="/">Inicio</router-link>
          </li>
          <li class="flex w-24 justify-center items-center text-gray-400 h-full bg-transparent hover:text-gray-500">
            <router-link to="/foro">Foro</router-link>
          </li>
          <li class="flex w-24 justify-center items-center text-gray-400 h-full bg-transparent hover:text-gray-500">
            <router-link to="/service">Servicios</router-link>
          </li>
          <li class="flex w-24 justify-center items-center text-gray-400 h-full bg-transparent hover:text-gray-500">
            <router-link to="/account">Perfil</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>