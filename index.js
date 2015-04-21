require("babel/register")({
  stage: 0
});

var quotes = [
  "IDEX.OAX",
  "ARCHER.OSE",
  "THIN.OSE",
  "OPERA.OSE",
  "NAS.OSE",
  "DNO.OSE",
  "FRO.OSE",
  "REC.OSE",
  "RCL.OSE",
  "VEI.OSE",
  "AFG.OSE",
  "STB.OSE",
  "NSG.OSE",
  "DNO.OSE"
];

require("./main").run({
  quotes: quotes
});
