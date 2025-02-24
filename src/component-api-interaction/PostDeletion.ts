import { PostsApi } from '@/api'
import router from '@/router'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

export async function deletePost(uuid: string) {
  const configuration = getAPIConfig(true)
  const postApi = new PostsApi(configuration)

  let response: AxiosResponse
  try {
    response = await postApi.postsUuidDelete(uuid)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse
    } else {
      throw err
    }
  }
  if (response != undefined && response.status === 200 && response.statusText === 'OK') {
    //TODO: Check if this is really the best thing to do...
    router.push('/')
  }
}
