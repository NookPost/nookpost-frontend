<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, watch, type Ref } from 'vue'
import { fetchPostsByTextSearch } from '@/view-api-interaction/SearchResultsView'
import { useRoute } from 'vue-router'
const posts: Ref<Post[]> = ref([])
const route = useRoute()

const categoryStore = categoryData()

const params: URLSearchParams = new URLSearchParams(window.location.search)

watch(
  () => route.query.q,
  () => onLoaded()
)

onMounted(() => {
  onLoaded()
})

function onLoaded() {
  const searchstring = route.query.q instanceof Array ? route.query.q[0]?.toString() :
    route.query.q?.toString()
  console.log(searchstring)
  categoryStore.loadCategories().then(() => {
    fetchPostsByTextSearch(searchstring).then((p) => (posts.value = p))
  })
}
</script>

<template>
  <div>
    <PostPreviewGrid v-bind:posts="posts" />
  </div>
</template>
