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

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
