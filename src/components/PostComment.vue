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
    <div v-if="props.isComment" class="my-2">
      <button @click="isReplyActive = !isReplyActive" class="text-xs text-slate-700 rounded p-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-reply" />
        <span> Responder</span>
      </button>
    </div>

    <div v-if="props.isComment && isReplyActive" class="new-reply-form my-3">
      <h2 class="mb-2">Responde al comentario:</h2>
      <QuillEditor />
      <button class="btn-primary mt-2">Responder</button>
    </div>

    <div v-if="props.isComment" class="replies ml-8">
      <h2>Respuestas:</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  isComment: {
    type: Boolean,
    default: true,
  }
})
const isReplyActive = ref<boolean>(false)
</script>