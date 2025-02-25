<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Profile } from '@/types/profile'
import UserProfile from '@/components/UserProfile.vue'
import { ProgressSpinner } from 'primevue'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { categoryData } from '@/store/categories'
import { fetchPostsByUser, fetchUserProfile } from '@/view-api-interaction/UserProfile'
import { authStore } from '@/store/auth'
import router from '@/router'
const route = useRoute()
let id = route.params.username

const categoryStore = categoryData()

const profile: Ref<Profile | null> = ref(null)
const categories: Ref<Category[]> = ref([])
const posts: Ref<Post[]> = ref([])

if (id instanceof Array) {
  id = id[0]
}

onMounted(() => {
  if(id == authStore().userName){
    router.replace("/myprofile")
  }
  categoryStore.loadCategories().then(() => {
    categories.value = categoryStore.categories
    fetchUserProfile(id).then((u) => {
      profile.value = u
      fetchPostsByUser(u?.username ?? '').then((p) => {
        posts.value = p
      })
    })
  })
})
</script>

<template>
  <UserProfile v-if="profile" :profile="profile" :posts="posts"></UserProfile>
  <!--TODO: Center this!-->
  <ProgressSpinner v-else />
</template>
