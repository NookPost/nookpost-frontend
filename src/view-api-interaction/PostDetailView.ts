import {
  PostsApi,
  type GetPostResponseBody,
  type PostData,
  type PostPostResponseBody,
  type PutPostRequestBody,
} from '@/api'
import router from '@/router'
import { categoryData } from '@/store/categories'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

const categoryStore = categoryData()

export async function createPost(post: Post) {
  const configuration = getAPIConfig(true)
  const postApi = new PostsApi(configuration)
  const postRequestBody: PostData = {
    title: post.title,
    body: post.body,
    bannerImageBase64: post.bannerImageBase64,
    categoryUuid: post.category.uuid,
  }

  let response: AxiosResponse<PostPostResponseBody>
  try {
    response = await postApi.postsPost(postRequestBody)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<PostPostResponseBody>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    router.push('/post/' + response.data.uuid)
  }
}

export async function updatePost(post: Post) {
  const configuration = getAPIConfig(true)
  const postApi = new PostsApi(configuration)
  const putRequestBody: PutPostRequestBody = {
    title: post.title,
    body: post.body,
    bannerImageBase64: post.bannerImageBase64,
    categoryUuid: post.category.uuid,
  }

  let response: AxiosResponse
  try {
    response = await postApi.postsUuidPut(post.uuid, putRequestBody)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    router.push('/post/' + post.uuid)
  }
}

export async function fetchPost(uuid: string): Promise<Post | null> {
  let post: Post | null = null
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostResponseBody, unknown>
  try {
    response = await postApi.postsUuidGet(uuid)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<GetPostResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    if (response.data != null) {
      post = {
        uuid: response.data.uuid ?? '',
        title: response.data.title ?? '',
        body: response.data.body ?? '',
        authorUsername: response.data.authorUsername ?? '',
        authorDisplayname: response.data.authorDisplayName ?? '',
        bannerImageBase64: response.data.bannerImageBase64 ?? '',
        created: response.data.createdOn ?? 0,
        modified: response.data.modifiedOn ?? 0,
        category: categoryStore.categories.find(
          (c: Category) => c.uuid == response.data.categoryUuid,
        ) ?? {
          uuid: '',
          icon: '',
          name: '',
        },
      }
    }
  }

  return post
}
