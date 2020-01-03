'use strict';

const superagent = require('superagent');
module.exports = getMovie;

function Movie(details) {
    this.title = details.title;
    this.overview = details.overview;
    this.popularity = details.popularity;
    this.total_votes = details.total_votes;
    this.released_on = details.released_on;
    this.average_votes = details.average_votes;
    this.image_url = `https://image.tmdb.org/t/p/w500/${details.poster_path}`;
};

function getMovie(search_query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${search_query}`;
    return superagent.get(url)
      .then((data) => {
        let movie = data.body.results.map((element) => new Movie(element));
        return movie;
      });
};