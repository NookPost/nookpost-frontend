<script setup lang="ts">
import { fetchPostsFiltered } from '@/api-calls/posts'
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { useToast } from 'primevue'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
const posts: Ref<Post[]> = ref([])
const route = useRoute()

const categoryStore = categoryData()

const toast = useToast()

watch(
  () => route.query.q,
  () => onLoaded(),
)

onMounted(() => {
  onLoaded()
})

function onLoaded() {
  const searchstring =
    route.query.q instanceof Array ? route.query.q[0]?.toString() : route.query.q?.toString()
  console.log(searchstring)
  categoryStore.loadCategories().then(() => {
    fetchPostsFiltered(toast, undefined, undefined, searchstring).then((p) => (posts.value = p))
  })
}
</script>

<template>
  <div>
    <PostPreviewGrid :posts="posts" />
  </div>
</template>
