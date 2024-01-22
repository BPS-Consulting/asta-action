import 'source-map-support/register'
import * as core from '@actions/core'
import { Api } from './codegen'
import { getInputs, type Inputs } from './inputs'
import { sleep, toError } from './util'
import { RunLogEntryDTO } from './codegen/api'
import { COMPANION_BASE_URL } from './constants'

async function main() {
    const POLL_INTERVAL = 1_000

    core.debug(`Parsing inputs...`)
    const inputs: Inputs = getInputs()
    const api = new Api(inputs)

    core.debug(`Starting run for application "${inputs.application}"`)
    const runId = await startRun(api, inputs)
    core.setOutput('run-id', runId)

    process.on('SIGINT', () => {
        console.log('Stopping run')
        api.stopRun(runId)
        console.log('Stopped run')
    })

    let runStatus: Awaited<ReturnType<typeof api.getRunStatus>>
    let lastRunLogNumber = 0
    let numErrors = 0
    for (
        runStatus = await api.getRunStatus(runId);
        // ['starting', 'running'].includes(runStatus.runningState);
        runStatus.runningState !== 'stopped';
        runStatus = await api.getRunStatus(runId)
    ) {
        core.debug(`Run status: ${JSON.stringify(runStatus, null, 2)}`)
        const logs = await api.getRunLogs(runId, {
            offset: lastRunLogNumber,
            limit: 50,
        })

        if (logs.length) {
            lastRunLogNumber = Number(logs[logs.length - 1].id)
        } else {
            core.debug(`No logs found for run ${runId}`)
        }

        for (const log of logs) {
            onLog(log)
            if (isErrorLog(log)) numErrors++
        }

        await sleep(POLL_INTERVAL)
    }

    core.debug(`Final run status: ${JSON.stringify(runStatus, null, 2)}`)

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
    // check that application exists
    const application = await api.getApplication()
    core.debug(`Found application:\n${JSON.stringify(application, null, 2)}`)
    console.log(`Testing application "${application.data.name}"`)
    const variant = await api.getVariant()
    core.debug(`Found variant:\n${JSON.stringify(variant, null, 2)}`)
    console.log(`Testing variant "${variant.name}"`)

    core.debug('Starting run...')
    const runId = await api.startRun()
    const runLogUrl = new URL(COMPANION_BASE_URL, `/app/${inputs.variant}/log`)
    runLogUrl.searchParams.set('run', runId)
    runLogUrl.searchParams.set('filters[level][$ne]', 'Debug')
    core.notice(
        `
Started run ${runId} for ${application.data.name} (${variant.name})
    
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

main().catch(err => {
    core.debug(err.stack)
    const error = toError(err)
    core.setFailed(error.message)
})
