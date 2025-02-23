<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPosts } from '@/view-api-interaction/HomeView'
const posts: Ref<Post[]> = ref([])

const categoryStore = categoryData()

const params: URLSearchParams = new URLSearchParams(window.location.search)

onMounted(() => {
  const searchstring = params.get('q')
  console.log(searchstring)
  categoryStore.loadCategories().then(() => {
    fetchPosts().then((p) => (posts.value = p))
  })
})
</script>

<template>
  <div>
    <PostPreviewGrid v-bind:posts="posts" />
  </div>
</template>
