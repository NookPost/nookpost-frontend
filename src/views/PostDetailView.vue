<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>This will later be the detail page for post {{ id }}</div>
</template>
