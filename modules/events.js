'use strict'

const superagent = require('superagent');
module.exports = getEvent;

function Event(day) {
    this.link = day.url;
    this.name = day.title;
    this.eventDate = day.start_time;
    this.summary = day.description;
};

function getEvent(lat, lng) {
    const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&q=amman&${lat},${lng}`;
    return superagent.get(url)
      .then((eventData) => {
        let dataBase = JSON.parse(eventData.text);
        let events = dataBase.events.event.map(day => new Event(day));
        return events;
    });
}