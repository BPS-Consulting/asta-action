import path from 'path'
import { promises as fs } from 'fs'
import { Api } from '../src/codegen'
import { Inputs, InputsSchema } from '../src/inputs'

const KEY_FILE = 'local.key'
let inputs: Inputs


beforeAll(async () => {
    const keyFileContents = await fs.readFile(path.join(__dirname, KEY_FILE), 'utf-8')
    const { id, key } = JSON.parse(keyFileContents)
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(typeof key).toBe('string')
    expect(key.length).toBeGreaterThan(0)
    inputs = InputsSchema.parse({
        application: '64da53b177f4ac4fd8005957',
        variant: '64da53c177f4ac4fd8005967',
        runTemplate: '64da53c177f4ac4fd8005967',
        repositoryUrl: 'http://localhost:4000',
        apiKey: key,
        apiKeyId: id,
    } satisfies Partial<Record<keyof Inputs, unknown>>)
})

describe('the API', () => {
    let api: Api

    beforeEach(() => {
        api = new Api(inputs)
    })

    it('can get an application', async () => {
        const res = await api.getApplication(inputs.application)
        expect(res.data._id).toBe(inputs.application)
    })
})
