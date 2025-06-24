import { toError, sleep } from '../src/util'

describe('Utility Functions', () => {
    describe('toError', () => {
        it('should return Error instance as is', () => {
            const originalError = new Error('Test error')
            const result = toError(originalError)
            expect(result).toBe(originalError)
        })

        it('should convert string to Error', () => {
            const errorMessage = 'String error message'
            const result = toError(errorMessage)
            expect(result).toBeInstanceOf(Error)
            expect(result.message).toBe(errorMessage)
        })

        it('should convert object to Error with JSON string', () => {
            const errorObject = { code: 500, message: 'Server error' }
            const result = toError(errorObject)
            expect(result).toBeInstanceOf(Error)
            expect(result.message).toBe(JSON.stringify(errorObject))
        })

        it('should convert null to Error', () => {
            const result = toError(null)
            expect(result).toBeInstanceOf(Error)
            expect(result.message).toBe('null')
        })

        it('should convert undefined to Error', () => {
            const result = toError(undefined)
            expect(result).toBeInstanceOf(Error)
            expect(result.message).toBe('')
        })

        it('should convert number to Error', () => {
            const result = toError(404)
            expect(result).toBeInstanceOf(Error)
            expect(result.message).toBe('404')
        })
    })

    describe('sleep', () => {
        it('should delay execution for specified milliseconds', async () => {
            const startTime = Date.now()
            await sleep(100)
            const endTime = Date.now()
            const duration = endTime - startTime
            // Allow some tolerance for timing
            expect(duration).toBeGreaterThanOrEqual(90)
            expect(duration).toBeLessThan(150)
        })

        it('should resolve after timeout', async () => {
            const promise = sleep(50)
            expect(promise).toBeInstanceOf(Promise)
            await expect(promise).resolves.toBeUndefined()
        })
    })
})
