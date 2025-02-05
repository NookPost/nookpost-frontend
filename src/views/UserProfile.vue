<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Profile } from '@/types/profile'
import UserProfile from '@/components/UserProfile.vue'
const route = useRoute()
const id = route.params.username

const profile: Profile = {
  uuid: 'akdjnasjdb',
  username: 'Test',
  displayname: 'Teee',
  email: 'test@test.com',
  tagline: 'Wassup',
  bio: 'Insert something creative here. Are you really reading this? Stop it. I said STOP!!! Well, since you are still reading, I give up... Have a nice evening.',
  profilePictureBase64: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
}
</script>

<template>
  <div>User {{ id }}</div>
  <UserProfile :profile="profile"></UserProfile>
</template>
