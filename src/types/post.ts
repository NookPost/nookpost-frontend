import type { Category } from './category'

export interface Post {
  uuid: string
  title: string
  body: string
  author: string
  category: Category
  bannerImageBase64: string
  created: number
  modified: number | 0
}
