import fetch from 'cross-fetch'
import deepmerge from 'deepmerge'
import { Inputs } from '../inputs'
import {
    Api as ApiInternal,
    RunTemplateData,
    StartRunRequestDTO,
    type RequestParams,
} from './api'
import { PaginationParams } from './types'

type ApiKeyData = Pick<Inputs, 'apiKey' | 'apiKeyId'>

export class Api {
    private readonly _api: ApiInternal<ApiKeyData>
    private readonly inputs: Inputs

    constructor(inputs: Inputs) {
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

    public async getApplication(variantId: string = this.inputs.application) {
        const res = await this._api.api.applicationControllerGetApplication(
            variantId,
            { secure: true }
        )
        return res.data
    }

    public async getVariant(variantId = this.inputs.variant) {
        const res: any = await this._api.api.variantControllerGetVariant(
            variantId,
            { secure: true }
        )
        return res
    }

    /**
     *
     * @param variantId
     * @returns The ID of the started run
     */
    public async startRun(variantId = this.inputs.variant): Promise<string> {
        const {
            runTemplate,
            application,
            parameters: parameterOverrides,
        } = this.inputs

        console.log(`Getting parameters from run template ${runTemplate}`)
        const paramsFromRunTemplate = await this._api.api.runTemplateControllerFindOne(application, runTemplate, { secure: true })
        const params = deepmerge<RunTemplateData, typeof parameterOverrides>(
            paramsFromRunTemplate.data.data,
            parameterOverrides
        )
        const body: StartRunRequestDTO = {
            runOn: 'server',
            // applicationId: application,
            applicationId: variantId,
            parametersId: null,
            parameters: params,
            workQueue: [],
            runId: null,
            runNumber: null,
            driverId: null,
            agentId: null,
            user: null,
        } as any
        console.log(`Start run request:\n${JSON.stringify(body, null, 2)}`)

        const res = await this._api.api.startRunControllerStartRun(
            variantId,
            body,
            { secure: true }
        )
        const data: unknown = res.data
        if (typeof data !== 'object' && !data)
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

    public async stopRun(runId: string) {
        await this._api.api.runsControllerPauseRun(runId, 'stop', {
            secure: true,
        })
    }

    public async getRunLogs(
        runId: string,
        params: PaginationParams = {},
        applicationId = this.inputs.variant
    ) {
        const requestParams = { query: params, secure: true }
        const res = await this._api.api.runsLogControllerV2GetRunLog(
            applicationId,
            runId,
            requestParams.query,
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
