export function get(url) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(`RESPONSE FOR ${url} will come here!`);
    }, 750)
  });
}
