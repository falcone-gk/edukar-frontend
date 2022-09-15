<template>
  <div class="rounded border-t border-gray-100 max-w-4xl mx-auto p-4 shadow-md text-center">
    <h1 class="text-3xl mb-8">Nuevo Post</h1>
    <div>
      <form class="text-left">
        <div class="mb-4">
          <label class="label-control" for="course">Curso:</label>
          <select v-model.number="newPostForm.subsection" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="course" id="course" required>
            <option v-for="course in courses" :value="course.id">{{ course.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="label-control" for="title">Título:</label>
          <input v-model="newPostForm.title" class="form-control" type="text" name="title" id="title" required>
        </div>
        <div class="mb-4">
          <label class="label-control" for="description">Descripción:</label>
          <QuillEditor v-model:content="newPostForm.body" contentType="html"/>
        </div>
        <input @click.prevent="createPost" class="btn-primary mt-2" type="submit" value="Publicar Post">
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useForumStore } from '../../stores/forum';
import httpModule from '../../services/httpModule';
import { subsectionType } from '../../types/forumTypes'

const courses = reactive<subsectionType[]>([])
const forumStore = useForumStore()
const router: Router = useRouter()
const newPostForm = reactive({
  section: 1,
  subsection: 1,
  title: '',
  body: ''
})

onBeforeMount(async () => {
  // Getting all subsections
  if (forumStore.subsections.length == 0) {
    await forumStore.getSubsections()
  }
  courses.push(...forumStore.subsections)
})

const createPost = async () => {
  try {
    const response = await httpModule.post('forum/posts/', newPostForm)
    const newSlugTitle = response.data.slug
    router.push({name: 'post', params: {slug: newSlugTitle}})
  } catch(error) {
    console.log(error)
  }
}
</script>