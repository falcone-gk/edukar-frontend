<template>
  <div class="comment my-3">
    <div class="flex items-center mb-4">
      <div class="pr-2">
        <img class="rounded-full w-[48px] h-[48px] max-w-none" :src="Args.props.author.picture" alt="picture">
      </div>
      <div>
        <h1 class="text-md text-primary-color">{{ Args.props.author.username }}</h1>
        <p class="text-xs text-gray-600">Publicado el <span>{{ Args.props.date }}</span> </p>
      </div>
    </div>
    <div class="text-sm" v-html="Args.props.body"></div>
    <div class="flex gap-2 my-2">
      <button v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-pencil" />
        <span> Editar</span>
      </button>
      <button @click="emit('showDeleteModal', 'forum/replies/' + Args.props.id, 'respuesta')" v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-red-300">
        <font-icon icon="fa-solid fa-trash" />
        <span> Eliminar</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { commentStructure, replyStructure } from '../../types/forumTypes';
import { useAuthStore } from '../../stores/auth';

interface Props {
  Args: {props: replyStructure},
  postId?: number,
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: 'updateComments', updatedArray: commentStructure[]): void,
  (e: 'showDeleteModal', url: string, type: string): void
}>()

const authStore = useAuthStore()
</script>