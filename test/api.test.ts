import { Api } from '../src/codegen'
import { Inputs, InputsSchema } from '../src/inputs'
import * as fs from 'fs'
import * as path from 'path'

// Mock the internal API to prevent actual network calls
jest.mock('../src/codegen/api', () => {
    const originalModule = jest.requireActual('../src/codegen/api')

    return {
        ...originalModule,
        Api: jest.fn().mockImplementation(() => ({
            api: {
                authControllerGetPermissions: jest.fn().mockResolvedValue({
                    data: { permissions: ['read', 'write'] },
                }),
                variantControllerGetVariant: jest.fn().mockResolvedValue({
                    json: jest.fn().mockResolvedValue({
                        data: {
                            _id: '6761e2a564e3d83226978099',
                            name: 'Test Variant',
                            type: 'variant',
                        },
                    }),
                }),
                startRunControllerStartRun: jest.fn().mockResolvedValue({
                    data: {
                        runId: 'mock-run-id-123',
                        runNumber: 1,
                    },
                }),
                runsStatusControllerGetStatus: jest.fn().mockResolvedValue({
                    data: {
                        _id: 'mock-run-id-123',
                        runId: 'mock-run-id-123',
                        status: 'running',
                        runNumber: 1,
                        applicationName: 'Test App',
                        startingPageTitle: 'Home Page',
                        depth: 3,
                        startTime: '2023-01-01T00:00:00.000Z',
                        endTime: '',
                        currentPageTitle: 'Current Page',
                        currentPageUrl: 'https://example.com',
                        currentComponentLabel: 'Button',
                        templateName: 'Test Template',
                        user: 'test@example.com',
                    },
                }),
                runsLogControllerV2GetRunLog: jest.fn().mockResolvedValue({
                    data: {
                        data: [
                            {
                                id: 1,
                                type: 'Info',
                                level: 'Info',
                                timestamp: '2023-01-01T00:00:00.000Z',
                                msg: 'Test log entry',
                                data: {},
                            },
                        ],
                        totalCount: 1,
                    },
                }),
                runsControllerPauseRun: jest.fn().mockResolvedValue({}),
                runTemplateControllerFindOne: jest.fn().mockResolvedValue({
                    data: {
                        _id: '6501d76a3d6550269c78b836',
                        name: 'Test Template',
                        data: {
                            path: '/',
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
                    },
                }),
            },
            setSecurityData: jest.fn(),
        })),
    }
})

// Mock cross-fetch module for getRunLogs
jest.mock('cross-fetch', () => jest.fn())

let inputs: Inputs
let mockInputs: Inputs

beforeAll(async () => {
    const patFilePath = path.join(__dirname, '..', '.pat')
    const pat = fs.readFileSync(patFilePath, 'utf8').trim()

    inputs = InputsSchema.parse({
        variantId: '6761e2a564e3d83226978099',
        parameters: '6501d76a3d6550269c78b836',
        repositoryUrl: 'http://localhost:4000',
        pat,
        expectFailure: true,
    } satisfies Partial<Record<keyof Inputs, unknown>>)

    // Mock inputs for testing edge cases
    mockInputs = InputsSchema.parse({
        variantId: 'mock-variant-id',
        parameters: 'mock-parameters-id',
        repositoryUrl: 'http://mock-server:8080',
        pat: 'mock-pat-token',
        expectFailure: false,
    })
})

describe('the API', () => {
    let api: Api
    let mockApi: any
    let mockFetch: jest.MockedFunction<any>

    beforeEach(() => {
        // Get the mocked cross-fetch function
        mockFetch = require('cross-fetch') as jest.MockedFunction<any>
        mockFetch.mockClear()

        api = new Api(inputs)
        // Get the mocked internal API for specific test assertions
        mockApi = (api as any)._api

        // Mock fetch to return a proper Response-like object
        // The getRunLogs method does: fetch(...).then(res => res.json()) and then returns res.data
        mockFetch.mockImplementation(() => {
            return Promise.resolve({
                json: () =>
                    Promise.resolve({
                        data: [
                            {
                                id: 1,
                                type: 'Info',
                                level: 'Info',
                                timestamp: '2023-01-01T00:00:00.000Z',
                                msg: 'Test log entry',
                                data: {},
                            },
                        ],
                        totalCount: 1,
                    }),
            } as any)
        })
    })

    describe('Authentication and User Operations', () => {
        it('can get the current user', async () => {
            const res = await api.whoami()
            expect(res).toBeDefined()
            expect(res).toHaveProperty('data')
            expect(mockApi.api.authControllerGetPermissions).toHaveBeenCalled()
        })

        it('handles authentication errors gracefully', async () => {
            // Mock authentication failure
            mockApi.api.authControllerGetPermissions.mockRejectedValueOnce(
                new Error('Unauthorized')
            )

            await expect(api.whoami()).rejects.toThrow('Unauthorized')
        })
    })

    describe('Variant Operations', () => {
        it('can get a variant', async () => {
            const res = await api.getVariant(inputs.variantId)
            expect(res).toBeDefined()
            expect(res.data).toHaveProperty('_id', inputs.variantId)
            expect(
                mockApi.api.variantControllerGetVariant
            ).toHaveBeenCalledWith(inputs.variantId, { secure: true })
        })

        it('can get a variant using default variant ID', async () => {
            const res = await api.getVariant()
            expect(res).toBeDefined()
            expect(res.data).toHaveProperty('_id', inputs.variantId)
            expect(
                mockApi.api.variantControllerGetVariant
            ).toHaveBeenCalledWith(inputs.variantId, { secure: true })
        })

        it('handles invalid variant ID gracefully', async () => {
            mockApi.api.variantControllerGetVariant.mockRejectedValueOnce(
                new Error('Variant not found')
            )

            await expect(api.getVariant('invalid-variant-id')).rejects.toThrow(
                'Variant not found'
            )
        })
    })

    describe('Run Operations', () => {
        const mockRunId = 'mock-run-id-123'

        it('can start a run', async () => {
            const runId = await api.startRun()
            expect(runId).toBe(mockRunId)
            expect(typeof runId).toBe('string')
            expect(mockApi.api.startRunControllerStartRun).toHaveBeenCalled()
        })

        it('can start a run with explicit variant ID', async () => {
            const runId = await api.startRun(inputs.variantId)
            expect(runId).toBe(mockRunId)
            expect(typeof runId).toBe('string')
            expect(mockApi.api.startRunControllerStartRun).toHaveBeenCalled()
        })

        it('can get run status', async () => {
            const res = await api.getRunStatus(inputs.variantId, mockRunId)
            expect(res).toBeDefined()
            expect(res).toHaveProperty('runId', mockRunId)
            expect(res).toHaveProperty('status')
            expect([
                'starting',
                'running',
                'paused',
                'stopping',
                'stopped',
            ]).toContain(res.status)
            expect(
                mockApi.api.runsStatusControllerGetStatus
            ).toHaveBeenCalledWith(inputs.variantId, mockRunId, {
                secure: true,
            })
        })

        it('can get run logs', async () => {
            const res = await api.getRunLogs(mockRunId)
            expect(res).toBeDefined()
            expect(res).toHaveProperty('data')
            expect(Array.isArray(res.data)).toBe(true)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(
                    `/api/v2/runs/${inputs.variantId}/log/${mockRunId}`
                ),
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer ${inputs.pat}`,
                    },
                })
            )
        })

        it('can get run logs with pagination', async () => {
            const res = await api.getRunLogs(mockRunId, {
                limit: 10,
                offset: 0,
            })
            expect(res).toBeDefined()
            expect(res).toHaveProperty('data')
            expect(Array.isArray(res.data)).toBe(true)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('offset=0&limit=10'),
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer ${inputs.pat}`,
                    },
                })
            )
        })

        it('can get run logs with variant ID override', async () => {
            const res = await api.getRunLogs(mockRunId, {}, inputs.variantId)
            expect(res).toBeDefined()
            expect(res).toHaveProperty('data')
            expect(Array.isArray(res.data)).toBe(true)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining(
                    `/api/v2/runs/${inputs.variantId}/log/${mockRunId}`
                ),
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer ${inputs.pat}`,
                    },
                })
            )
        })

        it('can stop a run', async () => {
            await expect(api.stopRun(mockRunId)).resolves.not.toThrow()
            expect(mockApi.api.runsControllerPauseRun).toHaveBeenCalledWith(
                mockRunId,
                'stop',
                { secure: true }
            )
        })

        it('handles invalid run ID for status', async () => {
            mockApi.api.runsStatusControllerGetStatus.mockRejectedValueOnce(
                new Error('Run not found')
            )

            await expect(
                api.getRunStatus(inputs.variantId, 'invalid-run-id')
            ).rejects.toThrow('Run not found')
        })

        it('handles invalid run ID for logs', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Run not found'))

            await expect(api.getRunLogs('invalid-run-id')).rejects.toThrow(
                'Run not found'
            )
        })

        it('handles startRun with string parameters', async () => {
            const runId = await api.startRun()
            expect(runId).toBe(mockRunId)
            expect(
                mockApi.api.runTemplateControllerFindOne
            ).toHaveBeenCalledWith(inputs.variantId, inputs.parameters, {
                secure: true,
            })
        })

        it('handles startRun errors gracefully', async () => {
            mockApi.api.startRunControllerStartRun.mockRejectedValueOnce(
                new Error('Failed to start run')
            )

            await expect(api.startRun()).rejects.toThrow('Failed to start run')
        })
    })

    describe('Input Validation and Edge Cases', () => {
        it('handles empty parameters object for run logs', async () => {
            const mockRunId = 'mock-run-id-123'
            const res = await api.getRunLogs(mockRunId, {})
            expect(res).toBeDefined()
            expect(res).toHaveProperty('data')
            expect(Array.isArray(res.data)).toBe(true)
            expect(mockFetch).toHaveBeenCalled()
        })

        it('creates API instance with valid inputs', () => {
            expect(() => new Api(inputs)).not.toThrow()
        })

        it('creates API instance with different base URLs', () => {
            const testInputs = {
                ...inputs,
                repositoryUrl: 'https://test.example.com',
            }
            expect(() => new Api(testInputs)).not.toThrow()
        })
    })

    describe('Parameters Handling', () => {
        it('can start run with string parameters (template ID)', async () => {
            const runId = await api.startRun()
            expect(runId).toBe('mock-run-id-123')
            expect(typeof runId).toBe('string')
            expect(mockApi.api.runTemplateControllerFindOne).toHaveBeenCalled()
        })

        it('can start run with object parameters', async () => {
            const objectParams = {
                _id: inputs.parameters,
                name: 'Test Parameters',
                path: 'https://example.com',
                depth: 3,
                duration: 300,
                testableDomains: ['example.com'],
                assets: { rules: [], data: [], activities: [] },
                extensions: {
                    accessibility: true,
                    brokenLinks: false,
                    resources: false,
                    performance: false,
                    functional: false,
                },
                workQueue: [],
            }

            const apiWithObjectParams = new Api({
                ...inputs,
                parameters: objectParams as any,
            })

            const runId = await apiWithObjectParams.startRun()
            expect(runId).toBe('mock-run-id-123')
            expect(typeof runId).toBe('string')
        })

        it('handles missing template gracefully', async () => {
            const mockApiInternal = (api as any)._api
            mockApiInternal.api.runTemplateControllerFindOne.mockRejectedValueOnce(
                new Error('Template not found')
            )

            await expect(api.startRun()).rejects.toThrow('Template not found')
        })
    })

    describe('Concurrent Operations', () => {
        it('can handle multiple concurrent operations', async () => {
            const promises = [
                api.whoami(),
                api.getVariant(),
                api.getVariant(inputs.variantId),
            ]

            const results = await Promise.all(promises)
            expect(results).toHaveLength(3)
            results.forEach(result => expect(result).toBeDefined())
        })

        it('can start multiple runs concurrently', async () => {
            const runPromises = [api.startRun(), api.startRun(), api.startRun()]

            const runIds = await Promise.all(runPromises)
            expect(runIds).toHaveLength(3)
            runIds.forEach(runId => {
                expect(runId).toBe('mock-run-id-123')
                expect(typeof runId).toBe('string')
                expect(runId.length).toBeGreaterThan(0)
            })

            // Verify that startRun was called multiple times in this test
            expect(
                mockApi.api.startRunControllerStartRun
            ).toHaveBeenCalledTimes(3)
        })
    })

    describe('Error Recovery', () => {
        it('has all expected API methods available', () => {
            expect(typeof api.whoami).toBe('function')
            expect(typeof api.getVariant).toBe('function')
            expect(typeof api.startRun).toBe('function')
            expect(typeof api.stopRun).toBe('function')
            expect(typeof api.getRunLogs).toBe('function')
            expect(typeof api.getRunStatus).toBe('function')
        })

        it('handles network errors gracefully', async () => {
            mockApi.api.authControllerGetPermissions.mockRejectedValueOnce(
                new Error('Network error')
            )

            await expect(api.whoami()).rejects.toThrow('Network error')
        })

        it('handles API response parsing errors', async () => {
            mockApi.api.startRunControllerStartRun.mockResolvedValueOnce({
                data: null, // Invalid response
            })

            await expect(api.startRun()).rejects.toThrow()
        })
    })
})
