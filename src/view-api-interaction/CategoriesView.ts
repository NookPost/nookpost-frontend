import type { CategoryData, GetAllCategoriesCategory, GetAllCategoriesResponseBody } from '@/api'
import { CategoriesApi } from '@/api/apis/categories-api'
import { authStore } from '@/store/auth'
import type { Category } from '@/types/category'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse, type CancelToken } from 'axios'

export async function fetchCategories(): Promise<Category[]> {
  let categories: GetAllCategoriesCategory[] = []
  const configuration = getAPIConfig(true)
  const categoryApi = new CategoriesApi(configuration)
  let response: AxiosResponse<GetAllCategoriesResponseBody, unknown>
  try {
    response = await categoryApi.categoryAllGet()
  } catch (err) {
    if (err instanceof AxiosError) {
      response = err.response as AxiosResponse<GetAllCategoriesResponseBody, unknown>
    } else {
      throw err
    }
  }
  if (response != undefined && response.status === 200 && response.statusText === 'OK') {
    if (response.data.categories != null) {
      categories = response.data.categories
    }
  }

  return foldCategories(categories)
}

function foldCategories(categoryDatas: GetAllCategoriesCategory[]): Category[] {
  let categories: Category[] = []
  categoryDatas.forEach((c) => {
    let category: Category = {
      uuid: c.uuid ?? '',
      name: c.name ?? '',
      icon: c.icon ?? '',
    }
    categories.push(category)
  })
  return categories
}
