/**
 * 	Class which normalizes historical quotes in case of multiple services.
 */
export default class HistoricalQuote {
  constructor(attributes) {
    this.quote = attributes.quote;
    this.date = attributes.date;
    this.open = attributes.open;
    this.high = attributes.high;
    this.low = attributes.low;
    this.close = attributes.close;
    this.volume = attributes.volume;
  }
}
