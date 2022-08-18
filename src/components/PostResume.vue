<template>
  <div class="flex rounded w-full py-2 bg-white border-[1px] border-gray-300 shadow-md">
    <div class="px-4">
      <p>Perfil</p>
    </div>
    <div class="w-full pr-4">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 class="text-black font-bold mr-auto">Título del post</h1>
        <p class="text-xs">De <strong>Autor</strong> en <strong>Curso</strong> - <strong>Fecha post</strong></p>
      </div>
      <div class="hidden sm:flex justify-between items-center">
        <p class="text-xs">Último comentario de <strong>Autor</strong> - <strong>Fecha de comentario</strong></p>
        <span>0</span>
      </div>
    </div>
  </div>
</template>