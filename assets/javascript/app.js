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