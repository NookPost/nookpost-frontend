<script setup lang="ts">
import type { PropType } from 'vue'
import type { Profile } from '@/types/profile'
import { Avatar, Button, Fieldset } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
</script>

<template>
  <div class="profile-border">
    <div class="profile-avatar">
      <Avatar :image="profile.profilePictureBase64" shape="circle" size="xlarge" />
    </div>
    <div class="profile-head">
      <h1 class="profile-username">
        {{ profile.displayname }}
      </h1>
      <Button
        :icon="PrimeIcons.ENVELOPE"
        variant="link"
        as="a"
        :href="'mailto:' + profile.email"
        rounded
        severity="secondary"
      />
    </div>
    <div>
      <h2>{{ profile.username }}</h2>
    </div>
    <div>
      <Fieldset legend="Tagline">{{ profile.tagline }}</Fieldset>
    </div>
    <div>
      <Fieldset legend="Bio">{{ profile.bio }}</Fieldset>
    </div>
  </div>
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
