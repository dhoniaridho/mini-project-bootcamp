<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const props = defineProps<{
  color: keyof typeof colors
  loading?: boolean
}>()

const colors = {
  default: 'bg-default text-black',
  primary: 'bg-primary text-white'
}

const button = tv({
  base: 'py-3 px-5 rounded-lg',
  variants: {
    color: colors
  },
  defaultVariants: {
    color: 'default'
  }
})

const className = computed(() => {
  return button({ color: props.color })
})
</script>
<template>
  <button :class="className">
    <slot name="icon" />
    <div v-if="loading">loading ...</div>
    <slot v-else />
  </button>
</template>
