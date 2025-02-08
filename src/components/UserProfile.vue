<script setup lang="ts">
import { ref, toRaw, type PropType, type Ref } from 'vue'
import type { Profile } from '@/types/profile'
import { Avatar, Button, Fieldset, InputText, FloatLabel, Textarea } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import PostPreview from './PostPreview.vue'
import type { Post } from '@/types/post'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import type { Category } from '@/types/category'
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

const props = defineProps({
  profile: {
      type: Object as PropType<Profile>,
      required: true,
    },
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
})

const emit = defineEmits<{
   (e: 'update:profile', val: Profile): Profile
 }>()

const edit: Ref<boolean, boolean> = ref(false)

const isLoading = ref(false)

function onFormSubmit(event: FormSubmitEvent) {
  if (event.valid) {
    isLoading.value = true
    const formData = toRaw(event.states)
    emit('update:profile', {
      uuid: props.profile.uuid,
      username: formData.username.value,
      displayname: formData.displayname.value,
      email: formData.email.value,
      tagline: formData.tagline.value,
      bio: formData.bio.value,
      //TODO: Image Upload (copy from Post)
      profilePictureBase64: props.profile.profilePictureBase64,
    })
    isLoading.value = false
    edit.value = false
  }
}
</script>

<template>
  <span class="profile-grid">
    <div class="profile-border">
      <span v-if="!edit" class="profile-metadata">
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
          <div>
            <Button
              :icon="PrimeIcons.ENVELOPE"
              variant="link"
              as="a"
              :href="'mailto:' + profile.email"
              rounded
              severity="secondary"
              v-tooltip.bottom="'Send Mail'"
            />
            <Button
              v-if="editable"
              :icon="PrimeIcons.PENCIL"
              rounded
              severity="secondary"
              @click="edit = true"
              v-tooltip.bottom="'Edit Profile'"
            />
          </div>
        </div>
        <Fieldset legend="Tagline">{{ profile.tagline }}</Fieldset>
        <Fieldset legend="Bio">{{ profile.bio }}</Fieldset>
      </span>
      <Form v-else class="profile-metadata edit" :initial-values="profile" @submit="onFormSubmit">
        <div class="profile-avatar">
          <Avatar :image="profile.profilePictureBase64" shape="circle" size="xlarge" />
        </div>
        <div class="profile-head">
          <div class="profile-edit-inputs">
            <FloatLabel variant="on">
              <InputText class="profile-username" id="displayname" name="displayname"></InputText>
              <label for="displayname">Displayname</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText id="username" name="username"></InputText>
              <label for="username">Username</label>
            </FloatLabel>
          </div>
          <div>
            <Button
              v-if="editable"
              :icon="PrimeIcons.SAVE"
              :loading="isLoading"
              type="submit"
              rounded
              severity="secondary"
              v-tooltip.bottom="'Save changes'"
            />
          </div>
        </div>
        <FloatLabel variant="on">
          <InputText id="email" name="email"></InputText>
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Textarea id="tagline" name="tagline" autoResize rows="1" style="resize: none" />
          <label for="tagline">Tagline</label>
        </FloatLabel>
        <FloatLabel variant="on">
          <Textarea id="bio" name="bio" autoResize rows="1" style="resize: none" />
          <label for="bio">Bio</label>
        </FloatLabel>
      </Form>
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

<style scoped src="/src/assets/profile.css" />
