<template>
  <Header />
  <main class="container mx-auto mt-6 px-3">
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
</script>