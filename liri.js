require("dotenv").config();

// Variables 
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//vars to capture user inputs.
var user = process.argv[2];
var input = process.argv[3];


