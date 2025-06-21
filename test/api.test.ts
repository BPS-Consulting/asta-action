import { Api } from '../src/codegen'
import { Inputs, InputsSchema } from '../src/inputs'

let inputs: Inputs

beforeAll(async () => {
    inputs = InputsSchema.parse({
        variantId: '6761e2a564e3d83226978099',
        parameters: '6501d76a3d6550269c78b836',
        repositoryUrl: 'http://localhost:4000',
        pat: '055847fb14ad9a0bebd3fc4109acc32a78e2c992c8a0c582546f4fd298d8b207f6f8f2c22292d462cff8f717cfb5de157bbefed788c3572b41844ade8efa98df',
        expectFailure: true,
    } satisfies Partial<Record<keyof Inputs, unknown>>)
})

describe('the API', () => {
    let api: Api

    beforeEach(() => {
        api = new Api(inputs)
    })

    it('can get the current user', async () => {
        const res = await api.whoami()
        expect(res).toBeDefined()
    })

    it('can get a variant', async () => {
        const res = await api.getVariant(inputs.variantId)
        expect(res).toBeDefined()
    })

    it('can get a run status', async () => {
        const res = await api.getRunStatus(inputs.variantId, 'latest')
        expect(res).toBeDefined()
    })
})
