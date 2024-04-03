<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import { Button, Input, FormItem } from '@/components/m'
import Img from '@/assets/images/auth.png'
import { ref } from 'vue'
import { http } from '@/lib/http'
import { useRoute, useRouter } from 'vue-router'

const { data } = useQuery({
  queryKey: ['welcome'],
  queryFn: () => {
    return http.get('/')
  }
})

const form = ref({
  email: '',
  password: ''
})

type LoginPayload = {
  email: string
  password: string
}

const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationFn: async (payload: LoginPayload) => {
    try {
      return await http.post<{
        message: string
        data: {
          accessToken: string
        }
      }>('auth/sign-in', payload)
    } catch (error: any) {
      throw new Error(error.response.data.error)
    }
  },
  onSuccess: (data) => {
    localStorage.setItem('accessToken', data.data.data.accessToken)
    router.push('/profile')
  },
  onError: (error) => {
    alert(error.message)
  }
})

const onSubmit = () => {
  mutate(form.value)
}
</script>
<template>
  <main class="flex justify-center bg-foreground-primary text-white min-h-screen">
    <section class="w-1/3 py-20 px-10 h-full">
      <div class="mb-16">
        <div class="text-3xl font-semibold">Welcome Back 👋</div>
        <div class="text-white">We are happy to have you back</div>
      </div>
      <form class="space-y-3">
        <FormItem id="email" label="Email" class="w-full">
          <Input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="Enter your name"
            color="default"
            class="w-full"
          />
        </FormItem>
        <FormItem id="password" label="Password" class="w-full">
          <Input
            v-model="form.password"
            id="password"
            type="password"
            placeholder="Enter your name"
            color="default"
            class="w-full"
          />
        </FormItem>
        <div>
          <Button
            :loading="isPending"
            type="button"
            @click="onSubmit"
            color="primary"
            class="block w-full mt-5"
          >
            Login
          </Button>
        </div>
      </form>
    </section>
    <section class="flex-1 h-full p-5">
      <div class="rounded-lg overflow-hidden">
        <img class="w-full object-cover" :src="Img" alt="img" />
      </div>
    </section>
  </main>
</template>
