/**
 * Coerce an unknown value caught in a `catch` block to an {@link Error}.
 *
 * @param err
 * @returns `err` as an {@link Error}
 */
export const toError = (err: unknown): Error => {
    if (err instanceof Error) {
        return err
    } else if (typeof err === 'string') {
        return new Error(err)
    } else {
        return new Error(JSON.stringify(err))
    }
}

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))

/**
 * Wraps a promise with a timeout
 * @param promise The promise to wrap
 * @param timeoutMs Timeout in milliseconds
 * @param errorMessage Error message if timeout occurs
 * @returns Promise that rejects if timeout is reached
 */
export const withTimeout = <T>(
    promise: Promise<T>,
    timeoutMs: number,
    errorMessage: string = `Operation timed out after ${timeoutMs}ms`
): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
        }),
    ])
}
