// Inputs provided by the user to the action in their workflow via `with`.
import { ActionInputsSchema, type ActionInputs } from './action.inputs'

import core from '@actions/core'
import github from '@actions/github'
import { RunParametersSchema, getRunParameters } from './run-parameters.inputs'

const getActionInputs = (): ActionInputs => {
    const {
        ASTA_REPOSITORY_URL,
        ASTA_API_KEY,
        ASTA_API_KEY_SECRET,
        ASTA_API_KEY_ID,
    } = process.env

    const inputs: ActionInputs = ActionInputsSchema.parse({
        application: core.getInput('application'),
        variant: core.getInput('variant'),
        runTemplate: core.getInput('run-template'),
        parameters: getRunParameters(core.getInput('parameters')),
        apiKey: core.getInput('api-key') || ASTA_API_KEY || ASTA_API_KEY_SECRET,
        apiKeyId: core.getInput('api-key-id') || ASTA_API_KEY_ID,
        repositoryUrl: ASTA_REPOSITORY_URL
    } satisfies Record<keyof ActionInputs, unknown>)

    return inputs
}

export { getActionInputs }
export type { ActionInputs }
