<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostDetail from '@/components/PostDetail.vue'
import type { Post } from '@/types/post'
import { ref, type Ref } from 'vue'
import type { Category } from '@/types/category'
const route = useRoute()
const id = route.params.id
const categories: Category[] = [
  {
    name: 'Technology',
    uuid: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    icon: 'pi pi-microchip',
  },
]
const post: Ref<Post, Post> = ref({
  uuid: 'adadasd',
  title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  author: 'Jack Sparrow',
  body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  category: categories[0],
  created: 1739692463,
  modified: 0,
})
</script>

<template>
  <div class="post-detail-view">
    This will later be the detail page for post {{ id }}
    <PostDetail
      v-model:data="post"
      :edit="true"
      v-on:update:post="console.log"
      :categories="categories"
    />
  </div>
</template>

<style scoped>
.post-detail-view {
  margin: 0 auto;
  width: clamp(400px, 90%, 1600px);
}
</style>
