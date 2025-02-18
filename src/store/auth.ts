import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import {
  AuthenticationApi,
  type AuthenticationLoginRequestBody,
  type AuthenticationLoginResponseBody,
  UsersApi,
  type UsersPostRequestBody,
  type UsersPostResponseBody,
} from '@/api'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

// private Store
const authData = defineStore('authData', () => {
  const accessToken: Ref<string | null> = ref(null)
  const expiryTimestamp: Ref<number | null> = ref(null)
  const userName: Ref<string | null> = ref(null)

  if (localStorage.getItem('accessToken')) {
    accessToken.value = localStorage.getItem('accessToken')
  }
  if (localStorage.getItem('expiryTimestamp')) {
    expiryTimestamp.value = Number(localStorage.getItem('expiryTimestamp'))
  }
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName')
  }

  return { accessToken, expiryTimestamp, userName }
})

function saveLoginResponseData(accessToken: string, expireTimestamp: number, userName: string) {
  const data = authData()
  data.accessToken = accessToken
  data.expiryTimestamp = expireTimestamp
  data.userName = userName
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('expiryTimestamp', String(expireTimestamp))
  localStorage.setItem('userName', userName)
}

export const authStore = defineStore('authStore', {
  state: () => {
    const data = authData()
    const isLoggedIn = computed(() => Boolean(data.accessToken))
    const expireTime = computed(() =>
      // convert timestamp in seconds to milliseconds
      data.expiryTimestamp != null ? new Date(data.expiryTimestamp * 1000) : null,
    )
    const userName = computed(() => data.userName)

    return { isLoggedIn, expireTime, userName }
  },
  actions: {
    async register(username: string, password: string, displayname: string): Promise<boolean> {
      const configuration = getAPIConfig(false)
      const authAPI = new UsersApi(configuration)
      let response: AxiosResponse<UsersPostResponseBody, unknown>
      try {
        response = await authAPI.usersPost(<UsersPostRequestBody>{
          username: username,
          password: password,
          displayName: displayname,
        })
      } catch (err) {
        if (err instanceof AxiosError) {
          response = err.response as AxiosResponse<UsersPostResponseBody, unknown>
        } else {
          throw err
        }
      }
      if (response != undefined && response.status === 200 && response.statusText === 'OK') {
        saveLoginResponseData(
          response.data.token ?? '',
          response.data.expiryTimestamp ?? 0,
          username,
        )
        return true
      } else {
        // error handling
        return false
      }
    },

    async login(username: string, password: string): Promise<boolean> {
      const configuration = getAPIConfig(false)
      const authAPI = new AuthenticationApi(configuration)
      let response: AxiosResponse<AuthenticationLoginResponseBody, unknown>
      try {
        response = await authAPI.authenticationLoginPost(<AuthenticationLoginRequestBody>{
          username: username,
          password: password,
        })
      } catch (err) {
        if (err instanceof AxiosError) {
          response = err.response as AxiosResponse<AuthenticationLoginResponseBody, unknown>
        } else {
          throw err
        }
      }
      if (response != undefined && response.status === 200 && response.statusText === 'OK') {
        saveLoginResponseData(
          response.data.token ?? '',
          response.data.expiryTimestamp ?? 0,
          username,
        )
        return true
      } else {
        // error handling
        return false
      }
    },

    logout() {
      const data = authData()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiryTimestamp')
      data.accessToken = null
      data.expiryTimestamp = null
    },

    getAccessToken(): string | null {
      const data = authData()
      return data.accessToken
    },
  },
})
