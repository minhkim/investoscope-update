import debugGenerator from "debug";
import applescript from "applescript";
import sqlite3 from "sqlite3";
import fs from "fs";
import untildify from "untildify";
import { generate as serialize } from "./csv";
import config from "../config.json"

var debug = debugGenerator("investoscope.investoscope");

/**
 * Updates investoscope with given end of day quotes
 *
 * @param  {object} historicalQuotes An object with end of day quotes.
 */
export async function update(historicalQuotes) {
  var quotes = Object.keys(historicalQuotes);

  await exec(`
              set appName to "Investoscope 3"

              if application appName is not running then
                tell application appName
                  activate
                end tell
              end if
              `);

  for (let quote of quotes) {
    try {
      var cmd = await buildAppleScriptCmd(quote, historicalQuotes[quote])
      var result = await exec(cmd);

      if (result === "true") {
        debug(`Did update ${quote}`)
      } else {
        handleError(quote, cmd, "Not updated.")
      }
    } catch (err) {
      if (err.toString().match("(-2741)")) {
        handleError(quote, cmd, "Is Investoscope application running?")
      } else {
        handleError(quote, cmd, err)
      }
    }
  }
}


/**
 * Returns quotes to fetch, read from Investoscope's SQLite database.
 */
export async function getQuotesToUpdate() {
  return new Promise(function (resolve, reject) {
    var databasePath = untildify(`${config.investoscope.dataFolder}/data4.issqlite`);

    if (!fs.existsSync(databasePath)) {
      reject(`Investoscope's database wasn't found on "${databasePath}". Please check your config.`);
      return;
    }

    var db = new sqlite3.Database(databasePath, {mode: sqlite3.OPEN_READONLY});

    db.all("SELECT zisin AS quote FROM zquoteclient WHERE z_ent = 24 AND zisin IS NOT NULL;",
      function (err, rows) {
        db.close();

        if (err) {
          reject(err);
        } else {
          var quotes = rows.map(function (row) { return row.quote.replace(" ", ""); });
          quotes = quotes.filter(function (quote) { return quote.length > 1; });

          resolve(quotes);
        }
    });
  });
}










function handleError(quote, cmd, err) {
  debug(`Unable to update investoscope for ${quote}`)
  // debug(`Command was: ${cmd}`) // A bit too much?
  debug(`Error: ${err}`)
}

async function buildAppleScriptCmd(quote, historicalQuotes, replace = "false") {
  var csv = await serialize(historicalQuotes, {
    columns: ["date", "close", "open", "low", "high", "volume"],
    header: true
  });

  return `
    tell first document of application "Investoscope"
    set anInstrument to first instrument whose ISIN is "${quote}"
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
