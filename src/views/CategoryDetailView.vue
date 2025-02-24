<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Category } from '@/types/category'
import { fetchPostsByCategory } from '@/view-api-interaction/CategoryDetailView'
import { ProgressSpinner } from 'primevue'
const posts: Ref<Post[] | null> = ref(null)

const categoryStore = categoryData()

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
      fetchPostsByCategory(id).then((p) => (posts.value = p))
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
    <PostPreviewGrid v-bind:posts="posts" />
  </div>
  <ProgressSpinner v-else />
</template>

<style src="/src/assets/category.css" />

<style scoped>
.category {
  padding: 15px;
  padding-left: 20px;
}
</style>
