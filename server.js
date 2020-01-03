'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');

const client = require('./modules/client.js');
const getWeather = require('./modules/weather.js');
const getLocationData = require('./modules/location.js');
const getYelpData = require('./modules/yelp.js');
const getEvent = require('./modules/events.js')
const getMovie = require('./modules/movies.js')

const PORT = process.env.PORT;
const server = express();
server.use(cors());

//////////// LOCATION /////////////
server.get('/location', locationRndering);

function locationRndering(request, response) {
    let city = request.query.city;
    getLocationData(city)
        .then(data => render(data, response))
        .catch((error) => errorHandler(error, request, response));
}

/////////////// WEATHER ///////////////
server.get('/weather', weatherHandler)

function weatherHandler(request, response) {
  let lat = request.query['latitude'];
  let lng = request.query['longitude'];
  getWeather(lat, lng)
    .then(data => {
      response.status(200).send(data);
    });

}

//////////////// YELP ///////////////
server.get('/yelp', yelpHandler);

function yelpHandler(request, response) {
  let city = request.query.search_query;
  getYelpData(city)
    .then(data => {
      response.status(200).send(data);
    });
}

///////////////// EVENTS ////////////////
server.get('/events', eventHandler);

function eventHandler(request, response) {
  let lat = request.query['latitude'];
  let lng = request.query['longitude'];
  getEvent(lat, lng)
    .then(data => {
      response.status(200).send(data);
    });

}

//////////////// MOVIES //////////////
server.get('/movies', movieHandler);


function movieHandler(request, response) {
  let city = request.query.search_query;
  getMovie(city)
    .then((data) => {
      response.status(200).send(data);
    });
}

///////////////////

server.use('*', (request, response) => {
  response.status(404).send('its not found ')
});

server.use((error, request, response) => {
  response.status(500).send("Sorry, something went wrong");
});
function render(data, response) {
    response.status(200).json(data)
}
function errorHandler(error, request, response){
  response.status(500).send(error)
} 
function startServer(){
  server.listen(PORT, () => console.log('yap working'));

}
client.connect()
  .then(startServer)
  .catch(err => console.error(err));