<script setup lang="ts">
import { Button, Input, FormItem } from '@/components/m'
import Img from '@/assets/images/auth.png'
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
            id="email"
            type="email"
            placeholder="Enter your name"
            color="default"
            class="w-full"
          />
        </FormItem>
        <FormItem id="password" label="Password" class="w-full">
          <Input
            id="password"
            type="password"
            placeholder="Enter your name"
            color="default"
            class="w-full"
          />
        </FormItem>
        <div>
          <Button color="primary" class="block w-full mt-5">Login</Button>
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
