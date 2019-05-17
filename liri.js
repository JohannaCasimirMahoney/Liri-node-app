require("dotenv").config();

// Variables 
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require("axios");

//vars to capture user inputs.
var user = process.argv[2];
var input = process.argv[3];

switch (user) {
    case "concert-this":
        searchForBandsInTown(input);
        break;

    case "spotify-this-song":
        spotifyThisSong(input);
        break;

    case "movie-this":
        movieThis(input);
        break;

    case "do-what-it-says":
        theRandom();
        break;


}


