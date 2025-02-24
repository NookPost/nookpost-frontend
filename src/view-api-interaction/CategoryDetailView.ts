import { PostsApi, type GetPostFilteredResponseBody } from '@/api'
import { categoryData } from '@/store/categories'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

const categoryStore = categoryData()

export async function fetchPostsByCategory(categoryUuid: string): Promise<Post[]> {
  const posts: Post[] = []
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostFilteredResponseBody, unknown>
  try {
    response = await postApi.postsGet(undefined, categoryUuid, undefined, undefined, undefined)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<GetPostFilteredResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status === 200 && response.statusText === 'OK') {
    if (response.data != null) {
      response.data.posts?.forEach((post) => {
        posts.push({
          uuid: post.uuid ?? '',
          title: post.title ?? '',
          body: post.body ?? '',
          authorUsername: post.authorUsername ?? '',
          authorDisplayname: post.authorDisplayName ?? '',
          bannerImageBase64: post.bannerImageBase64 ?? '',
          created: post.createdOn ?? 0,
          modified: post.modifiedOn ?? 0,
          category: categoryStore.categories.find((c: Category) => c.uuid == post.categoryUuid) ?? {
            uuid: '',
            icon: '',
            name: '',
          },
        })
      })
    }
  }

  return posts
}
