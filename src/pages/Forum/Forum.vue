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
    </div>
    <div class="basis-1/4">
      <div class="mb-6">
        <button @click="router.push({name: 'new-post'})" class="btn-primary w-full">+ Crear nuevo post</button>
      </div>
      <form class="rounded bg-white border-[1px] border-gray-300 shadow-md px-4 py-2">
        <h1 class="mb-2 font-bold">Cursos</h1>
        <div class="flex flex-col gap-1">
          <div v-for="course in courses" :key="'sub-' + course.id.toString()">
            <input class="mr-4" type="radio" :name="course.name" :id="course.name" :value="course.id" v-model="checked">
            <label :for="course.name">{{ course.name }}</label>
          </div>
          <div class="text-center mt-4">
            <input @click.prevent="updatePosts" class="btn-primary" type="submit" value="Actualizar">
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
import httpModule from '../../services/httpModule';
import { postInfoResume, subsectionType } from '../../types/forumTypes'
import { useForumStore } from '../../stores/forum';

const router: Router = useRouter()

const checked = ref<number>(0)
const courses = reactive<subsectionType[]>([{id: 0, name: 'Todos'}])
const currentCourse = ref<string>(courses[checked.value].name)
const postToShow = ref<postInfoResume[]>([])
const forumStore = useForumStore()

const getPosts = async () => {
  try {
    const response = await httpModule.get('forum/sections/?course=0')
    postToShow.value.push(...response.data)
  } catch(error) {
    console.log(error)
  }
}
onBeforeMount(async () => {
  getPosts()

  // Getting all subsections
  if (forumStore.subsections.length == 0) {
    await forumStore.getSubsections()
  }
  courses.push(...forumStore.subsections)
})

const updatePosts = async () => {
  const url: string = 'forum/sections/?course=' + checked.value.toString()
  const response = await httpModule.get(url)
  postToShow.value = response.data
  currentCourse.value = courses[checked.value].name
}
</script>