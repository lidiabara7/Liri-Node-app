require("dotenv").config();

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

let action = process.argv[2];
let searchTerm = process.argv.slice(3).join(" ")
// Need to create a switch-case statement to direct which function to run.
function startApplication() {
  switch (action) {

    case "concert-this":
      getConcert();
      break;

    case "spotify-this-song":
      getSpotify();
      break;

    case "movie-this":
      getMovie();
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}
startApplication();
//============================================================================================
// LIRI will search Spotify for songs 
// need  * the artist * The song's name * A preview link of the song from Spotify
// * The album. If no song is provided then your program will default to "The Sign" by Ace of Base
function getSpotify() {
  console.log(action + searchTerm)
  // var spotify = new Spotify({
  //   id: process.env.SPOTIFY_ID,
  //   secret: process.env.SPOTIFY_SECRET
  // });

  if (!searchTerm) {
    searchTerm = "The Sign Ace of Base"
  }

  spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    if (!err) {
      // console.log(data);

      for (var i = 0; i < data.tracks.items.length; i++) {
        var songitems = data.tracks.items[i];
        console.log("-------------------------------------\n")
        console.log("Artist: " + songitems.artists[0].name);
        console.log("Song Title: " + songitems.name);
        console.log("Song Preview: " + songitems.preview_url);
        console.log("Album: " + songitems.album.name);
        console.log("\n-------------------------------------")

      }
    }
  });

}

//=======================================================================

// //function to get the concert info
// // Name of the venue  * Venue location  * Date of the Event (use moment to format this as "MM/DD/YYYY")

function getConcert() {

  axios
    .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // console.log(response);
      //need to create a variable for the date to be able to console.log it with the string "date"
      var date = moment(response.data[0].datetime).format("MM/DD/YYYY hh:00 A")

      console.log("-------------------------------------\n");
      console.log("Venue: " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log("Date and Time: " + date);
      console.log("\n-------------------------------------");

    }).catch(function (err) {
      console.log(err);
    })
}

//=============================================================================
// function to get the movie information
// need * Title. * Year the movie came out. * IMDB Rating. * Rotten Tomatoes Rating. * Country where it was produced. * Language. * Plot. * Actors. * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function getMovie() {

  //setting the difault if the user does not input a movie name
  if (!searchTerm) {
    searchTerm = "Mr. Nobody"
  }

  axios
    .get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      // console.log(response);
      console.log("-------------------------------------\n");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Rated: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      // console.log("Rotten Tomatoes: " + response.data.Ratings[1].value);
      console.log("\n-------------------------------------");


    }).catch(function (err) {
      console.log(err);
    });


}

// //==============================================================================
// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {

  fs.readFile('./random.txt', "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var output = data.split(",");
    // []"hhh", "ffs"

    action = output[0];
    searchTerm = output[1];
    console.log(action + searchTerm)
    startApplication();
    console.log(output);



  });

};


