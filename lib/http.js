import httpGet from "request-promise"
import iconv from "iconv-lite"

/**
 * [get description]
 * @param  {string} url      The URL you want to get
 * @param  {string} encoding The encoding the server will respond with. Yes, it can be read from http header.
 * @return {string}          The response body
 */
export async function get(url, encoding) {
  var response = await httpGet(url);
  return iconv.decode(new Buffer(response), encoding);
}
