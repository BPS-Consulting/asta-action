import 'source-map-support/register'
import * as core from '@actions/core'
import { Api } from './codegen'
import { getActionInputs, type ActionInputs } from './inputs'
import { sleep, toError } from './util'

async function main() {
    const POLL_INTERVAL = 1_000

    core.debug(`Parsing inputs...`)
    const inputs: ActionInputs = getActionInputs()
    const api = new Api(inputs)

    // check that application exists
    const application = await api.getApplication()
    console.log(`Found application:\n${JSON.stringify(application, null, 2)}`)
    const variant = await api.getVariant()
    console.log(`Found variant:\n${JSON.stringify(variant, null, 2)}`)

    core.debug('Starting run...')
    const runId = await api.startRun()
    core.notice(`
Started run ${runId} for ${application.data.name} (${variant.name})
    
View detailed logs here: https://companion.asta.grantsgovservices.com/app/${inputs.variant}/log?run=${runId}&filters%5Blevel%5D%5B%24ne%5D=Debug
`.trim()
    )

    let runStatus: Awaited<ReturnType<typeof api.getRunStatus>>
    let lastRunLogNumber = 0
    let numErrors = 0
    for (
        runStatus = await api.getRunStatus(runId);
        runStatus.runningState === 'running';
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
            const msg =
                log.msg || (log as Record<string, any>)['message']

            msg && console.log(`[${log.level}] ${msg}`)

            if ((log['level'] as string)?.toLowerCase?.() == 'error') {
                numErrors++
                core.error(msg ? String(msg) : JSON.stringify(log))
            }
        }

        await sleep(POLL_INTERVAL)
    }

    core.debug(`Final run status: ${JSON.stringify(runStatus, null, 2)}`)

    if (numErrors > 0) {
        core.setFailed(`Test run failed with ${numErrors} errors`)
    } else {
        core.notice(`Test run completed successfully`)
    }
}

main().catch(err => {
    core.debug(err.stack)
    const error = toError(err)
    core.setFailed(error.message)
})
