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
import type { GetAllCategoriesResponseBody } from '../models';
// @ts-ignore
import type { GetCategoryResponseBody } from '../models';
/**
 * CategoriesApi - axios parameter creator
 * @export
 */
export const CategoriesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets all categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1CategoriesGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/categories`;
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
         * 
         * @summary Gets a category
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1CategoriesUuidGet: async (uuid: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            assertParamExists('apiV1CategoriesUuidGet', 'uuid', uuid)
            const localVarPath = `/api/v1/categories/{uuid}`
                .replace(`{${"uuid"}}`, encodeURIComponent(String(uuid)));
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
    }
};

/**
 * CategoriesApi - functional programming interface
 * @export
 */
export const CategoriesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CategoriesApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Gets all categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1CategoriesGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetAllCategoriesResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiV1CategoriesGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CategoriesApi.apiV1CategoriesGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Gets a category
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiV1CategoriesUuidGet(uuid: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetCategoryResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiV1CategoriesUuidGet(uuid, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CategoriesApi.apiV1CategoriesUuidGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * CategoriesApi - factory interface
 * @export
 */
export const CategoriesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CategoriesApiFp(configuration)
    return {
        /**
         * 
         * @summary Gets all categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1CategoriesGet(options?: RawAxiosRequestConfig): AxiosPromise<GetAllCategoriesResponseBody> {
            return localVarFp.apiV1CategoriesGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Gets a category
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiV1CategoriesUuidGet(uuid: string, options?: RawAxiosRequestConfig): AxiosPromise<GetCategoryResponseBody> {
            return localVarFp.apiV1CategoriesUuidGet(uuid, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CategoriesApi - object-oriented interface
 * @export
 * @class CategoriesApi
 * @extends {BaseAPI}
 */
export class CategoriesApi extends BaseAPI {
    /**
     * 
     * @summary Gets all categories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CategoriesApi
     */
    public apiV1CategoriesGet(options?: RawAxiosRequestConfig) {
        return CategoriesApiFp(this.configuration).apiV1CategoriesGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Gets a category
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CategoriesApi
     */
    public apiV1CategoriesUuidGet(uuid: string, options?: RawAxiosRequestConfig) {
        return CategoriesApiFp(this.configuration).apiV1CategoriesUuidGet(uuid, options).then((request) => request(this.axios, this.basePath));
    }
}

