import { z } from 'zod'
import { RunParametersSchema } from './run-parameters.inputs'


/**
 * User inputs provided via Github Actions.
 * 
 * @note the properties here are correlated to the `inputs` in [`action.yml`](../../action.yml).
 * However, there are some settings here that are not publicly advertised to
 * consumers, e.g. changing the URL of the repository.
 */
export const ActionInputsSchema = z.object({
    /**
     * Either the name or ID of the application being tested
     */
    application: z.string().nonempty(),
    /**
     * Either the name or ID of the variant being tested
     */
    variant: z.string().nonempty(),
    /**
     * Either the name or ID of the run template to use.
     */
    runTemplate: z.string().nonempty(),
    parameters: RunParametersSchema,
    /**
     * The API key to use for the request. While an API key is required,
     * it may be provided via the `ASTA_API_KEY` environment variable.
     */
    apiKey: z.string().nonempty(),
    /**
     * The ID of the api key. May also be set via the `ASTA_API_KEY_ID` environment variable. 
     */
    apiKeyId: z.string().nonempty(),
    repositoryUrl: z.string().url().default('https://asta.grantsgovservices.com')
})

export type ActionInputs = z.infer<typeof ActionInputsSchema>

// export const getActionInputs = (): ActionInputs => {
//     const inputs: ActionInputs = {
//         application: core.getInput('application'),
//         variant: core.getInput('variant'),
//         runTemplate: core.getInput('run-template'),
//         parameters: RunParametersSchema.parse(core.getInput('parameters')),
//     }
// }
