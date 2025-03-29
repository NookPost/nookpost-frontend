<script setup lang="ts">
import { type PropType } from 'vue'
import type { Category } from '@/types/category'
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink :to="'/category/' + encodeURIComponent(category.uuid)">
    <div class="category frame">
      <h1>
        <div>
          <span :class="category.icon" />
        </div>
        {{ category.name }}
      </h1>
    </div>
  </RouterLink>
</template>

<script lang="ts">
export default {
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true,
    },
  },
}
</script>

<style src="/src/assets/category.css" scoped />

<style scoped>
a {
  padding: 0;
}

a:hover {
  background-color: transparent;
  opacity: 0.8;
}
</style>
