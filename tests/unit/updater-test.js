import test from 'tape'
import * as updater from '../../lib/updater'


class InvestoscopeDouble {
  getQuotesToUpdate() { return "quotes" }
  update(historicalQuotes) { this.updateArgs = historicalQuotes }
}

class NetfondsDouble {
  getHistoricalQuotes(quotes) {
    this.getHistoricalQuotesArgs = quotes
    return "quotesFromNetfonds"
  }
}


test('updater#update executes as expected', (t) => {
  const investoscope = new InvestoscopeDouble
  const netfonds = new NetfondsDouble
  const debug = () => {}

  updater.update({
    investoscope: investoscope,
    netfonds: netfonds,
    debug: debug
  }).then(function () {
    t.equal(netfonds.getHistoricalQuotesArgs, "quotes",
      "netfonds asked to get quotes we have in investoscope"
    )

    t.equal(investoscope.updateArgs, "quotesFromNetfonds",
      "investoscope is updated with quotes from netfonds"
    )

    t.end()
  })

})
