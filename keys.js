console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// spotify-this-song,"I Want it That Way" random

var artist = process.argv[3];

bansintownkey = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// var movie = process.argv[3];

// ombdkey = "http://www.omdbapi.com/?t="+ movie + "apikey=trilogy"
OMBDkey= "trilogy"


// queryURL = 'https://api.spotify.com/v1/search?q=name:' + song + '&type=track&limit=10'