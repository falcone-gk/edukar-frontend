<template>
  <div class="rounded border-t border-gray-100 max-w-4xl mx-auto p-4 shadow-md">
    <div id="post">
      <div class="flex items-center mb-6">
        <div class="pr-2">
          <img class="rounded-full w-[48px] h-[48px] max-w-none" :src="post.author.picture" alt="picture">
        </div>
        <div>
          <h1 class="text-2xl">{{ post.title }}</h1>
          <p class="text-xs text-gray-600">Publicado por <span class="text-primary-color">{{ post.author.username }}</span> ({{ translateDateMonth(post.date) }})</p>
        </div>
      </div>
      <div class="text-sm" v-html="post.body"></div>
    </div>

    <hr class="my-4">

    <!--Comments section-->
    <div class="comment-list">
      <h1 class="text-2xl mb-2">Comentarios ({{ comments.length }}) :</h1>
      <div class="list-comments flex flex-col">
        <PostComment v-for="comment in comments"
        :key="'comment-' + comment.id.toString()"
        :postId="postId"
        :Args="{props: comment}"
        @updateComments="updateCommentsPost" />
      </div>
    </div>

    <hr>
    <!--Create new comment section-->
    <div v-if="authStore.isAuthenticated">
      <h1 class="my-4 text-2xl">Nuevo Comentario</h1>
      <QuillEditor ref="editor" v-model:content="commentForm.body" contentType="html" />
      <button @click.prevent="sendComment" class="btn-primary mt-2">Agregar comentario</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostComment from '@/components/PostComponents/PostComment.vue'
import { ref, reactive, onBeforeMount } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import httpModule from '../../services/httpModule';
import translateDateMonth from '../../services/translate';
import { useAuthStore } from '../../stores/auth';
import { postStructure, commentStructure } from '../../types/forumTypes';

const router: RouteLocationNormalizedLoaded = useRoute()
const authStore = useAuthStore()

const slugTitle = router.params.slug
const editor = ref<any>(null)
const postId = ref(0)
const post = reactive<postStructure>({
  subsection: '',
  title: '',
  author: {username: '', picture: ''},
  body: '',
  date: ''
})
const comments = ref<commentStructure[]>([])

const commentForm = reactive({
  body: '',
  post: postId
})

onBeforeMount(async () => {
  const response = await httpModule.get('forum/posts/' + slugTitle)

  // Store response values in post state values
  Object.keys(post).forEach((k: string) => {
    post[k as keyof postStructure] = response.data[k]
  })
  postId.value = response.data.id
  comments.value = response.data.comments
})

const sendComment = async () => {
  const response = await httpModule.post('forum/comments/', commentForm)
  comments.value = response.data
  // Clean text used in vue-quill editor
  editor.value.setText('')
  commentForm.body = ''
}

const updateCommentsPost = (updatedComments: commentStructure[]) => {
  comments.value = updatedComments
}
</script>