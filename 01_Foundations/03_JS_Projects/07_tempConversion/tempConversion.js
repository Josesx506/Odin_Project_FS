const convertToCelsius = function(temperature_f) {
  let convertedTemp = Math.round((temperature_f - 32) * (5/9) * 10) / 10;
  return convertedTemp
};

const convertToFahrenheit = function(temperature_c) {
  let convertedTemp = Math.round(((temperature_c * (9/5)) + 32) * 10) / 10
  return convertedTemp
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
