import { z } from 'zod'
import yaml from 'js-yaml'

export const RunParametersSchema = z.object({
    /**
     * Stop the run immediately after executing all flows.
     *
     * @default false
     */
    stopAfterFlows: z.coerce.boolean().optional().default(false),

    /**
     * Time, in seconds, ASTA should wait for pages to load before timing out
     * and labeling the page as failed.
     * @default 15
     */
    pageLoadTimeout: z.coerce.number().optional().default(15),

    /**
     * How many times ASTA should retry a failed action before giving up.
     * @default 3
     */
    actionRetryAttempts: z.coerce.number().optional().default(3),
}).default({})

export type RunParameters = z.infer<typeof RunParametersSchema>

/**
 * Parse and validate run parameters from a github actions workflow
 *
 * @param parameters The raw parameters obtained from the workflow file
 *
 * @throws if `parameters` is not valid JSON or YAML
 * @throws if `parameters` does not match the {@link RunParametersSchema expected schema}
 */
export const getRunParameters = (parameters: string): RunParameters => {
    // No parameters provided, use defaults
    if (!parameters) return RunParametersSchema.parse({})

    let parsed: unknown

    // users will likely be using yaml, so we'll try that first
    try {
        parsed = yaml.load(parameters)
    } catch (e) {
        // try JSON next
        try {
            parsed = JSON.parse(parameters)
        } catch (e) {
            throw new TypeError(
                'Unable to parse run parameters from your workflow file. ' +
                    'Please ensure that your parameters are valid JSON or YAML objects.'
            )
        }
    }

    const validated = RunParametersSchema.parse(parsed)
    return validated
}
