export interface Post {
  uuid: string
  title: string
  body: string
  author: string
  categoryUUID: string
  created: number
  modified: number | 0
}
