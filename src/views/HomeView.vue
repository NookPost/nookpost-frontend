<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import PostPreviewGrid from '@/components/PostPreviewGrid.vue'
import type { Post } from '@/types/post'
const posts: Post[] = [
  {
    uuid: 'adadasd3',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: 'Technology',
    created: 1738692463,
    modified: 0,
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: 'Technology',
    created: 1738792463,
    modified: 0,
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    category: 'Technology',
    created: 1739692463,
    modified: 0,
  },
]
</script>

<template>
  <main>
    <TheWelcome />
    <PostPreviewGrid v-bind:posts="posts" />
  </main>
</template>
