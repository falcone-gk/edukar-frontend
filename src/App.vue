<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { userData } from './types/authTypes'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onBeforeMount(() => {
  const userLocalData: userData | {} = JSON.parse(localStorage.getItem('userData') || '{}')
  if (Object.keys(userLocalData).length === 0) {
    authStore.logout()
  } else {
    authStore.saveUserData(userLocalData as userData)
  }
})
</script>