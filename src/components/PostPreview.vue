<script setup lang="ts">
import { Tag, Button, useToast } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import { ref, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import type { Post } from '@/types/post'
import { authStore } from '@/store/auth'
import { deletePost } from '@/api-calls/posts'
import 'quill/dist/quill.core.css'

const authData = authStore()

const readMore = ref(false)

const toast = useToast()

function getShortenedBody(input: string): string {
  const numberOfChars: number = 250
  if (input.length > numberOfChars) {
    readMore.value = true
    const temp: string = input.slice(0, numberOfChars - 1)
    return temp.substring(
      0,
      temp.lastIndexOf(' ') == -1 ? numberOfChars - 1 : temp.lastIndexOf(' '),
    )
  }
  return input
}

function onClickDelete(uuid: string) {
  deletePost(toast, uuid)
}
</script>

<style scoped src="/src/assets/post.css" />

<template>
  <RouterLink :to="'/post/' + encodeURIComponent(post.uuid)" class="post-preview-router">
    <div class="post-border frame preview">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-preview-meta-bar">
        <div class="post-meta">
          <h2>
            created&nbsp;by
            <RouterLink
              class="post-author-link"
              :to="'/profile/' + encodeURIComponent(post.authorUsername)"
            >
              <span class="post-author">{{ post.authorDisplayname.replace(' ', '&nbsp;') }}</span>
            </RouterLink>
            on&nbsp;<span class="post-created">{{
              new Date(post.created * 1000).toLocaleDateString()
            }}</span
            ><!-- convert timestamp in seconds to milliseconds -->
          </h2>
          <div class="post-tags">
            <RouterLink
              class="post-category-link"
              :to="'/category/' + encodeURIComponent(post.category.uuid)"
            >
              <Tag class="post-category"
                ><span :class="post.category.icon" />{{ post.category.name }}</Tag
              >
            </RouterLink>
          </div>
        </div>
        <div v-if="authData.userName === post.authorUsername" class="post-controls">
          <Button
            :icon="PrimeIcons.PENCIL"
            severity="secondary"
            as="router-link"
            :to="'/post/edit/' + encodeURIComponent(post.uuid)"
            v-tooltip.bottom="'Edit Post'"
          />
          <!-- Add Deletion Logic here -->
          <Button
            :icon="PrimeIcons.TRASH"
            severity="danger"
            @click="onClickDelete(post.uuid)"
            v-tooltip.bottom="'Delete Post'"
          />
        </div>
      </div>
      <div class="post-body ql-editor">
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
