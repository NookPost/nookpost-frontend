<script setup lang="ts">
import { InputIcon, IconField, InputText } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import { useRouter } from 'vue-router'
let searchstring: string | undefined
const router = useRouter()
function onFormSubmit(event: KeyboardEvent) {
  if (event.key === 'Enter' && searchstring != undefined) {
    router.push('/search?q=' + encodeURI(searchstring))
  }
}
</script>

<template>
  <IconField>
    <InputText
      placeholder="Search"
      ref="searchBar"
      type="search"
      v-model="searchstring"
      @keyup="onFormSubmit"
    />
    <InputIcon>
      <i :class="PrimeIcons.SEARCH" />
    </InputIcon>
  </IconField>
</template>
