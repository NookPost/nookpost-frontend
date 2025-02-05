<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostDetail from '@/components/PostDetail.vue'
import type { Post } from '@/types/post'
const route = useRoute()
const id = route.params.id
const post: Post = {
  uuid: 'adadasd',
  title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  author: 'Jack Sparrow',
  body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  category: 'Technology',
  created: 1739692463,
  modified: 0,
}
</script>

<template>
  <div class="post-detail-view">
    This will later be the detail page for post {{ id }}
    <PostDetail :post="post" />
  </div>
</template>

<style scoped>
.post-detail-view {
  margin: 0 auto;
  width: clamp(400px, 90%, 1600px);
}
</style>
