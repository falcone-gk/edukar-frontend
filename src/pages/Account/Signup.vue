<template>
  <div class="grid place-items-center">
    <div class="max-w-[800px] p-4 border-t border-t-gray-100 shadow-md">
      <div class="mb-10 w-full">
        <img class="mx-auto h-8 w-auto" src="@/assets/logo-edukar.png" alt="logo">
      </div>
      <div class="mb-6">
        <div class="mb-2">
          <h2 class="font-bold">Importante:</h2>
          <p>No está permitido ningún tipo de publicidad en el foro, ni en las publicaciones ni en las imágenes de perfil. Si se observa algún tipo de publicidad se procederá a banear la cuenta.</p>
        </div>
        <div class="mb-6">
          <h2 class="font-bold">Nota:</h2>
          <p>El nombre de usuario solo permite el uso de letras y números.</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-xs">Los campos con ' * ' son obligatorios</p>
        </div>
      </div>
      <form>
        <div class="flex gap-4 mb-6">
          <div class="w-full">
            <label class="label-control" for="username">Nombre de usuario*:</label>
            <input class="form-control" name="username" id="username" type="text">
          </div>
          <div class="w-full">
            <label class="label-control" for="email">Email*:</label>
            <input class="form-control" name="email" id="email" type="email">
          </div>
        </div>
        <div class="flex gap-4 mb-6">
          <div class="w-full">
            <label class="label-control" for="name">Nombre(s)*:</label>
            <input class="form-control" name="name" id="name" type="text">
          </div>
          <div class="w-full">
            <label class="label-control" for="last-name">Apellidos*:</label>
            <input class="form-control" name="last-name" id="last-name" type="text">
          </div>
        </div>
        <div class="flex gap-4 mb-6">
          <div class="w-full">
            <label class="label-control" for="password">Contraseña*:</label>
            <input class="form-control" name="password" id="password" type="password">
          </div>
          <div class="w-full">
            <label class="label-control" for="confirm-password">Confirmar contraseña*:</label>
            <input class="form-control" name="confirm-password" id="confirm-password" type="password">
          </div>
        </div>
        <div class="mb-6 w-full">
          <label class="label-control" for="about-me">Sobre mi:</label>
          <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" name="about-me" id="about-me" rows="10"></textarea>
        </div>
        <div class="mb-6 w-full">
          <label class="label-control" for="profile">Imagen de perfil:</label>
          <input class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer" aria-describedby="profile_help" id="profile" type="file" accept="image/*">
        </div>
        <input class="w-full btn-primary" type="submit" value="Registrarse">
      </form>
    </div>
  </div>
</template>
