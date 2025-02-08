<script setup lang="ts">
import type { PropType } from 'vue'
import type { Profile } from '@/types/profile'
import { Avatar, Button, Fieldset } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import PostPreview from './PostPreview.vue'
import type { Post } from '@/types/post'
import type { Category } from '@/types/category'
const posts: Post[] = [
  {
    uuid: 'adadasd3',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    categoryUUID: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    created: 1738692463,
    modified: 0,
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    categoryUUID: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    created: 1738792463,
    modified: 0,
  },
  {
    uuid: 'adadasd',
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
    author: 'Jack Sparrow',
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    categoryUUID: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    created: 1739692463,
    modified: 0,
  },
]
const categories: Category[] = [
  {
    name: 'Technology',
    uuid: '35dbaec3-6738-42e5-bfd8-79e5877e3ffd',
    icon: 'pi pi-microchip',
  },
]
</script>

<template>
  <span class="profile-grid">
    <div class="profile-border">
      <span class="profile-metadata">
        <div class="profile-avatar">
          <Avatar :image="profile.profilePictureBase64" shape="circle" size="xlarge" />
        </div>
        <div class="profile-head">
          <div>
            <h1 class="profile-username">
              {{ profile.displayname }}
            </h1>
            <h2>{{ profile.username }}</h2>
          </div>
          <Button
            :icon="PrimeIcons.ENVELOPE"
            variant="link"
            as="a"
            :href="'mailto:' + profile.email"
            rounded
            severity="secondary"
          />
        </div>
        <Fieldset legend="Tagline">{{ profile.tagline }}</Fieldset>
        <Fieldset legend="Bio">{{ profile.bio }}</Fieldset>
      </span>
    </div>
    <div class="profile-post-preview profile-border">
      <!-- Display last 3 Posts -->
      <template v-for="post in posts.slice(0, 3)" :key="post.uuid">
        <PostPreview :post="post" :categories="categories"></PostPreview>
      </template>
      <h3 class="no-posts-yet" v-if="posts.length == 0">This user has not shared any posts yet</h3>
    </div>
  </span>
</template>

<script lang="ts">
export default {
  props: {
    profile: {
      type: Object as PropType<Profile>,
      required: true,
    },
  },
}
</script>

<style scoped src="/src/assets/profile.css" />
