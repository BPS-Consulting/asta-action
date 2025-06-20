import { z } from 'zod'
import { RunParametersSchema } from './run-parameters.inputs'
import { REPOSITORY_BASE_URL } from '../constants'

/**
 * User inputs provided via Github Actions.
 *
 * @note the properties here are correlated to the `inputs` in [`action.yml`](../../action.yml).
 * However, there are some settings here that are not publicly advertised to
 * consumers, e.g. changing the URL of the repository.
 */
export const ActionInputsSchema = z.object({
    /**
     * The personal access token to use for authentication.
     */
    pat: z.string().min(1),
    /**
     * Either the name or ID of the variant being tested
     */
    variantId: z.string().min(1),
    /**
     * The parameters to use for the run.
     */
    parameters: z.union([z.string(), RunParametersSchema]),
    /**
     * The API key to use for the request. While an API key is required,
     * it may be provided via the `ASTA_API_KEY` environment variable.
     */
    repositoryUrl: z.string().url().default(REPOSITORY_BASE_URL),

    /**
     * The URL of the repository to use for the request.
     */
    expectFailure: z.coerce.boolean().default(true),
})

export type ActionInputs = z.infer<typeof ActionInputsSchema>
