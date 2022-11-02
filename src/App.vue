<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.store.js';

const authStore = useAuthStore();
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
