import type { GetAllCategoriesCategory, GetAllCategoriesResponseBody } from '@/api'
import { CategoriesApi } from '@/api/apis/categories-api'
import type { Category } from '@/types/category'
import { getAPIConfig } from '@/util/api'
import { AxiosError, type AxiosResponse } from 'axios'

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
  const categories: Category[] = []
  categoryDatas.forEach((c) => {
    const category: Category = {
      uuid: c.uuid ?? '',
      name: c.name ?? '',
      icon: c.icon ?? '',
    }
    categories.push(category)
  })
  return categories
}
