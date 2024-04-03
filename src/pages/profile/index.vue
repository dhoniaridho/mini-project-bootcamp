<script setup lang="ts">
import { http } from '@/lib/http'
import { useQuery } from '@tanstack/vue-query'

const { data } = useQuery({
  queryKey: ['auth/me'],
  queryFn: () => {
    return http.get('auth/me')
  }
})
</script>

<template>
  <div v-if="data?.data.data">Hi {{ data?.data.data.name }}</div>
</template>

<route>
  {
    meta: {
      requiresAuth: true
    }
  }
</route>
