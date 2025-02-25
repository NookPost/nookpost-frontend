import { PostsApi, type GetPostFilteredResponseBody } from '@/api'
import { categoryData } from '@/store/categories'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

const categoryStore = categoryData()

export async function fetchPosts(): Promise<Post[]> {
  const posts: Post[] = []
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostFilteredResponseBody, unknown>
  try {
    response = await postApi.postsGet()
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<GetPostFilteredResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    if (response.data != null) {
      response.data.posts?.forEach((post) => {
        posts.push({
          uuid: post.uuid ?? '',
          title: post.title ?? '',
          body: post.body ?? '',
          authorUsername: post.authorUsername ?? '',
          authorDisplayname: post.authorUsername ?? '',
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
