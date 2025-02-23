<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import { categoryData } from '@/store/categories'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPosts } from '@/view-api-interaction/HomeView'
import { useRoute } from 'vue-router'
import type { Category } from '@/types/category'
const posts: Ref<Post[]> = ref([])

const categoryStore = categoryData()

const route = useRoute()
const id = route.params.category

const category: Category = {
  uuid: '',
  name: 'Category Name',
  icon: 'pi pi-microchip'
}

onMounted(() => {
  console.log(id)
  categoryStore.loadCategories().then(() => {
    fetchPosts().then((p) => (posts.value = p))
  })
})
</script>

<template>
  <div>
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
</template>

<style src="/src/assets/category.css" />

<style scoped>
.category {
  padding: 15px;
  padding-left: 20px;
}
</style>
