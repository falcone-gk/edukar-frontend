<template>
  <div class="comment my-3">
    <div class="flex items-center mb-6">
      <div class="pr-2">
        <img class="rounded-full w-[48px] h-[48px] max-w-none" :src="Args.props.author.picture" alt="picture">
      </div>
      <div>
        <h1 class="text-md text-primary-color">{{ Args.props.author.username }}</h1>
        <p class="text-xs text-gray-600">Publicado el <span>{{ Args.props.date }}</span> </p>
      </div>
    </div>
    <div class="text-sm" v-html="Args.props.body"></div>
    <div v-if="props.isComment" class="my-2">
      <button @click="isReplyActive = !isReplyActive" class="text-xs text-slate-700 rounded p-1 hover:bg-indigo-100">
        <font-icon icon="fa-solid fa-reply" />
        <span> Responder</span>
      </button>
    </div>

    <div v-if="props.isComment && isReplyActive" class="new-reply-form my-3">
      <h2 class="mb-2">Responde al comentario:</h2>
      <QuillEditor />
      <button class="btn-primary mt-2">Responder</button>
    </div>

    <div v-if="slots.default?.length" class="replies ml-8">
      <h2>Respuestas:</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
import { commentStructure } from '../types/forumTypes';

interface Props {
  Args: {props: commentStructure},
  isComment: Boolean
}

const slots = useSlots()
const props = withDefaults(defineProps<Props>(), {});

// value used to toggle reply to comment box
const isReplyActive = ref<boolean>(false)
</script>