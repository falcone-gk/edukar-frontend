<template>
  <div class="flex rounded w-full py-2 bg-white border-[1px] border-gray-300 shadow-md">
    <div class="px-4">
      <p>Perfil</p>
    </div>
    <div class="w-full pr-4">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 class="mr-auto text-lg">Título del post</h1>
        <p class="text-xs">De <span class="text-primary-color">Autor</span> en <span class="text-primary-color">Curso</span> - <span class="text-primary-color">Fecha post</span></p>
      </div>
      <div class="hidden sm:flex justify-between items-center">
        <p class="text-xs">Último comentario de <span class="text-primary-color">Autor</span> - <span class="text-primary-color">Fecha de comentario</span></p>
        <span>0</span>
      </div>
    </div>
  </div>
</template>