import csvStringify from "csv-stringify";
import csvParse from "csv-parse";


export async function generate(arrayOfObjects, options) {
  options = options || {delimiter: ","}

  return new Promise(function (resolve, reject) {
    csvStringify(arrayOfObjects, options, function (err, string) {
      if (err) {
        reject(err);
      } else {
        resolve(string)
      }
    });
  });
}

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
  });
}
