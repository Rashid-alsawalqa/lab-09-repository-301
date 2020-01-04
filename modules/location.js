'use strict';

const superagent = require('superagent');
const client = require('./client.js')
module.exports = getLocationData;


const location = {};
function Location(locationData) {
    this.formatted_query = locationData.display_name;
    this.latitude = locationData.lat;
    this.longitude = locationData.lon;
    
}


function getLocationData(city) {
    let sql = `SELECT * FROM location WHERE search_query = $1`;
    let queryData = [city];
    return client.query(sql, queryData)
        .then(result => {
            if (result.rowCount) { return result.rows[0]; }
            else {
                const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
                return superagent.get(locationUrl)
                    .then(data => cacheLocation(city, data.body));
            }
        });
}


function cacheLocation(city, data) {
    const location = new Location(data[0]);
    let newSql = `INSERT INTO location(search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING*`
    let values = [city, location.display_query, location.latitude, location.longitude];
    return client.query(newSql, values)
        .then(result => result.rows[0]);
}
