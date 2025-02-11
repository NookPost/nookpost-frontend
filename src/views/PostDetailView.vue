<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostDetail from '@/components/PostDetail.vue'
import type { Post } from '@/types/post'
import { onMounted, ref, type Ref } from 'vue'
import { fetchPost } from '@/view-api-interaction/PostDetailView'
const route = useRoute()
let id = route.params.id
const post: Ref<Post | null> = ref(null)

if(id instanceof Array){
  id = id[0]
}

onMounted(() => {
  fetchPost(id).then(p => post.value = p)
})

</script>

<template>
  <div class="post-detail-view">
    This will later be the detail page for post {{ id }}
    <!-- View sample -->
    <PostDetail v-if="post" :data="post" />
    <!-- Edit sample (for creation pass empty object) -->
    <!-- <PostDetail
      v-model:data="post"
      :edit="true"
      v-on:update:post="console.log"
      :categories="categories"
    /> -->
  </div>
</template>

<style scoped>
.post-detail-view {
  margin: 0 auto;
  width: clamp(400px, 90%, 1600px);
}
</style>
