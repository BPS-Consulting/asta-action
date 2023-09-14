import { Api } from "./codegen";
import { getActionInputs, type ActionInputs } from "./inputs";
import { toError } from "./util";

const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
  const inputs: ActionInputs = getActionInputs()
  const api = new Api(inputs)
  console.log(inputs)
}

/**
 * @todo support application names
 * @param applicationNameOrId 
 */
async function verifyApplication(api: Api, applicationNameOrId: string) {
  
}

main().catch(err => {
  const error = toError(err)
  core.setFailed(error.message)
})
