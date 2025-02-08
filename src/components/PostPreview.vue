<script setup lang="ts">
import { Tag } from 'primevue'
import { ref, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import type { Post } from '@/types/post'

const readMore = ref(false)

function getShortenedBody(input: string): string {
  const numberOfChars: number = 250
  if (input.length > numberOfChars) {
    readMore.value = true
  }
  const temp: string = input.slice(0, numberOfChars - 1)
  return temp.substring(0, temp.lastIndexOf(' '))
}
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <RouterLink :to="'/post/' + post.uuid" class="post-preview-router">
    <div class="post-border preview">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-meta">
        <h2>
          created&nbsp;by
          <span class="post-author">{{ post.author.replace(' ', '&nbsp;') }}</span> on&nbsp;<span
            class="post-created"
            convert
            timestamp
            in
            seconds
            to
            milliseconds
            >{{ new Date(post.created * 1000).toLocaleDateString() }}</span
          ><!-- convert timestamp in seconds to milliseconds -->
        </h2>
        <div class="post-tags">
          <Tag class="post-category"
            ><span :class="post.category.icon" />{{ post.category.name }}</Tag
          >
        </div>
      </div>
      <div class="post-body">
        <p>
          <span v-html="getShortenedBody(post.body)"></span>
          <span v-if="readMore" class="post-readmore"> [...]</span>
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
export default {
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
}
</script>
