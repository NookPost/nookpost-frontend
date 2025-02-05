<script setup lang="ts">
import PostPreview from './PostPreview.vue';
</script>

<template>
  <div class="post-grid">
      <PostPreview
        uuid="adadasd3"
        title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        author="Jack Sparrow"
        body="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        category="Technology"
        :created="1738692463"
      />
      <PostPreview
        uuid="adadasd2"
        title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        author="Jack Sparrow"
        body="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        category="Technology"
        :created="1738792463"
      />
      <PostPreview
        uuid="adadasd"
        title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        author="Jack Sparrow"
        body="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        category="Technology"
        :created="1739692463"
      />
    </div>
</template>

<style scoped src="/src/assets/post-grid.css"/>

<style scoped>
a:hover {
  background-color: transparent;
}
</style>