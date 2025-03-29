import { Configuration } from '@/api'
import { authStore } from '@/store/auth'

export function getAPIConfig(withAPIKey: boolean = true): Configuration {
  if (withAPIKey) {
    const authData = authStore()
    return new Configuration({
      basePath: 'http://localhost:5001',
      baseOptions: {
        headers: {
          // override to undefined as by default it is set to 'OpenAPI-Generator/typescript-axios'
          'User-Agent': undefined,
          Authorization: 'Bearer ' + (authData.getAccessToken() ?? ''),
        },
      },
    })
  } else {
    return new Configuration({
      basePath: 'http://localhost:5001',
      baseOptions: {
        headers: {
          // override to undefined as by default it is set to 'OpenAPI-Generator/typescript-axios'
          'User-Agent': undefined,
        },
      },
    })
  }
}
