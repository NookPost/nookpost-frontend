import { UsersApi, type UserPutRequestBody, type UsersGetResponseBody } from '@/api'
import router from '@/router'
import type { Profile } from '@/types/profile'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

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
  }
  return user
}
