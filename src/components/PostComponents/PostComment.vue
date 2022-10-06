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
      <button @click="toggleAnswer" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-reply" />
        <span> Responder</span>
      </button>
      <button @click="toggleEditor" v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-pencil" />
        <span> Editar</span>
      </button>
      <button @click="emit('showDeleteModal', 'forum/comments/' + Args.props.id, 'comentario')" v-if="Args.props.author.username === authStore.username" class="text-xs text-slate-700 rounded bg-gray-100 px-2 py-1 hover:bg-red-300">
        <font-icon icon="fa-solid fa-trash" />
        <span> Eliminar</span>
      </button>
    </div>

    <div v-if="authStore.isAuthenticated">
      <div v-show="isReplyActive || isEditActive" class="new-reply-form my-3">
        <h2 v-show="isReplyActive" class="mb-2">Responde al comentario:</h2>
        <h2 v-show="isEditActive" class="mb-2">Edita tu comentario:</h2>
        <QuillEditor ref="editor" v-model:content="replyForm.body" contentType="html" />
        <button v-show="isReplyActive" @click.prevent="replyComment" class="btn-primary mt-2">Responder</button>
        <button v-show="isEditActive" @click.prevent="updateComment" class="btn-primary mt-2">Actualizar</button>
      </div>
    </div>

    <div v-if="Args.props.replies.length" class="replies ml-8">
      <h2>Respuestas:</h2>
      <PostReply v-for="reply in Args.props.replies"
      :key="'reply-' + reply.id"
      :Args="{props: reply}"
      @showDeleteModal="deleteReplyEmit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import httpModule from '../../services/httpModule';
import PostReply from '@/components/PostComponents/PostReply.vue';
import { useAuthStore } from '../../stores/auth';
import { commentStructure } from '../../types/forumTypes';

interface Props {
  Args: {props: commentStructure},
  postId?: number,
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'updateComments', updatedArray: commentStructure[]): void,
  (e: 'showLoginModal'): void,
  (e: 'showDeleteModal', url: string, type: string): void
}>()
const authStore = useAuthStore()
const editor = ref<any>(null)

// value used to toggle reply to comment box
const isReplyActive = ref<boolean>(false)
const isEditActive = ref<boolean>(false)
const replyForm = reactive({
  post: props.postId,
  comment: props.Args.props.id,
  body: ''
})
const setTextEditorValue = (body: string='') => {
  editor.value.setHTML(body)
  replyForm.body = body
}

const toggleAnswer = () => {
  if (authStore.isAuthenticated) {
    isEditActive.value = false
    isReplyActive.value = !isReplyActive.value
    setTextEditorValue()
  } else {
    emit('showLoginModal')
  }
}

const toggleEditor = () => {
  if (authStore.isAuthenticated) {
    isReplyActive.value = false
    isEditActive.value = !isEditActive.value
    setTextEditorValue(props.Args.props.body)
  } else {
    emit('showLoginModal')
  }
}

const replyComment = async () => {
  const response = await httpModule.post('forum/replies/', replyForm)
  emit('updateComments', response.data)
  isReplyActive.value = false
  setTextEditorValue()
}

const updateComment = async () => {
  const url: string = `forum/comments/${props.Args.props.id}/`
  const response = await httpModule.put(url, replyForm)
  emit('updateComments', response.data)
  isEditActive.value = false
  setTextEditorValue()
}

const deleteReplyEmit = (url: string, type: string) => {
  emit('showDeleteModal', url, type)
}
</script>