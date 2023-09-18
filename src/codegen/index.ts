import fetch from 'cross-fetch'
import deepmerge from 'deepmerge'
import { ActionInputs } from '../inputs'
import {
    Api as ApiInternal,
    StartRunRequestDTO,
    type RequestParams,
} from './api'
import { PaginationParams } from './types'

type ApiKeyData = Pick<ActionInputs, 'apiKey' | 'apiKeyId'>

export class Api {
    private readonly _api: ApiInternal<ApiKeyData>
    private readonly inputs: ActionInputs

    constructor(inputs: ActionInputs) {
        this.authParams = this.authParams.bind(this)
        this.inputs = inputs
        this._api = new ApiInternal({
            baseUrl: inputs.repositoryUrl,
            securityWorker: this.authParams,
            customFetch: fetch,
        })
        const { apiKey, apiKeyId } = inputs
        this._api.setSecurityData({ apiKey, apiKeyId })
    }

    public async getApplication(id: string = this.inputs.application) {
        const res = await this._api.api.applicationControllerGetApplication(
            id,
            { secure: true }
        )
        return res.data
    }

    public async getVariant(applicationId: string) {
        const res: any = await this._api.api.variantControllerGetVariant(applicationId, { secure: true })
        return res
    }

    /**
     *
     * @param variantId
     * @returns The ID of the started run
     */
    public async startRun(variantId = this.inputs.variant): Promise<string> {
        const paramsFromRunTemplate =
            await this._api.api.assetsControllerFindOne(
                this.inputs.application,
                'run_parameter',
                this.inputs.runTemplate,
                { secure: true }
            )
        const params = deepmerge(
            (
                paramsFromRunTemplate.data.resource as {
                    data: StartRunRequestDTO['parameters']
                }
            ).data,
            this.inputs.parameters
        )
        const body: StartRunRequestDTO = {
            runOn: 'server',
            applicationId: this.inputs.application,
            parametersId: this.inputs.runTemplate,
            parameters: params,
            workQueue: [],
            runId: null,
            runNumber: null,
            driverId: null,
            agentId: null,
            user: null,
        } as any

        const res = await this._api.api.startRunControllerStartRun(
            variantId,
            body,
            { secure: true }
        )
        const data: unknown = res.data
        if (typeof data != 'object' && !data)
            throw new TypeError(
                `Missing or invalid data returned from start run; expected an object but got ${typeof data}`
            )

        const runId = (data as Record<string, unknown>)['runId']
        if (typeof runId !== 'string')
            throw new TypeError(
                `Start run response is missing a run id, or returned an invalid on. Expected a string, got ${typeof runId}`
            )

        return runId
    }

    public async getRunLogs(
        runId: string,
        params: PaginationParams = {},
        applicationId = this.inputs.application
    ) {
        const requestParams = { ...params, secure: true }
        const res = await this._api.api.runsLogControllerV2GetRunLog(
            applicationId,
            runId,
            requestParams
        )
        return res.data
    }

    public async getRunStatus(runId: string) {
        const res = await this._api.api.runsStatusControllerGetStatus(runId)
        return res.data
    }

    private authParams(authData: ApiKeyData | null): RequestParams {
        if (!authData) return {}
        const { apiKeyId, apiKey } = authData
        const token = btoa(`${apiKeyId}:${apiKey}`)
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    }
}
