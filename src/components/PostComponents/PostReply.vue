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
      <button @click="isEditActive=!isEditActive" v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-pencil" />
        <span> Editar</span>
      </button>
      <button @click="emit('showDeleteModal', 'forum/replies/' + Args.props.id, 'respuesta')" v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-red-300">
        <font-icon icon="fa-solid fa-trash" />
        <span> Eliminar</span>
      </button>
    </div>

    <div v-if="authStore.isAuthenticated">
      <div v-show="isEditActive" class="new-reply-form my-3">
        <h2 v-show="isEditActive" class="mb-2">Edita tu respuesta:</h2>
        <QuillEditor ref="editor" v-model:content="replyForm.body" contentType="html" />
        <button v-show="isEditActive" @click.prevent="updateReply" class="btn-primary mt-2">Actualizar</button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { commentStructure, replyStructure } from '../../types/forumTypes';
import { useAuthStore } from '../../stores/auth';
import httpModule from '../../services/httpModule';

interface Props {
  Args: {props: replyStructure},
  postId?: number,
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: 'updateComments', updatedArray: commentStructure[]): void,
  (e: 'showDeleteModal', url: string, type: string): void
}>()

const replyForm = reactive({
  post: props.postId,
  body: props.Args.props.body
})
const authStore = useAuthStore()
const isEditActive = ref<boolean>(false)

const updateReply = async () => {
  const url: string = `forum/replies/${props.Args.props.id}/`
  const response = await httpModule.put(url, replyForm)
  emit('updateComments', response.data)
  isEditActive.value = false
}
</script>