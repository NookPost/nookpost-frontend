<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import PostPreview from '@/components/PostPreview.vue'
</script>

<template>
  <main>
    <TheWelcome />
    <PostPreview
      title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
      author="Jack Sparrow"
      body="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      category="Technology"
      :created="1738692463"
    ></PostPreview>
  </main>
</template>
