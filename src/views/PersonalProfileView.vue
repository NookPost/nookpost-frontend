<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Profile } from '@/types/profile'
import UserProfile from '@/components/UserProfile.vue'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
const route = useRoute()
const id = route.params.username

const profile: Profile = {
  uuid: 'akdjnasjdb',
  username: 'Test_1234',
  displayname: 'Teee Rock Bottom',
  email: 'test@test.com',
  tagline: 'Wassup',
  bio: 'Insert something creative here. Are you really reading this? Stop it. I said STOP!!! Well, since you are still reading, I give up... Have a nice evening.',
  profilePictureBase64: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
}
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
  <div>User {{ id }}</div>
  <UserProfile
    :profile="profile"
    :posts="posts"
    :editable="true"
    @update:profile="console.log"
  ></UserProfile>
</template>
