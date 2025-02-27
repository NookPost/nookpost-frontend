import {
  PostsApi,
  type GetPostFilteredResponseBody,
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
import { getCurrentInstance } from 'vue'

const categoryStore = categoryData()

export async function fetchPostsFiltered(
  username?: string,
  categoryUuid?: string,
  textSearch?: string,
  page?: number,
  pageItemCount?: number,
) {
  const posts: Post[] = []
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostFilteredResponseBody, unknown>
  try {
    response = await postApi.apiV1PostsGet(username, categoryUuid, textSearch, page, pageItemCount)
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
  } else {
    getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
      life: 3000,
      group: 'top-right',
    })
  }
  return posts
}

export async function fetchPost(uuid: string): Promise<Post | null> {
  let post: Post | null = null
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostResponseBody, unknown>
  try {
    response = await postApi.apiV1PostsUuidGet(uuid)
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
  } else {
    if (response != undefined && response.status == 404) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
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

  return post
}

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
    response = await postApi.apiV1PostsPost(postRequestBody)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<PostPostResponseBody>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    router.push('/post/' + response.data.uuid)
  } else {
    if (response != undefined && response.status == 404) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested category wasn't found.",
        life: 3000,
        group: 'top-right',
      })
    } else if (response != undefined && response.status == 413) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The payload in your request was too large.',
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
    response = await postApi.apiV1PostsUuidPut(post.uuid, putRequestBody)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    router.push('/post/' + post.uuid)
  } else {
    if (response != undefined && response.status == 404) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
        life: 3000,
        group: 'top-right',
      })
    } else if (response != undefined && response.status == 401) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You do not have permission to edit this post. Are you signed in?',
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

export async function deletePost(uuid: string) {
  const configuration = getAPIConfig(true)
  const postApi = new PostsApi(configuration)

  let response: AxiosResponse
  try {
    response = await postApi.apiV1PostsUuidDelete(uuid)
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse
    } else {
      throw err
    }
  }
  if (response != undefined && response.status >= 200 && response.status <= 299) {
    //TODO: Check if this is really the best thing to do...
    router.push('/')
  } else {
    if (response != undefined && response.status == 404) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
        life: 3000,
        group: 'top-right',
      })
    } else if (response != undefined && response.status == 401) {
      getCurrentInstance()?.appContext.config.globalProperties.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You do not have permission to delete this post. Are you signed in?',
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
