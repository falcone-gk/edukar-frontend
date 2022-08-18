<template>
  <div class="grid place-items-center">
    <div class="min-w-[350px] p-4 border-t border-t-gray-100 shadow-md">
      <div class="mb-4 w-full">
        <img class="mx-auto h-8 w-auto" src="@/assets/logo-edukar.png" alt="logo">
      </div>
      <form>
        <div class="mb-6">
          <label class="label-control" for="username">Nombre de usuario</label>
          <input class="form-control" type="text">
        </div>
        <div class="mb-6">
          <label class="label-control" for="password">Contraseña</label>
          <input class="form-control" type="password">
        </div>
        <input class="w-full btn-primary" type="submit" value="Iniciar sesión">
      </form>
    </div>
  </div>
</template>