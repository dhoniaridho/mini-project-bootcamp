<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
localStorage.removeItem('accessToken')
router.push('/auth/login')
</script>
<template>
  <div></div>
</template>
