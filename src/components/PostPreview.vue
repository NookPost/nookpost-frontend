<script setup lang="ts">
import { Tag } from 'primevue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

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
  <RouterLink :to="'/post/' + uuid" class="post-preview-router">
    <div class="post-border preview">
      <h1 class="post-title">{{ title }}</h1>
      <div class="post-meta">
        <h2>
          created&nbsp;by
          <span class="post-author">{{ author.replace(' ', '&nbsp;') }}</span> on&nbsp;<span
            class="post-created"
            >{{ new Date(created * 1000).toLocaleDateString() }}</span
          >
        </h2>
        <div class="post-tags">
          <Tag class="post-category">{{ category }}</Tag>
        </div>
      </div>
      <div class="post-body">
        <p>
          {{ getShortenedBody(body) }}
          <span v-if="readMore" class="post-readmore">[...]</span>
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
export default {
  props: {
    uuid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    created: {
      type: Number,
      required: true,
    },
    modified: {
      type: Number,
      default: 0,
      required: false,
    },
  },
}
</script>
