import 'source-map-support/register'
import * as core from '@actions/core'
import { Api } from './codegen'
import { getInputs, type Inputs } from './inputs'
import { sleep, toError, withTimeout } from './util'
import { RunLogEntryDTO } from './codegen/api'
import { COMPANION_BASE_URL } from './constants'

import pkg from '../package.json'

async function main() {
    const POLL_INTERVAL = 1_000
    const MAX_RETRIES = 3
    core.debug(`Starting asta-action@${pkg.version}...`)

    core.debug(`Parsing inputs...`)
    const inputs: Inputs = getInputs()
    const api = new Api(inputs)

    const [user, variant] = await Promise.all([
        api.whoami(),
        api.getVariant(inputs.variantId),
    ])

    core.debug(
        `Starting run for variant "${variant.data.name}" as ${user.data.data.email}`
    )
    const runId = await startRun(api, inputs)
    core.setOutput('run-id', runId)

    process.on('SIGINT', () => {
        console.log('Stopping run')
        api.stopRun(runId)
        console.log('Stopped run')
    })

    let runStatus: Awaited<ReturnType<typeof api.getRunStatus>> | undefined
    let lastRunLogNumber = 0
    let numErrors = 0
    let consecutiveErrors = 0
    let loopCount = 0
    const MAX_LOOP_ITERATIONS = 1000

    try {
        runStatus = await api.getRunStatus(inputs.variantId, runId)

        while (runStatus) {
            loopCount++

            if (loopCount > MAX_LOOP_ITERATIONS) {
                core.notice(
                    `Loop exited because it reached maximum iterations (${MAX_LOOP_ITERATIONS})`
                )
                break
            }

            const currentStatus = getRunStatusValue(runStatus)
            const isActive = isRunActive(currentStatus)

            try {
                // Always fetch logs (whether run is active or stopped)
                let logs: any
                try {
                    const result = await withTimeout(
                        api.getRunLogs(runId, {
                            offset: lastRunLogNumber,
                            limit: 50,
                        }),
                        30000,
                        `getRunLogs timed out after 30 seconds`
                    )
                    logs = result.data
                } catch (logsError) {
                    core.warning(
                        `Failed to get run logs: ${logsError instanceof Error ? logsError.message : String(logsError)}`
                    )
                    logs = null
                }

                if (logs && logs.length) {
                    lastRunLogNumber = Number(logs[logs.length - 1].id) + 1
                }

                if (logs) {
                    for (const log of logs) {
                        try {
                            onLog(log)
                            if (isErrorLog(log)) numErrors++
                        } catch (logError) {
                            core.warning(
                                `Error processing log entry: ${logError}`
                            )
                        }
                    }
                }

                // Exit after processing final logs if run is no longer active
                if (!isActive) {
                    core.notice(
                        `Loop exited because run status is "${currentStatus}" (not active)`
                    )
                    break
                }

                consecutiveErrors = 0

                await sleep(POLL_INTERVAL)

                try {
                    runStatus = await withTimeout(
                        api.getRunStatus(inputs.variantId, runId),
                        30000,
                        `getRunStatus timed out after 30 seconds`
                    )
                } catch (statusError) {
                    console.error('ERROR in getRunStatus:', statusError)
                    console.error('getRunStatus error details:', {
                        message:
                            statusError instanceof Error
                                ? statusError.message
                                : String(statusError),
                        stack:
                            statusError instanceof Error
                                ? statusError.stack
                                : 'No stack',
                        variantId: inputs.variantId,
                        runId,
                    })
                    throw statusError
                }
            } catch (error) {
                consecutiveErrors++
                const errorMsg =
                    error instanceof Error ? error.message : String(error)
                core.warning(
                    `API call failed (attempt ${consecutiveErrors}/${MAX_RETRIES}): ${errorMsg}`
                )

                if (consecutiveErrors >= MAX_RETRIES) {
                    core.error(
                        `Too many consecutive API failures. Stopping polling.`
                    )
                    throw error
                }

                await sleep(POLL_INTERVAL * 2)

                try {
                    runStatus = await api.getRunStatus(inputs.variantId, runId)
                } catch (statusError) {
                    core.warning(
                        `Failed to get run status after error: ${statusError}`
                    )
                    continue
                }
            }
        }
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        core.error(
            `Fatal error in polling loop after ${loopCount} iterations: ${errorMsg}`
        )
        core.debug(
            `Error details: ${error instanceof Error ? error.stack : 'No stack trace'}`
        )
        throw error
    }

    if (numErrors > 0) {
        if (inputs.expectFailure) {
            core.notice(`Test run failed with ${numErrors} errors, as expected`)
        } else {
            core.setFailed(`Test run failed with ${numErrors} errors`)
        }
    } else {
        if (inputs.expectFailure) {
            core.setFailed(`Test run passed, but was expected to fail`)
        } else {
            core.notice(`Test run completed successfully`)
        }
    }
}

async function startRun(api: Api, inputs: Inputs) {
    core.debug('Starting run...')
    const runId = await api.startRun()

    const baseUrl =
        (inputs.repositoryUrl.includes('localhost') &&
            'http://localhost:3000') ||
        (inputs.repositoryUrl.includes('dev') && 'https://dev.sqabot.ai/') ||
        COMPANION_BASE_URL

    const runLogUrl = new URL(`/app/${inputs.variantId}/log`, baseUrl)
    runLogUrl.searchParams.set('run', runId)
    runLogUrl.searchParams.set('filters[level][$ne]', 'Debug')
    core.notice(
        `
Started run ${runId} for ${inputs.variantId} (${inputs.variantId})
    
View detailed logs here: ${runLogUrl.toString()}
`.trim()
    )

    return runId
}

function onLog(log: RunLogEntryDTO) {
    const msg = log.msg || (log as Record<string, any>)['message']

    if (!msg) return

    if (isErrorLog(log)) {
        // numErrors++
        core.error(msg ? String(msg) : JSON.stringify(log))
    } else {
        console.log(`[${log.level} - ${log.type}] ${msg}`)
    }
}
function isErrorLog(log: RunLogEntryDTO): boolean {
    return (log['level'] as string)?.toLowerCase?.() === 'error'
}

/**
 * Check if a run status indicates the run is still active
 */
function isRunActive(status: string): boolean {
    const activeStatuses = ['starting', 'running', 'paused', 'stopping']
    return activeStatuses.includes(status)
}

/**
 * Extract the status value from the run status response
 * Handles different possible response structures
 */
function getRunStatusValue(runStatus: any): string {
    // Handle different possible response structures
    if (typeof runStatus === 'string') {
        return runStatus
    }

    if (runStatus && typeof runStatus === 'object') {
        const status =
            runStatus.status || runStatus.runningState || runStatus.state
        if (status) {
            return status
        }

        core.debug(
            `No status field found in runStatus object: ${JSON.stringify(runStatus)}`
        )
        return 'unknown'
    }

    return 'unknown'
}

main().catch(err => {
    core.debug(err.stack)
    const error = toError(err)
    core.setFailed(error.message)
})
