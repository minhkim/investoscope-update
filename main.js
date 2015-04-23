import debugGenerator from "debug";
import * as investoscope from "./lib/investoscope";
import * as netfonds from "./lib/netfonds";

var debug = debugGenerator("investoscope.main");

export async function run(options) {
  debug("Fetching quotes..");

  try {
    var quotes = await investoscope.getQuotesToUpdate();
    var historicalQuotes = await netfonds.getHistoricalQuotes(quotes);
    await investoscope.update(historicalQuotes);
  } catch (err) {
    debug(err)
  } finally {
    debug("DONE fetching quotes..");
  }
}
