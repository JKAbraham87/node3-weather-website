const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/bcb2f69b3d39232cf9d20e02f6ed82d0/" +
    lattitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain. The highest temperature for today is " +
          body.daily.data[0].temperatureHigh +
          " degrees out and the lowest temperature for today is " +
          body.daily.data[0].temperatureLow +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
