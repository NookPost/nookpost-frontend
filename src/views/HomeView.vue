<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPostsFiltered } from '@/api-calls/posts'
import { useToast } from 'primevue'
const posts: Ref<Post[]> = ref([])

const categoryStore = categoryData()

const toast = useToast()

onMounted(() => {
  categoryStore.loadCategories().then(() => {
    fetchPostsFiltered(toast).then((p) => (posts.value = p))
  })
})
</script>

<template>
  <main>
    <PostPreviewGrid :posts="posts" />
  </main>
</template>
