import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { AuthenticationApi, type AuthenticationLoginRequestBody } from '@/api'
import { getAPIConfig } from '@/util/api'
import { AxiosError } from 'axios'

// private Store
const authData = defineStore('authData', () => {
  const loggedIn: Ref<boolean, boolean> = ref(false)
  const accessToken: Ref<string | null, string | null> = ref(null)
  const expiryTimestamp: Ref<number | null, number | null> = ref(null)

  if (localStorage.getItem('loggedIn')) {
    loggedIn.value = localStorage.getItem('loggedIn') === 'true'
  }
  // TODO: find proper solution to safely store access token across page reloads
  if (localStorage.getItem('accessToken')) {
    accessToken.value = localStorage.getItem('accessToken')
  }
  if (localStorage.getItem('expiryTimestamp')) {
    expiryTimestamp.value = Number(localStorage.getItem('expiryTimestamp'))
  }

  return { loggedIn, accessToken, expiryTimestamp }
})

interface loginData {
  username: string
  password: string
}

export const authStore = defineStore('authStore', {
  state: () => {
    const data = authData()
    const isLoggedIn = computed(() => data.loggedIn)
    const expireTime = computed(() =>
      data.expiryTimestamp != null ? new Date(data.expiryTimestamp * 1000) : null,
    )

    return { isLoggedIn, expireTime }
  },
  actions: {
    async login({ username, password }: loginData): Promise<boolean> {
      const data = authData()
      const configuration = getAPIConfig(false)
      const authAPI = new AuthenticationApi(configuration)
      let response
      try {
        response = await authAPI.authenticationLoginPost(<AuthenticationLoginRequestBody>{
          username: username,
          password: password,
        })
      } catch (err) {
        if (err instanceof AxiosError) {
          response = err.response
        } else {
          throw err
        }
      }
      console.log(response)
      if (response != undefined && response.status === 200 && response.statusText === 'OK') {
        data.loggedIn = true
        localStorage.setItem('loggedIn', String(true))
        // TODO: find proper solution to safely store access token across page reloads
        localStorage.setItem('accessToken', response.data.token ?? '')
        localStorage.setItem('expiryTimestamp', String(response.data.expiryTimestamp))
        return true
      } else {
        // error handling
        return false
      }
    },

    logout() {
      const data = authData()
      localStorage.setItem('loggedIn', String(false))
      // TODO: find proper solution to safely store access token across page reloads
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiryTimestamp')
      data.loggedIn = false
      data.accessToken = null
      data.expiryTimestamp = null
    },

    getAccessToken(): string | null {
      const data = authData()
      return data.accessToken
    },
  },
})
