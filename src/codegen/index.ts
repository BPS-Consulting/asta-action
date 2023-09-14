import fetch from 'cross-fetch'
import { ActionInputs } from '../inputs'
import { Api as ApiInternal, type RequestParams } from './api'

type ApiKeyData = Pick<ActionInputs, 'apiKey' | 'apiKeyId'>

export class Api {
    private readonly _api: ApiInternal<ApiKeyData>
    // private readonly inputs: ActionInputs

    constructor(inputs: ActionInputs) {
        this.authParams = this.authParams.bind(this)
        // this.inputs = inputs
        this._api = new ApiInternal({ baseUrl: inputs.repositoryUrl, securityWorker: this.authParams, customFetch: fetch })
        const { apiKey, apiKeyId } = inputs
        this._api.setSecurityData({ apiKey, apiKeyId })
    }

    public async getApplication(id: string) {
        const res = await this._api.api.applicationControllerGetApplication(id)
        return res.data
    }

    private authParams({ apiKey, apiKeyId }: ApiKeyData): RequestParams {
        if (!apiKey) return {}
        const token = btoa(`${apiKeyId}:${apiKey}`)
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
}
