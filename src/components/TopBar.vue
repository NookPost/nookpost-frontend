<script setup lang="ts">
import { Menubar, InputIcon, IconField, InputText, Avatar } from 'primevue'
interface Page {
  display_name: string
  path: string
  icon?: string | undefined
}
const pages: Page[] = [
  {
    display_name: 'Home',
    path: '/',
    icon: 'pi pi-home'
  },
  {
    display_name: 'About',
    path: '/about',
    icon: 'pi pi-info-circle',
  },
]
</script>

<template>
  <Menubar :model="pages">
    <template #start>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" />
    </template>

    <template #item="{ item }">
        <span class="nav-item">
            <RouterLink v-bind:to.="item.path">
              <i v-if="item.icon" v-bind:class="item.icon"></i>
              {{ item.display_name }}
          </RouterLink>
        </span>
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

span.nav-item a {
    display: flex;
    align-items: center;
    gap: 4px;
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
