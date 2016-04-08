import debugGenerator from "debug"
import { parse as csvParse } from "./csv"
import { get as httpGet } from "./http"
import HistoricalQuote from "./historical_quote"

var debug = debugGenerator("investoscope.netfonds")
var netfondsUrl = "http://www.netfonds.no/quotes/paperhistory.php?paper=[quote]&csv_format=csv"

/**
 * Get HistoricalQuote for a single quote
 *
 * @param  {string}   quote       Quote / ticker name
 * @return {Array}    An array of HistoricalQuote objects
 */
async function getHistoricalQuote(quote) {
  let url = netfondsUrl.replace("[quote]", quote)
  debug(`GET quote ${quote}.. from ${url}`)

  try {
    var response = await httpGet(url, "iso-8859-15")

    if (quoteNotFound(response)) {
      debug(`The quote ${quote} was not found on netfonds`)
      return []
    }

    var historicalQuotes = await csvParse(response)

    return historicalQuotes.map(function (endOfDay) {
      return new HistoricalQuote({
        quote: quote,
        date: endOfDay.quote_date,
        open: endOfDay.open,
        high: endOfDay.high,
        low: endOfDay.low,
        close: endOfDay.close,
        volume: endOfDay.volume
      })
    })
  } catch (err) {
    debug(err)
  }
}

/**
 * Get HistoricalQuote for a multiple quotes
 *
 * @param  {Array}    quotes    An array of quote/ticker names
 * @return {Objcet}             Object were the given quotes as keys,
 *                              and array of historical quotes as value.
 */
export async function getHistoricalQuotes(quotes) {
  var results = {}

  // Init requests
  for (let quote of quotes) {
    results[quote] = getHistoricalQuote(quote)
  }

  // Loop and wait for all responses
  for (let quote of quotes) {
    results[quote] = await results[quote]
  }

  return results
}






/**
 * Netfonds responds 200 OK, even if a quote isn't found. We need to check the body
 * for a string which states in Norwegian that the quote wasn't found.
 *
 * @param {string} response Response from netfonds
 */
function quoteNotFound(response) {
  return response.indexOf("Denne aksjen finnes ikke.") >= 0
}
