<script setup lang="ts">
import { Menubar, Button, TieredMenu, useToast } from 'primevue'
import { PrimeIcons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'
import SearchBar from './SearchBar.vue'
import { authStore } from '@/store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toast = useToast()

interface Page {
  display_name: string
  path: string
  icon?: string | undefined
}

const pages: Page[] = [
  {
    display_name: 'Home',
    path: '/',
    icon: PrimeIcons.HOME,
  },
  {
    display_name: 'Categories',
    path: '/categories',
    icon: PrimeIcons.TH_LARGE,
  },
  {
    display_name: 'About',
    path: '/about',
    icon: PrimeIcons.INFO_CIRCLE,
  },
  {
    display_name: 'Privacy',
    path: '/privacy-policy',
    icon: PrimeIcons.KEY,
  },
  {
    display_name: 'Legal Notice',
    path: '/legal-notice',
  },
]

const auth = authStore()

const menu = ref()
const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

const avatarMenu = ref(<MenuItem[]>[
  {
    label: 'Profile',
    icon: PrimeIcons.USER,
    route: '/myprofile',
  },
  {
    label: 'Create Post',
    icon: PrimeIcons.PLUS,
    route: '/post/create',
  },
  {
    label: 'Logout',
    icon: PrimeIcons.SIGN_OUT,
    command: () => {
      auth.logout()
      router.replace('/')
      toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Logout successful',
        life: 3000,
        group: 'top-right',
      })
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
        <Button v-if="!auth.isLoggedIn" v-on:click="router.push('/login')">Login</Button>
        <span v-else>
          <Button :icon="PrimeIcons.USER" @click="toggle" variant="outlined"></Button>
          <TieredMenu ref="menu" id="overlay_tmenu" :model="avatarMenu" popup>
            <template #item="{ item, props }">
              <RouterLink
                v-if="item.route"
                v-bind:to.="item.route"
                class="p-tieredmenu-item-link"
                tabindex="-1"
              >
                <span class="p-tieredmenu-item-icon" :class="item.icon" />
                <span class="p-tieredmenu-item-label">{{ item.label }}</span>
              </RouterLink>
              <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
                class="p-tieredmenu-item-link"
                tabindex="-1"
              >
                <span class="p-tieredmenu-item-icon" :class="item.icon" />
                <span class="p-tieredmenu-item-label">{{ item.label }}</span>
              </a>
            </template>
          </TieredMenu>
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

a:not(.router-link-exact-active):not(.p-tieredmenu-item-link) {
  color: var(--color-text);
}

a:hover {
  background-color: transparent;
}
</style>
