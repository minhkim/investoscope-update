import httpGet from "request-promise";
import iconv from "iconv-lite";

/**
 * Makes a GET request to given URL. Ensures that body is decoded into correct string encoding.
 *
 * @param  {string} url      The URL you want to get
 * @param  {string} encoding The encoding the server will respond with.
 *                           Yes, it should be read from http header, but it is good enough right now.
 * @return {string}          The response body
 */
export async function get(url, encoding) {
  var response = await httpGet(url);
  return iconv.decode(new Buffer(response), encoding);
}
