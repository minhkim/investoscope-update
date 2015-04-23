import debugGenerator from "debug";
import * as investoscope from "./lib/investoscope";
import * as netfonds from "./lib/netfonds";

var debug = debugGenerator("investoscope.main");

export async function run(options) {
  debug("Fetching quotes..");

  try {
    var quotes = await investoscope.getQuotes();
    var endOfDayQuotes = await netfonds.getAll(quotes.slice(0, 1));
    await investoscope.update(endOfDayQuotes);

  } catch (err) {
    debug(err)
  } finally {
    debug("DONE fetching quotes..");
  }
}
