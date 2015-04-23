import debugGenerator from "debug";

var debug = debugGenerator("investoscope.investoscope");

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
