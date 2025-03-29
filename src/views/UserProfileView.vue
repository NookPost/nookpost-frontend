<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Profile } from '@/types/profile'
import UserProfile from '@/components/UserProfile.vue'
import { ProgressSpinner, useToast } from 'primevue'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { categoryData } from '@/store/categories'
import { authStore } from '@/store/auth'
import router from '@/router'
import { fetchUserProfile } from '@/api-calls/users'
import { fetchPostsFiltered } from '@/api-calls/posts'
const route = useRoute()
let id = route.params.username

const categoryStore = categoryData()

const profile: Ref<Profile | null> = ref(null)
const categories: Ref<Category[]> = ref([])
const posts: Ref<Post[]> = ref([])
const toast = useToast()

if (id instanceof Array) {
  id = id[0]
}

onMounted(() => {
  if (id == authStore().userName) {
    router.replace('/myprofile')
  }
  categoryStore.loadCategories().then(() => {
    categories.value = categoryStore.categories
    fetchUserProfile(toast, id).then((u) => {
      profile.value = u
      fetchPostsFiltered(toast, u?.username ?? '').then((p) => {
        posts.value = p
      })
    })
  })
})
</script>

<template>
  <UserProfile v-if="profile && posts" :profile="profile" :posts="posts" />
  <div v-else class="horizontal-center">
    <ProgressSpinner />
  </div>
</template>
