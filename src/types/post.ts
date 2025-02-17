import type { Category } from './category'

export interface Post {
  uuid: string
  title: string
  body: string
  authorDisplayname: string
  authorUsername: string
  category: Category
  bannerImageBase64: string
  created: number
  modified: number | 0
}
