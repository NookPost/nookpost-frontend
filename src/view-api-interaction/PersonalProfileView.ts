import { UsersApi, type UsersGetResponseBody } from '@/api'
import type { Profile } from '@/types/profile'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

export async function fetchMeUserProfile(): Promise<Profile | null> {
  let user: Profile | null = null
  const configuration = getAPIConfig(true)
  const userApi = new UsersApi(configuration)
  let response: AxiosResponse<UsersGetResponseBody, unknown>
  try {
    response = await userApi.usersMeGet()
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<UsersGetResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status === 200 && response.statusText === 'OK') {
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
