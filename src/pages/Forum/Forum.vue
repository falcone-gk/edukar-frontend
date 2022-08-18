<template>
  <div class="flex flex-col-reverse md:flex-row gap-4">
    <div class="flex flex-col gap-2 basis-3/4">
      <h1 class="text-3xl">Todos</h1>
      <PostResume v-for="i in 8" :key="'post-'+i" />
    </div>
    <div class="basis-1/4">
      <div class="mb-6">
        <button class="btn-primary w-full">+ Crear nuevo post</button>
      </div>
      <form class="rounded bg-white border-[1px] border-gray-300 shadow-md px-4 py-2">
        <h1 class="mb-2 font-bold">Cursos</h1>
        <div class="flex flex-col gap-1">
          <div v-for="(course, index) in courses" :key="index">
            <input class="mr-4" type="radio" :name="course" :id="course" :value="index" v-model="checked">
            <label :for="course">{{ course }}</label>
          </div>
          <div class="text-center mt-4">
            <input class="btn-primary" type="submit" value="Actualizar">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostResume from '@/components/PostResume.vue'
import { ref } from 'vue';

const checked = ref<number>(0)
const courses: string[] = ['Todos', 'Aritmética', 'Geometría', 'Trigonometría', 'Raz. Mat.']
</script>