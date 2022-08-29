<template>
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col border shadow-md p-6 gap-8 divide-y-2 md:divide-y-0 md:divide-x-2 md:flex-row md:max-w-[70%]">
      <div class="flex flex-col text-center gap-4 md:min-w-[200px]">
        <img class="m-auto max-w-[200px] min-w-[140px] w-3/4" :src="'/src/assets/icons/' + imageName" alt="imagen">
      </div>
      <div class="flex flex-col justify-center text-center pt-4 md:pt-0 md:pl-2">
        <h1 class="text-primary-color text-xl mb-4">{{ props.title }}</h1>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  // This images will always be stored in assets/icons file
  imageName: {
    type: String,
    required: true
  }
})
</script>