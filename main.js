import debugGenerator from "debug";
import * as netfonds from "./lib/netfonds";

var debug = debugGenerator("investoscope.main");

export async function run(options) {
  debug("Fetching quotes.. ");

  var result = await netfonds.getAll(options.quotes);

  debug(result);

  debug("DONE fetching quotes.. ");
}
