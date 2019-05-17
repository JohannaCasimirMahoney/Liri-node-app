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

// All the functions for the keys

function searchForBandsInTown(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            if (response.data[0].venue != undefined) {
                console.log("Event Venue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time" + eventDateTime.format("dddd,MMMM Do YYYY"));

            }
            else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log(error);
    });
}

function spotifyThisSong(song) {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
                console.log("Artist: " + response.tracks.items[0].artist[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. Showing results for 'The Sign' by Ace of Base");
        });
}

function errorConditionForSpotify() {
    spotify
        .search({ type: 'track', query: 'The Sign' })
        .then(function (response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("Artist: " + response.tracks.items[i].artist[0].name);
                    console.log("Track: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    i = response.tracks.items.length;
                }
            }
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
}

