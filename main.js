import debugGenerator from "debug";
import * as netfonds from "./lib/netfonds";

var debug = debugGenerator("investoscope.main");

export async function run() {
  debug("Fetching quotes.. ");

  var result = await netfonds.get("NAS.OSE");

  debug(result);

  debug("DONE fetching quotes.. ");
}
