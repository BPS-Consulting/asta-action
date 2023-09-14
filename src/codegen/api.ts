/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CoverageDto {
    asset?: string
    type: string
    data: object
}

export interface AssetDto {
    _id?: string
    name: string
    desc: string
    tags: string[]
    coverage: CoverageDto
    /** The id referencing the application the asset belongs to */
    parent: string
}

export interface CreateAssetDto {
    name: string
    desc: string
    tags: string[]
    /** The id referencing the application the asset belongs to */
    parent: string
}

export type Coverage = object

export interface ApplicationComponentDTO {
    /** @example "" */
    applicationId: string
    /** @example "" */
    id: string
    /** @example "" */
    type: string
    /** @example "" */
    name: string
    /** @example "" */
    data: object
}

export interface Rule {
    /** The rule tested */
    rule: string
    /** The result for rule tested */
    results: string
    /** The type of rule */
    type: string
    /** The run where the rule was tested */
    run: string
    /** The rule entry */
    entry: number
    /** The time when the rule was tested */
    time: number
    /** The page where the rule was tested */
    page: string
}

export interface ComponentCoverage {
    /** The rules tested */
    rules: Rule[]
    /** The actions tested */
    actions: string[]
    /** The the performance results */
    performance: object
    /** The component tested */
    component: string
}

export interface CoverageResponseDto {
    /** The tested variant */
    variant: string
    /** The tested component */
    component: ApplicationComponentDTO
    /** The coverage recorded */
    coverage: ComponentCoverage
}

export interface CreateTagDto {
    /**
     * The name of the tag
     * @example "Performance"
     */
    name: string
    /** The id referencing the parent */
    parent: string
    /**
     * The type of the tag. custom, core, default
     * @example "custom"
     */
    type: string
}

export interface UpdateTagDto {
    /**
     * An unique identifier for the tag
     * @example "6399004470fd609bc8b30338"
     */
    _id: string
    /** The name of the tag */
    name: string
}

export type ApplicationData = object

export type Workspace = object

export interface ApplicationResponse {
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    /** @example "2020-11-24T17:43:15.970Z" */
    createdAt: string
    /** @example "2020-11-24T17:43:15.970Z" */
    updatedAt: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    name: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: number
    /**
     * Entity Type
     * @example "application"
     */
    type: string
    /** Application's data */
    data: ApplicationData
    /** Application's owners */
    owners: string[]
    /** Application's parent (Workspace) */
    parent: Workspace
}

export interface CreateApplicationDto {
    /** The name of the application */
    name: string
    /** The id referencing the workspace */
    parentId: string
}

export interface UpdateApplicationDto {
    /** The name of the application */
    name: string
}

export interface PermissionResponse {
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    /** @example "2020-11-24T17:43:15.970Z" */
    createdAt: string
    /** @example "2020-11-24T17:43:15.970Z" */
    updatedAt: string
    /** The resource */
    resource: object
    /** The user */
    user: object
    /**
     * Role of the user for the resource
     * @example 4
     */
    role: number
}

export interface CreatePermissionDto {
    /** The id referencing the user */
    userRef: string
    /** The id referencing resource */
    resource: string
    /**
     * The role of the user
     * @default "none"
     */
    role: number
}

export interface UpdatePermissionRoleDto {
    /** The role of the user */
    role: number
}

export interface GenerateDatasetDTO {
    requirementsDocumentId: string
    /** @example "" */
    options: object
}

export interface RequestWithUserDTO {
    user: object
}

export interface IssueDto {
    _id?: string
    title: string
    description: string
    severity: string
    status: string
    logs: string[]
    created_at?: string
    updated_at?: string
}

export interface SummaryStatisticsDTO {
    /**
     * The id for the run these statistics belong to
     * @example "1231-asdf-123d-asdf"
     */
    id: string
    /**
     * The id for the run these statistics belong to
     * @example "1231-asdf-123d-asdf"
     */
    runId: string
    /** The statistics for each type of test */
    componentStatistics: object
}

export interface RunResultsDto {
    passed: number
    failed: number
    untested: number
    partial: number
}

export interface RunMetadataDto {
    /**
     * The run's id
     * @example "123"
     */
    id: string
    /** @example "" */
    applicationId: string
    /** @example "" */
    parametersId: string
    /** @example "" */
    templateName: string
    /** @example "" */
    runNumber: string
    /** @example "" */
    startTime: string
    /** @example "" */
    endTime: string
    /** @example "" */
    status: string
    /** @example "" */
    summaryStatistics: SummaryStatisticsDTO
    results: RunResultsDto
}

export interface DimensionsDTO {
    /** @example "" */
    w: number
    /** @example "" */
    h: number
}

export interface ItemDTO {
    /** @example "" */
    id: string
    /** @example "" */
    type: string
    /** @example "" */
    data: object
}

export interface PageDTO {
    /** @example "" */
    id: string
    /** @example "" */
    url: string
    /** @example "" */
    title: string
    /** @example "" */
    content: object
    /** @example "" */
    components: string[]
    /** @example "" */
    dimensions: DimensionsDTO
    /** @example "" */
    item: ItemDTO
}

export interface RemoveRunsResponseDTO {
    /**
     * If the operation was ok or not
     * @example true
     */
    ok: boolean
    /** The ids of the removed runs */
    removedRuns: string[]
}

export interface RunLogDTO {
    /** @example "" */
    runId: string
    /** @example "" */
    runNumber: string
    /** @example "" */
    entries: string[]
}

export interface RunStatusDTO {
    /** @example "" */
    runId: string
    /** @example "" */
    templateName: string
    /** @example "123" */
    runNumber: number
    /** @example "" */
    applicationName: string
    /** @example "" */
    startingPageTitle: string
    /** @example "" */
    depth: number
    /** @example "" */
    startTime: string
    /** @example "" */
    endTime: string
    /** @example "" */
    currentPageTitle: string
    /** @example "" */
    currentComponentLabel: string
    /** @example "" */
    runningState: 'running' | 'paused' | 'stopped' | 'finished'
    /** @example "" */
    currentScreenshotId?: string
}

export interface AppendRunLogRequestDTO {
    entries: string[]
}

export interface WorkQueueDTO {
    /** @example "" */
    id: string
    /** @example "" */
    runId: string
    /** @example "" */
    items: object[]
    /**
     * total number of items in the work queue
     * @min 0
     * @example 8
     */
    count: number
    /**
     * How many work queue items have already been tested
     * @min 0
     * @example 0
     */
    completedCount: number
}

export interface RunParametersDto {
    _id: string
    name: string
    isTemplate: boolean
    app: string
    path: string
    depth: number
    duration: number
    stopAfterFlows: boolean
    enableModeling: boolean
    pageLoadTimeout: number
    actionRetryAttempts: number
    debugMode: boolean
    assets: string[]
    extensions: object
}

export interface StartRunRequestDTO {
    user: object
    /**
     * The id for the run generated by the server
     * @example ""
     */
    runId: string
    /**
     * The number for the run generated by the server
     * @example "1"
     */
    runNumber: string
    /**
     * The application to use for the run
     * @example "Grants.gov"
     */
    applicationId: string
    /** The values for the run parameters */
    parameters: RunParametersDto
    /** The values for the run parameters */
    parametersId: string
    /**
     * A set of work queue items for the test
     * @example ""
     */
    workQueue: string[]
    /** Driver to use */
    runOn: string
    /** Driver to use */
    driverId: string
    /** Agent to use */
    agentId: string
}

export type RunDocument = object

export type VariantData = object

export type Application = object

export interface VariantResponse {
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    /** @example "2020-11-24T17:43:15.970Z" */
    createdAt: string
    /** @example "2020-11-24T17:43:15.970Z" */
    updatedAt: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    name: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: number
    /**
     * Entity Type
     * @example "variant"
     */
    type: string
    /** Variants's data */
    data: VariantData
    /** Variants's owners */
    owners: string[]
    /** Variant's parent (Application) */
    parent: Application
}

export interface CreateVariantDto {
    /** The name of the variant */
    name: string
    /** The id referencing the application */
    parentId: string
    /** The variants data such as defaultUrl or activitySets */
    data: object
}

export interface UpdateVariantDto {
    /** The name of the variant */
    name: string
    /** The variants data such as defaultUrl or activitySets */
    data: object
}

export interface ApplicationModelDTO {
    /**
     * Equals applicationId to conform to resource DTO
     * @example ""
     */
    id: string
    /** @example "" */
    applicationId: string
    /**
     * Nodes in the application mode
     * @example ""
     */
    nodes: string[]
    /**
     * Edges in the application mode
     * @example ""
     */
    edges: string[]
}

export interface ApplicationComponentsAssociationsDTO {
    /**
     * A unique identifier for the component.
     * @example "1231-asdf-123d-asdf"
     */
    id: string
    /**
     * A unique identifier for the application.
     * @example "1231-asdf-123d-asdf"
     */
    applicationId: string
    /**
     * A unique identifier for the component.
     * @example "1231-asdf-123d-asdf"
     */
    componentId: string
    /**
     * The entities associated with the component
     * @example ""
     */
    associatedEntities: string[]
}

export interface ApplicationRelationshipDTO {
    /** @example "" */
    applicationId: string
    /** @example "" */
    id: string
    /** @example "" */
    type: string
    /** @example "" */
    to: string
    /** @example "" */
    from: string
    /** @example "" */
    data: object
}

export interface ApplicationModelUpdateRequestDTO {
    /** @example "" */
    applicationId: string
    /** @example "" */
    updates: string[]
}

export interface AddRuleResponseDTO {
    /**
     * The rule that was saved, includes internalId that was generated by mongo
     * @example ""
     */
    rule: object
}

export interface AddRuleRequestDTO {
    /**
     * The rule to save
     * @example ""
     */
    rule: object
}

export interface UserResponse {
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    /** @example "2020-11-24T17:43:15.970Z" */
    createdAt: string
    /** @example "2020-11-24T17:43:15.970Z" */
    updatedAt: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    email: string
    /**
     * User's cognito or external ID
     * @example "1749751b-9f2f-4a1e-bdcf-03ff26729118"
     */
    externalId: string
    /**
     * User's stripe or payment ID
     * @example "cus_NeBMaIP2OU1SWh"
     */
    paymentId: string
    /**
     * User's status
     * @example "active"
     */
    status: string
    /** User workspaces */
    workspaces: string[]
}

export interface UpdateUserDto {
    /** The email that identifies the user */
    email?: string
    /** The email that identifies the user */
    externalId?: string
    /** The email that identifies the user */
    paymentId?: string
}

export interface CreateUserDto {
    /** The email that identifies the user */
    email: string
    /** The email that identifies the user */
    externalId: string
    /** The email that identifies the user */
    paymentId: string
}

export interface CreatePatDTO {
    /**
     * When the PAT will expire and can no longer be used for authentication.
     *
     * 		By default, PATs expire after 1 year. To create a PAT that never expires,
     * 		explicitly set this field to `null`.
     * @format date-time
     * @example "2021-01-01T00:00:00.000Z"
     */
    expiresAt: string
    /** The name of the PAT. Helps distinguish between PATs and to remember their purpose. For display purposes only.  */
    name: string
}

export interface PatDTO {
    name: string
    /** @format date-time */
    expiresAt: string
    _id: string
    /** user id */
    user: string
    /** @format date-time */
    lastUsed: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
}

export type WorkspaceData = object

export type Entity = object

export interface WorkspaceResponse {
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    /** @example "2020-11-24T17:43:15.970Z" */
    createdAt: string
    /** @example "2020-11-24T17:43:15.970Z" */
    updatedAt: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    name: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: number
    /**
     * Entity Type
     * @example "workspace"
     */
    type: string
    /** Workspace's data */
    data: WorkspaceData
    /**
     * Entity Type
     * @example "workspace"
     */
    lastRun: string
    /** Workspace's owners */
    owners: string[]
    /** Workspace's parent (System) */
    parent: Entity
}

export interface Plan {
    /** @example "Free Plan" */
    name: string
    /** @example 1500 */
    testItemsPerDay: number
    /** @example 14 */
    runHistoryDurationInDays: number
}

export interface CreateWorkspaceDto {
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name: string
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    plan: Plan
}

export interface UpdateWorkspaceDto {
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name?: string
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    plan?: Plan
}

export interface CreateInvitationTokenDto {
    /** The email to send the invitation */
    email: string
}

export interface CreateUserInvitationDto {
    /** The email of the user */
    email: string
    /** The id referencing resource */
    resource: string
    /**
     * The role of the user for the given resource
     * @default "none"
     */
    role: number
}

export interface AnalyticsFilterDTO {
    runId?: string
    ruleId?: string
    ruleType?: 'accessibility-rule' | 'functional-rule' | 'resource-rule' | 'webform-rule' | 'link-rule'
    pageId?: string
    componentId?: string
    componentType?:
        | 'Iframe'
        | 'Body'
        | 'Header'
        | 'Footer'
        | 'Navbar'
        | 'Form'
        | 'Button'
        | 'Anchor'
        | 'Input'
        | 'Content'
        | 'Section'
        | 'Select'
        | 'Option'
        | 'Table'
        | 'Table Header'
        | 'Table Row'
        | 'Table Cell'
        | 'Large Heading'
        | 'Medium Heading'
        | 'Small Heading'
        | 'Webform'
        | 'Label'
        | 'Field'
        | 'Checkbox Cluster'
        | 'Radio Group'
        | 'Radio'
        | 'Checkbox'
        | 'Select Option'
        | 'Text Area'
        | 'Text Node'
        | 'Unclassified'
}

export interface AnalyticsRequestDTO {
    /** Filters to apply to run logs before aggregating */
    filter?: AnalyticsFilterDTO
    /** The fields to group by */
    groupBy?: string[]
    /**
     * Populate certain fields by joining with other collections.
     *
     * Values in this list must be a subset of `groupBy`, and can only
     * apply to id fields. Instead of containing
     * an ObjectId, populated fields will contain the document the id
     * refers to.
     */
    populate?: string[]
}

export interface AnalyticsDTO {
    /** The number of rules that passed */
    passed: number
    /** The number of rules that failed */
    failed: number
    /** The total number of rules, components, pages, etc. Includes tested and untested entities */
    total: number
    /** The number of tests that ran. Equal to `passed + failed` */
    tested: number
    runId?: string | object
    ruleId?: string | object
    ruleType?: 'accessibility-rule' | 'functional-rule' | 'resource-rule' | 'webform-rule' | 'link-rule'
    pageId?: string | object
    componentId?: string | object
    componentType?:
        | 'Iframe'
        | 'Body'
        | 'Header'
        | 'Footer'
        | 'Navbar'
        | 'Form'
        | 'Button'
        | 'Anchor'
        | 'Input'
        | 'Content'
        | 'Section'
        | 'Select'
        | 'Option'
        | 'Table'
        | 'Table Header'
        | 'Table Row'
        | 'Table Cell'
        | 'Large Heading'
        | 'Medium Heading'
        | 'Small Heading'
        | 'Webform'
        | 'Label'
        | 'Field'
        | 'Checkbox Cluster'
        | 'Radio Group'
        | 'Radio'
        | 'Checkbox'
        | 'Select Option'
        | 'Text Area'
        | 'Text Node'
        | 'Unclassified'
}

export interface AnalyticsResultsDTO {
    /**
     * Analytics results. Shape is determined by `groupBy` and `populate`.
     *
     * Each result contains `passed`, `failed`, and `total` rule results
     * for the desired aggregation, as well as properties for each `groupBy`.
     * Populated fields (specified by `populate`) will contain documents from
     * their respective, collections instead of an ObjectId or a UUID.
     */
    analytics: AnalyticsDTO[]
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** request cancellation token */
    cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
    customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D
    error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = 'http://localhost:4000'
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private abortControllers = new Map<CancelToken, AbortController>()
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig)
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key)
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key])
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key]
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key])
        return keys
            .map(key =>
                Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)
            )
            .join('&')
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery)
        return queryString ? `?${queryString}` : ''
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key]
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                )
                return formData
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken)
            if (abortController) {
                return abortController.signal
            }
            return void 0
        }

        const abortController = new AbortController()
        this.abortControllers.set(cancelToken, abortController)
        return abortController.signal
    }

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken)

        if (abortController) {
            abortController.abort()
            this.abortControllers.delete(cancelToken)
        }
    }

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const queryString = query && this.toQueryString(query)
        const payloadFormatter = this.contentFormatters[type || ContentType.Json]
        const responseFormat = format || requestParams.format

        return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
            },
            signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
            body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
        }).then(async response => {
            const r = response as HttpResponse<T, E>
            r.data = null as unknown as T
            r.error = null as unknown as E

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then(data => {
                          if (r.ok) {
                              r.data = data
                          } else {
                              r.error = data
                          }
                          return r
                      })
                      .catch(e => {
                          r.error = e
                          return r
                      })

            if (cancelToken) {
                this.abortControllers.delete(cancelToken)
            }

            if (!response.ok) throw data
            return data
        })
    }
}

/**
 * @title ASTA Repository API
 * @version 0.0.1
 * @baseUrl http://localhost:4000
 * @contact
 *
 * API used for the agent and companion
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @name AssetsControllerFindAll
         * @summary Get assets for the given application with type
         * @request GET:/api/v2/assets/{appId}/{type}
         */
        assetsControllerFindAll: (appId: string, type: string, params: RequestParams = {}) =>
            this.request<AssetDto[], any>({
                path: `/api/v2/assets/${appId}/${type}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerCreate
         * @summary Create asset
         * @request POST:/api/v2/assets/{appId}/{type}
         */
        assetsControllerCreate: (appId: string, type: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<AssetDto, any>({
                path: `/api/v2/assets/${appId}/${type}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerFindAllByApplication
         * @summary Get assets for the given application
         * @request GET:/api/v2/assets/{appId}/{type}/application
         */
        assetsControllerFindAllByApplication: (appId: string, type: string, params: RequestParams = {}) =>
            this.request<AssetDto[], any>({
                path: `/api/v2/assets/${appId}/${type}/application`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerFindOne
         * @summary Get asset with type and id
         * @request GET:/api/v2/assets/{appId}/{type}/{id}
         */
        assetsControllerFindOne: (appId: string, type: string, id: string, params: RequestParams = {}) =>
            this.request<AssetDto, any>({
                path: `/api/v2/assets/${appId}/${type}/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerUpdate
         * @summary Put asset with type
         * @request PUT:/api/v2/assets/{appId}/{type}/{id}
         */
        assetsControllerUpdate: (appId: string, type: string, id: string, data: AssetDto, params: RequestParams = {}) =>
            this.request<AssetDto, any>({
                path: `/api/v2/assets/${appId}/${type}/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerRemove
         * @summary Delete asset
         * @request DELETE:/api/v2/assets/{appId}/{type}/{id}
         */
        assetsControllerRemove: (appId: string, type: string, id: string, params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/api/v2/assets/${appId}/${type}/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name AssetsControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/{type}/{id}/tags
         */
        assetsControllerUpdateTags: (appId: string, type: string, id: string, params: RequestParams = {}) =>
            this.request<AssetDto, any>({
                path: `/api/v2/assets/${appId}/${type}/${id}/tags`,
                method: 'PUT',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags auth
         * @name AuthControllerGetPermissions
         * @summary Get permissions
         * @request GET:/api/v2/auth/whoami
         */
        authControllerGetPermissions: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/auth/whoami`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags auth
         * @name AuthControllerLogOut
         * @request POST:/api/v2/auth/logout
         */
        authControllerLogOut: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/auth/logout`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetAllCoverages
         * @request GET:/api/v2/coverage
         */
        coverageControllerGetAllCoverages: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerCreateCoverage
         * @request POST:/api/v2/coverage
         */
        coverageControllerCreateCoverage: (data: CoverageDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetCoverageById
         * @request GET:/api/v2/coverage/{id}
         */
        coverageControllerGetCoverageById: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerUpdateCoverage
         * @request PUT:/api/v2/coverage/{id}
         */
        coverageControllerUpdateCoverage: (id: string, data: CoverageDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerDeleteCoverage
         * @request DELETE:/api/v2/coverage/{id}
         */
        coverageControllerDeleteCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetVariantCoverageStatistics
         * @request GET:/api/v2/coverage/variants/{id}/statistics
         */
        coverageControllerGetVariantCoverageStatistics: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/variants/${id}/statistics`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetComponentCoverage
         * @request GET:/api/v2/coverage/variants/{id}/elems/{cid}
         */
        coverageControllerGetComponentCoverage: (id: string, cid: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/variants/${id}/elems/${cid}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetVariantCoverage
         * @request GET:/api/v2/coverage/variants/{id}/{assetType}
         */
        coverageControllerGetVariantCoverage: (id: string, assetType: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/variants/${id}/${assetType}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerPatchFlowCoverage
         * @request PATCH:/api/v2/coverage/variants/{id}/flows/{fid}
         */
        coverageControllerPatchFlowCoverage: (id: string, fid: string, data: CoverageDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/variants/${id}/flows/${fid}`,
                method: 'PATCH',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerPatchModelCoverage
         * @request PATCH:/api/v2/coverage/variants/{id}/model/coverage
         */
        coverageControllerPatchModelCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/variants/${id}/model/coverage`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetAssetsCoverage
         * @request GET:/api/v2/coverage/{id}/assets
         */
        coverageControllerGetAssetsCoverage: (id: string, params: RequestParams = {}) =>
            this.request<Coverage, any>({
                path: `/api/v2/coverage/${id}/assets`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetPagesCoverage
         * @request GET:/api/v2/coverage/{id}/pages
         */
        coverageControllerGetPagesCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/coverage/${id}/pages`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @name CoverageControllerGetRunsFullCoverage
         * @request GET:/api/v2/coverage/{id}/run/{runId}
         */
        coverageControllerGetRunsFullCoverage: (id: string, runId: string, params: RequestParams = {}) =>
            this.request<CoverageResponseDto[], any>({
                path: `/api/v2/coverage/${id}/run/${runId}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags agents
         * @name AgentsControllerGetAgents
         * @request GET:/api/v2/agents
         */
        agentsControllerGetAgents: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/agents`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerGetTagsWithIds
         * @summary Get tags with ids
         * @request GET:/api/v2/tags
         */
        tagsControllerGetTagsWithIds: (
            query: {
                ids: string[]
            },
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/tags`,
                method: 'GET',
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerGetAppTags
         * @summary Get applications tags
         * @request GET:/api/v2/tags/{id}
         */
        tagsControllerGetAppTags: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/tags/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerCreate
         * @summary Create tag
         * @request POST:/api/v2/tags/{id}
         */
        tagsControllerCreate: (id: string, data: CreateTagDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/tags/${id}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerUpdateTag
         * @request PUT:/api/v2/tags/{id}
         */
        tagsControllerUpdateTag: (id: string, data: UpdateTagDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/tags/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerRemoveTag
         * @request DELETE:/api/v2/tags/{id}/{tagId}
         */
        tagsControllerRemoveTag: (id: string, tagId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/tags/${id}/${tagId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerGetApplications
         * @summary Get applications
         * @request GET:/api/v2/applications
         */
        applicationControllerGetApplications: (params: RequestParams = {}) =>
            this.request<ApplicationResponse, any>({
                path: `/api/v2/applications`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerCreateApplication
         * @request POST:/api/v2/applications
         */
        applicationControllerCreateApplication: (data: CreateApplicationDto, params: RequestParams = {}) =>
            this.request<ApplicationResponse, any>({
                path: `/api/v2/applications`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerGetApplication
         * @summary Get application with id
         * @request GET:/api/v2/applications/{id}
         */
        applicationControllerGetApplication: (id: string, params: RequestParams = {}) =>
            this.request<ApplicationResponse, any>({
                path: `/api/v2/applications/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerUpdate
         * @request PUT:/api/v2/applications/{id}
         */
        applicationControllerUpdate: (id: string, data: UpdateApplicationDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/applications/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerRemove
         * @request DELETE:/api/v2/applications/{id}
         */
        applicationControllerRemove: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/applications/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerGetApplicationsTags
         * @summary Get the application's tags
         * @request GET:/api/v2/applications/{id}/tags
         */
        applicationControllerGetApplicationsTags: (id: string, params: RequestParams = {}) =>
            this.request<ApplicationResponse, any>({
                path: `/api/v2/applications/${id}/tags`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags applications
         * @name ApplicationControllerGetApplicationWithParent
         * @summary Get applications with given parent
         * @request GET:/api/v2/applications/parent/{id}
         */
        applicationControllerGetApplicationWithParent: (id: string, params: RequestParams = {}) =>
            this.request<ApplicationResponse, any>({
                path: `/api/v2/applications/parent/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerGetPermissions
         * @summary Get permissions
         * @request GET:/api/v2/permissions
         */
        permissionControllerGetPermissions: (params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerCreatePermission
         * @request POST:/api/v2/permissions
         */
        permissionControllerCreatePermission: (data: CreatePermissionDto, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerGetPermission
         * @summary Get permission with id
         * @request GET:/api/v2/permissions/{id}
         */
        permissionControllerGetPermission: (id: string, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerUpdate
         * @request PUT:/api/v2/permissions/{id}
         */
        permissionControllerUpdate: (id: string, data: UpdatePermissionRoleDto, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerRemove
         * @request DELETE:/api/v2/permissions/{id}
         */
        permissionControllerRemove: (id: string, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerGetResourcePermissions
         * @summary Get permission of the resource with id
         * @request GET:/api/v2/permissions/resource/{id}
         */
        permissionControllerGetResourcePermissions: (id: string, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions/resource/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerGetUserPermissions
         * @summary Get all the permissions of the user with id
         * @request GET:/api/v2/permissions/user/{id}
         */
        permissionControllerGetUserPermissions: (id: string, params: RequestParams = {}) =>
            this.request<PermissionResponse, any>({
                path: `/api/v2/permissions/user/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags datasets
         * @name DatasetControllerGetDatasets
         * @request GET:/api/v2/datasets
         */
        datasetControllerGetDatasets: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/datasets`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags datasets
         * @name DatasetControllerPostDatasets
         * @request POST:/api/v2/datasets
         */
        datasetControllerPostDatasets: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/datasets`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags datasets
         * @name DatasetControllerGetDataset
         * @request GET:/api/v2/datasets/{id}
         */
        datasetControllerGetDataset: (id: string, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/datasets/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags datasets
         * @name DatasetControllerGenerateDataset
         * @request POST:/api/v2/datasets/generate
         */
        datasetControllerGenerateDataset: (data: GenerateDatasetDTO, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/datasets/generate`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags requirementsDocuments
         * @name RequirementsDocumentsControllerGetRequirementsDocuments
         * @request GET:/api/v2/requirementsDocuments
         */
        requirementsDocumentsControllerGetRequirementsDocuments: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/requirementsDocuments`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags requirementsDocuments
         * @name RequirementsDocumentsControllerPostRequirementsDocument
         * @request POST:/api/v2/requirementsDocuments
         */
        requirementsDocumentsControllerPostRequirementsDocument: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/requirementsDocuments`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags requirementsDocuments
         * @name RequirementsDocumentsControllerGetRequirementsDocument
         * @request GET:/api/v2/requirementsDocuments/{id}
         */
        requirementsDocumentsControllerGetRequirementsDocument: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/requirementsDocuments/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags requirementsDocuments
         * @name RequirementsDocumentsControllerPostRequirementsDocumentV2
         * @request POST:/api/v2/requirementsDocuments/v2
         */
        requirementsDocumentsControllerPostRequirementsDocumentV2: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/requirementsDocuments/v2`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags drivers
         * @name DriversControllerGetDrivers
         * @request GET:/api/v2/drivers
         */
        driversControllerGetDrivers: (data: RequestWithUserDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/drivers`,
                method: 'GET',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Files
         * @name FileControllerCreateFileEntity
         * @request POST:/api/v2/files
         */
        fileControllerCreateFileEntity: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/files`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Files
         * @name FileControllerUploadFile
         * @request POST:/api/v2/files/{fileId}
         */
        fileControllerUploadFile: (fileId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/files/${fileId}`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Files
         * @name FileControllerGetFile
         * @request GET:/api/v2/files/{fileId}
         */
        fileControllerGetFile: (fileId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/files/${fileId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags health
         * @name HealthControllerGetHealth
         * @request GET:/api/v2/health
         */
        healthControllerGetHealth: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/health`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerCreate
         * @request POST:/api/v2/issues
         */
        issueControllerCreate: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerGetAll
         * @request GET:/api/v2/issues
         */
        issueControllerGetAll: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerUpdateOne
         * @request PUT:/api/v2/issues
         */
        issueControllerUpdateOne: (data: IssueDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerGet
         * @request GET:/api/v2/issues/{id}
         */
        issueControllerGet: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerDelete
         * @request DELETE:/api/v2/issues/{id}
         */
        issueControllerDelete: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerUpdate
         * @request PUT:/api/v2/issues/{id}
         */
        issueControllerUpdate: (id: string, data: IssueDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags issues
         * @name IssueControllerGetLogs
         * @request GET:/api/v2/issues/{id}/logs/{appId}
         */
        issueControllerGetLogs: (id: string, appId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/issues/${id}/logs/${appId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerGetRuns
         * @request GET:/api/v2/run
         */
        runsControllerGetRuns: (params: RequestParams = {}) =>
            this.request<RunMetadataDto[], any>({
                path: `/api/v2/run`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerGetVariantRuns
         * @request GET:/api/v2/run/{id}
         */
        runsControllerGetVariantRuns: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerHasRuns
         * @request GET:/api/v2/run/variant/{id}/hasRuns
         */
        runsControllerHasRuns: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/variant/${id}/hasRuns`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerGetSummaryStatistics
         * @request GET:/api/v2/run/{runId}/statistics
         */
        runsControllerGetSummaryStatistics: (runId: string, params: RequestParams = {}) =>
            this.request<SummaryStatisticsDTO, any>({
                path: `/api/v2/run/${runId}/statistics`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerGetCurrentPage
         * @request GET:/api/v2/run/{runId}/currentPage
         */
        runsControllerGetCurrentPage: (runId: string, params: RequestParams = {}) =>
            this.request<PageDTO, any>({
                path: `/api/v2/run/${runId}/currentPage`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerRemove
         * @request DELETE:/api/v2/run/{variantId}
         */
        runsControllerRemove: (variantId: string, params: RequestParams = {}) =>
            this.request<RemoveRunsResponseDTO, any>({
                path: `/api/v2/run/${variantId}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunParametersControllerGetAll
         * @request GET:/api/v2/run/parameters
         */
        runParametersControllerGetAll: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/parameters`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunParametersControllerCreate
         * @request POST:/api/v2/run/parameters
         */
        runParametersControllerCreate: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/parameters`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunParametersControllerGet
         * @request GET:/api/v2/run/parameters/{id}
         */
        runParametersControllerGet: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/parameters/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunParametersControllerUpdate
         * @request PUT:/api/v2/run/parameters/{id}
         */
        runParametersControllerUpdate: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/parameters/${id}`,
                method: 'PUT',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunParametersControllerDelete
         * @request POST:/api/v2/run/parameters/{id}/delete
         */
        runParametersControllerDelete: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/parameters/${id}/delete`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsLogControllerGetRunLog
         * @request GET:/api/v2/run/{runId}/log
         */
        runsLogControllerGetRunLog: (runId: string, params: RequestParams = {}) =>
            this.request<RunLogDTO, RunLogDTO>({
                path: `/api/v2/run/${runId}/log`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsLogControllerUpdateRunLog
         * @request PUT:/api/v2/run/{runId}/log
         */
        runsLogControllerUpdateRunLog: (runId: string, data: RunLogDTO, params: RequestParams = {}) =>
            this.request<RunLogDTO, any>({
                path: `/api/v2/run/${runId}/log`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsLogControllerGetLogs
         * @request GET:/api/v2/run/log
         */
        runsLogControllerGetLogs: (params: RequestParams = {}) =>
            this.request<RunStatusDTO, any>({
                path: `/api/v2/run/log`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsLogControllerAppendRunLog
         * @request POST:/api/v2/run/{runId}/log/append
         */
        runsLogControllerAppendRunLog: (runId: string, data: AppendRunLogRequestDTO, params: RequestParams = {}) =>
            this.request<RunLogDTO, any>({
                path: `/api/v2/run/${runId}/log/append`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsStatusControllerGetStatus
         * @request GET:/api/v2/run/{id}/status
         */
        runsStatusControllerGetStatus: (id: string, params: RequestParams = {}) =>
            this.request<RunStatusDTO, any>({
                path: `/api/v2/run/${id}/status`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsStatusControllerUpdateStatus
         * @request PUT:/api/v2/run/{id}/status
         */
        runsStatusControllerUpdateStatus: (id: string, data: RunStatusDTO, params: RequestParams = {}) =>
            this.request<RunStatusDTO, any>({
                path: `/api/v2/run/${id}/status`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsSummaryStatisticsControllerGet
         * @request GET:/api/v2/run/{runId}/summaryStatistics
         */
        runsSummaryStatisticsControllerGet: (runId: string, params: RequestParams = {}) =>
            this.request<SummaryStatisticsDTO, SummaryStatisticsDTO>({
                path: `/api/v2/run/${runId}/summaryStatistics`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsSummaryStatisticsControllerUpdateSummaryStatistics
         * @request PUT:/api/v2/run/{runId}/summaryStatistics
         */
        runsSummaryStatisticsControllerUpdateSummaryStatistics: (
            runId: string,
            data: SummaryStatisticsDTO,
            params: RequestParams = {}
        ) =>
            this.request<SummaryStatisticsDTO, any>({
                path: `/api/v2/run/${runId}/summaryStatistics`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsSummaryStatisticsControllerGetItemStats
         * @request GET:/api/v2/run/{runId}/summaryStatistics/items
         */
        runsSummaryStatisticsControllerGetItemStats: (runId: string, params: RequestParams = {}) =>
            this.request<SummaryStatisticsDTO, SummaryStatisticsDTO>({
                path: `/api/v2/run/${runId}/summaryStatistics/items`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsSummaryStatisticsControllerGetMultipleRunItemStats
         * @request GET:/api/v2/run/summaryStatistics/items
         */
        runsSummaryStatisticsControllerGetMultipleRunItemStats: (params: RequestParams = {}) =>
            this.request<SummaryStatisticsDTO, SummaryStatisticsDTO>({
                path: `/api/v2/run/summaryStatistics/items`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsSummaryStatisticsControllerGetRuleStats
         * @request GET:/api/v2/run/{runId}/summaryStatistics/rules
         */
        runsSummaryStatisticsControllerGetRuleStats: (runId: string, params: RequestParams = {}) =>
            this.request<SummaryStatisticsDTO, SummaryStatisticsDTO>({
                path: `/api/v2/run/${runId}/summaryStatistics/rules`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsWorkQueueControllerGet
         * @request GET:/api/v2/run/{runId}/workQueue
         */
        runsWorkQueueControllerGet: (runId: string, params: RequestParams = {}) =>
            this.request<WorkQueueDTO, WorkQueueDTO>({
                path: `/api/v2/run/${runId}/workQueue`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsWorkQueueControllerUpdate
         * @request PUT:/api/v2/run/{runId}/workQueue
         */
        runsWorkQueueControllerUpdate: (runId: string, data: WorkQueueDTO, params: RequestParams = {}) =>
            this.request<WorkQueueDTO, any>({
                path: `/api/v2/run/${runId}/workQueue`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags start
         * @name StartRunControllerStartRun
         * @request POST:/api/v2/start/variant/{id}
         */
        startRunControllerStartRun: (id: string, data: StartRunRequestDTO, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/start/variant/${id}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name StartOptionsControllerGetStartOptions
         * @request GET:/api/v2/run/options
         */
        startOptionsControllerGetStartOptions: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/options`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name StopRunControllerPauseRun
         * @request POST:/api/v2/run/{runId}/pause
         */
        stopRunControllerPauseRun: (runId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/pause`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name StopRunControllerResumeRun
         * @request POST:/api/v2/run/{runId}/resume
         */
        stopRunControllerResumeRun: (runId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/resume`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name StopRunControllerStopComplete
         * @request POST:/api/v2/run/{runId}/stopComplete
         */
        stopRunControllerStopComplete: (runId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/stopComplete`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name StopRunControllerStopRun
         * @request POST:/api/v2/run/{runId}/stop
         */
        stopRunControllerStopRun: (runId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/stop`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags runs
         * @name RunsLogControllerV2GetRun
         * @request GET:/api/v2/runs/{id}/run/{runNumber}
         */
        runsLogControllerV2GetRun: (id: string, runNumber: string, params: RequestParams = {}) =>
            this.request<RunDocument, any>({
                path: `/api/v2/runs/${id}/run/${runNumber}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags runs
         * @name RunsLogControllerV2GetRunLog
         * @request GET:/api/v2/runs/{id}/log/{runNumber}
         */
        runsLogControllerV2GetRunLog: (id: string, runNumber: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/runs/${id}/log/${runNumber}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerGetVariants
         * @request GET:/api/v2/variants
         */
        variantControllerGetVariants: (params: RequestParams = {}) =>
            this.request<VariantResponse, any>({
                path: `/api/v2/variants`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerCreateVariant
         * @request POST:/api/v2/variants
         */
        variantControllerCreateVariant: (data: CreateVariantDto, params: RequestParams = {}) =>
            this.request<VariantResponse, any>({
                path: `/api/v2/variants`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerGetVariant
         * @request GET:/api/v2/variants/{id}
         */
        variantControllerGetVariant: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerUpdateVariant
         * @request PUT:/api/v2/variants/{id}
         */
        variantControllerUpdateVariant: (id: string, data: UpdateVariantDto, params: RequestParams = {}) =>
            this.request<VariantResponse, any>({
                path: `/api/v2/variants/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerGetVariantsWithParent
         * @request GET:/api/v2/variants/parent/{id}
         */
        variantControllerGetVariantsWithParent: (id: string, params: RequestParams = {}) =>
            this.request<VariantResponse, any>({
                path: `/api/v2/variants/parent/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerGetVariantsWorkspace
         * @request GET:/api/v2/variants/{id}/workspace
         */
        variantControllerGetVariantsWorkspace: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/workspace`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name VariantControllerGetVariantsApplication
         * @request GET:/api/v2/variants/{id}/application
         */
        variantControllerGetVariantsApplication: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/application`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerGetApplicationModel
         * @request GET:/api/v2/variants/{id}/model
         */
        modelControllerGetApplicationModel: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerCreateApplicationModel
         * @request POST:/api/v2/variants/{id}/model
         */
        modelControllerCreateApplicationModel: (id: string, data: ApplicationModelDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerRemoveModel
         * @request DELETE:/api/v2/variants/{id}/model
         */
        modelControllerRemoveModel: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerAddComponent
         * @request POST:/api/v2/variants/{id}/model/components
         */
        modelControllerAddComponent: (id: string, data: ApplicationComponentDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/components`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerUpdateComponent
         * @request PUT:/api/v2/variants/{id}/model/components/{compId}
         */
        modelControllerUpdateComponent: (
            id: string,
            compId: string,
            data: ApplicationComponentDTO,
            params: RequestParams = {}
        ) =>
            this.request<void, void>({
                path: `/api/v2/variants/${id}/model/components/${compId}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerDeleteComponent
         * @request DELETE:/api/v2/variants/{id}/model/components/{compId}
         */
        modelControllerDeleteComponent: (id: string, compId: string, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/variants/${id}/model/components/${compId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerGetComponentsAssociations
         * @request GET:/api/v2/variants/{id}/model/componentAssociations
         */
        modelControllerGetComponentsAssociations: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/componentAssociations`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerGetComponentAssociations
         * @request GET:/api/v2/variants/{id}/model/componentAssociations/{compId}
         */
        modelControllerGetComponentAssociations: (id: string, compId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/componentAssociations/${compId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerAddComponentAssociations
         * @request POST:/api/v2/variants/{id}/model/componentAssociations/{compId}
         */
        modelControllerAddComponentAssociations: (
            id: string,
            compId: string,
            data: ApplicationComponentsAssociationsDTO,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/componentAssociations/${compId}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerUpdateComponentsAssociation
         * @request PUT:/api/v2/variants/{id}/model/componentAssociations/{compId}
         */
        modelControllerUpdateComponentsAssociation: (
            id: string,
            compId: string,
            data: ApplicationComponentsAssociationsDTO,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/componentAssociations/${compId}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerAddRelationship
         * @request POST:/api/v2/variants/{id}/model/relationships
         */
        modelControllerAddRelationship: (id: string, data: ApplicationRelationshipDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/relationships`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerUpdateRelationship
         * @request PUT:/api/v2/variants/{id}/model/relationships/{relId}
         */
        modelControllerUpdateRelationship: (
            id: string,
            relId: string,
            data: ApplicationRelationshipDTO,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/relationships/${relId}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerUpdateModel
         * @request POST:/api/v2/variants/{id}/model/update
         */
        modelControllerUpdateModel: (id: string, data: ApplicationModelUpdateRequestDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/update`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerPatchComponentCoverage
         * @request PATCH:/api/v2/variants/{id}/model/components/{cId}/coverage
         */
        coverageControllerPatchComponentCoverage: (id: string, cId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/components/${cId}/coverage`,
                method: 'PATCH',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerGetComponentsCoverage
         * @request GET:/api/v2/variants/{id}/model/components/{cId}/coverage
         */
        coverageControllerGetComponentsCoverage: (id: string, cId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/components/${cId}/coverage`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerGetVariantsCoverage
         * @request GET:/api/v2/variants/{id}/model/coverage
         */
        coverageControllerGetVariantsCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/coverage`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerGetCoverage
         * @request GET:/api/v2/variants/{id}/coverage/rules
         */
        coverageControllerGetCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/coverage/rules`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerGetSimpleVariantCoverage
         * @request GET:/api/v2/variants/{id}/model/coverage/simple
         */
        coverageControllerGetSimpleVariantCoverage: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/coverage/simple`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name CoverageControllerGetCoverageWithFilters
         * @request GET:/api/v2/variants/{id}/model/coverage/filters
         */
        coverageControllerGetCoverageWithFilters: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/coverage/filters`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rules
         * @name RulesControllerGetRules
         * @request GET:/api/v2/rules
         */
        rulesControllerGetRules: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/rules`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rules
         * @name RulesControllerAddRule
         * @request POST:/api/v2/rules
         */
        rulesControllerAddRule: (data: AddRuleRequestDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/rules`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags rules
         * @name RulesControllerGetRuleById
         * @request GET:/api/v2/rules/{id}
         */
        rulesControllerGetRuleById: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/rules/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rules
         * @name RulesControllerUpdateRule
         * @request PUT:/api/v2/rules/{id}
         */
        rulesControllerUpdateRule: (id: string, data: AddRuleResponseDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/rules/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Screenshots
         * @name ScreenshotControllerCreateScreenshotEntity
         * @request POST:/api/v2/screenshots
         */
        screenshotControllerCreateScreenshotEntity: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/screenshots`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Screenshots
         * @name ScreenshotControllerAddPublicScreenshot
         * @request POST:/api/v2/screenshots/public/{id}
         */
        screenshotControllerAddPublicScreenshot: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/screenshots/public/${id}`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Screenshots
         * @name ScreenshotControllerUploadScreenshot
         * @request POST:/api/v2/screenshots/{screenshotId}
         */
        screenshotControllerUploadScreenshot: (screenshotId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/screenshots/${screenshotId}`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Screenshots
         * @name ScreenshotControllerGetScreenshot
         * @request GET:/api/v2/screenshots/{screenshotId}
         */
        screenshotControllerGetScreenshot: (screenshotId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/screenshots/${screenshotId}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerGetUsers
         * @summary Get users
         * @request GET:/api/v2/users
         */
        userControllerGetUsers: (params: RequestParams = {}) =>
            this.request<UserResponse, any>({
                path: `/api/v2/users`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerGetUser
         * @summary Get user with id
         * @request GET:/api/v2/users/{id}
         */
        userControllerGetUser: (id: string, params: RequestParams = {}) =>
            this.request<UserResponse, any>({
                path: `/api/v2/users/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerUpdate
         * @request PUT:/api/v2/users/{id}
         */
        userControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
            this.request<UserResponse, any>({
                path: `/api/v2/users/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerRemove
         * @request DELETE:/api/v2/users/{id}
         */
        userControllerRemove: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/users/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerGetSession
         * @request GET:/api/v2/users/session
         */
        userControllerGetSession: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/users/session`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerValidateUser
         * @request POST:/api/v2/users/validateUser
         */
        userControllerValidateUser: (data: CreateUserDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/users/validateUser`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerActivateUser
         * @request POST:/api/v2/users/activateUser/{id}
         */
        userControllerActivateUser: (id: string, params: RequestParams = {}) =>
            this.request<UserResponse, any>({
                path: `/api/v2/users/activateUser/${id}`,
                method: 'POST',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerDeactivateUser
         * @request POST:/api/v2/users/deactivateUser/{id}
         */
        userControllerDeactivateUser: (id: string, params: RequestParams = {}) =>
            this.request<UserResponse, any>({
                path: `/api/v2/users/deactivateUser/${id}`,
                method: 'POST',
                format: 'json',
                ...params,
            }),

        /**
         * @description Creates a new Personal Access Token (PAT) for the user making this request.
         *
         * @tags users
         * @name UserControllerCreatePat
         * @summary Create a new PAT.
         * @request POST:/api/v2/users/pat
         */
        userControllerCreatePat: (data: CreatePatDTO, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/users/pat`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerFindPaTs
         * @summary Get all PATs for the current user.
         * @request GET:/api/v2/users/pat
         */
        userControllerFindPaTs: (params: RequestParams = {}) =>
            this.request<PatDTO[], any>({
                path: `/api/v2/users/pat`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Delete one of the current user's PATs by its ID. This is a no-op if the PAT does not exist or if it belongs to another user.
         *
         * @tags users
         * @name UserControllerRevokePat
         * @summary Delete a PAT.
         * @request DELETE:/api/v2/users/pat/{id}
         */
        userControllerRevokePat: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/users/pat/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerGetWorkspaces
         * @request GET:/api/v2/workspace
         */
        workspaceControllerGetWorkspaces: (params: RequestParams = {}) =>
            this.request<WorkspaceResponse, any>({
                path: `/api/v2/workspace`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerCreateWorkspace
         * @request POST:/api/v2/workspace
         */
        workspaceControllerCreateWorkspace: (data: CreateWorkspaceDto, params: RequestParams = {}) =>
            this.request<WorkspaceResponse, any>({
                path: `/api/v2/workspace`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerGetWorkspace
         * @request GET:/api/v2/workspace/{id}
         */
        workspaceControllerGetWorkspace: (id: string, params: RequestParams = {}) =>
            this.request<WorkspaceResponse, any>({
                path: `/api/v2/workspace/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerUpdateWorkspace
         * @request PUT:/api/v2/workspace/{id}
         */
        workspaceControllerUpdateWorkspace: (id: string, data: UpdateWorkspaceDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/workspace/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerDeleteWorkspace
         * @request DELETE:/api/v2/workspace/{id}
         */
        workspaceControllerDeleteWorkspace: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/workspace/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags invitation-token
         * @name InvitationTokenControllerGetInvitationToken
         * @summary Get invitation token with id
         * @request GET:/api/v2/invitation-token/{id}
         */
        invitationTokenControllerGetInvitationToken: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/invitation-token/${id}`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags invitation-token
         * @name InvitationTokenControllerCreateWorkspace
         * @request POST:/api/v2/invitation-token
         */
        invitationTokenControllerCreateWorkspace: (data: CreateInvitationTokenDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/invitation-token`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags invite-user
         * @name InviteUserControllerGetUsers
         * @summary Get invitations
         * @request GET:/api/v2/invite-user
         */
        inviteUserControllerGetUsers: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/invite-user`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags invite-user
         * @name InviteUserControllerCreateInvitation
         * @request POST:/api/v2/invite-user
         */
        inviteUserControllerCreateInvitation: (data: CreateUserInvitationDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/invite-user`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags invite-user
         * @name InviteUserControllerRemoveEntity
         * @summary Remove invitation
         * @request DELETE:/api/v2/invite-user/{invitationId}
         */
        inviteUserControllerRemoveEntity: (invitationId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/invite-user/${invitationId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags entities
         * @name InstanceEntityControllerGetEntitysChildren
         * @summary Get entity's children
         * @request GET:/api/v2/entities/{entityId}/children
         */
        instanceEntityControllerGetEntitysChildren: (entityId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/entities/${entityId}/children`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags entities
         * @name InstanceEntityControllerRemoveEntity
         * @summary Remove entity and it's children
         * @request DELETE:/api/v2/entities/{entityId}
         */
        instanceEntityControllerRemoveEntity: (entityId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/entities/${entityId}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags subscription
         * @name SubscriptionControllerValidatePayment
         * @request POST:/api/v2/subscription/manage-subscriptions
         */
        subscriptionControllerValidatePayment: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/subscription/manage-subscriptions`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags analytics
         * @name AnalyticsControllerGetRunRuleStatistics
         * @summary Get rule statistics for a run
         * @request POST:/api/v2/analytics/app/{appId}/run/{runId}
         */
        analyticsControllerGetRunRuleStatistics: (
            appId: string,
            runId: string,
            data: AnalyticsRequestDTO,
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, void>({
                path: `/api/v2/analytics/app/${appId}/run/${runId}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags analytics
         * @name AnalyticsControllerGetComponentRuleStatistics
         * @summary Get rule statistics for all components in an application
         * @request POST:/api/v2/analytics/app/{appId}/components
         */
        analyticsControllerGetComponentRuleStatistics: (
            appId: string,
            data: AnalyticsRequestDTO,
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, any>({
                path: `/api/v2/analytics/app/${appId}/components`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags analytics
         * @name AnalyticsControllerGetPageRuleStatistics
         * @summary Get rule statistics for all components in an application
         * @request POST:/api/v2/analytics/app/{appId}/pages
         */
        analyticsControllerGetPageRuleStatistics: (
            appId: string,
            data: AnalyticsRequestDTO,
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, any>({
                path: `/api/v2/analytics/app/${appId}/pages`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),
    }
}
