<script setup lang="ts">
import CategoryItem from '@/components/CategoryItem.vue'
import { onMounted, ref } from 'vue'
import { fetchCategories } from '@/view-api-interaction/CategoriesView'
import type { Category } from '@/types/category'

let categories = ref<Category[]>([])

onMounted(() => {
  fetchCategories().then((c) => (categories.value = c))
})
</script>

<template>
  <h1 class="blue">Categories</h1>
  <div class="category-list">
    <template v-for="category in categories" v-bind:key="category.uuid">
      <CategoryItem :category="category"></CategoryItem>
    </template>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
h1 {
  padding: 15px;
  font-weight: bold;
  font-size: 2.6rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 15px;
}
</style>
