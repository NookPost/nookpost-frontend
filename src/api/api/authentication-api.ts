/* tslint:disable */
/* eslint-disable */
/**
 * nookpost-backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from '../configuration'
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios'
import globalAxios from 'axios'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from '../common'
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  type RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from '../base'
// @ts-ignore
import type { AuthenticationLoginRequestBody } from '../models'
// @ts-ignore
import type { AuthenticationLoginResponseBody } from '../models'
// @ts-ignore
import type { PutChangePasswordRequestBody } from '../models'
/**
 * AuthenticationApi - axios parameter creator
 * @export
 */
export const AuthenticationApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Changes the password of a user
     * @param {PutChangePasswordRequestBody} putChangePasswordRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authenticationChangePasswordPut: async (
      putChangePasswordRequestBody: PutChangePasswordRequestBody,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'putChangePasswordRequestBody' is not null or undefined
      assertParamExists(
        'authenticationChangePasswordPut',
        'putChangePasswordRequestBody',
        putChangePasswordRequestBody,
      )
      const localVarPath = `/authentication/changePassword`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration)

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        putChangePasswordRequestBody,
        localVarRequestOptions,
        configuration,
      )

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary Authenticates the user and returns an access token.
     * @param {AuthenticationLoginRequestBody} authenticationLoginRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authenticationLoginPost: async (
      authenticationLoginRequestBody: AuthenticationLoginRequestBody,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'authenticationLoginRequestBody' is not null or undefined
      assertParamExists(
        'authenticationLoginPost',
        'authenticationLoginRequestBody',
        authenticationLoginRequestBody,
      )
      const localVarPath = `/authentication/login`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      // authentication Bearer required
      await setApiKeyToObject(localVarHeaderParameter, 'Authorization', configuration)

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        authenticationLoginRequestBody,
        localVarRequestOptions,
        configuration,
      )

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * AuthenticationApi - functional programming interface
 * @export
 */
export const AuthenticationApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AuthenticationApiAxiosParamCreator(configuration)
  return {
    /**
     *
     * @summary Changes the password of a user
     * @param {PutChangePasswordRequestBody} putChangePasswordRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async authenticationChangePasswordPut(
      putChangePasswordRequestBody: PutChangePasswordRequestBody,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.authenticationChangePasswordPut(
        putChangePasswordRequestBody,
        options,
      )
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0
      const localVarOperationServerBasePath =
        operationServerMap['AuthenticationApi.authenticationChangePasswordPut']?.[
          localVarOperationServerIndex
        ]?.url
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath)
    },
    /**
     *
     * @summary Authenticates the user and returns an access token.
     * @param {AuthenticationLoginRequestBody} authenticationLoginRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async authenticationLoginPost(
      authenticationLoginRequestBody: AuthenticationLoginRequestBody,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthenticationLoginResponseBody>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.authenticationLoginPost(
        authenticationLoginRequestBody,
        options,
      )
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0
      const localVarOperationServerBasePath =
        operationServerMap['AuthenticationApi.authenticationLoginPost']?.[
          localVarOperationServerIndex
        ]?.url
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath)
    },
  }
}

/**
 * AuthenticationApi - factory interface
 * @export
 */
export const AuthenticationApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = AuthenticationApiFp(configuration)
  return {
    /**
     *
     * @summary Changes the password of a user
     * @param {PutChangePasswordRequestBody} putChangePasswordRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authenticationChangePasswordPut(
      putChangePasswordRequestBody: PutChangePasswordRequestBody,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<void> {
      return localVarFp
        .authenticationChangePasswordPut(putChangePasswordRequestBody, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Authenticates the user and returns an access token.
     * @param {AuthenticationLoginRequestBody} authenticationLoginRequestBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authenticationLoginPost(
      authenticationLoginRequestBody: AuthenticationLoginRequestBody,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<AuthenticationLoginResponseBody> {
      return localVarFp
        .authenticationLoginPost(authenticationLoginRequestBody, options)
        .then((request) => request(axios, basePath))
    },
  }
}

/**
 * AuthenticationApi - object-oriented interface
 * @export
 * @class AuthenticationApi
 * @extends {BaseAPI}
 */
export class AuthenticationApi extends BaseAPI {
  /**
   *
   * @summary Changes the password of a user
   * @param {PutChangePasswordRequestBody} putChangePasswordRequestBody
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  public authenticationChangePasswordPut(
    putChangePasswordRequestBody: PutChangePasswordRequestBody,
    options?: RawAxiosRequestConfig,
  ) {
    return AuthenticationApiFp(this.configuration)
      .authenticationChangePasswordPut(putChangePasswordRequestBody, options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Authenticates the user and returns an access token.
   * @param {AuthenticationLoginRequestBody} authenticationLoginRequestBody
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthenticationApi
   */
  public authenticationLoginPost(
    authenticationLoginRequestBody: AuthenticationLoginRequestBody,
    options?: RawAxiosRequestConfig,
  ) {
    return AuthenticationApiFp(this.configuration)
      .authenticationLoginPost(authenticationLoginRequestBody, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
