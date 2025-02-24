<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostDetail from '@/components/PostDetail.vue'
import type { Post } from '@/types/post'
import { onMounted, ref, watch, type Ref } from 'vue'
import { fetchPost, updatePost } from '@/view-api-interaction/PostDetailView'
import { ProgressSpinner } from 'primevue'
import { categoryData } from '@/store/categories'
const route = useRoute()
let id: string
const edit: Ref<boolean, boolean> = ref((route.meta.edit as boolean | undefined) ?? false)
const create: boolean = (route.meta.create as boolean | undefined) ?? false
const post: Ref<Post | null> = ref(null)

if (route.params.id instanceof Array) {
  id = route.params.id[0]
} else {
  id = route.params.id
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

watch(
  () => route.meta.edit,
  () => onViewLoaded(),
)

onMounted(() => {
  onViewLoaded()
})

function onViewLoaded() {
  edit.value = (route.meta.edit as boolean | undefined) ?? false
  categories.loadCategories().then(() => {
    if (!create) {
      fetchPost(id).then((p) => (post.value = p))
    }
  })
}

function onEditPost(editedPost: Post) {
  updatePost(editedPost)
}
</script>

<template>
  <div class="post-detail-view">
    <!-- When edit is false, then display  -->
    <PostDetail
      v-if="post"
      v-model:data="post"
      :edit="edit"
      v-on:update:post="onEditPost"
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
