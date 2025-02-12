<script setup lang="ts">
import CategoryItem from '@/components/CategoryItem.vue'
import { categoryData } from '@/store/categories'
import { onMounted } from 'vue'

const categoryStore = categoryData()

onMounted(() => {
  categoryStore.loadCategories()
})
</script>

<template>
  <h1 class="blue">Categories</h1>
  <div class="category-list">
    <template v-for="category in categoryStore.categories" v-bind:key="category.uuid">
      <CategoryItem :category="category"></CategoryItem>
    </template>
  </div>
</template>

<style scoped>
h1 {
  padding: 15px;
  padding-top: 0;
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
