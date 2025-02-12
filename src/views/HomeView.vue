<script setup lang="ts">
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
const categories: Category[] = [
  {
    name: 'Technology',
    uuid: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    icon: 'pi pi-microchip',
  },
]
const posts: Post[] = [
  {
    uuid: 'adadasd3',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: categories[0],
    created: 1738692463,
    modified: 0,
    bannerImageBase64: '',
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: categories[0],
    created: 1738792463,
    modified: 0,
    bannerImageBase64: '',
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: categories[0],
    created: 1739692463,
    modified: 0,
    bannerImageBase64: '',
  },
]
</script>

<template>
  <main>
    <PostPreviewGrid v-bind:posts="posts" />
  </main>
</template>
