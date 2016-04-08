/**
 * Manages the update process, with help from interfaces to investoscope and netfonds.
 */
export async function update({investoscope, netfonds, debug}) {
  debug("Fetching quotes..")

  try {
    const quotes = await investoscope.getQuotesToUpdate()
    const historicalQuotes = await netfonds.getHistoricalQuotes(quotes)

    await investoscope.update(historicalQuotes)
  } catch (err) {
    debug(err)
  } finally {
    debug("DONE updating quotes..")
  }
}
