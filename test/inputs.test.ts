import { Inputs, InputsSchema } from '../src/inputs'
import { COMPANION_BASE_URL, REPOSITORY_BASE_URL } from '../src/constants'

describe('Inputs Schema Validation', () => {
    const validInputs = {
        variantId: '6761e2a564e3d83226978099',
        parameters: '6501d76a3d6550269c78b836',
        repositoryUrl: 'http://localhost:4000',
        pat: 'test-pat-token',
        expectFailure: false,
    }

    describe('Valid inputs', () => {
        it('should accept valid inputs', () => {
            const result = InputsSchema.parse(validInputs)
            expect(result).toEqual(validInputs)
        })

        it('should accept parameters as object', () => {
            const inputsWithObjectParams = {
                ...validInputs,
                parameters: {
                    _id: 'test-template-id',
                    name: 'Test Template',
                    path: '/test',
                    depth: 3,
                    duration: 60,
                    testableDomains: ['example.com'],
                    assets: {
                        rules: [],
                        data: [],
                        activities: [],
                    },
                    extensions: {
                        accessibility: true,
                        brokenLinks: false,
                        resources: true,
                        performance: false,
                        functional: true,
                    },
                    workQueue: [],
                },
            }

            expect(() =>
                InputsSchema.parse(inputsWithObjectParams)
            ).not.toThrow()
        })

        it('should accept expectFailure as true', () => {
            const inputsWithExpectFailure = {
                ...validInputs,
                expectFailure: true,
            }

            const result = InputsSchema.parse(inputsWithExpectFailure)
            expect(result.expectFailure).toBe(true)
        })

        it('should default expectFailure to false when not provided', () => {
            const { expectFailure, ...inputsWithoutExpectFailure } = validInputs
            const result = InputsSchema.parse(inputsWithoutExpectFailure)
            expect(result.expectFailure).toBe(false)
        })
    })

    describe('Invalid inputs', () => {
        it('should reject missing variantId', () => {
            const { variantId, ...invalidInputs } = validInputs
            expect(() => InputsSchema.parse(invalidInputs)).toThrow()
        })

        it('should handle missing parameters with defaults', () => {
            const { parameters, ...inputsWithoutParams } = validInputs
            // The schema allows missing parameters and will use defaults from RunParametersSchema
            const result = InputsSchema.parse(inputsWithoutParams)
            expect(result).toBeDefined()
            expect(result.parameters).toBeDefined()
        })

        it('should use default repositoryUrl when not provided', () => {
            const { repositoryUrl, ...inputsWithoutRepo } = validInputs
            const result = InputsSchema.parse(inputsWithoutRepo)
            expect(result.repositoryUrl).toBe(REPOSITORY_BASE_URL)
        })

        it('should reject missing pat', () => {
            const { pat, ...invalidInputs } = validInputs
            expect(() => InputsSchema.parse(invalidInputs)).toThrow()
        })

        it('should reject invalid URL format for repositoryUrl', () => {
            const invalidInputs = {
                ...validInputs,
                repositoryUrl: 'not-a-url',
            }
            expect(() => InputsSchema.parse(invalidInputs)).toThrow()
        })

        it('should reject empty string for variantId', () => {
            const invalidInputs = {
                ...validInputs,
                variantId: '',
            }
            expect(() => InputsSchema.parse(invalidInputs)).toThrow()
        })

        it('should coerce string expectFailure to boolean', () => {
            const inputsWithStringExpectFailure = {
                ...validInputs,
                expectFailure: 'true' as any,
            }
            const result = InputsSchema.parse(inputsWithStringExpectFailure)
            expect(result.expectFailure).toBe(true)
        })

        it('should coerce number expectFailure to boolean', () => {
            const inputsWithNumberExpectFailure = {
                ...validInputs,
                expectFailure: 1 as any,
            }
            const result = InputsSchema.parse(inputsWithNumberExpectFailure)
            expect(result.expectFailure).toBe(true)
        })
    })

    describe('Constants', () => {
        it('should have correct companion base URL', () => {
            expect(COMPANION_BASE_URL).toBe('https://companion.sqabot.ai')
        })

        it('should have correct repository base URL', () => {
            expect(REPOSITORY_BASE_URL).toBe('https://sqabot.ai')
        })
    })
})
