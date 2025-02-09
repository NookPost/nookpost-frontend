<script setup lang="ts">
import { ref, toRaw, type PropType, type Ref } from 'vue'
import type { Profile } from '@/types/profile'
import { Avatar, Button, Fieldset, InputText, FloatLabel, Textarea, Message } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import PostPreview from './PostPreview.vue'
import type { Post } from '@/types/post'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
import CropperDialog from './CropperDialog.vue'
import { CircleStencil } from 'vue-advanced-cropper'

const props = defineProps({
  profile: {
    type: Object as PropType<Profile>,
    required: true,
  },
  posts: {
    type: Object as PropType<Post[]>,
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

const imageBase64 = ref(props.profile.profilePictureBase64)

function onFormSubmit(event: FormSubmitEvent) {
  if (event.valid) {
    isLoading.value = true
    const formData = toRaw(event.states)
    emit('update:profile', {
      uuid: props.profile.uuid,
      username: props.profile.username,
      displayname: formData.displayname.value,
      email: formData.email.value,
      tagline: formData.tagline.value,
      bio: formData.bio.value,
      profilePictureBase64: imageBase64.value,
    })
    isLoading.value = false
    edit.value = false
  }
}

const resolver = ({ values }: FormResolverOptions) => {
  const errors: Promise<Record<string, unknown>> | Record<string, unknown> | undefined = {}

  if (!values.displayname) {
    errors.displayname = [{ message: 'Displayname is required.' }]
  }

  return {
    errors,
  }
}
</script>

<template>
  <span class="profile-grid">
    <div class="profile-border">
      <span v-if="!edit" class="profile-metadata">
        <div class="profile-avatar">
          <Avatar v-if="imageBase64 !== ''" :image="imageBase64" shape="circle" size="xlarge" />
          <Avatar v-else :icon="PrimeIcons.USER" shape="circle" size="xlarge" />
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
              v-if="profile.email !== ''"
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
      <Form
        v-else
        v-slot="$form"
        class="profile-metadata edit"
        :initial-values="profile"
        :resolver
        @submit="onFormSubmit"
      >
        <div class="profile-avatar">
          <CropperDialog
            v-model:data="imageBase64"
            :stencil-component="CircleStencil"
            preview-class="avatar-preview"
          />
        </div>
        <div class="profile-head">
          <div class="profile-edit-inputs">
            <FloatLabel variant="on">
              <InputText class="profile-username" id="displayname" name="displayname"></InputText>
              <label for="displayname">Displayname</label>
            </FloatLabel>
            <Message
              v-if="$form.displayname?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.displayname.error.message }}</Message
            >
            <h2>{{ profile.username }}</h2>
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
        <PostPreview :post="post"></PostPreview>
      </template>
      <h3 class="no-posts-yet" v-if="posts.length == 0">This user has not shared any posts yet</h3>
    </div>
  </span>
</template>

<style scoped src="/src/assets/profile.css" />
