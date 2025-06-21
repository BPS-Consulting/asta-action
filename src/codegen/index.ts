import fetch from 'cross-fetch'
import { Inputs } from '../inputs'
import {
    Api as ApiInternal,
    StartRunRequestDTO,
    type RequestParams,
} from './api'
import { PaginationParams } from './types'

type ApiKeyData = Pick<Inputs, 'pat'>

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
        this._api.setSecurityData({ pat: inputs.pat })
    }

    public async getVariant(variantId = this.inputs.variantId) {
        const res: any = await this._api.api.variantControllerGetVariant(
            variantId,
            { secure: true }
        )
        return res
    }

    public async whoami() {
        const res = await this._api.api.authControllerGetPermissions({
            secure: true,
        })
        return res
    }

    /**
     *
     * @param variantId
     * @returns The ID of the started run
     */
    public async startRun(variantId = this.inputs.variantId): Promise<string> {
        const { parameters } = this.inputs

        console.log(`Getting parameters from run template ${parameters}`)
        const runParameters =
            typeof parameters === 'string'
                ? (
                      await this._api.api.runTemplateControllerFindOne(
                          variantId,
                          parameters,
                          { secure: true }
                      )
                  ).data.data
                : parameters

        if (typeof parameters === 'string' && !(runParameters as any).name) {
            ;(runParameters as any).name = `run-${parameters}`
        }

        const body: StartRunRequestDTO = {
            parameters: runParameters as any, //TODO: fix this
        }
        console.log(`Start run request:\n${JSON.stringify(body, null, 2)}`)

        const res = await this._api.api.startRunControllerStartRun(
            variantId,
            body,
            { secure: true }
        )
        console.log(`Start run response: ${JSON.stringify(res, null, 2)}`)
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
        variantId = this.inputs.variantId
    ) {
        const requestParams = { query: params, secure: true }
        const res = await this._api.api.runsLogControllerV2GetRunLog(
            variantId,
            runId,
            requestParams.query,
            requestParams
        )
        return res.data
    }

    public async getRunStatus(variantId: string, runId: string) {
        const res = await this._api.api.runsStatusControllerGetStatus(
            variantId,
            runId,
            { secure: true }
        )
        return res.data
    }

    private authParams(authData: ApiKeyData | null): RequestParams {
        if (!authData) return {}
        const { pat } = authData

        return {
            headers: {
                Authorization: `Bearer ${pat}`,
            },
        }
    }
}
