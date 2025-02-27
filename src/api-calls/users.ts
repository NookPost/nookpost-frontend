import { UsersApi, type UserPutRequestBody, type UsersGetResponseBody } from '@/api'
import router from '@/router'
import type { Profile } from '@/types/profile'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'
import { getCurrentInstance } from 'vue'

export async function editMeUserProfile(user: Profile) {
  const userMePutRequestBody: UserPutRequestBody = {
    username: user.username,
    displayName: user.displayname,
    tagLine: user.tagline,
    bio: user.bio,
    profilePictureBase64: user.profilePictureBase64,
    email: user.email,
  }
  const configuration = getAPIConfig(true)
  const userApi = new UsersApi(configuration)
  let response: AxiosResponse
  try {
    response = await userApi.apiV1UsersMePut(userMePutRequestBody)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse
    } else {
      throw err
    }
  }
  if (response.status >= 200 && response.status <= 299) {
    router.push('/myprofile')
  } else {
    if (response != undefined && response.status == 401) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "You don't have permission to edit this resource. Are you signed in?",
        life: 3000,
        group: 'top-right',
      })
    } else {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'top-right',
      })
    }
  }
}

export async function fetchMeUserProfile(): Promise<Profile | null> {
  let user: Profile | null = null
  const configuration = getAPIConfig(true)
  const userApi = new UsersApi(configuration)
  let response: AxiosResponse<UsersGetResponseBody, unknown>
  try {
    response = await userApi.apiV1UsersMeGet()
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<UsersGetResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    if (response.data != null) {
      user = {
        username: response.data.username ?? '',
        displayname: response.data.displayName ?? '',
        tagline: response.data.tagLine ?? '',
        bio: response.data.bio ?? '',
        email: response.data.email ?? '',
        profilePictureBase64: response.data.profilePictureBase64 ?? '',
      }
    }
  } else {
    if (response != undefined && response.status == 401) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "You don't have permission to view this resource. Are you signed in?",
        life: 3000,
        group: 'top-right',
      })
    } else {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'top-right',
      })
    }
  }
  return user
}

export async function fetchUserProfile(username: string): Promise<Profile | null> {
  let user: Profile | null = null
  const configuration = getAPIConfig(false)
  const postApi = new UsersApi(configuration)
  let response: AxiosResponse<UsersGetResponseBody, unknown>
  try {
    response = await postApi.apiV1UsersUsernameGet(username)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<UsersGetResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    if (response.data != null) {
      user = {
        username: response.data.username ?? '',
        displayname: response.data.displayName ?? '',
        tagline: response.data.tagLine ?? '',
        bio: response.data.bio ?? '',
        email: response.data.email ?? '',
        profilePictureBase64: response.data.profilePictureBase64 ?? '',
      }
    }
  } else {
    if (response != undefined && response.status == 404) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested user profile wasn't found.",
        life: 3000,
        group: 'top-right',
      })
    } else {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'top-right',
      })
    }
  }
  return user
}
