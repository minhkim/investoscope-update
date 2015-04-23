import debugGenerator from "debug";
import * as investoscope from "./lib/investoscope";
import * as netfonds from "./lib/netfonds";

var debug = debugGenerator("investoscope.main");

export async function run(options) {
  debug("Fetching quotes.. ");

  var quotes = await investoscope.getQuotes();
  var result = await netfonds.getAll(quotes.slice(0, 1));

  debug(result);

  debug("DONE fetching quotes.. ");
}
