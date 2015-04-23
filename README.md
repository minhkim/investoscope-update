# Investoscope update

Updates [Investoscope 3](http://www.investoscope.com/) end of day quotes from
different data sources than Yahoo or Google.

Right now it supports [Netfonds](http://www.netfonds.no/) as a data source and
it shouldn't bee too much work extending it to other local data sources which may
be updated faster after the local market closes than Yahoo and Google does.

It updates Investoscope by importing CSV in to Investoscope via Applescript.

Thanks to the founder of Investoscope Morten Fjord-Larsen who gave me a clue on how to express the Applescript.


## Supported markets

* Oslo stock exchange - [Netfonds](http://www.netfonds.no/)

## Usage

```bash
# Clone and install dependencies
git clone git@github.com:thhermansen/investoscope-update.git
cd investoscope-update
npm install

# Edit lib/investoscope.js and update which quotes you want to update.
# Ensure that your quote names also exists in Investoscope. For instance,
# Netfonds ticker names are "THIN.OSE" while Yahoo uses "THIN.OL". I'll solve
# this little inconsistency later.

# To update, you do ...
node index.js
```

## TODO

* Read quotes to update from SQLite database, not hard code quote names.
