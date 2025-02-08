<script setup lang="ts">
import type { PropType } from 'vue'
import PostPreview from './PostPreview.vue'
import type { Post } from '@/types/post'
import type { Category } from '@/types/category'
</script>

<template>
  <div class="post-grid">
    <template v-for="post in posts" :key="post.uuid">
      <PostPreview :post="post" :categories="categories"></PostPreview>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    posts: {
      type: Object as PropType<Post[]>,
      required: true,
    },
    categories: {
      type: Object as PropType<Category[]>,
      required: true,
    },
  },
}
</script>

<style scoped src="/src/assets/post-grid.css" />

<style scoped>
a:hover {
  background-color: transparent;
}
</style>
