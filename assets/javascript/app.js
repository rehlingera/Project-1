
var callEdamam = function(searchTerm) {
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=9337f61e&app_key=cfaff60bede4f57a26d84e860a2b3048&from=0&to=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

var callGoogleBooks = function(searchTerm) {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyAr0_LkySyKDBgp1lJhABUZ8tUaoD5wyac";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

var callOMDB = function(searchTerm) {
    var queryURL = "http://www.omdbapi.com/?apikey=9addc862&t=" + searchTerm + "&plot=full";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

window.onload = function() {
    var searchTerm = "chicken";
    callEdamam(searchTerm);
    callGoogleBooks(searchTerm);
    callOMDB(searchTerm);
    // $("#submitButton").on("click", function() {
    //     var searchTerm = $(INSERT SEARCH BAR ID).val().trim();
        

    // }
}

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


//GOOGLE BOOKS API
// var book = "Harry Potter";
// var searchGoogleBooks = function(book) {
//     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//     });
// };

window.onload = function() {
    console.log("hi")
}

  var database = firebase.database();

  $("#searchButton").on("click", function(){
    event.preventDefault();
    var searchInput = $("#searchInput").val().trim();
    var submission = {termSearched: searchInput};
    database.ref("/recentlySearched").push(submission);
    $("#searchInput").val("");
  });

  database.ref("/recentlySearched").on("child_added", function(snapshot){
    $("#recentlySearched").append("<button type='button' class='btn btn-outline-light recentlySearchedButton' data-toggle='button' aria-pressed='false' autocomplete='off'>"+snapshot.val().termSearched+"</button>");
  });

