var callEdamam = function(searchTerm) {
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=9337f61e&app_key=cfaff60bede4f57a26d84e860a2b3048&from=0&to=20";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#aDiv3").empty();
        n = Math.floor((Math.random() * response.hits.length))
        var recipeDiv = $("<div>");
        recipeDiv.append("<h4>" + response.hits[n].recipe.label + "</h4>");
        recipeDiv.append("<img style='width:100%' src='" + response.hits[n].recipe.image + "'><ul>");
        for (i=0;i<response.hits[0].recipe.ingredientLines.length;i++) {
            recipeDiv.append("<li>" + response.hits[0].recipe.ingredientLines[i] + "</li>")
        };
        recipeDiv.append("</ul>");
        recipeDiv.append("<a href='" + response.hits[0].recipe.url + "'>Go to recipe</a>");
        $("#aDiv3").append(recipeDiv);
    });
};

var callGoogleBooks = function(searchTerm) {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&maxResults=20&key=AIzaSyAr0_LkySyKDBgp1lJhABUZ8tUaoD5wyac";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        n = Math.floor((Math.random() * response.items.length))
        $("#aDiv1").empty();
        var bookDiv = $("<div>");
        bookDiv.append("<h4>" + response.items[n].volumeInfo.title + "</h4>");
        bookDiv.append("<img style='width:100%' src='" + response.items[n].volumeInfo.imageLinks.thumbnail + "'>")
        bookDiv.append("<h5>" + response.items[n].volumeInfo.authors[0] + "</h5>");
        bookDiv.append("<p>" + response.items[n].volumeInfo.description + "</p>");
        bookDiv.append("<a href='" + response.items[n].volumeInfo.previewLink + "'>Go to preview</a>");
        $("#aDiv1").append(bookDiv);
    });
};

var callOMDB = function(searchTerm) {
    var queryURL = "http://www.omdbapi.com/?apikey=9addc862&s=" + searchTerm + "&plot=full";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#aDiv2").empty();
        n = Math.floor((Math.random() * response.Search.length))
        var drillDown = response.Search[n].imdbID;
        var drillDownURL = "http://www.omdbapi.com/?apikey=9addc862&i=" + drillDown + "&plot=full";
        $.ajax({
            url: drillDownURL,
            method: "GET"
        }).then(function(response) {
        console.log(response);
        var movieDiv = $("<div>");
        movieDiv.append("<h4>" + response.Title + "</h4>");
        if(response.Poster !== "N/A") {
        movieDiv.append("<img style='width:100%' src='" + response.Poster + "'>");
        };
        movieDiv.append("<h5>Directed by " + response.Director + "</h5>");
        movieDiv.append("<h5> Starring " + response.Actors + "</h5>");
        movieDiv.append("<h5> RT Rating: " + response.Ratings[0].Value + "</h5>");
        movieDiv.append("<p>" + response.Plot + "</p>");
        movieDiv.append("<a href='https://www.imdb.com/title/" + response.imdbID + "/'>View on IMDB</a>");
        $("#aDiv2").append(movieDiv);
        });
    });
};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXclTHqVBqmQAdPjPO2YR_hQQ-TgmGs5c",
    authDomain: "gitgangproject.firebaseapp.com",
    databaseURL: "https://gitgangproject.firebaseio.com",
    projectId: "gitgangproject",
    storageBucket: "gitgangproject.appspot.com",
    messagingSenderId: "386712509161"
  };
firebase.initializeApp(config);
var database = firebase.database();

window.onload = function() {
    $("#searchButton").on("click", function() {
        event.preventDefault();
        var searchTerm = $("#searchInput").val().trim();
        console.log("hi")
        callEdamam(searchTerm);
        callGoogleBooks(searchTerm);
        callOMDB(searchTerm);
        var submission = {termSearched: searchTerm};

        //Check searchTerm against an array of old searches. If it's a new search, push the searchTerm into the database.
        if(oldSearches.includes(searchTerm)===false) {
            database.ref("/recentlySearched").push(submission);
        };
    });
    var oldSearches = [];
    //Renders buttons based on recentlySearch data
    database.ref("/recentlySearched").on("child_added", function(snapshot){
        $("#recentlySearched").append("<button type='button' class='btn btn-outline-light recentlySearchedButton' data-toggle='button' aria-pressed='false' autocomplete='off'>"+snapshot.val().termSearched+"</button>");
        //Push all the old searches from Firebase into the oldSearches array (to be check against during a search).
        oldSearches.push(snapshot.val().termSearched);
    });

    //Renders buttons based on recentlySearch data
    database.ref("/recentlySearched").on("child_added", function(snapshot){
    $("#recentlySearched").append("<button type='button' class='btn btn-outline-light recentlySearchedButton' data-toggle='button' aria-pressed='false' autocomplete='off'>"+snapshot.val().termSearched+"</button>");
    });

    $("#resetButton").on("click", function() {
        $("#aDiv1").empty();
        $("#aDiv1").append("<center><img src='assets/images/outline_import_contacts_black_18dp.png' alt='books'></center></div>");
        $("#aDiv2").empty();
        $("#aDiv2").append("<center><img src='assets/images/outline_theaters_black_18dp.png' alt='movies'></center></div>");
        $("#aDiv3").empty();
        $("#aDiv3").append("<center><img src='assets/images/outline_restaurant_black_18dp.png' alt='cooking'></center></div>");
    });
}
