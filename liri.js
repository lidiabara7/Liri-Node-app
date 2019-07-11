require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var random = require("./random.txt")

var fs = require("fs");

var Spotify = require('node-spotify-api');

var action = process.argv[2];
// var searchterm = process.argv[3].split().join(" "); 

// Need to create a switch-case statement to direct which function to run.

switch (action) {

  case "concert-this":
    concertres();
    break;

  case "spotify-this":
    spotifyres();
    break;

  case "movie-this":
    movieres();
    break;

  case "do-what-it-says":
    Dowhatitsays();
    break;
}


// LIRI will search Spotify for songs 
// need  * the artist * The song's name * A preview link of the song from Spotify
// * The album. If no song is provided then your program will default to "The Sign" by Ace of Base
function spotifyres() {
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
 var song = process.argv[3];
  spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    if (!err) {
      // console.log(data);
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songitems = data.tracks.items[i];
        console.log("Artist: " + songitems.artists[0].name);
        console.log("Song Title: " + songitems.name);
        console.log("Song Preview" + songitems.preview_url);
        console.log("Album: " + songitems.album.name);
        console.log("-------------------------------------")

      }

    }
  });
}

//=================================

// //function to get the concert info
// // Name of the venue  * Venue location  * Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertres() {
  var artist = process.argv[3];
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
    // console.log(response);
    console.log("Venue: " + response.data[0].venue.name);
    console.log("City: " + response.data[0].venue.city);
    console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    console.log("-------------------------------------");

  }).catch(function (err) {
    console.log(err);
  })
}

// // =================================
// // function to get the movie information
// // need * Title. * Year the movie came out. * IMDB Rating. * Rotten Tomatoes Rating. * Country where it was produced. * Language. * Plot. * Actors. * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function movieres() {
  var movie = process.argv[3];

  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function (response) {
    // console.log(response);
    // for (var i = 0; i < response.data.length; i++){
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("Rated: " + response.data.imdbRating);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("Rotten Tomatoes: " + response.data.Ratings[1].value);
    console.log("-------------------------------------");

    // }

  }).catch(function (err) {
    console.log(err);
  })
}

// //=================================
// //function for do what it says
// // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// function Dowhatitsays() {

//     fs.readFile(random, "utf8", function(error, data) {
//       if (error) {
//         return console.log(error);
//       }
//         var output = data.split(",");
//         for (var i = 0; i < output.length; i++) {
//             console.log(output[i]);
//         }
//       });
// };
