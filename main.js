import debugGenerator from "debug"
import * as updater from "./lib/updater"
import * as investoscope from "./lib/investoscope"
import * as netfonds from "./lib/netfonds"

export async function run() {
  await updater.update({
    investoscope: investoscope,
    netfonds: netfonds,
    debug: debugGenerator("investoscope.main")
  })
}
