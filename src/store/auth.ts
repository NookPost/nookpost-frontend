import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

// private Store
const authData = defineStore('authData', () => {
  const loggedIn: Ref<boolean, boolean> = ref(false)

  if (localStorage.getItem("loggedIn")) {
    loggedIn.value = (localStorage.getItem("loggedIn") === 'true');
  }

  return { loggedIn }
})

export const authStore = defineStore('authStore', {
  state: () => {
    const data = authData()
    const isLoggedIn = computed(() => data.loggedIn)

    return { isLoggedIn }
  },
  actions: {
    login() {
      const data = authData()
      console.log(data.loggedIn)
      data.loggedIn = true
      localStorage.setItem('loggedIn', String(true))
      console.log(data.loggedIn)
    },

    logout() {
      const data = authData()
      localStorage.setItem('loggedIn', String(false))
      data.loggedIn = false
    },
  },

})
