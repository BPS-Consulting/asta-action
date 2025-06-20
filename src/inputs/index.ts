// Inputs provided by the user to the action in their workflow via `with`.
import { z } from 'zod'
import { ActionInputsSchema } from './action.inputs'

import * as core from '@actions/core'
import { getRunParameters, RunParameters } from './run-parameters.inputs'
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
    const { ASTA_REPOSITORY_URL, ASTA_EXPECT_FAILURE } = process.env

    const parametersInput = core.getInput('parameters')
    let parameters: RunParameters | string
    try {
        parameters = getRunParameters(parametersInput)
    } catch {
        parameters = parametersInput
    }

    const inputs: Inputs = InputsSchema.parse({
        pat: core.getInput('pat'),
        variantId: core.getInput('variantId'),
        parameters,
        repositoryUrl: core.getInput('repositoryUrl') || ASTA_REPOSITORY_URL,
        expectFailure: core.getInput('expectFailure') || ASTA_EXPECT_FAILURE,
    } satisfies Record<keyof Inputs, unknown>)

    return inputs
}

export { getInputs, InputsSchema }
export type { Inputs }
