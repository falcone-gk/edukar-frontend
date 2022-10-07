<template>
  <Header />
  <Suspense>
    <main class="container mx-auto my-12 px-3">
      <router-view />
    </main>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <Footer />
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>