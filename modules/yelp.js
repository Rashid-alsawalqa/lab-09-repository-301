'use strict';

const superagent = require('superagent')
module.exports = getYelpData;

function Yelp(details) {
    this.url = details.url;
    this.name = details.name;
    this.price = details.price;
    this.rating = details.rating;
    this.image_url = details.image_url;
};

function getYelpData(city) {
    const url = `https://api.yelp.com/v3/businesses/search?location=${city}`;
    return superagent.get(url)
        .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
        .then(data => {
            const yelp = data.body.businesses.map(element => {
                return new Yelp(element)
            });
            return yelp;
        });
}