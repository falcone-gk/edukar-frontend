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
    <div class="my-2">
      <button @click="isReplyActive = !isReplyActive" class="text-xs text-slate-700 rounded p-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-reply" />
        <span> Responder</span>
      </button>
    </div>

    <div v-if="isReplyActive" class="new-reply-form my-3">
      <h2 class="mb-2">Responde al comentario:</h2>
      <QuillEditor ref="editor" v-model:content="replyForm.body" contentType="html" />
      <button @click.prevent="replyComment" class="btn-primary mt-2">Responder</button>
    </div>

    <div v-if="Args.props.replies.length" class="replies ml-8">
      <h2>Respuestas:</h2>
      <PostReply v-for="reply in Args.props.replies"
      :key="'reply-' + reply.id"
      :Args="{props: reply}" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import httpModule from '../../services/httpModule';
import PostReply from '@/components/PostComponents/PostReply.vue';
import { commentStructure } from '../../types/forumTypes';

interface Props {
  Args: {props: commentStructure},
  postId?: number,
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'updateComments', updatedArray: commentStructure[]): void
}>()
const editor = ref<any>(null)

// value used to toggle reply to comment box
const isReplyActive = ref<boolean>(false)

const replyForm = reactive({
  post: props.postId,
  comment: props.Args.props.id,
  body: ''
})
const replyComment = async () => {
  const response = await httpModule.post('forum/replies/', replyForm)
  emit('updateComments', response.data)
  isReplyActive.value = false
  editor.value.setText('')
  replyForm.body = ''
}
</script>