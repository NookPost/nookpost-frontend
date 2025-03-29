<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Category } from '@/types/category'
import { ProgressSpinner, useToast } from 'primevue'
import { fetchPostsFiltered } from '@/api-calls/posts'
import router from '@/router'
const posts: Ref<Post[] | null> = ref(null)

const categoryStore = categoryData()
const toast = useToast()

const route = useRoute()
let id = route.params.categoryID

if (id instanceof Array) {
  id = id[0]
}

const category: Ref<Category | null> = ref(null)

onMounted(() => {
  categoryStore.loadCategories().then(() => {
    category.value = categoryStore.categories.find((c) => c.uuid == id) ?? null
    if (category.value != null) {
      fetchPostsFiltered(toast, undefined, id).then((p) => (posts.value = p))
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The requested category was not found.',
        life: 3000,
        group: 'bottom-center',
      })
      router.replace('/')
    }
  })
})
</script>

<template>
  <div v-if="posts && category">
    <div class="category">
      <h1>
        <div>
          <span :class="category.icon" />
        </div>
        {{ category.name }}
      </h1>
    </div>
    <PostPreviewGrid :posts="posts" />
  </div>
  <div v-else class="horizontal-center">
    <ProgressSpinner />
  </div>
</template>

<style src="/src/assets/category.css" scoped />

<style scoped>
.category {
  padding: 15px;
  padding-left: 20px;
}
</style>
