<script setup lang="ts">
import CategoryItem from '@/components/CategoryItem.vue'
import type { Category } from '@/types/category'

const categories: Category[] = [
  {
    uuid: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    name: 'Technology',
    icon: 'pi pi-microchip',
  },
  {
    uuid: 'b2ad2f84-8a8f-4006-ab62-35b9a09cb6d7',
    name: 'Food',
    icon: 'pi pi-face-smile',
  },
]
</script>

<template>
  <h1 class="blue">Categories</h1>
  <div class="category-list">
    <template v-for="category in categories" v-bind:key="category.uuid">
      <CategoryItem :category="category"></CategoryItem>
    </template>
  </div>
</template>

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
