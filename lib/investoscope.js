import debugGenerator from "debug";
import applescript from "applescript"
import { generate as serialize } from "./csv"

var debug = debugGenerator("investoscope.investoscope");


function handleError(quote, cmd, err) {
  debug(`Unable to update investoscope for ${quote}`)
  debug(`Command was: ${cmd}`)
  debug(`Error: ${err}`)
}


async function buildAppleScriptCmd(quote, endOfDayQuotes, replace = "false") {
  var csv = await serialize(endOfDayQuotes, {
    columns: ["date", "close", "open", "low", "high", "volume"],
    header: true
  });

  return `
    tell first document of application "Investoscope"
    set anInstrument to first instrument whose symbol is "${quote}"
    anInstrument import historical quotes replace ${replace} with CSV "
      ${csv}
    "
    end tell
  `
}

async function exec(cmd) {
  return new Promise(function (resolve, reject) {
    applescript.execString(cmd, function (err, result) {
      if (err) { reject(err); }
      resolve(result);
    })
  });
}






/**
 * Updates investoscope with given end of day quotes
 * @param  {object} endOfDayQuotes An object with end of day quotes.
 */
export async function update(endOfDayQuotes) {
  var quotes = Object.keys(endOfDayQuotes);

  for (let quote of quotes) {
    try {
      var cmd = await buildAppleScriptCmd(quote, endOfDayQuotes[quote])
      var result = await exec(cmd);

      if (result === "true") {
        debug(`Did update ${quote}`)
      } else {
        handleError(quote, cmd, "Not updated.")
      }
    } catch (err) {
      handleError(quote, cmd, err)
    }
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
