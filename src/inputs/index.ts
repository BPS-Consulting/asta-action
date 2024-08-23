// Inputs provided by the user to the action in their workflow via `with`.
import { z } from 'zod'
import { ActionInputsSchema } from './action.inputs'

import * as core from '@actions/core'
import { getRunParameters } from './run-parameters.inputs'
import { REPOSITORY_BASE_URL } from '../constants'

const InputsSchema = ActionInputsSchema.extend({
    repositoryUrl: z.string().url().default(REPOSITORY_BASE_URL),
    /**
     * Non-public API. Causes the workflow to fail if the test run passes.
     *
     * @default false
     */
    expectFailure: z.coerce.boolean().default(false),
})

type Inputs = z.infer<typeof InputsSchema>

const getInputs = (): Inputs => {
    const {
        ASTA_REPOSITORY_URL,
        ASTA_API_KEY,
        ASTA_API_KEY_SECRET,
        ASTA_API_KEY_ID,
        ASTA_EXPECT_FAILURE,
    } = process.env

    const inputs: Inputs = InputsSchema.parse({
        application: core.getInput('application'),
        variant: core.getInput('variant'),
        runTemplate: core.getInput('run-template'),
        parameters: getRunParameters(core.getInput('parameters')),
        apiKey: core.getInput('api-key') || ASTA_API_KEY || ASTA_API_KEY_SECRET,
        apiKeyId: core.getInput('api-key-id') || ASTA_API_KEY_ID,
        repositoryUrl: ASTA_REPOSITORY_URL,
        expectFailure: ASTA_EXPECT_FAILURE,
    } satisfies Record<keyof Inputs, unknown>)

    return inputs
}

export { getInputs, InputsSchema }
export type { Inputs }
