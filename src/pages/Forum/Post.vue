<template>

  <!-- Modal used to show that a no logged user can't comment a post -->
  <ModalDialog :show="isShownModalLogin"> 
    <template #title>Usuario no autorizado</template>
    <template #default>
      <p>Solo pueden responder a un comentario aquellos usuarios que se han logeado. Iniciar sesión si desea participar en el post.</p>
    </template>
    <template #buttons>
      <button @click="() => isShownModalLogin=false" class="btn-primary">Cerrar</button>
    </template>
  </ModalDialog>

  <!-- Modal used to confirm if user wants to delete comment, reply or post -->
  <ModalDialog :show="deleteModalData.isShown"> 
    <template #title>Eliminar {{ deleteModalData.objType }}</template>
    <template #default>
      <p>Usted va a elminar su {{ deleteModalData.objType }}. ¿Está seguro de hacerlo?</p>
    </template>
    <template #buttons>
      <button @click="deleteObj" class="rounded px-4 bg-red-600 hover:bg-red-400 text-white py-1.5 w-16 mr-2">Si</button>
      <button @click="() => deleteModalData.isShown=false" class="btn-primary w-16">No</button>
    </template>
  </ModalDialog>

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
        @updateComments="updateCommentsPost"
        @showLoginModal="() => isShownModalLogin=true"
        @showDeleteModal="onOpenDeleteModal" />
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
import ModalDialog from '@/components/ModalDialog.vue';

const router: RouteLocationNormalizedLoaded = useRoute()
const authStore = useAuthStore()

const isShownModalLogin = ref(false)    // Value to show modal dialog to tell user to login

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

const deleteModalData = reactive({
  isShown: false,
  objType: '',
  urlDelete: ''
})

const onOpenDeleteModal = (urlDelete: string, objType: string) => {
  deleteModalData.isShown = true
  deleteModalData.urlDelete = urlDelete
  deleteModalData.objType = objType
}

const deleteObj = async () => {
  try {
    const response = await httpModule.delete(
      deleteModalData.urlDelete,
      {data: {post: postId.value}}
    )
    updateCommentsPost(response.data)
    deleteModalData.isShown = false
  } catch(error) {
    console.log(error)
  }
}
</script>