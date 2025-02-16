<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostDetail from '@/components/PostDetail.vue'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPost } from '@/view-api-interaction/PostDetailView'
import { ProgressSpinner } from 'primevue'
import { categoryData } from '@/store/categories'
const route = useRoute()
let id = route.params.id
const edit: Ref<boolean, boolean> = ref((route.meta.edit as boolean | undefined) ?? false)
const create: boolean = (route.meta.create as boolean | undefined) ?? false
const post: Ref<Post | null> = ref(null)

if (id instanceof Array) {
  id = id[0]
}

if (create) {
  edit.value = true
  post.value = {
    authorUsername: '',
    authorDisplayname: '',
    bannerImageBase64: '',
    body: '',
    category: { icon: '', name: '', uuid: '' },
    created: 0,
    modified: 0,
    title: '',
    uuid: '',
  }
}

const categories = categoryData()

onMounted(() => {
  categories.loadCategories().then(() => {
    if (!create) {
      fetchPost(id).then((p) => (post.value = p))
    }
  })
})
</script>

<template>
  <div class="post-detail-view">
    <!-- When edit is false, then display  -->
    <PostDetail
      v-if="post"
      v-model:data="post"
      :edit="edit"
      v-on:update:post="console.log"
      :categories="categories.categories"
    />
    <ProgressSpinner v-else />
  </div>
</template>

<style scoped>
.post-detail-view {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: clamp(400px, 90%, 1600px);
}
</style>
