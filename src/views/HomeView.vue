<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPostsFiltered } from '@/api-calls/posts'
const posts: Ref<Post[]> = ref([])

const categoryStore = categoryData()

onMounted(() => {
  categoryStore.loadCategories().then(() => {
    fetchPostsFiltered().then((p) => (posts.value = p))
  })
})
</script>

<template>
  <main>
    <PostPreviewGrid v-bind:posts="posts" />
  </main>
</template>
