# Investoscope update

[![Build Status](https://travis-ci.org/thhermansen/investoscope-update.svg?branch=master)](https://travis-ci.org/thhermansen/investoscope-update)

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

### Preparation in Investoscope

Symbols a stock is known by on Yahoo and Netfonds differs. You should
put Netfonds symbol in the ISIN field of a stock in Investoscope.

When we update end of day quotes with this script we'll read quotes from
Investoscope's database and we try to update all stocks which have data in
the ISIN field.

### First time install

```bash
# Clone and install dependencies
git clone git@github.com:thhermansen/investoscope-update.git
cd investoscope-update
npm install

# Copy config file and edit so it points to Investoscope's data folder.
# The data folder may be changed in Investoscope's preferences,
# under the advanced tab.
cp config.json{.example,}
```

#### Debug information
To get debug information set environment variable `DEBUG=investoscope.*`.

### To update Investoscope's quotes
```bash
bin/update
```
