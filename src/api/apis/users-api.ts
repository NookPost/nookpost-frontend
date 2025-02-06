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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { UserPutRequestBody } from '../models';
// @ts-ignore
import type { UsersGetResponseBody } from '../models';
// @ts-ignore
import type { UsersPostRequestBody } from '../models';
// @ts-ignore
import type { UsersPostResponseBody } from '../models';
/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets a user
         * @param {string} username 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet: async (username: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'username' is not null or undefined
            assertParamExists('usersGet', 'username', username)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)

            if (username !== undefined) {
                localVarQueryParameter['username'] = username;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Deletes a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMeDelete: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Gets a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMeGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Null values are ignored.
         * @summary Modifies a user
         * @param {UserPutRequestBody} userPutRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMePut: async (userPutRequestBody: UserPutRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userPutRequestBody' is not null or undefined
            assertParamExists('usersMePut', 'userPutRequestBody', userPutRequestBody)
            const localVarPath = `/users/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userPutRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Creates a new user
         * @param {UsersPostRequestBody} usersPostRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost: async (usersPostRequestBody: UsersPostRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'usersPostRequestBody' is not null or undefined
            assertParamExists('usersPost', 'usersPostRequestBody', usersPostRequestBody)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(usersPostRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Gets a user
         * @param {string} username 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersGet(username: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UsersGetResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersGet(username, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UsersApi.usersGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Deletes a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersMeDelete(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersMeDelete(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UsersApi.usersMeDelete']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Gets a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersMeGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UsersGetResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersMeGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UsersApi.usersMeGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Null values are ignored.
         * @summary Modifies a user
         * @param {UserPutRequestBody} userPutRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersMePut(userPutRequestBody: UserPutRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersMePut(userPutRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UsersApi.usersMePut']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Creates a new user
         * @param {UsersPostRequestBody} usersPostRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersPost(usersPostRequestBody: UsersPostRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UsersPostResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersPost(usersPostRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UsersApi.usersPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * 
         * @summary Gets a user
         * @param {string} username 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet(username: string, options?: RawAxiosRequestConfig): AxiosPromise<UsersGetResponseBody> {
            return localVarFp.usersGet(username, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Deletes a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMeDelete(options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.usersMeDelete(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Gets a user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMeGet(options?: RawAxiosRequestConfig): AxiosPromise<UsersGetResponseBody> {
            return localVarFp.usersMeGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Null values are ignored.
         * @summary Modifies a user
         * @param {UserPutRequestBody} userPutRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersMePut(userPutRequestBody: UserPutRequestBody, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.usersMePut(userPutRequestBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Creates a new user
         * @param {UsersPostRequestBody} usersPostRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost(usersPostRequestBody: UsersPostRequestBody, options?: RawAxiosRequestConfig): AxiosPromise<UsersPostResponseBody> {
            return localVarFp.usersPost(usersPostRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * 
     * @summary Gets a user
     * @param {string} username 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersGet(username: string, options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersGet(username, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Deletes a user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersMeDelete(options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersMeDelete(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Gets a user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersMeGet(options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersMeGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Null values are ignored.
     * @summary Modifies a user
     * @param {UserPutRequestBody} userPutRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersMePut(userPutRequestBody: UserPutRequestBody, options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersMePut(userPutRequestBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Creates a new user
     * @param {UsersPostRequestBody} usersPostRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersPost(usersPostRequestBody: UsersPostRequestBody, options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersPost(usersPostRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}

