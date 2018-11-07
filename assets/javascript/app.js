var callEdamam = function(searchTerm) {
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=9337f61e&app_key=cfaff60bede4f57a26d84e860a2b3048&from=0&to=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var recipeDiv = $("<div>");
        recipeDiv.append("<h4>" + response.hits[0].recipe.label + "</h4>");
        recipeDiv.append("<img style='width:100%' src='" + response.hits[0].recipe.image + "'><ul>");
        for (i=0;i<response.hits[0].recipe.ingredientLines.length;i++) {
            recipeDiv.append("<li>" + response.hits[0].recipe.ingredientLines[i] + "</li>")
        };
        recipeDiv.append("</ul>");
        recipeDiv.append("<a href='" + response.hits[0].recipe.url + "'>Go to recipe</a>");
        $("#aDiv3").append(recipeDiv);
    });
};

var callGoogleBooks = function(searchTerm) {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyAr0_LkySyKDBgp1lJhABUZ8tUaoD5wyac";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var bookDiv = $("<div>");
        bookDiv.append("<h4>" + response.items[0].volumeInfo.title + "</h4>");
        bookDiv.append("<img style='width:100%' src='" + response.items[0].volumeInfo.imageLinks.thumbnail + "'>")
        bookDiv.append("<h5>" + response.items[0].volumeInfo.authors[0] + "</h5>");
        bookDiv.append("<p>" + response.items[0].volumeInfo.description + "</p>");
        bookDiv.append("<a href='" + response.items[0].volumeInfo.previewLink + "'>Go to preview</a>");
        $("#aDiv1").append(bookDiv);
    });
};

var callOMDB = function(searchTerm) {
    var queryURL = "http://www.omdbapi.com/?apikey=9addc862&t=" + searchTerm + "&plot=full";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var movieDiv = $("<div>");
        movieDiv.append("<h4>" + response.Title + "</h4>");
        movieDiv.append("<img style='width:100%' src='" + response.Poster + "'>");
        movieDiv.append("<h5>Directed by " + response.Director + "</h5>");
        movieDiv.append("<h5> Starring " + response.Actors + "</h5>");
        movieDiv.append("<h5> RT Rating: " + response.Ratings[0].Value + "</h5>");
        movieDiv.append("<p>" + response.Plot + "</p>");
        movieDiv.append("<a href='https://www.imdb.com/title/" + response.imdbID + "/'>View on IMDB</a>");
        $("#aDiv2").append(movieDiv);
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

window.onload = function() {
    $("#searchButton").on("click", function() {
        var searchTerm = $("#searchInput").val().trim();
        console.log("hi")
        callEdamam(searchTerm);
        callGoogleBooks(searchTerm);
        callOMDB(searchTerm);
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
