<template>
  <div class="rounded border-t border-gray-100 max-w-4xl mx-auto p-4 shadow-md">
    <div id="post">
      <div class="flex items-center mb-6">
        <div class="pr-2">
          <img class="rounded-full w-[48px] h-[48px] max-w-none" :src="post.author.picture" alt="picture">
        </div>
        <div>
          <h1 class="text-2xl">{{ post.title }}</h1>
          <p class="text-xs text-gray-600">Publicado por <span class="text-primary-color">{{ post.author.username }}</span> ({{ translateDate(post.date) }})</p>
        </div>
      </div>
      <div class="text-sm" v-html="post.body"></div>
    </div>

    <hr class="my-4">

    <!--Comments section-->
    <div class="comment-list">
      <h1 class="text-2xl">Comentarios ({{ nComments }}) :</h1>
      <div class="list-comments flex flex-col">
        <PostComment v-for="index in nComments" :key="'comment-' + index">
          <PostComment v-for="subindex in nComments" :key="'reply-' + subindex" :isComment="false"/>
        </PostComment>
      </div>
    </div>

    <hr>
    <!--Create new comment section-->
    <div>
      <h1 class="my-4 text-2xl">Nuevo Comentario</h1>
      <QuillEditor v-model="editorData" />
      <button class="btn-primary mt-2">Agregar comentario</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostComment from '@/components/PostComment.vue'
import { ref, onBeforeMount } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import httpModule from '../../services/httpModule';

const router: RouteLocationNormalizedLoaded = useRoute()
const slugTitle = router.params.slug
const post = ref({
  subsection: '',
  title: '',
  author: {username: '', picture: ''},
  body: '',
  date: ''
})

const translateDate = (date: string): string => {
  if (!date) {
    return ''
  }

  type monthType = 'January'|'February'|'March'|'April'|'May'|'June'|'July'|'August'|'September'|'October'|'November'|'December'
  
  const monthDict: {[key in monthType]: string} = {
    'January': 'enero',
    'February': 'febrero',
    'March': 'marzo',
    'April': 'abril',
    'May': 'mayo',
    'June': 'Junio',
    'July': 'julio',
    'August': 'Agosto',
    'September': 'setiembre',
    'October': 'octubre',
    'November': 'noviembre',
    'December': 'diciembre'
  }
  const rExp: RegExp = /de (\w*) del/
  const matches: RegExpExecArray = rExp.exec(date) as RegExpExecArray
  const month: monthType = matches[1] as monthType
  const newDate = date.replace(month, monthDict[month])

  return newDate
}

const nComments: number = 2
const editorData = ref<string>('')

onBeforeMount(async () => {
  const response = await httpModule.get('forum/posts/' + slugTitle)
  post.value = response.data
})
</script>