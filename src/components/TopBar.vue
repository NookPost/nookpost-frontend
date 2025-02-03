<script setup lang="ts">
import { Menubar, Button, TieredMenu } from 'primevue'
import { type MenuItem } from 'primevue/menuitem'
import SearchBar from './SearchBar.vue'
import { authStore } from '@/store/auth'
import { ref } from 'vue'
interface Page {
  display_name: string
  path: string
  icon?: string | undefined
}
const pages: Page[] = [
  {
    display_name: 'Home',
    path: '/',
    icon: 'pi pi-home',
  },
  {
    display_name: 'About',
    path: '/about',
    icon: 'pi pi-info-circle',
  },
]

const auth = authStore()

const menu = ref()
const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

const avatarMenu = ref(<MenuItem[]>[
  {
    label: '1',
  },
  {
    label: '2',
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      auth.logout()
    },
  },
])
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
        <SearchBar></SearchBar>
        <Button v-if="!auth.isLoggedIn" v-on:click="auth.login()">Login</Button>
        <span v-else>
          <Button icon="pi pi-user" @click="toggle" variant="outlined"></Button>
          <TieredMenu ref="menu" id="overlay_tmenu" :model="avatarMenu" popup />
        </span>
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
