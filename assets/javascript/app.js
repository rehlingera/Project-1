var callEdamam = function(searchTerm) {
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=9337f61e&app_key=cfaff60bede4f57a26d84e860a2b3048&from=0&to=20";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#aDiv3").empty();
        $("#aDiv3b").empty();
        n = Math.floor((Math.random() * response.hits.length))
        var recipeDiv = $("<div>");
        recipeDiv.append("<h4>" + response.hits[n].recipe.label + "</h4>");
        recipeDiv.append("<img style='width:100%' src='" + response.hits[n].recipe.image + "'><ul>");
        for (i=0;i<response.hits[n].recipe.ingredientLines.length;i++) {
            recipeDiv.append("<li>" + response.hits[n].recipe.ingredientLines[i] + "</li>")
        };
        recipeDiv.append("</ul>");
        recipeDiv.append("<a href='" + response.hits[n].recipe.url + "'>Go to recipe</a>");
        $("#aDiv3").append(recipeDiv);
        var recipeDivBack = $("<div>");
        recipeDivBack.append("<h4>" + response.hits[n].recipe.label + "</h4>");
        recipeDivBack.append("<p><b>Servings:</b> " + response.hits[n].recipe.yield + "</p>");
        recipeDivBack.append("<p><b>Calories per Serving:</b> " + (response.hits[n].recipe.calories/response.hits[n].recipe.yield).toFixed(0) + "</p>");
        recipeDivBack.append("<p><b>Nutritional Value per serving:</b></p>")
        for (i=0;i<response.hits[n].recipe.digest.length;i++) {
            recipeDivBack.append("<p>" + response.hits[n].recipe.digest[i].label + ": " + (response.hits[n].recipe.digest[i].total/response.hits[n].recipe.yield).toFixed(0) + response.hits[n].recipe.digest[i].unit + "</p>");
        };
        $("#aDiv3b").append(recipeDivBack);

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
        $("#aDiv1b").empty();
        var bookDiv = $("<div>");
        bookDiv.append("<h4>" + response.items[n].volumeInfo.title + "</h4>");
        bookDiv.append("<img style='width:100%' src='" + response.items[n].volumeInfo.imageLinks.thumbnail + "'>")
        bookDiv.append("<h5>" + response.items[n].volumeInfo.authors[0] + "</h5>");
        bookDiv.append("<p><b>Rating:</b> " + response.items[n].volumeInfo.averageRating + "</p>");
        bookDiv.append("<p><b>Genre:</b> " + response.items[n].volumeInfo.categories[0] + 
    "</p>");
        bookDiv.append("<a href='" + response.items[n].volumeInfo.previewLink + "'>Go to preview</a>");
        $("#aDiv1").append(bookDiv);
        var bookDivBack = $("<div>");
        bookDivBack.append("<h4>" + response.items[n].volumeInfo.title + "</h4>");
        bookDivBack.append("<p>" + response.items[n].volumeInfo.description + "</p>");
        $("#aDiv1b").append(bookDivBack);
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
        $("#aDiv2b").empty();
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
        movieDiv.append("<p><b>Starring:</b> " + response.Actors + "</p>");
        movieDiv.append("<p><b>RT Rating:</b> " + response.Ratings[0].Value + "</p>");
        movieDiv.append("<p><b>Genre:</b> " + response.Genre + "</p>");
        movieDiv.append("<p><b>Runtime:</b> " + response.Runtime + "</p>");
        movieDiv.append("<a href='https://www.imdb.com/title/" + response.imdbID + "/'>View on IMDB</a>");
        $("#aDiv2").append(movieDiv);
        var movieDivBack = $("<div>");
        movieDivBack.append("<h4>" + response.Title + "</h4>");
        movieDivBack.append("<p>" + response.Plot + "</p>");
        $("#aDiv2b").append(movieDivBack);
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
        $("#recentlySearched").append("<button type='button' class='btn btn-outline-light recentlySearchedButton' id='" + snapshot.val().termSearched + "' data-toggle='button' aria-pressed='false' autocomplete='off'>"+snapshot.val().termSearched+"</button>");
        //Push all the old searches from Firebase into the oldSearches array (to be check against during a search).
        oldSearches.push(snapshot.val().termSearched);
    });

    $(document).on("click", ".recentlySearchedButton", function(){
        console.log("hi!")
        searchTerm = this.id;
        $("#searchInput").val(searchTerm);
        callEdamam(searchTerm);
        callGoogleBooks(searchTerm);
        callOMDB(searchTerm);
        var submission = { termSearched: searchTerm };
        //Check searchTerm against an array of old searches. If it's a new search, push the searchTerm into the database.
        if(oldSearches.includes(searchTerm)===false) {
            database.ref("/recentlySearched").push(submission);
        };
    });

    $("#resetButton").on("click", function() {
        $("#aDiv1").empty();
        $("#aDiv1").append("<center><img src='assets/images/outline_import_contacts_black_18dp.png' alt='books'></center></div>");
        $("#aDiv2").empty();
        $("#aDiv2").append("<center><img src='assets/images/outline_theaters_black_18dp.png' alt='movies'></center></div>");
        $("#aDiv3").empty();
        $("#aDiv3").append("<center><img src='assets/images/outline_restaurant_black_18dp.png' alt='cooking'></center></div>");
    });

    $("#bookCard").flip();
    $("#movieCard").flip();
    $("#recipeCard").flip();

    $(document).on("click","#bookRefresh", function (){
        var searchTerm = $("#searchInput").val().trim();
        callGoogleBooks(searchTerm);
    });

    $(document).on("click","#movieRefresh", function (){
        var searchTerm = $("#searchInput").val().trim();
        callOMDB(searchTerm);
    });

    $(document).on("click","#recipeRefresh", function (){
        var searchTerm = $("#searchInput").val().trim();
        callEdamam(searchTerm);
    });
}

