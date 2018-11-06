//SAMPLE
//Google Books API
var book = "Harry Potter";
    
var searchGoogleBooks = function(book) {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

//BARZZ API
var bar = "169 Bar";

var searchBarzz = function(bar) {
    var queryURL = "https://api.barzz.net/api/business?name=" + bar + "&zip=01234&user_key=[your user key]";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

/* "https://api.barzz.net/api/search?zip=" + zipcode + "&type=" + typeBar + "&amenity=" + typeAmenity + "&user_key=[your user key]" */

//EatStreet API
var searchTerms = "";
var latitude = "";
var longitude = "";
var deliveryORpickup = "";
var milesRadius = "";
var address = "";

var searchRestaurant = function(restaurant) {
    var queryURL = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude=" + latitude + "&longitude=" + longtitude + 
        "&method=" + deliveryORpickup + "&pickup-radius=" + milesRadius + "&search=" + searchTerms + "&street-address=" + address;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);            
    });
};

/* address format: street-address=316+W.+Washington+Ave.+Madison,+WI */

//Yelp Fusion API
var reviews = "good";

var searchYelp = function(review) {
    var queryURL = "https://api.yelp.com/v3/businesses/{id}/reviews" + reviews;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

//OMDb API
var movie = "avatar";
var year = "2009";

var searchMovies = function(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=" + year + "&plot=full";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

//Rotten Tomatoes API - requires proposal form submission to FANDANGO
var movie_review = "";

//Workfrom Places API
var workspace = "";

//ReciPal API
var recipe = "";

var searchRecipes = function(recipe) {
    var queryURL = "https://recipal.com/api/v1/recipes/" + recipe;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

//All for Good API - service does not work
var volunteer = "";