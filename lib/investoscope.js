import debugGenerator from "debug";
import { generate as serialize } from "./csv"

var debug = debugGenerator("investoscope.investoscope");




async function buildAppleScriptCmd(quote, endOfDayQuotes) {
  var csv = await serialize(endOfDayQuotes);

  return `
    tell first document of application "Investoscope"
    set anInstrument to first instrument whose symbol is "${quote}"
    anInstrument import historical quotes replace yes with CSV "
      ${csv}
    "
    end tell
  `
}





/**
 * Updates investoscope with given end of day quotes
 * @param  {object} endOfDayQuotes An object with end of day quotes.
 */
export async function update(endOfDayQuotes) {
  var quotes = Object.keys(endOfDayQuotes);

  for (let quote of quotes) {
    debug(`Will update ${quote}`)

    var cmd = await buildAppleScriptCmd(quote, endOfDayQuotes[quote])

    debug(`Did update ${quote}`)
  }
}


/**
 * Returns quotes to fetch, read from Investoscope's SQLite database.
 *
 * NOTE At least that is what we'll do in time. right now this is hard coded.
 */
export async function getQuotes() {
  var quotes = [
    "ARCHER.OSE",
    "IDEX.OAX",
    "THIN.OSE",
    "OPERA.OSE",
    "NAS.OSE",
    "DNO.OSE",
    "FRO.OSE",
    "REC.OSE",
    "RCL.OSE",
    "VEI.OSE",
    "AFG.OSE",
    "STB.OSE",
    "NSG.OSE",
    "DNO.OSE"
  ];

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // TODO Fetch these quotes from investoscope SQLite database.
      resolve(quotes);
    }, 75)
  });
}
