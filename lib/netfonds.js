import debugGenerator from "debug";
import { parse as csvParse } from "./csv"
import { get as httpGet } from "./http";
import HistoricalQuote from "./historical_quote";

var debug = debugGenerator("investoscope.netfonds");
var netfondsUrl = "http://www.netfonds.no/quotes/paperhistory.php?paper=[quote]&csv_format=csv"



export async function get(quote) {
  let url = netfondsUrl.replace("[quote]", quote);
  debug(`GET quote ${quote}.. from ${url}`);

  try {
    var response = await httpGet(url, "iso-8859-15");
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
