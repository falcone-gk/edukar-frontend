<template>
  <div class="bg-white shadow-md p-4 mb-4 border border-gray-300 rounded">
    <h1 class="text-4xl text-primary-color mb-2">Foro Edukar</h1>
    <p>
      Este es el foro EDUKAR, donde podrán compartir y ayudar a otros estudiantes con ejercicios, dudas, consultas y
      resoluciones sobre problemas matemáticos y de ciencias.
    </p>
    <span class="block text-primary-color mt-2">Regístrate y se parte de esta comunidad estudiantil!!!</span>
  </div>
  <div class="flex flex-col-reverse md:flex-row gap-4">
    <div class="flex flex-col gap-2 basis-3/4">
      <h1 class="text-3xl">{{ currentCourse }}</h1>
      <PostResume v-for="post in postToShow" :Args="{props: post}" />
      <div class="pagination mt-3 mx-auto">
        <ul>
          <li
          v-for="(pag, index) in items"
          class="inline-block cursor-pointer border border-gray-200 px-4 py-2"
          :class="(pagData.current===pag)?'bg-primary-color text-white':'hover:bg-gray-50'"
          @click.prevent="getPosts(pag)"
          :key="index">
            {{ pag }}
          </li>
        </ul>
      </div>
    </div>
    <div class="basis-1/4">
      <div class="mb-6">
        <button @click="router.push({name: 'new-post'})" class="btn-primary w-full">+ Crear nuevo post</button>
      </div>
      <form class="rounded bg-white border-[1px] border-gray-300 shadow-md px-4 py-2">
        <h1 class="mb-2 font-bold">Cursos</h1>
        <div class="flex flex-col gap-1">
          <div v-for="course in courses" :key="'sub-' + course.id.toString()">
            <input class="mr-4" type="radio" :name="course.name" :id="course.name" :value="course.id" v-model="checked" @change="onChangeCourse">
            <label :for="course.name">{{ course.name }}</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostResume from '@/components/PostComponents/PostResume.vue'
import { ref, reactive, onBeforeMount } from 'vue';
import { Router, useRouter } from 'vue-router';
import { postInfoResume, subsectionType } from '../../types/forumTypes'
import { useForumStore } from '../../stores/forum';
import httpModule from '../../services/httpModule';
import paginate from '../../services/pagination'

const router: Router = useRouter()
const forumStore = useForumStore()

const checked = ref<number>(0)
const courses = reactive<subsectionType[]>([{id: 0, name: 'Todos'}])
const currentCourse = ref<string>(courses[checked.value].name)
const postToShow = ref<postInfoResume[]>([])

const pagData = reactive({
  current: 1,
  size: 5,
  count: 0,
})

const items = ref<(number|string)[]>([])

const getPosts = async (pagNumber: number|string=1) => {
  try {
    // If the value is a string, by default the value = '...' then we do nothing
    if (typeof pagNumber == 'string') {
      return
    }
    // Reset pagination value to '1' or custom value
    pagData.current = pagNumber as number
    // Make get request to get posts from course specified
    const url: string = `forum/sections/?course=${checked.value}&page=${pagData.current}&size=${pagData.size}`
    const response = await httpModule.get(url)
    // Update values after get request succesfull
    currentCourse.value = courses[checked.value].name
    pagData.count = response.data.count
    const pagination = paginate(pagData.current, Math.floor(pagData.count / pagData.size) + 1)
    items.value = pagination?.items
    postToShow.value = response.data.results
  } catch(error) {
    console.log(error)
  }
}

const onChangeCourse = () => {
  getPosts()
}

onBeforeMount(async () => {
  await getPosts()
  
  // Getting all subsections
  if (forumStore.subsections.length == 0) {
    await forumStore.getSubsections()
  }
  courses.push(...forumStore.subsections)
})
</script>