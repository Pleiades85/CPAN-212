const holidays = [
  { name: "Christmas", date: new Date("2025-12-25") },
  { name: "Canada Day", date: new Date("2025-07-01") },
  { name: "New Year", date: new Date("2025-01-01") },
];
console.log(holidays);
const lodash = require("lodash");

const today = new Date();
holidays.forEach((holiday) => {
  console.log(holiday);
  console.log((holiday.date - today) / (1000 * 60 * 60 * 24));
});

console.log(lodash.sample(holidays));

console.log(lodash.findIndex(holidays, { name: "Christmas" }));
console.log(lodash.findIndex(holidays, { name: "Canada Day" }));
