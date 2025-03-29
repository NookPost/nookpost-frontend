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
import { type ToastServiceMethods } from 'primevue'

const categoryStore = categoryData()

/**
 * Fetch a filtered list of posts
 *
 * @param toastHandler The handler to display error messages on
 * @param username The author username to filter posts by
 * @param categoryUuid The category to filter posts by
 * @param textSearch A text search to apply to the posts
 * @param page The page to request (depends on pageItemCound)
 * @param pageItemCount The number of items per page (depends on page)
 */
export async function fetchPostsFiltered(
  toastHandler: ToastServiceMethods,
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
    toastHandler.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
      life: 3000,
      group: 'bottom-center',
    })
  }
  return posts
}

/**
 * Fetch a toast with the given UUID
 *
 * @param toastHandler the handler to display error messages to
 * @param uuid The uuid of the post
 */
export async function fetchPost(
  toastHandler: ToastServiceMethods,
  uuid: string,
): Promise<Post | null> {
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
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
        life: 3000,
        group: 'bottom-center',
      })
      router.replace('/')
    } else {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'bottom-center',
      })
    }
  }

  return post
}

/**
 * Create a new post
 *
 * @param toastHandler The handler to diplay error messages to
 * @param post The post to create
 */
export async function createPost(toastHandler: ToastServiceMethods, post: Post) {
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
    router.push('/post/' + encodeURIComponent(response.data.uuid ?? ''))
  } else {
    if (response != undefined && response.status == 404) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested category wasn't found.",
        life: 3000,
        group: 'bottom-center',
      })
    } else if (response != undefined && response.status == 413) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The payload in your request was too large.',
        life: 3000,
        group: 'bottom-center',
      })
    } else {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'bottom-center',
      })
    }
  }
}

/**
 * Update a post with new data.
 *
 * @param toastHandler The handler to display error messages to
 * @param post The post to update with new data
 */
export async function updatePost(toastHandler: ToastServiceMethods, post: Post) {
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
    router.push('/post/' + encodeURIComponent(post.uuid ?? ''))
  } else {
    if (response != undefined && response.status == 404) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
        life: 3000,
        group: 'bottom-center',
      })
    } else if (response != undefined && response.status == 401) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You do not have permission to edit this post. Are you signed in?',
        life: 3000,
        group: 'bottom-center',
      })
    } else {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'bottom-center',
      })
    }
  }
}

/**
 * Delete a post
 *
 * @param toastHandler The handler to display error messages to
 * @param uuid The uuid of the post to delete
 */
export async function deletePost(toastHandler: ToastServiceMethods, uuid: string) {
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
    router.push('/')
  } else {
    if (response != undefined && response.status == 404) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: "The requested post wasn't found.",
        life: 3000,
        group: 'bottom-center',
      })
    } else if (response != undefined && response.status == 401) {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You do not have permission to delete this post. Are you signed in?',
        life: 3000,
        group: 'bottom-center',
      })
    } else {
      toastHandler.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Server returned error: ' + response.status + ' ' + response.statusText,
        life: 3000,
        group: 'bottom-center',
      })
    }
  }
}
