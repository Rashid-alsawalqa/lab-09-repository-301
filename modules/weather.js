'use strict';

const superagent = require('superagent')
module.exports = getWeather;

function Weather(day) {
    this.time = new Date(day.time * 1000).toDateString();
    this.forecast = day.summary;
}

function getWeather(lat, lng) {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`;
    return superagent.get(url)
      .then(weatherData => {
        let weather = weatherData.body.daily.data.map((day) => new Weather(day));
        return weather;
      });
  }
  