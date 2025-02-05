<script setup lang="ts">
import { Tag, Image } from 'primevue'
import { ref, type PropType } from 'vue'
import type { Post } from '@/types/post'
import Base64Cropper from './Base64Cropper.vue'

const croppedBase64 = ref('')
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <div class="post-border detail">
    <h1 class="post-title">{{ post.title }}</h1>
    <div class="post-meta detail">
      <h2>
        created&nbsp;by
        <span class="post-author">{{ post.author.replace(' ', '&nbsp;') }}</span> on&nbsp;<span
          class="post-created"
          >{{ new Date(post.created * 1000).toLocaleDateString() }}</span
        >
      </h2>
      <div class="post-tags">
        <Tag class="post-category">{{ post.category }}</Tag>
      </div>
    </div>
    <Base64Cropper
      v-model:base64-result="croppedBase64"
      source="https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg"
    />
    <!-- 32:9 Image ratio seems good -->
    <Image v-bind:src="croppedBase64" alt="Image" class="post-banner" preview />
    <div class="post-body">
      <p>
        {{ post.body }}
      </p>
    </div>
  </div>
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
