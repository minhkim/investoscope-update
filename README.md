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
[TODO]

## TODO

* Read quotes to update from SQLite database, not hard code quote names.
