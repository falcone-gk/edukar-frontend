<template>
  <div @click="router.push({name: 'post', params: {slug: Args.props.slug}})"
    class="flex items-center rounded w-full py-2 bg-white border-[1px] border-gray-300 shadow-md cursor-pointer hover:bg-slate-50">
    <div class="px-2">
      <img class="rounded-full w-[48px] h-[48px] max-w-none" :src="Args.props.author.picture" alt="picture">
    </div>
    <div class="w-full pr-4">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center">
        <h1 class="mr-auto text-lg">{{ Args.props.title }}</h1>
        <p class="text-xs">De <span class="text-primary-color">{{ Args.props.author.username }}</span> en <span class="text-primary-color">{{ Args.props.subsection }}</span> - {{Args.props.time_difference }}</p>
      </div>
      <div class="hidden sm:flex justify-between items-center">
        <p class="text-xs">Último comentario de <span class="text-primary-color">Autor</span> - <span
            class="text-primary-color">Fecha de comentario</span></p>
        <div>
          <font-icon class="mr-2 text-slate-700" icon="fa-solid fa-comment" />
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Router, useRouter } from 'vue-router';
import { postInfoResume } from '../../types/forumTypes';

interface Props {
  Args: {props: postInfoResume}
}

const router: Router = useRouter()
const props = withDefaults(defineProps<Props>(), {});
</script>