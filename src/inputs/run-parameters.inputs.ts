import { z } from 'zod'
import yaml from 'js-yaml'
import { StartRunRequestDTO } from '../codegen/api'

const defaultRunParameters = {
    path: '',
    depth: 3,
    duration: 0,
    stopAfterFlows: false,
    workQueueConfig: 'default',
    formTestingConfig: {},
    fastTestTables: false,
    extraHTTPHeaders: {},
    skipComponents: '',
    stopOnFlowError: false,
    enableModeling: true,
    useDatasetsForForms: false,
    fastTestLinks: false,
    pageLoadTimeout: 3000,
    actionRetryAttempts: 1,
    testableDomains: [],
    assets: {
        rules: [],
        data: [],
        activities: [],
    },
    extensions: {
        accessibility: false,
        brokenLinks: false,
        resources: false,
        performance: false,
        functional: false,
    },
    workQueue: [],
    name: '',
    _id: '',
} satisfies StartRunRequestDTO['parameters']

export const RunParametersSchema = z
    .object({
        path: z.string(),
        depth: z.coerce.number().default(3),
        duration: z.coerce.number(),
        stopAfterFlows: z.coerce.boolean().optional().default(false),
        workQueueConfig: z.string().optional().default("default"),
        formTestingConfig: z.record(z.unknown()).optional(),
        fastTestTables: z.coerce.boolean().optional().default(false),
        extraHTTPHeaders: z.record(z.unknown()).optional().default({}),
        skipComponents: z.string().optional().default(""),
        stopOnFlowError: z.coerce.boolean().optional().default(false),
        enableModeling: z.coerce.boolean().optional().default(true),
        useDatasetsForForms: z.coerce.boolean().optional().default(false),
        /**
         * If true, the agent will not visit links to test them
         * @default false
         */
        fastTestLinks: z.coerce.boolean().optional().default(false),
        pageLoadTimeout: z.coerce.number().optional().default(3000),
        actionRetryAttempts: z.coerce.number().optional().default(1),
        /**
         * Domains that will be tested by the agent.
         */
        testableDomains: z.array(z.string()),
        assets: z.record(z.unknown()),
        extensions: z.record(z.unknown()),
        logAccessibilitySuccesses: z.coerce.boolean().optional().default(false),
        workQueue: z.array(z.unknown()),
        name: z.string(),
        _id: z.string(),
    })
    .default(defaultRunParameters)

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
    } catch {
        // try JSON next
        try {
            parsed = JSON.parse(parameters)
        } catch (e) {
            const error =new TypeError(
                'Unable to parse run parameters from your workflow file. ' +
                    'Please ensure that your parameters are valid JSON or YAML objects.'
            );
            (error as any).cause = e
            throw error
        }
    }

    const validated = RunParametersSchema.parse(parsed)
    return validated
}
