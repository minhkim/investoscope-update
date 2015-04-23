import csvParse from "csv-parse"

export async function parse(string, options) {
  options = options || {delimiter: ",", columns: true}

  return new Promise(function (resolve, reject) {
    csvParse(string, options, function (err, objects) {
      if (err) {
        reject(err);
      } else {
        resolve(objects)
      }
    });
  })
}
