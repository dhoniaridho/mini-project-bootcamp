<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import { http } from '@/lib/http'
import { ref } from 'vue'

type CreateTodoPayload = {
  name: string
  isCompleted: boolean
}

const form = ref({
  name: ''
})
const formEdit = ref({
  name: ''
})
const mode = ref<Record<string, 'EDIT' | 'SHOW'>>({})
const selectedId = ref<string>()

const { data, isLoading, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const { data } = await http.get('todos')
    return data
  }
})

const { isPending, mutate } = useMutation({
  mutationFn: async (payload: CreateTodoPayload) => {
    const { data } = await http.post('todos', payload)
    return data
  },
  onSuccess: () => {
    refetch()
    form.value = {
      name: ''
    }
  }
})

const { isPending: isDeleting, mutate: mutateDelete } = useMutation({
  mutationFn: async (id: string) => {
    const { data } = await http.delete(`todos/${id}`)
    return data
  },
  onSuccess: () => {
    refetch()
    form.value = {
      name: ''
    }
  }
})

const { isPending: isPendingUpdate, mutate: muteateUpdate } = useMutation({
  mutationFn: async (id: string) => {
    const { data } = await http.put(`todos/${id}`, formEdit.value)
    return data
  },
  onSuccess: () => {
    refetch()
    form.value = {
      name: ''
    }
  }
})

const onSubmit = () => {
  mutate({
    name: form.value.name,
    isCompleted: false
  })
}

const onDelete = (id: string) => {
  selectedId.value = id
  mutateDelete(id)
}

const onEdit = (ev: KeyboardEvent, id: string) => {
  if (ev.key != 'Enter') return
  mode.value[id] = 'SHOW'
  muteateUpdate(id)
}
</script>
<template>
  <div class="w-full h-screen flex justify-center">
    <div class="bg-stone-100 p-10 max-w-xl w-full">
      <div class="flex gap-3">
        <input v-model="form.name" class="border-2 border-black px-7 py-4 bg-white w-full" />
        <m-button class="p-3 text-center text-white" :loading="isPending" @click="onSubmit"
          >Save</m-button
        >
      </div>
      <div v-if="isLoading">Loading...</div>
      <ul v-else class="space-y-4 mt-10">
        <li v-if="data?.data?.length == 0" class="text-center">Data tidak ditemukan</li>
        <li v-for="item in data?.data" :key="item.id" class="flex justify-between gap-3">
          <div v-if="mode[item.id] == 'EDIT'" class="flex w-full items-center gap-3">
            <input
              v-model="formEdit.name"
              class="border-2 border-black px-7 py-4 bg-white w-full"
              @keyup="onEdit($event, item.id)"
            />
            <div @click="mode[item.id] = 'SHOW'">cancel</div>
          </div>
          <div
            v-else
            @click="
              () => {
                mode[item.id] = 'EDIT'
                formEdit.name = item.name
              }
            "
          >
            {{ item.name }}
          </div>
          <div>
            <m-button
              class="text-white"
              :loading="isDeleting && selectedId == item.id"
              @click="onDelete(item.id)"
            >
              x
            </m-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
