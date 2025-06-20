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

export interface BaseAssetImportDataDto {
    text: string
}

export interface ImportRuleDto {
    name: string
    description: string
    data: BaseAssetImportDataDto
    type: 'rule'
}

export interface ImportFlowDto {
    name: string
    description: string
    data: BaseAssetImportDataDto
    type: 'flow'
}

export interface ImportDatasetDto {
    name: string
    description: string
    data: BaseAssetImportDataDto
    type: 'dataset'
}

export interface AssetsFilterDTO {
    status?: 'active' | 'inactive' | 'invalid'
    type?: 'accessibility-rule' | 'functional-rule' | 'resource-rule' | 'webform-rule' | 'link-rule'
    tag?: object
    search?: object
}

export interface AssetAnalyticsDTO {
    failed: number
    lastTestedTimestamp: string
    lastTestedRunNumber: number
    lastTestedRunId: string
}

export interface AssetTableEntryDTO {
    /** Only present if isGroup is false */
    asset?:
        | DatasetWithPopulatedParentAndTags
        | RuleWithPopulatedParentAndTags
        | FlowWithPopulatedParentAndTags
        | RunTemplateWithPopulatedParentAndTags
        | FormSpecWithPopulatedParentAndTags
    /** Only present if isGroup is true, contains the grouped assets */
    subRows?: AssetTableEntryDTO[]
    /** True if a groupBy condition is applied, otherwise false */
    isGroup: boolean
    analytics?: AssetAnalyticsDTO
    /** Only present if isGroup is true, references the groupName */
    groupName?: string | string[]
}

export interface RuleScenario {
    name: string
    id: string
}

export interface RuleData {
    id: string
    type: 'accessibility-rule' | 'functional-rule' | 'resource-rule' | 'webform-rule' | 'link-rule'
    text: string
    scenarios: RuleScenario[]
    isExecutable?: boolean
}

export interface Rule {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    _id: string
    name: string
    description: string
    tags: (string | TagDTO)[]
    /** The id referencing the parent the asset belongs to */
    parent: string | ResourceDto
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'rule'
    data: RuleData
}

export interface ResourceDto {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    name: string
    parent: string
    type: 'instance' | 'application' | 'workspace' | 'variant'
    role: 0 | 1 | 2 | 3 | 4 | 5
}

export interface RuleWithPopulatedParentAndTags {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    name: string
    description: string
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'rule'
    data: RuleData
    /** The id referencing the parent the asset belongs to */
    parent: ResourceDto
    tags: TagDTO[]
    _id: string
}

export interface CreateAssetDto {
    name: string
    description: string
    type: 'dataset' | 'rule' | 'flow' | 'run-template' | 'form-spec'
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    tags: string[]
    /** The id referencing the application the asset belongs to */
    parent: string
    data: DatasetData | FormSpecData | RuleData | RunTemplateData | FlowData
}

export interface ImportAssetDto {
    type: 'dataset' | 'rule' | 'flow'
    assets: (ImportRuleDto | ImportFlowDto | ImportDatasetDto)[]
    parent: string
}

export interface ImportResponseDto {
    importedCount: number
}

export interface UpdateAssetDto {
    name: string
    description: string
    type: 'dataset' | 'rule' | 'flow' | 'run-template' | 'form-spec'
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    tags: string[]
    /** The id referencing the application the asset belongs to */
    parent: string
    data: DatasetData | FormSpecData | RuleData | RunTemplateData | FlowData
}

export interface UpdateAssetParentDTO {
    newParent: string
    name: string
}

export interface DatasetData {
    type: 'file' | 'dataset'
    /** Parsed dataset, for datasets, [{ key: string }] for files, only present if the asset is valid */
    data?: object[]
    /** JSON text for datasets, file name for files */
    text: string
}

export interface Dataset {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    _id: string
    name: string
    description: string
    tags: (string | TagDTO)[]
    /** The id referencing the parent the asset belongs to */
    parent: string | ResourceDto
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'dataset'
    data: DatasetData
}

export interface DatasetWithPopulatedParentAndTags {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    name: string
    description: string
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'dataset'
    data: DatasetData
    /** The id referencing the parent the asset belongs to */
    parent: ResourceDto
    tags: TagDTO[]
    _id: string
}

export interface FlowParam {
    name: string
    type?: string
    defaultValue?: string
}

export interface FlowData {
    text: string
    parseableText?: string
    parameters: FlowParam[]
}

export interface Flow {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    _id: string
    name: string
    description: string
    tags: (string | TagDTO)[]
    /** The id referencing the parent the asset belongs to */
    parent: string | ResourceDto
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'flow'
    data: FlowData
}

export interface FlowWithPopulatedParentAndTags {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    name: string
    description: string
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'flow'
    data: FlowData
    /** The id referencing the parent the asset belongs to */
    parent: ResourceDto
    tags: TagDTO[]
    _id: string
}

export interface ExecutionStatus {
    offset: number
    lineNum: number
    colNum: number
}

export interface ComponentRunWorkQueueItemItem {
    label: string
    pageUrl: string
}

export interface RunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Flow' | 'ChatGPT' | 'Component' | 'Jump' | 'Link Testing' | 'Page' | 'Form Field'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface PopulatedWorkQueue {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Flow' | 'ChatGPT' | 'Component' | 'Jump' | 'Link Testing' | 'Page' | 'Form Field'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    item?: ComponentRunWorkQueueItemItem
    activityId?: Flow
}

export interface FormTestingConfig {
    /** @default false */
    validData?: boolean
    /** @default false */
    invalidData?: boolean
    /** @default false */
    fieldLevelTest?: boolean
    /** @default false */
    formSubmission?: boolean
}

export interface RunTemplateAssets {
    rules: string[]
    data: string[]
    activities: string[]
    /** Mapping of dataset IDs (referable to in flows and rules) to resolved dataset IDs (data from these will actually be used) */
    datasets?: object
}

export interface Extensions {
    accessibility: boolean
    brokenLinks: boolean
    resources: boolean
    performance: boolean
    functional: boolean
}

export interface RunTemplateData {
    path: string
    /** @default 3 */
    depth: number
    duration: number
    /** @default false */
    stopAfterFlows?: boolean
    /** @default "default" */
    workQueueConfig?: string
    /** @default {} */
    formTestingConfig?: FormTestingConfig
    /** @default false */
    fastTestTables?: boolean
    /** @default {} */
    extraHTTPHeaders?: object
    /** @default "" */
    skipComponents?: string
    /** @default false */
    stopOnFlowError?: boolean
    /** @default true */
    enableModeling?: boolean
    /** @default false */
    useDatasetsForForms?: boolean
    /**
     * If true, the agent will not visit links to test them
     * @default false
     */
    fastTestLinks?: boolean
    /** @default 3000 */
    pageLoadTimeout?: number
    /** @default 1 */
    actionRetryAttempts?: number
    /** Domains that will be tested by the agent. */
    testableDomains: string[]
    assets: RunTemplateAssets
    extensions: Extensions
    /** A set of work queue items for the test */
    workQueue: PopulatedWorkQueue[]
}

export interface RunTemplate {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    _id: string
    name: string
    description: string
    tags: (string | TagDTO)[]
    /** The id referencing the parent the asset belongs to */
    parent: string | ResourceDto
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'run-template'
    data: RunTemplateData
}

export interface RunTemplateWithPopulatedParentAndTags {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    name: string
    description: string
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'run-template'
    data: RunTemplateData
    /** The id referencing the parent the asset belongs to */
    parent: ResourceDto
    tags: TagDTO[]
    _id: string
}

export interface FieldSpec {
    fieldNumber?: string
    fieldLabel?: string
    fieldId?: string
    required?: 'Yes' | 'No' | ''
    minimumOccurrences?: number
    maximumOccurrences?: number
    agencyFieldName?: string
    fieldType?: string
    globalLibraryFieldName?: string
    fieldTypeSource?: string
    businessRules?: string
    dataType?: string
    listOfValues?: string
    minCharsOrMinValue?: string
    maxCharsOrMaxValue?: string
    fieldImplementation?: string
    helpTip?: string
    mandatoryMessage?: string
    validationMessage?: string
}

export interface FormSpecData {
    formTitle: string
    formId: string
    formVersion: string
    ombControlNumber: string
    ombExpirationDate: string
    formFamilies: string[]
    fields: FieldSpec[]
}

export interface FormSpec {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    _id: string
    name: string
    description: string
    tags: (string | TagDTO)[]
    /** The id referencing the parent the asset belongs to */
    parent: string | ResourceDto
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'form-spec'
    data: FormSpecData
}

export interface FormSpecWithPopulatedParentAndTags {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
    name: string
    description: string
    /** @default "active" */
    status: 'active' | 'inactive' | 'invalid'
    version?: number
    type: 'form-spec'
    data: FormSpecData
    /** The id referencing the parent the asset belongs to */
    parent: ResourceDto
    tags: TagDTO[]
    _id: string
}

export interface User {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    email: string
    externalId: string
    customerId: string
    status: 'active' | 'inactive' | 'waitlisted'
    isAdmin?: boolean
}

export interface MetadataDTO {
    count: number
    offset: number
    limit: number
    hasMore: boolean
}

export interface TransformedUser {
    data: User
    metadata: MetadataDTO
}

export interface RunStatusParameters {
    path: string
    /** @default 3 */
    depth: number
    duration: number
    /** @default false */
    stopAfterFlows?: boolean
    /** @default "default" */
    workQueueConfig?: string
    /** @default {} */
    formTestingConfig?: FormTestingConfig
    /** @default false */
    fastTestTables?: boolean
    /** @default {} */
    extraHTTPHeaders?: object
    /** @default "" */
    skipComponents?: string
    /** @default false */
    stopOnFlowError?: boolean
    /** @default true */
    enableModeling?: boolean
    /** @default false */
    useDatasetsForForms?: boolean
    /**
     * If true, the agent will not visit links to test them
     * @default false
     */
    fastTestLinks?: boolean
    /** @default 3000 */
    pageLoadTimeout?: number
    /** @default 1 */
    actionRetryAttempts?: number
    /** Domains that will be tested by the agent. */
    testableDomains: string[]
    assets: RunTemplateAssets
    extensions: Extensions
    name: string
    workQueue: RunWorkQueueItem[]
    _id: string
}

export interface Pause {
    start: string
    end: string
}

export interface Run {
    _id: string
    /** Applications id */
    applicationId: string
    /** The values for the run parameters */
    parameters: RunStatusParameters
    /** Run number */
    runNumber: number
    /** Run start time */
    startTime: string
    /** Run end time */
    endTime: string
    /** Run status */
    status: 'starting' | 'running' | 'paused' | 'stopping' | 'stopped'
    /** Template name */
    templateName: string
    /** User who started the run */
    user: string
    /** The current page title */
    currentPageTitle: string
    /** The current page url */
    currentPageUrl: string
    /** The current component label */
    currentComponentLabel: string
    /** The current screenshot id */
    currentScreenshotId: string
    /** The pauses and resumes for the run */
    stops: Pause[]
}

export interface WorkQueueItem {
    /** @example "Activity" */
    type: string
    label: string
    /** Unique identifier for the workqueue item */
    id?: string
    /** @example "" */
    pageId?: string
    /** @example "" */
    componentId?: string
    /** @example "" */
    activityId?: string
}

export interface StatusCounts {
    /** @min 0 */
    todo: number
    /** @min 0 */
    doing: number
    /** @min 0 */
    untested: number
    /** @min 0 */
    partial: number
    /** @min 0 */
    success: number
    /** @min 0 */
    failed: number
}

export interface StatisticsDTO {
    /** The number of components in each state (e.g. passed, failed, todo) */
    counts: StatusCounts
}

export interface ComponentStatisticsDTO {
    Page?: StatisticsDTO
    Item?: StatisticsDTO
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
    componentStatistics: ComponentStatisticsDTO
}

export interface RunDto {
    _id: string
    applicationId: string
    runNumber: number
    startTime: string
    endTime: string
    templateName: string
    parameters: RunTemplateData
    status: 'starting' | 'running' | 'paused' | 'stopping' | 'stopped'
    initialWorkQueue: WorkQueueItem[]
    summaryStatistics: SummaryStatisticsDTO
    /** User who started the run */
    user: string
}

export interface PaginatedRunMetadataDTO {
    total: number
    page: number
    lastPage: number
}

export interface PaginatedRunDTO {
    data: RunDto[]
    metadata: PaginatedRunMetadataDTO
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
    runId: string
    templateName?: string
    runNumber: number
    applicationName: string
    startingPageTitle: string
    depth: number
    startTime: string
    endTime: string
    currentPageTitle: string
    /**
     * URL of the current page the Agent is on
     * @example "https://example.com/foo/bar"
     */
    currentPageUrl: string
    currentComponentLabel: string
    runningState: 'starting' | 'running' | 'paused' | 'stopping' | 'stopped'
    currentScreenshotId?: string
}

export interface AppendRunLogRequestDTO {
    entries: string[]
}

export interface StopDto {
    start: string
    end?: string
}

export interface UpdateRunStatusDto {
    currentComponentLabel: string
    currentPageTitle: string
    currentPageUrl: string
    currentScreenshotId: string
    runningState: 'starting' | 'running' | 'paused' | 'stopping' | 'stopped'
    stops: StopDto[]
}

export interface ChatGptRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'ChatGPT'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface JumpRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Jump'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url: string
    pageId?: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface PageRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Page'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface ComponentRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Component'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId: string
    componentId: string
    activityId?: string
    item: ComponentRunWorkQueueItemItem
}

export interface FlowRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Flow'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    activityId: string
    item?: ComponentRunWorkQueueItemItem
}

export interface LinkRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Link Testing'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface FormFieldRunWorkQueueItem {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Form Field'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId: string
    componentId?: string
    activityId?: string
    item?: ComponentRunWorkQueueItemItem
}

export interface PopulatedRunWorkQueueItemDto {
    id: string
    state: 'Todo' | 'Doing' | 'Failed' | 'Success' | 'Partial'
    label: string
    type: 'Flow' | 'ChatGPT' | 'Component' | 'Jump' | 'Link Testing' | 'Page' | 'Form Field'
    subItems?: RunWorkQueueItem[]
    executionStatus?: ExecutionStatus
    url?: string
    pageId?: string
    componentId?: string
    item?: ComponentRunWorkQueueItemItem
    activityId: Flow
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

export interface UpdateWorkQueueDTO {
    runId: string
    items: RunWorkQueueItem[]
}

export interface RunWorkQueue {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    /** The id referencing the run that the work queue belongs to */
    runId:
        | string
        | {
              _id?: string
          }
    items: RunWorkQueueItem[]
}

export interface RunLogFilterDto {
    /**
     * @min 1
     * @default 50
     */
    limit?: number
    /** @min 0 */
    offset?: number
    /** String sort */
    sort?: string
    /** Only include results from a specific log type */
    type?: object
    /** Only include results from a specific rule type */
    ruleType?: object
    /** Only include results from a specific log level */
    level?: object
    /** Only include results from a specific message in the log */
    message?: object
    /** Only include results from a specific page in the log */
    page?: object
    /** Only include results from a specific rule id in the log */
    ruleId?: object
}

export interface TypeFilterDto {
    /** Only include results from a specific log type */
    type?: object
}

export interface LoggableAppStateDTO {
    prevPage: object
    action: object
    page: object
}

export interface RunLogEntryDTO {
    id: number
    type:
        | 'Agent'
        | 'Action'
        | 'Assertion'
        | 'Event'
        | 'Rule'
        | 'Selector'
        | 'Work'
        | 'Flow'
        | 'Performance'
        | 'Download'
    level: 'Info' | 'Error' | 'Warning' | 'Debug'
    timestamp: string
    state: LoggableAppStateDTO
    msg: string
    data: object
    error?: string
}

export interface LogWithCount {
    data: RunLogEntryDTO[]
    totalCount: number
}

export interface ClusterRunParameters {
    path: string
    /** @default 3 */
    depth: number
    duration: number
    /** @default false */
    stopAfterFlows?: boolean
    /** @default "default" */
    workQueueConfig?: string
    /** @default {} */
    formTestingConfig?: FormTestingConfig
    /** @default false */
    fastTestTables?: boolean
    /** @default {} */
    extraHTTPHeaders?: object
    /** @default "" */
    skipComponents?: string
    /** @default false */
    stopOnFlowError?: boolean
    /** @default true */
    enableModeling?: boolean
    /** @default false */
    useDatasetsForForms?: boolean
    /**
     * If true, the agent will not visit links to test them
     * @default false
     */
    fastTestLinks?: boolean
    /** @default 3000 */
    pageLoadTimeout?: number
    /** @default 1 */
    actionRetryAttempts?: number
    /** Domains that will be tested by the agent. */
    testableDomains: string[]
    assets: RunTemplateAssets
    extensions: Extensions
    name: string
    workQueue: RunWorkQueueItem[]
    _id: string
}

export interface StartRunClusterRequestDTO {
    runId: string
    runNumber: number
    variantId: string
    parameters: ClusterRunParameters
    availableTestActions: number
}

export interface RunParameters {
    path: string
    /** @default 3 */
    depth: number
    duration: number
    /** @default false */
    stopAfterFlows?: boolean
    /** @default "default" */
    workQueueConfig?: string
    /** @default {} */
    formTestingConfig?: FormTestingConfig
    /** @default false */
    fastTestTables?: boolean
    /** @default {} */
    extraHTTPHeaders?: object
    /** @default "" */
    skipComponents?: string
    /** @default false */
    stopOnFlowError?: boolean
    /** @default true */
    enableModeling?: boolean
    /** @default false */
    useDatasetsForForms?: boolean
    /**
     * If true, the agent will not visit links to test them
     * @default false
     */
    fastTestLinks?: boolean
    /** @default 3000 */
    pageLoadTimeout?: number
    /** @default 1 */
    actionRetryAttempts?: number
    /** Domains that will be tested by the agent. */
    testableDomains: string[]
    assets: RunTemplateAssets
    extensions: Extensions
    workQueue: RunWorkQueueItem[]
    name: string
    _id: string
}

export interface StartRunRequestDTO {
    /** The values for the run parameters */
    parameters: RunParameters
}

export interface StartRunSuccessResponseDTO {
    /**
     * The id of the run
     * @example "123"
     */
    runId: string
    runNumber: number
}

export interface TransformedVariantDtos {
    data: VariantDto[]
    metadata: MetadataDTO
}

export interface VariantDataDto {
    defaultUrl?: string
}

export interface UserDto {
    _id: string
    email: string
    externalId?: string
    customerId?: string
    status: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
}

export interface Parent {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    name: string
    /**
     * Entity Type
     * @example "application"
     */
    type: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: 0 | 1 | 2 | 3 | 4 | 5
    parent: string
}

export interface VariantDto {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    /**
     * The name of the variant
     * @example "test's variant"
     */
    name: string
    /**
     * Entity Type
     * @example "variant"
     */
    type: string
    role: 0 | 1 | 2 | 3 | 4 | 5
    /** Variants's data */
    data: VariantDataDto
    owners: UserDto[]
    /** Variant's parent (Application) */
    parent: Parent
}

export interface Entity {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    updatedBy?: string
}

export interface Plan {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    /** @example "Free" */
    name: 'Free' | 'Plus' | 'Pro' | 'Enterprise' | 'Unlimited'
    /** @example 1500 */
    testActionsPerDay: number
    /** @example 14 */
    runHistoryDurationInDays: number
    /** @example true */
    functionalTesting: boolean
    /** @example true */
    accessibilityTesting: boolean
    /** @example true */
    performanceTesting: boolean
}

export interface WorkspaceDataDto {
    /**
     * Workspace's data
     * @default "inactive"
     */
    status?: 'active' | 'expired' | 'inactive'
    /**
     * Workspace's plan
     * @default null
     */
    plan?: Plan
    /** @default null */
    subscriptionId?: string
}

export interface WorkspaceDto {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name: string
    type: string
    role: 0 | 1 | 2 | 3 | 4 | 5
    parent: Entity
    owners: UserDto[]
    data: WorkspaceDataDto
    /** @format date-time */
    lastRun: string
}

export interface TransformedWorkspaceDto {
    data: WorkspaceDto
    metadata: MetadataDTO
}

export interface VariantData {
    defaultUrl: string
}

export interface CreateVariantDto {
    /** The name of the variant */
    name: string
    /** The id referencing the application */
    parentId: string
    /** The variants data such as defaultUrl or activitySets */
    data: VariantData
}

export interface UpdateVariantDto {
    /** The name of the variant */
    name: string
    /** The variants data such as defaultUrl or activitySets */
    data: VariantData
}

export interface ApplicationModelDTO {
    /**
     * Equals applicationId to conform to resource DTO
     * @example ""
     */
    id: string
    /**
     * The variant this model belongs to
     * @example ""
     */
    applicationId: string
    /** Nodes in the application mode */
    nodes: object[]
    /** Edges in the application mode */
    edges: object[]
}

export interface Properties {
    tagName: string
    nodeName: string
    id: string
}

export interface Dimensions {
    width: number
    height: number
}

export interface Position {
    x: number
    y: number
    z: number
}

export interface ModelItemData {
    properties: Properties
    __dimensions: Dimensions
    __position: Position
    classifications: string
    jsonSnapshot: string
}

export interface ApplicationComponent {
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    applicationId: string
    id: string
    name: string
    type: string
    data: ModelItemData
    /** @default 1 */
    version: number
}

export interface UpdateDTOItem {
    id: string
    name: string
    type: string
    data: ModelItemData
}

export interface UpdateDTORelationship {
    id: string
    type: string
    from: string
    to: string
    data: ModelItemData
}

export interface UpdateDTO {
    type: string
    item: UpdateDTOItem
    relationship: UpdateDTORelationship
}

export interface ApplicationModelUpdateRequestDTO {
    applicationId: string
    updates: UpdateDTO[]
}

export interface CreatePageModelDTO {
    /** The page model to save */
    page: object
    /** The run the page model was recorded in */
    runId: string
}

export interface PageModelDto {
    variantId: string
    /**
     * The id for the corresponding application component in the variant's application model.
     *
     * @note may be missing on models for older runs
     */
    pageId: string
    /**
     * The run the page model was recorded in.
     *
     * @note may be missing on models for older runs
     */
    runId: string
    pageTitle: string
    pageUrl: string
    screenshotId: string
    /** Unique id for this model */
    modelId: string
    /** @format date-time */
    createdAt: string
    /** @format date-time */
    updatedAt: string
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

export interface InvitedUserPermissionDto {
    /** The id referencing the user */
    email: string
    /** The id referencing resource */
    resource: string
    /**
     * The role of the user
     * @default "none"
     */
    role: 0 | 1 | 2 | 3 | 4 | 5
    /** The status of the invite */
    status: 'pending' | 'accepted'
    /** The user did not exist and was added to the invite collection */
    isInvite: boolean
}

export interface CreatePermissionDto {
    /** The id or the email referencing the user */
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

export interface UsageDto {
    _id: string
    runId: string | object
    workspaceId: string | WorkspaceDto
    /** @format date-time */
    date: string
    actionsPerformed: number
}

export interface CreateUsageDto {
    runId: string
    actionsPerformed: number
}

export interface AnalyticsFilterDTO {
    /** Only include results from a specific run, or a set of runs */
    runId?: string | string[]
    /** Filter for one or more rules by id */
    ruleId?: string | string[]
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
        | 'Table Body'
        | 'Table Footer'
        | 'Table Row'
        | 'Table Header Cell'
        | 'Table Data Cell'
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
        | 'Image'
        | 'Icon'
        | 'Grid'
        | 'Grid Item'
        | 'List'
        | 'List Item'
        | 'Unclassified'
}

export interface AnalyticsRequestDTO {
    /** Filters to apply to run logs before aggregating */
    filter: AnalyticsFilterDTO
    /** The fields to group by */
    groupBy: string[]
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
        | 'Table Body'
        | 'Table Footer'
        | 'Table Row'
        | 'Table Header Cell'
        | 'Table Data Cell'
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
        | 'Image'
        | 'Icon'
        | 'Grid'
        | 'Grid Item'
        | 'List'
        | 'List Item'
        | 'Unclassified'
    runLogId?: string | object
    runLogNumber?: number
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

export interface PagePerformanceDTO {
    runId: string
    applicationId: string
    pageId: string
    /** Number of times statistics were collected for this page */
    n: number
    /** Time to load (TTL) in milliseconds */
    ttl: number
    /** Largest Contentful Paint (LCP) in milliseconds */
    lcp: number
    /** Total page load time in milliseconds */
    loadTime: number
    /** First Contentful Paint (FCP) in milliseconds */
    fcp: number
    /** Time to Interactive (TTI) in milliseconds */
    tti: number
    /** Cumulative Layout Shift (CLS) score */
    cls: number
}

export interface PerformanceResultsDTO {
    analytics: PagePerformanceDTO[]
    /** The total number of results that match the query */
    count: number
}

export type FormData = object

export interface FileUploadDto {
    file: FormData
}

export type StreamableFile = object

export interface UpdateKeyDto {
    newKey: string
}

export interface TransformedTagDTOS {
    data: TagDTO[]
    metadata: MetadataDTO
}

export interface TransformedTagWithPopulatedParentDTOS {
    data: TagWithPopulatedParentDTO[]
    metadata: MetadataDTO
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

export interface TagDTO {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    name: string
    type: 'default' | 'custom' | 'core'
    status: 'active' | 'inactive'
    color?: string
    /** The id referencing the application the asset belongs to */
    parent: string | ResourceDto
}

export interface TransformedTagDTO {
    data: TagDTO
    metadata: MetadataDTO
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

export interface UpdateTagParentDTO {
    newParent: string
    name: string
}

export interface TagWithPopulatedParentDTO {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    /** @example "6398ff6875c42c6e2a417b8e" */
    _id: string
    name: string
    type: 'default' | 'custom' | 'core'
    status: 'active' | 'inactive'
    color?: string
    /** The id referencing the application the asset belongs to */
    parent: ResourceDto
}

export interface TransformedTagWithPopulatedParentDTO {
    data: TagWithPopulatedParentDTO
    metadata: MetadataDTO
}

export interface TransformedApplicationDtos {
    data: ApplicationDto[]
    metadata: MetadataDTO
}

export interface ApplicationDto {
    updatedBy: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    name: string
    /**
     * Entity Type
     * @example "application"
     */
    type: string
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: 0 | 1 | 2 | 3 | 4 | 5
    parent: Parent
    owners: UserDto[]
}

export interface TransformedApplicationDto {
    data: ApplicationDto
    metadata: MetadataDTO
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

export interface CreatePatResponseDTO {
    apiKey: string
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

export interface TransformedCreatePatResponseDTO {
    data: CreatePatResponseDTO
    metadata: MetadataDTO
}

export interface TransformedPatDTOS {
    data: PatDTO[]
    metadata: MetadataDTO
}

export interface TransformedPatDTO {
    data: PatDTO
    metadata: MetadataDTO
}

export interface UserWorkspace {
    updatedBy?: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    _id?: string
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name?: string
    type?: string
    data?: WorkspaceDataDto
    parent: string
}

export interface UserWithWorkspaces {
    _id: string
    email: string
    externalId?: string
    customerId?: string
    status: string
    /** @format date-time */
    createdAt?: string
    /** @format date-time */
    updatedAt?: string
    workspaces: UserWorkspace[]
}

export interface PaginatedUserMetadataDto {
    count: number
    limit: number
    offset: number
}

export interface PaginatedUserDto {
    data: UserWithWorkspaces[]
    metadata: PaginatedUserMetadataDto
}

export interface UpdateUserDto {
    /** The email that identifies the user */
    email?: string
    /** The email that identifies the user */
    externalId?: string
    /** The email that identifies the user */
    customerId?: string
}

export interface CreateUserDto {
    /** The email that identifies the user */
    email: string
    /** The email that identifies the user */
    externalId: string
    /** The email that identifies the user */
    customerId: string
}

export interface TransformedWorkspaceDtos {
    data: WorkspaceDto[]
    metadata: MetadataDTO
}

export interface CreateWorkspaceDto {
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name: string
    /**
     * The name of the workspace's plan
     * @example "free"
     */
    plan?: 'free' | 'plus' | 'pro' | 'enterprise' | 'unlimited'
}

export interface UpdateWorkspacePlanDto {
    /** @example "Free" */
    plan: 'Free' | 'Plus' | 'Pro' | 'Enterprise' | 'Unlimited'
}

export interface DefaultResponseDto {
    ok: boolean
    msg: string
}

export interface TransformedDefaultResponseDto {
    data: DefaultResponseDto
    metadata: MetadataDTO
}

export interface UpdateWorkspaceDto {
    /**
     * The name of the workspace
     * @example "test's workspace"
     */
    name?: string
    /**
     * The name of the workspace's plan
     * @example "free"
     */
    plan?: 'free' | 'plus' | 'pro' | 'enterprise' | 'unlimited'
}

export interface TransformedInviteUserDTOS {
    data: InviteUserDTO[]
    metadata: MetadataDTO
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

export interface InviteUserDTO {
    resource?: string | object | WorkspaceDto | ApplicationDto | VariantDto
    email: string
    role?: 0 | 1 | 2 | 3 | 4 | 5
    /** The status of the invite */
    status: 'pending' | 'accepted'
}

export interface EntityResponse {
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
     * Entity Type
     * @example "instance"
     */
    type: 'instance' | 'workspace' | 'application' | 'variant'
    /**
     * User's email address
     * @example "joh-doe@gmail.com"
     */
    role: 0 | 1 | 2 | 3 | 4 | 5
    /** The system does not have a parent */
    parent: object
}

export interface ViewConfigDTO {
    /** The filters configuration of the view */
    filters?: object
    /** The group configuration of the view */
    groupBy?: object
    /** The sort configuration of the view */
    sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
    /** The column visibility configuration of the view */
    columnVisibility?: object
    /** The column order configuration of the view */
    columnOrder?: string[]
}

export interface ViewDTO {
    _id: string
    /**
     * The name of the workspace
     * @example "Errors"
     */
    name: string
    /** The parent of the view, usually the workspaceId */
    parentId: string
    /** The url the view should be displayed */
    url: string
    /** The configuration of the view */
    config: ViewConfigDTO
    /** The view number */
    viewNumber: number
}

export interface CreateViewDTO {
    /**
     * The name of the workspace
     * @example "Errors"
     */
    name: string
    /** The parent of the view, usually the workspaceId */
    parentId: string
    /** The url the view should be displayed */
    url: string
    /** The configuration of the view */
    config: ViewConfigDTO
}

export interface UpdateViewDTO {
    /**
     * The name of the workspace
     * @example "Errors"
     */
    name?: string
    /** The parent of the view, usually the workspaceId */
    parentId?: string
    /** The url the view should be displayed */
    url?: string
    /** The configuration of the view */
    config?: ViewConfigDTO
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
            const r = response.clone() as HttpResponse<T, E>
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
 * @version 0.23.0
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
         * @tags rule
         * @name RuleControllerFindAllTableData
         * @summary Get rules for the given application
         * @request GET:/api/v2/assets/{appId}/rule/application/table-data
         */
        ruleControllerFindAllTableData: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                groupBy?: object
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<AssetTableEntryDTO[], any>({
                path: `/api/v2/assets/${appId}/rule/application/table-data`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerFindAllBase
         * @summary Get rules for the given application
         * @request GET:/api/v2/assets/{appId}/rule
         */
        ruleControllerFindAllBase: (appId: string, params: RequestParams = {}) =>
            this.request<Rule[], any>({
                path: `/api/v2/assets/${appId}/rule`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerCreate
         * @summary Create rule
         * @request POST:/api/v2/assets/{appId}/rule
         */
        ruleControllerCreate: (appId: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<Rule, any>({
                path: `/api/v2/assets/${appId}/rule`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerFindAll
         * @summary Get rules for the given application
         * @request GET:/api/v2/assets/{appId}/rule/application
         */
        ruleControllerFindAll: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<RuleWithPopulatedParentAndTags[], any>({
                path: `/api/v2/assets/${appId}/rule/application`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerFindOne
         * @summary Get rule with id
         * @request GET:/api/v2/assets/{appId}/rule/{id}
         */
        ruleControllerFindOne: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<Rule, void>({
                path: `/api/v2/assets/${appId}/rule/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerUpdate
         * @summary Update rule
         * @request PUT:/api/v2/assets/{appId}/rule/{id}
         */
        ruleControllerUpdate: (appId: string, id: string, data: UpdateAssetDto, params: RequestParams = {}) =>
            this.request<Rule, void>({
                path: `/api/v2/assets/${appId}/rule/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerRemove
         * @summary Delete rule
         * @request DELETE:/api/v2/assets/{appId}/rule/{id}
         */
        ruleControllerRemove: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v2/assets/${appId}/rule/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerImport
         * @summary Import rules
         * @request POST:/api/v2/assets/{appId}/rule/import
         */
        ruleControllerImport: (appId: string, data: ImportAssetDto, params: RequestParams = {}) =>
            this.request<ImportResponseDto, any>({
                path: `/api/v2/assets/${appId}/rule/import`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerUpdateParent
         * @summary Update Assets parent
         * @request PUT:/api/v2/assets/{appId}/rule/{id}/updateParent
         */
        ruleControllerUpdateParent: (
            appId: string,
            id: string,
            data: UpdateAssetParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<Rule, void>({
                path: `/api/v2/assets/${appId}/rule/${id}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/rule/{id}/tags
         */
        ruleControllerUpdateTags: (appId: string, id: string, data: string[], params: RequestParams = {}) =>
            this.request<Rule, void>({
                path: `/api/v2/assets/${appId}/rule/${id}/tags`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags rule
         * @name RuleControllerGetAssetsByName
         * @summary Get assets by name and type for the given application
         * @request GET:/api/v2/assets/{appId}/rule/application/get-by-name
         */
        ruleControllerGetAssetsByName: (
            appId: string,
            query?: {
                name?: string
                populate?: 'parent'[]
            },
            params: RequestParams = {}
        ) =>
            this.request<Rule[], any>({
                path: `/api/v2/assets/${appId}/rule/application/get-by-name`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerFindAllTableData
         * @summary Get datasets UI data for the given application
         * @request GET:/api/v2/assets/{appId}/dataset/application/table-data
         */
        datasetControllerFindAllTableData: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                groupBy?: object
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<AssetTableEntryDTO[], any>({
                path: `/api/v2/assets/${appId}/dataset/application/table-data`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerFindAll
         * @summary Get datasets for the given application
         * @request GET:/api/v2/assets/{appId}/dataset
         */
        datasetControllerFindAll: (appId: string, params: RequestParams = {}) =>
            this.request<Dataset[], any>({
                path: `/api/v2/assets/${appId}/dataset`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerCreate
         * @summary Create asset
         * @request POST:/api/v2/assets/{appId}/dataset
         */
        datasetControllerCreate: (appId: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<Dataset, any>({
                path: `/api/v2/assets/${appId}/dataset`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerFindAllApplication
         * @summary Get datasets for the given application with parent and tags
         * @request GET:/api/v2/assets/{appId}/dataset/application
         */
        datasetControllerFindAllApplication: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<DatasetWithPopulatedParentAndTags[], any>({
                path: `/api/v2/assets/${appId}/dataset/application`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerFindOne
         * @summary Get dataset with id
         * @request GET:/api/v2/assets/{appId}/dataset/{id}
         */
        datasetControllerFindOne: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<Dataset, void>({
                path: `/api/v2/assets/${appId}/dataset/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerUpdate
         * @summary Update dataset
         * @request PUT:/api/v2/assets/{appId}/dataset/{id}
         */
        datasetControllerUpdate: (appId: string, id: string, data: UpdateAssetDto, params: RequestParams = {}) =>
            this.request<Dataset, void>({
                path: `/api/v2/assets/${appId}/dataset/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerRemove
         * @summary Delete dataset
         * @request DELETE:/api/v2/assets/{appId}/dataset/{id}
         */
        datasetControllerRemove: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v2/assets/${appId}/dataset/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerImport
         * @summary Import datasets
         * @request POST:/api/v2/assets/{appId}/dataset/import
         */
        datasetControllerImport: (appId: string, data: ImportAssetDto, params: RequestParams = {}) =>
            this.request<ImportResponseDto, any>({
                path: `/api/v2/assets/${appId}/dataset/import`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerUpdateParent
         * @summary Update Assets parent
         * @request PUT:/api/v2/assets/{appId}/dataset/{id}/updateParent
         */
        datasetControllerUpdateParent: (
            appId: string,
            id: string,
            data: UpdateAssetParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<Dataset, void>({
                path: `/api/v2/assets/${appId}/dataset/${id}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/dataset/{id}/tags
         */
        datasetControllerUpdateTags: (appId: string, id: string, data: string[], params: RequestParams = {}) =>
            this.request<Dataset, void>({
                path: `/api/v2/assets/${appId}/dataset/${id}/tags`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags dataset
         * @name DatasetControllerGetAssetsByName
         * @summary Get assets by name and type for the given application
         * @request GET:/api/v2/assets/{appId}/dataset/application/get-by-name
         */
        datasetControllerGetAssetsByName: (
            appId: string,
            query?: {
                name?: string
                populate?: 'parent'[]
            },
            params: RequestParams = {}
        ) =>
            this.request<Dataset[], any>({
                path: `/api/v2/assets/${appId}/dataset/application/get-by-name`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerFindAllTableData
         * @summary Get flows UI data for the given application
         * @request GET:/api/v2/assets/{appId}/flow/application/table-data
         */
        flowControllerFindAllTableData: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                groupBy?: object
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<AssetTableEntryDTO[], any>({
                path: `/api/v2/assets/${appId}/flow/application/table-data`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerFindAllBase
         * @summary Get flows for the given application
         * @request GET:/api/v2/assets/{appId}/flow
         */
        flowControllerFindAllBase: (appId: string, params: RequestParams = {}) =>
            this.request<Flow[], any>({
                path: `/api/v2/assets/${appId}/flow`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerCreate
         * @summary Create asset
         * @request POST:/api/v2/assets/{appId}/flow
         */
        flowControllerCreate: (appId: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<Flow, any>({
                path: `/api/v2/assets/${appId}/flow`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerFindAll
         * @summary Get flows for the given application
         * @request GET:/api/v2/assets/{appId}/flow/application
         */
        flowControllerFindAll: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<FlowWithPopulatedParentAndTags[], any>({
                path: `/api/v2/assets/${appId}/flow/application`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerFindOne
         * @summary Get flow with id
         * @request GET:/api/v2/assets/{appId}/flow/{id}
         */
        flowControllerFindOne: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<Flow, void>({
                path: `/api/v2/assets/${appId}/flow/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerUpdate
         * @summary Update flow
         * @request PUT:/api/v2/assets/{appId}/flow/{id}
         */
        flowControllerUpdate: (appId: string, id: string, data: UpdateAssetDto, params: RequestParams = {}) =>
            this.request<Flow, void>({
                path: `/api/v2/assets/${appId}/flow/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerRemove
         * @summary Delete flow
         * @request DELETE:/api/v2/assets/{appId}/flow/{id}
         */
        flowControllerRemove: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v2/assets/${appId}/flow/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerFindReferencing
         * @summary Get flows referencing the given flow
         * @request GET:/api/v2/assets/{appId}/flow/{id}/referencing
         */
        flowControllerFindReferencing: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<Flow[], void>({
                path: `/api/v2/assets/${appId}/flow/${id}/referencing`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerImport
         * @summary Import Flows
         * @request POST:/api/v2/assets/{appId}/flow/import
         */
        flowControllerImport: (appId: string, data: ImportAssetDto, params: RequestParams = {}) =>
            this.request<ImportResponseDto, any>({
                path: `/api/v2/assets/${appId}/flow/import`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerUpdateParent
         * @summary Update Assets parent
         * @request PUT:/api/v2/assets/{appId}/flow/{id}/updateParent
         */
        flowControllerUpdateParent: (
            appId: string,
            id: string,
            data: UpdateAssetParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<Flow, void>({
                path: `/api/v2/assets/${appId}/flow/${id}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/flow/{id}/tags
         */
        flowControllerUpdateTags: (appId: string, id: string, data: string[], params: RequestParams = {}) =>
            this.request<Flow, void>({
                path: `/api/v2/assets/${appId}/flow/${id}/tags`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags flow
         * @name FlowControllerGetAssetsByName
         * @summary Get assets by name and type for the given application
         * @request GET:/api/v2/assets/{appId}/flow/application/get-by-name
         */
        flowControllerGetAssetsByName: (
            appId: string,
            query?: {
                name?: string
                populate?: 'parent'[]
            },
            params: RequestParams = {}
        ) =>
            this.request<Flow[], any>({
                path: `/api/v2/assets/${appId}/flow/application/get-by-name`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerFindAllTableData
         * @summary Get run templates UI data for the given application
         * @request GET:/api/v2/assets/{appId}/run-template/application/table-data
         */
        runTemplateControllerFindAllTableData: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                groupBy?: object
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<AssetTableEntryDTO[], any>({
                path: `/api/v2/assets/${appId}/run-template/application/table-data`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerFindAllBase
         * @summary Get run templates for the given application
         * @request GET:/api/v2/assets/{appId}/run-template
         */
        runTemplateControllerFindAllBase: (appId: string, params: RequestParams = {}) =>
            this.request<RunTemplate[], any>({
                path: `/api/v2/assets/${appId}/run-template`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerCreate
         * @summary Create Run Template
         * @request POST:/api/v2/assets/{appId}/run-template
         */
        runTemplateControllerCreate: (appId: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<RunTemplate, any>({
                path: `/api/v2/assets/${appId}/run-template`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerFindAll
         * @summary Get run templates for the given application
         * @request GET:/api/v2/assets/{appId}/run-template/application
         */
        runTemplateControllerFindAll: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<RunTemplateWithPopulatedParentAndTags[], any>({
                path: `/api/v2/assets/${appId}/run-template/application`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerFindOne
         * @summary Get runTemplate with id
         * @request GET:/api/v2/assets/{appId}/run-template/{id}
         */
        runTemplateControllerFindOne: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<RunTemplate, void>({
                path: `/api/v2/assets/${appId}/run-template/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerUpdate
         * @summary Update Run Template
         * @request PUT:/api/v2/assets/{appId}/run-template/{id}
         */
        runTemplateControllerUpdate: (appId: string, id: string, data: UpdateAssetDto, params: RequestParams = {}) =>
            this.request<RunTemplate, void>({
                path: `/api/v2/assets/${appId}/run-template/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerRemove
         * @summary Delete Run Template
         * @request DELETE:/api/v2/assets/{appId}/run-template/{id}
         */
        runTemplateControllerRemove: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v2/assets/${appId}/run-template/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerUpdateParent
         * @summary Update Assets parent
         * @request PUT:/api/v2/assets/{appId}/run-template/{id}/updateParent
         */
        runTemplateControllerUpdateParent: (
            appId: string,
            id: string,
            data: UpdateAssetParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<RunTemplate, void>({
                path: `/api/v2/assets/${appId}/run-template/${id}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/run-template/{id}/tags
         */
        runTemplateControllerUpdateTags: (appId: string, id: string, data: string[], params: RequestParams = {}) =>
            this.request<RunTemplate, void>({
                path: `/api/v2/assets/${appId}/run-template/${id}/tags`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run-template
         * @name RunTemplateControllerGetAssetsByName
         * @summary Get assets by name and type for the given application
         * @request GET:/api/v2/assets/{appId}/run-template/application/get-by-name
         */
        runTemplateControllerGetAssetsByName: (
            appId: string,
            query?: {
                name?: string
                populate?: 'parent'[]
            },
            params: RequestParams = {}
        ) =>
            this.request<RunTemplate[], any>({
                path: `/api/v2/assets/${appId}/run-template/application/get-by-name`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerFindAllTableData
         * @summary Get formspec UI data for the given application
         * @request GET:/api/v2/assets/{appId}/form-spec/application/table-data
         */
        formSpecControllerFindAllTableData: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                groupBy?: object
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<AssetTableEntryDTO[], any>({
                path: `/api/v2/assets/${appId}/form-spec/application/table-data`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerFindAllBase
         * @summary Get formspecs for the given application
         * @request GET:/api/v2/assets/{appId}/form-spec
         */
        formSpecControllerFindAllBase: (appId: string, params: RequestParams = {}) =>
            this.request<FormSpec[], any>({
                path: `/api/v2/assets/${appId}/form-spec`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerCreate
         * @summary Create Form Spec
         * @request POST:/api/v2/assets/{appId}/form-spec
         */
        formSpecControllerCreate: (appId: string, data: CreateAssetDto, params: RequestParams = {}) =>
            this.request<FormSpec, any>({
                path: `/api/v2/assets/${appId}/form-spec`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerFindAll
         * @summary Get formspecs for the given application
         * @request GET:/api/v2/assets/{appId}/form-spec/application
         */
        formSpecControllerFindAll: (
            appId: string,
            query?: {
                filters?: AssetsFilterDTO
                sort?: 'parent' | 'name' | 'status' | 'location' | 'link-rule' | 'rule_type'
            },
            params: RequestParams = {}
        ) =>
            this.request<FormSpecWithPopulatedParentAndTags[], any>({
                path: `/api/v2/assets/${appId}/form-spec/application`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerFindOne
         * @summary Get form specs with id
         * @request GET:/api/v2/assets/{appId}/form-spec/{id}
         */
        formSpecControllerFindOne: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<FormSpec, void>({
                path: `/api/v2/assets/${appId}/form-spec/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerUpdate
         * @summary Update Form Spec
         * @request PUT:/api/v2/assets/{appId}/form-spec/{id}
         */
        formSpecControllerUpdate: (appId: string, id: string, data: UpdateAssetDto, params: RequestParams = {}) =>
            this.request<FormSpec, void>({
                path: `/api/v2/assets/${appId}/form-spec/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerRemove
         * @summary Delete Form Spec
         * @request DELETE:/api/v2/assets/{appId}/form-spec/{id}
         */
        formSpecControllerRemove: (appId: string, id: string, params: RequestParams = {}) =>
            this.request<string, void>({
                path: `/api/v2/assets/${appId}/form-spec/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerUpdateParent
         * @summary Update Assets parent
         * @request PUT:/api/v2/assets/{appId}/form-spec/{id}/updateParent
         */
        formSpecControllerUpdateParent: (
            appId: string,
            id: string,
            data: UpdateAssetParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<FormSpec, void>({
                path: `/api/v2/assets/${appId}/form-spec/${id}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerUpdateTags
         * @summary Update assets tags
         * @request PUT:/api/v2/assets/{appId}/form-spec/{id}/tags
         */
        formSpecControllerUpdateTags: (appId: string, id: string, data: string[], params: RequestParams = {}) =>
            this.request<FormSpec, void>({
                path: `/api/v2/assets/${appId}/form-spec/${id}/tags`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags formspec
         * @name FormSpecControllerGetAssetsByName
         * @summary Get assets by name and type for the given application
         * @request GET:/api/v2/assets/{appId}/form-spec/application/get-by-name
         */
        formSpecControllerGetAssetsByName: (
            appId: string,
            query?: {
                name?: string
                populate?: 'parent'[]
            },
            params: RequestParams = {}
        ) =>
            this.request<FormSpec[], any>({
                path: `/api/v2/assets/${appId}/form-spec/application/get-by-name`,
                method: 'GET',
                query: query,
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
            this.request<TransformedUser, any>({
                path: `/api/v2/auth/whoami`,
                method: 'GET',
                format: 'json',
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
         * @tags run
         * @name RunsControllerGetRuns
         * @request GET:/api/v2/run
         */
        runsControllerGetRuns: (params: RequestParams = {}) =>
            this.request<Run[], any>({
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
        runsControllerGetVariantRuns: (
            id: string,
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
            },
            params: RequestParams = {}
        ) =>
            this.request<PaginatedRunDTO, any>({
                path: `/api/v2/run/${id}`,
                method: 'GET',
                query: query,
                format: 'json',
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
         * @name RunsControllerRunStopped
         * @request POST:/api/v2/run/{runId}/stopComplete
         */
        runsControllerRunStopped: (runId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/stopComplete`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags run
         * @name RunsControllerPauseRun
         * @request POST:/api/v2/run/{runId}/{command}
         */
        runsControllerPauseRun: (runId: string, command: 'pause' | 'resume' | 'stop', params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/run/${runId}/${command}`,
                method: 'POST',
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
         * @request GET:/api/v2/run/{runId}/status/{appId}
         */
        runsStatusControllerGetStatus: (appId: string, runId: string, params: RequestParams = {}) =>
            this.request<Run, any>({
                path: `/api/v2/run/${runId}/status/${appId}`,
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
        runsStatusControllerUpdateStatus: (id: string, data: UpdateRunStatusDto, params: RequestParams = {}) =>
            this.request<Run, any>({
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
        runsWorkQueueControllerUpdate: (runId: string, data: UpdateWorkQueueDTO, params: RequestParams = {}) =>
            this.request<RunWorkQueue, any>({
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
         * @tags runs
         * @name RunsLogControllerV2GetRun
         * @request GET:/api/v2/runs/{id}/run/{runNumber}
         */
        runsLogControllerV2GetRun: (id: string, runNumber: string, params: RequestParams = {}) =>
            this.request<Run, any>({
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
         * @summary Get the logs for the given run
         * @request GET:/api/v2/runs/{id}/log/{runNumber}
         */
        runsLogControllerV2GetRunLog: (
            id: string,
            runNumber: string,
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                /** String sort */
                sort?: string
                /** Only include results from a specific log type */
                type?: object
            },
            params: RequestParams = {}
        ) =>
            this.request<LogWithCount, any>({
                path: `/api/v2/runs/${id}/log/${runNumber}`,
                method: 'GET',
                query: query,
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
            this.request<StartRunSuccessResponseDTO, void>({
                path: `/api/v2/start/variant/${id}`,
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
         * @name VariantControllerGetVariants
         * @request GET:/api/v2/variants
         */
        variantControllerGetVariants: (params: RequestParams = {}) =>
            this.request<TransformedVariantDtos, any>({
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
            this.request<VariantDto, any>({
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
            this.request<VariantDto, any>({
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
            this.request<VariantDto, any>({
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
            this.request<TransformedWorkspaceDto, any>({
                path: `/api/v2/variants/${id}/workspace`,
                method: 'GET',
                format: 'json',
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
         * @name ModelControllerGet
         * @request GET:/api/v2/variants/{appId}/model
         */
        modelControllerGet: (
            appId: string,
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
            },
            params: RequestParams = {}
        ) =>
            this.request<ApplicationModelDTO, any>({
                path: `/api/v2/variants/${appId}/model`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerDelete
         * @request DELETE:/api/v2/variants/{appId}/model
         */
        modelControllerDelete: (appId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${appId}/model`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerGetComponent
         * @summary Get a specific component from the application model
         * @request GET:/api/v2/variants/{appId}/model/components/{compId}
         */
        modelControllerGetComponent: (appId: string, compId: string, params: RequestParams = {}) =>
            this.request<ApplicationComponent, void>({
                path: `/api/v2/variants/${appId}/model/components/${compId}`,
                method: 'GET',
                format: 'json',
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
         * @name ModelControllerApplyUpdates
         * @request POST:/api/v2/variants/{appId}/model/update
         */
        modelControllerApplyUpdates: (
            appId: string,
            data: ApplicationModelUpdateRequestDTO,
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/variants/${appId}/model/update`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerSavePageModel
         * @summary Save a page model
         * @request POST:/api/v2/variants/{appId}/model/pages
         */
        modelControllerSavePageModel: (appId: string, data: CreatePageModelDTO, params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/api/v2/variants/${appId}/model/pages`,
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
         * @name ModelControllerListPageModels
         * @summary List page models for a variant
         * @request GET:/api/v2/variants/{appId}/model/pages
         */
        modelControllerListPageModels: (
            appId: string,
            query?: {
                /** Filter by run id */
                runId?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<PageModelDto[], any>({
                path: `/api/v2/variants/${appId}/model/pages`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerGetPageModel
         * @summary Get the model for a page
         * @request GET:/api/v2/variants/{appId}/model/pages/{modelIdKind}/{id}/model
         */
        modelControllerGetPageModel: (
            appId: string,
            modelIdKind: 'page-component' | 'page-model',
            id: string,
            params: RequestParams = {}
        ) =>
            this.request<string, void>({
                path: `/api/v2/variants/${appId}/model/pages/${modelIdKind}/${id}/model`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags variants
         * @name ModelControllerRemoveModel
         * @request DELETE:/api/v2/variants/{id}/model/remove-model
         */
        modelControllerRemoveModel: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/variants/${id}/model/remove-model`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags permissions
         * @name PermissionControllerGetPermissions
         * @summary Get permissions
         * @request GET:/api/v2/permissions
         * @deprecated
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
            this.request<PermissionResponse | InvitedUserPermissionDto, any>({
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
         * @deprecated
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
         * @tags usage
         * @name UsageControllerGetWorkspaceUsage
         * @request GET:/api/v2/usage/{id}
         */
        usageControllerGetWorkspaceUsage: (
            id: string,
            query?: {
                /** @format date-time */
                date?: string
                runId?: string
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                populate?: ('runId' | 'workspaceId')[]
            },
            params: RequestParams = {}
        ) =>
            this.request<UsageDto[], any>({
                path: `/api/v2/usage/${id}`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags usage
         * @name UsageControllerCreateWorkspace
         * @request POST:/api/v2/usage/{id}
         */
        usageControllerCreateWorkspace: (id: string, data: CreateUsageDto, params: RequestParams = {}) =>
            this.request<UsageDto, any>({
                path: `/api/v2/usage/${id}`,
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
         * @name AnalyticsControllerGetRunRuleStatistics
         * @summary Get rule statistics for a run
         * @request GET:/api/v2/analytics/app/{appId}/run/{runId}
         */
        analyticsControllerGetRunRuleStatistics: (
            appId: string,
            runId: string,
            query: {
                /** Only include results from a specific run, or a set of runs */
                runId?: string | string[]
                /** Filter for one or more rules by id */
                ruleId?: string | string[]
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
                    | 'Table Body'
                    | 'Table Footer'
                    | 'Table Row'
                    | 'Table Header Cell'
                    | 'Table Data Cell'
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
                    | 'Image'
                    | 'Icon'
                    | 'Grid'
                    | 'Grid Item'
                    | 'List'
                    | 'List Item'
                    | 'Unclassified'
                /** The fields to group by */
                groupBy: string[]
                /**
                 * Populate certain fields by joining with other collections.
                 *
                 * Values in this list must be a subset of `groupBy`, and can only
                 * apply to id fields. Instead of containing
                 * an ObjectId, populated fields will contain the document the id
                 * refers to.
                 */
                populate?: string[]
            },
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, void>({
                path: `/api/v2/analytics/app/${appId}/run/${runId}`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags analytics
         * @name AnalyticsControllerGetComponentRuleStatistics
         * @summary Get rule statistics for all components in an application
         * @request GET:/api/v2/analytics/app/{appId}/components
         */
        analyticsControllerGetComponentRuleStatistics: (
            appId: string,
            query: {
                /** Only include results from a specific run, or a set of runs */
                runId?: string | string[]
                /** Filter for one or more rules by id */
                ruleId?: string | string[]
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
                    | 'Table Body'
                    | 'Table Footer'
                    | 'Table Row'
                    | 'Table Header Cell'
                    | 'Table Data Cell'
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
                    | 'Image'
                    | 'Icon'
                    | 'Grid'
                    | 'Grid Item'
                    | 'List'
                    | 'List Item'
                    | 'Unclassified'
                /** The fields to group by */
                groupBy: string[]
                /**
                 * Populate certain fields by joining with other collections.
                 *
                 * Values in this list must be a subset of `groupBy`, and can only
                 * apply to id fields. Instead of containing
                 * an ObjectId, populated fields will contain the document the id
                 * refers to.
                 */
                populate?: string[]
            },
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, any>({
                path: `/api/v2/analytics/app/${appId}/components`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags analytics
         * @name AnalyticsControllerGetPageRuleStatistics
         * @summary Get rule statistics for all components in an application
         * @request GET:/api/v2/analytics/app/{appId}/pages
         */
        analyticsControllerGetPageRuleStatistics: (
            appId: string,
            query: {
                /** Only include results from a specific run, or a set of runs */
                runId?: string | string[]
                /** Filter for one or more rules by id */
                ruleId?: string | string[]
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
                    | 'Table Body'
                    | 'Table Footer'
                    | 'Table Row'
                    | 'Table Header Cell'
                    | 'Table Data Cell'
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
                    | 'Image'
                    | 'Icon'
                    | 'Grid'
                    | 'Grid Item'
                    | 'List'
                    | 'List Item'
                    | 'Unclassified'
                /** The fields to group by */
                groupBy: string[]
                /**
                 * Populate certain fields by joining with other collections.
                 *
                 * Values in this list must be a subset of `groupBy`, and can only
                 * apply to id fields. Instead of containing
                 * an ObjectId, populated fields will contain the document the id
                 * refers to.
                 */
                populate?: string[]
            },
            params: RequestParams = {}
        ) =>
            this.request<AnalyticsResultsDTO, any>({
                path: `/api/v2/analytics/app/${appId}/pages`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get page performance statistics
         *
         * @tags analytics
         * @name AnalyticsControllerGetPagePerformanceStatistics
         * @request GET:/api/v2/analytics/app/{appId}/pages/performance
         */
        analyticsControllerGetPagePerformanceStatistics: (
            appId: string,
            query?: {
                /**
                 * Only include statistics from a specific run
                 * @example "6503740ca17807e0a04c3309"
                 */
                runId?: string
                /**
                 * Only include statistics from a specific page
                 * @example "8f09118a-b57a-4c5f-b592-45cc9f114e2b"
                 */
                pageId?: string
                /** Forcibly re-build analytics data for the specified run. Avoid this when possible because its expensive. */
                forceRebuild?: boolean
            },
            params: RequestParams = {}
        ) =>
            this.request<PerformanceResultsDTO, any>({
                path: `/api/v2/analytics/app/${appId}/pages/performance`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags file
         * @name FileControllerUpload
         * @summary Upload file
         * @request POST:/api/v2/file/{appId}
         */
        fileControllerUpload: (
            appId: string,
            query: {
                key: string
            },
            data: {
                /** @format binary */
                file?: File
            },
            params: RequestParams = {}
        ) =>
            this.request<void, any>({
                path: `/api/v2/file/${appId}`,
                method: 'POST',
                query: query,
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags file
         * @name FileControllerGetFile
         * @summary Get file by key
         * @request GET:/api/v2/file/{appId}
         */
        fileControllerGetFile: (
            appId: string,
            query: {
                /** File key to retrieve */
                key: string
            },
            params: RequestParams = {}
        ) =>
            this.request<StreamableFile, void>({
                path: `/api/v2/file/${appId}`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags file
         * @name FileControllerUpdateKey
         * @summary Update file key
         * @request PUT:/api/v2/file/{appId}/{key}
         */
        fileControllerUpdateKey: (appId: string, key: string, data: UpdateKeyDto, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/file/${appId}/${key}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags file
         * @name FileControllerRemove
         * @summary Remove specific file
         * @request DELETE:/api/v2/file/{appId}/{key}
         */
        fileControllerRemove: (appId: string, key: string, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/api/v2/file/${appId}/${key}`,
                method: 'DELETE',
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
            this.request<TransformedTagDTOS, any>({
                path: `/api/v2/tags`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerGetAppTags
         * @summary Get applications tag with application id
         * @request GET:/api/v2/tags/{id}
         */
        tagsControllerGetAppTags: (id: string, params: RequestParams = {}) =>
            this.request<TransformedTagWithPopulatedParentDTOS, any>({
                path: `/api/v2/tags/${id}`,
                method: 'GET',
                format: 'json',
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
            this.request<TransformedTagDTO, any>({
                path: `/api/v2/tags/${id}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerUpdateTag
         * @request PUT:/api/v2/tags/{id}/update
         */
        tagsControllerUpdateTag: (id: string, data: UpdateTagDto, params: RequestParams = {}) =>
            this.request<TransformedTagDTO, any>({
                path: `/api/v2/tags/${id}/update`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags tags
         * @name TagsControllerUpdateParent
         * @summary Update Tags parent
         * @request PUT:/api/v2/tags/{appId}/{tagId}/updateParent
         */
        tagsControllerUpdateParent: (
            appId: string,
            tagId: string,
            data: UpdateTagParentDTO,
            params: RequestParams = {}
        ) =>
            this.request<TransformedTagWithPopulatedParentDTO, void>({
                path: `/api/v2/tags/${appId}/${tagId}/updateParent`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
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
            this.request<TransformedTagDTO, any>({
                path: `/api/v2/tags/${id}/${tagId}`,
                method: 'DELETE',
                format: 'json',
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
        applicationControllerGetApplications: (
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                /** Filter by workspace status */
                status?: {
                    $eq?: 'active' | 'inactive' | 'expired'
                    $ne?: 'active' | 'inactive' | 'expired'
                }
            },
            params: RequestParams = {}
        ) =>
            this.request<TransformedApplicationDtos, any>({
                path: `/api/v2/applications`,
                method: 'GET',
                query: query,
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
            this.request<TransformedApplicationDto, any>({
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
            this.request<TransformedApplicationDto, any>({
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
            this.request<TransformedApplicationDto, any>({
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
        applicationControllerGetApplicationWithParent: (
            id: string,
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                /** Filter by workspace status */
                status?: {
                    $eq?: 'active' | 'inactive' | 'expired'
                    $ne?: 'active' | 'inactive' | 'expired'
                }
            },
            params: RequestParams = {}
        ) =>
            this.request<TransformedApplicationDtos, any>({
                path: `/api/v2/applications/parent/${id}`,
                method: 'GET',
                query: query,
                format: 'json',
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
         * @tags health
         * @name HealthControllerGetInfo
         * @request GET:/api/v2/health/info
         */
        healthControllerGetInfo: (params: RequestParams = {}) =>
            this.request<FormData, any>({
                path: `/api/v2/health/info`,
                method: 'GET',
                format: 'json',
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
         * @description Creates a new Personal Access Token (PAT) for the user making this request.
         *
         * @tags users
         * @name UserControllerCreatePat
         * @summary Create a new PAT.
         * @request POST:/api/v2/users/pat
         */
        userControllerCreatePat: (data: CreatePatDTO, params: RequestParams = {}) =>
            this.request<TransformedCreatePatResponseDTO, any>({
                path: `/api/v2/users/pat`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
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
            this.request<TransformedPatDTOS, any>({
                path: `/api/v2/users/pat`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UserControllerGetAllPaTs
         * @summary Get all PATs. This endpoint is only enabled for admins
         * @request GET:/api/v2/users/pats
         */
        userControllerGetAllPaTs: (params: RequestParams = {}) =>
            this.request<TransformedPatDTOS, any>({
                path: `/api/v2/users/pats`,
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
            this.request<TransformedPatDTO, any>({
                path: `/api/v2/users/pat/${id}`,
                method: 'DELETE',
                format: 'json',
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
        userControllerGetUsers: (
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                text?: string
                workspaces?: boolean
                /** Filter by user status */
                status?: {
                    $eq?: 'active' | 'inactive' | 'waitlisted'
                    $in?: 'active' | 'inactive' | 'waitlisted'
                    $regex?: 'active' | 'inactive' | 'waitlisted'
                    $ne?: 'active' | 'inactive' | 'waitlisted'
                }
            },
            params: RequestParams = {}
        ) =>
            this.request<PaginatedUserDto, any>({
                path: `/api/v2/users`,
                method: 'GET',
                query: query,
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
            this.request<UserDto, any>({
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
            this.request<UserDto, any>({
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
            this.request<UserDto, any>({
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
            this.request<UserDto, any>({
                path: `/api/v2/users/deactivateUser/${id}`,
                method: 'POST',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags workspace
         * @name WorkspaceControllerGetWorkspaces
         * @request GET:/api/v2/workspace
         */
        workspaceControllerGetWorkspaces: (
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                /** Filter by workspace plan */
                plan?: {
                    $eq?: 'Free' | 'Plus' | 'Pro' | 'Enterprise' | 'Unlimited'
                    $ne?: 'Free' | 'Plus' | 'Pro' | 'Enterprise' | 'Unlimited'
                }
                /** Filter by workspace status */
                status?: {
                    $eq?: 'active' | 'inactive' | 'expired'
                    $ne?: 'active' | 'inactive' | 'expired'
                }
            },
            params: RequestParams = {}
        ) =>
            this.request<TransformedWorkspaceDtos, any>({
                path: `/api/v2/workspace`,
                method: 'GET',
                query: query,
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
            this.request<TransformedWorkspaceDto, any>({
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
            this.request<TransformedWorkspaceDto, any>({
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
         * @description Delete a workspace. Deprecated, use DELETE /entities/:entityId
         *
         * @tags workspace
         * @name WorkspaceControllerDeleteWorkspace
         * @request DELETE:/api/v2/workspace/{id}
         * @deprecated
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
         * @tags workspace
         * @name WorkspaceControllerUpdateWorkspacePlan
         * @request POST:/api/v2/workspace/{wsId}/update-workspace-plan
         */
        workspaceControllerUpdateWorkspacePlan: (
            wsId: string,
            data: UpdateWorkspacePlanDto,
            params: RequestParams = {}
        ) =>
            this.request<TransformedDefaultResponseDto, any>({
                path: `/api/v2/workspace/${wsId}/update-workspace-plan`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags invite-user
         * @name InviteUserControllerGetInvites
         * @summary Get invitations
         * @request GET:/api/v2/invite-user
         */
        inviteUserControllerGetInvites: (
            query?: {
                /**
                 * @min 1
                 * @default 50
                 */
                limit?: number
                /** @min 0 */
                offset?: number
                text?: string
                /** Filter by invitation status */
                status?: {
                    $eq?: 'pending' | 'accepted'
                    $ne?: 'pending' | 'accepted'
                }
                /** Filter by role type */
                role?: {
                    $eq?: 0 | 1 | 2 | 3 | 4 | 5
                    $ne?: 0 | 1 | 2 | 3 | 4 | 5
                }
            },
            params: RequestParams = {}
        ) =>
            this.request<TransformedInviteUserDTOS[], any>({
                path: `/api/v2/invite-user`,
                method: 'GET',
                query: query,
                format: 'json',
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
            this.request<InviteUserDTO, any>({
                path: `/api/v2/invite-user`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
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
         * @name InstanceEntityControllerGetSystemsEntity
         * @summary Get systems's entity
         * @request GET:/api/v2/entities/system
         */
        instanceEntityControllerGetSystemsEntity: (params: RequestParams = {}) =>
            this.request<EntityResponse, any>({
                path: `/api/v2/entities/system`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags entities
         * @name InstanceEntityControllerGetEntitysChildren
         * @summary Get entity's children
         * @request GET:/api/v2/entities/{id}/children
         */
        instanceEntityControllerGetEntitysChildren: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/entities/${id}/children`,
                method: 'GET',
                ...params,
            }),

        /**
         * No description
         *
         * @tags entities
         * @name InstanceEntityControllerRemoveEntity
         * @summary Remove entity and it's children
         * @request DELETE:/api/v2/entities/{id}
         */
        instanceEntityControllerRemoveEntity: (id: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/entities/${id}`,
                method: 'DELETE',
                ...params,
            }),

        /**
         * No description
         *
         * @tags subscription
         * @name SubscriptionControllerManageSubscriptions
         * @request POST:/api/v2/subscription/manage-subscriptions
         */
        subscriptionControllerManageSubscriptions: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/subscription/manage-subscriptions`,
                method: 'POST',
                ...params,
            }),

        /**
         * No description
         *
         * @tags view
         * @name ViewControllerGetViews
         * @request GET:/api/v2/view/{parentId}
         */
        viewControllerGetViews: (
            parentId: string,
            query?: {
                /** The url the view should be displayed */
                url?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<ViewDTO[], any>({
                path: `/api/v2/view/${parentId}`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags view
         * @name ViewControllerCreateView
         * @request POST:/api/v2/view/{parentId}
         */
        viewControllerCreateView: (parentId: string, data: CreateViewDTO, params: RequestParams = {}) =>
            this.request<ViewDTO, any>({
                path: `/api/v2/view/${parentId}`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags view
         * @name ViewControllerUpdateView
         * @request PUT:/api/v2/view/{parentId}/{viewId}
         */
        viewControllerUpdateView: (parentId: string, viewId: string, data: UpdateViewDTO, params: RequestParams = {}) =>
            this.request<ViewDTO, any>({
                path: `/api/v2/view/${parentId}/${viewId}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags view
         * @name ViewControllerDeleteView
         * @request DELETE:/api/v2/view/{parentId}/{viewId}
         */
        viewControllerDeleteView: (parentId: string, viewId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/v2/view/${parentId}/${viewId}`,
                method: 'DELETE',
                ...params,
            }),
    }
}
