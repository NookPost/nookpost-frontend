import {
  PostsApi,
  UsersApi,
  type GetPostFilteredResponseBody,
  type UsersGetResponseBody,
} from '@/api'
import { categoryData } from '@/store/categories'
import type { Category } from '@/types/category'
import type { Post } from '@/types/post'
import type { Profile } from '@/types/profile'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

const categoryStore = categoryData()

export async function fetchUserProfile(username: string): Promise<Profile | null> {
  let user: Profile | null = null
  const configuration = getAPIConfig(false)
  const postApi = new UsersApi(configuration)
  let response: AxiosResponse<UsersGetResponseBody, unknown>
  try {
    response = await postApi.usersUsernameGet(username)
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

export async function fetchPostsByUser(username: string): Promise<Post[]> {
  const posts: Post[] = []
  const configuration = getAPIConfig(false)
  const postApi = new PostsApi(configuration)
  let response: AxiosResponse<GetPostFilteredResponseBody, unknown>
  try {
    response = await postApi.postsGet(username, undefined, undefined, undefined, undefined)
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
  }

  return posts
}
