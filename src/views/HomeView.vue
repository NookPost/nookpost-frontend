<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPosts } from '@/view-api-interaction/HomeView'
const posts: Ref<Post[]> = ref([])

const categoryStore = categoryData()

onMounted(() => {
  categoryStore.loadCategories().then(() => {
    fetchPosts().then((p) => (posts.value = p))
  })
})
</script>

<template>
  <main>
    <PostPreviewGrid v-bind:posts="posts" />
  </main>
</template>
