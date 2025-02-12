<script setup lang="ts">
import { type PropType } from 'vue'
import type { Category } from '@/types/category'
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink :to="'/category/' + category.uuid">
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

<style src="/src/assets/frame.css" />

<style scoped>
a {
  padding: 0;
}

a:hover {
  background-color: transparent;
  opacity: 0.8;
}

.category {
  background: var(--vt-c-divider-dark-2);
  width: fit-content;
}

.category div {
  display: grid;
  align-items: center;
}

.category h1 {
  color: var(--color-heading);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 10px;
  line-height: 1;
}

.category h1 .pi {
  --p-icon-size: 24px;
}
</style>
