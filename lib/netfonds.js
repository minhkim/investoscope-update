import debugGenerator from "debug";

var debug = debugGenerator("investoscope.netfonds");
var netfondsUrl = "http://www.netfonds.no/quotes/paperhistory.php?paper=[quote]&csv_format=csv"


function httpGet(url) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(`RESPONSE FOR ${url} will come here!`);
    }, 750)
  });
}



export async function get(quote) {
  let url = netfondsUrl.replace("[quote]", quote);
  debug(`GET quote ${quote}.. from ${url}`);

  try {
    var response = await httpGet(url);
    return response;
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
