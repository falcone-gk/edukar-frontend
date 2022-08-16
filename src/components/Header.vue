<template>
  <header class="px-2 sm:px-4 py-2.5 bg-gray-900">
    <nav class="container flex flex-wrap justify-between items-center mx-auto">
      <div>
        <p class="text-white">logo</p>
      </div>
      <div>
        <ul class="flex flex-row gap-8">
          <li class="text-gray-400 bg-transparent hover:text-gray-300">
            <router-link to="/">Inicio</router-link>
          </li>
          <li class="text-gray-400 bg-transparent hover:text-gray-300">
            <router-link to="/foro">Foro</router-link>
          </li>
          <li class="text-gray-400 bg-transparent hover:text-gray-300">
            <router-link to="/service">Servicios</router-link>
          </li>
          <li class="text-gray-400 bg-transparent hover:text-gray-300">
            <router-link to="/account">Perfil</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>