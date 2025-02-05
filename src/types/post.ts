export interface Post {
  uuid: string,
  title: string,
  body: string,
  author: string,
  category: string,
  created: number,
  modified: number | 0
}