import { PostsApi, type GetPostResponseBody } from '@/api'
import { categoryData } from '@/store/categories'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

const categoryStore = categoryData()

export async function fetchPost(uuid: string): Promise<Post | null> {
  let post: Post | null = null
  const configuration = getAPIConfig(true)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostResponseBody, unknown>
  try {
    response = await postApi.postsGet(uuid)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<GetPostResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status === 200 && response.statusText === 'OK') {
    if (response.data != null) {
      post = {
        uuid: response.data.uuid ?? '',
        title: response.data.title ?? '',
        body: response.data.body ?? '',
        author: response.data.authorUsername ?? '',
        bannerImageBase64: response.data.bannerImageBase64 ?? '',
        created: response.data.createdOn ?? 0,
        modified: response.data.modifiedOn ?? 0,
        category: categoryStore.categories.find((c: Category) => c.uuid == response.data.uuid) ?? {
          uuid: '',
          icon: '',
          name: '',
        },
      }
    }
  }

  return post
}
