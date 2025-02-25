<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Profile } from '@/types/profile'
import UserProfile from '@/components/UserProfile.vue'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { categoryData } from '@/store/categories'
import { onMounted, ref, type Ref } from 'vue'
import { editMeUserProfile, fetchMeUserProfile } from '@/view-api-interaction/PersonalProfileView'
import { fetchPostsByUser } from '@/view-api-interaction/UserProfile'
const route = useRoute()
let id = route.params.username

const categoryStore = categoryData()

const profile: Ref<Profile | null> = ref(null)
const categories: Ref<Category[]> = ref([])
const posts: Ref<Post[]> = ref([])

onMounted(() => {
  onLoaded()
})

function onLoaded() {
  if (id instanceof Array) {
    id = id[0]
  }
  categoryStore.loadCategories().then(() => {
    categories.value = categoryStore.categories
    fetchMeUserProfile().then((u) => {
      profile.value = u
      fetchPostsByUser(u?.username ?? '').then((p) => {
        posts.value = p
      })
    })
  })
}

function onProfileEdit(user: Profile) {
  editMeUserProfile(user).then(() => {
    onLoaded()
  })
}
</script>

<template>
  <UserProfile
    v-if="profile"
    :profile="profile"
    :posts="posts"
    :editable="true"
    @update:profile="onProfileEdit"
  >
  </UserProfile>
  <!--TODO: Center this!-->
  <ProgressSpinner v-else />
</template>
