<template>
  <div class="comment my-3">
    <div class="flex items-center gap-4 mb-2">
      <div>
        <p>Perfil</p>
      </div>
      <div>
        <h1 class="text-md text-primary-color">Autor</h1>
        <p class="text-xs text-gray-600">Publicado el 17 de agosto
          de 2022, a las 20:11</p>
      </div>
    </div>
    <div class="text-sm">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore consectetur dolor laudantium nulla amet
        tempora nostrum doloribus qui sapiente, earum quaerat, ratione sunt commodi at!</p>
    </div>
    <div v-if="props.isReply" class="mt-2">
      <button class="text-xs text-slate-700 rounded p-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-reply" />
        <span> Responder</span>
      </button>
    </div>
    <div v-if="props.isReply" class="replies ml-8 mt-3">
      <h2 class="text-lg">Respuestas:</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  isReply: {
    type: Boolean,
    default: false,
  }
})
</script>