import debugGenerator from "debug";
import { parse as csvParse } from "./csv"
import { get as httpGet } from "./http";
import HistoricalQuote from "./historical_quote";

var debug = debugGenerator("investoscope.netfonds");
var netfondsUrl = "http://www.netfonds.no/quotes/paperhistory.php?paper=[quote]&csv_format=csv"


/**
 * Netfonds responds 200 OK, even if a quote isn't found. We need to check the body
 * for a string which states in Norwegian that the quote wasn't found.
 *
 * @param {string} response Response from netfonds
 */
function quoteNotFound(response) {
  return response.indexOf("Denne aksjen finnes ikke.") >= 0
}


export async function get(quote) {
  let url = netfondsUrl.replace("[quote]", quote);
  debug(`GET quote ${quote}.. from ${url}`);

  try {
    var response = await httpGet(url, "iso-8859-15");

    if (quoteNotFound(response)) {
      debug(`The quote ${quote} was not found on netfonds`);
      return [];
    }

    var endOfDaysQuotes = await csvParse(response);

    return endOfDaysQuotes.map(function (endOfDay) {
      return new HistoricalQuote({
        quote: quote,
        date: endOfDay.quote_date,
        open: endOfDay.open,
        high: endOfDay.high,
        low: endOfDay.low,
        close: endOfDay.close,
        volume: endOfDay.volume
      });
    });
  } catch (err) {
    debug(err);
  }
}


export async function getAll(quotes) {
  var results = [];
  var requests = quotes.map(function (quote) { return get(quote); });

  for (let request of requests) {
    results.push(await request);
  }

  return results;
}
