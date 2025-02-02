<script setup lang="ts">
import { Menubar, InputIcon, IconField, InputText, Avatar } from 'primevue'
import { ref } from 'vue'
const items = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
])
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" />
    </template>

    <template #item="{ item }">
      <RouterLink v-bind:to="item.path">{{ item.name }}</RouterLink>
    </template>

    <template #end>
      <div class="toolbar-inline">
        <IconField>
          <InputText placeholder="Search" type="text" />
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
        </IconField>

        <Avatar></Avatar>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>
.logo {
  margin: 0 12px 0 0;
}

div.toolbar-inline {
  display: flex;
  gap: 10px;
  align-items: center;
}

a:not(.router-link-exact-active) {
  color: var(--color-text);
}

a:hover {
  background-color: transparent;
}
</style>
