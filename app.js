//[Cooking] = EDAMAN API (display recipes)
//Application ID: 9337f61e; Application Keys: cfaff60bede4f57a26d84e860a2b3048
// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
  
// Make the actual CORS request.
function makeCorsRequest() {
    let app_id = document.getElementById('9337f61e').value;
    let app_key = document.getElementById('cfaff60bede4f57a26d84e860a2b3048').value;
    let recipe = document.getElementById('recipe').value;
    let pre = document.getElementById('response');

    var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        pre.innerHTML = text;
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    pre.innerHTML = 'Loading...';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(recipe);
}

//[Dining] = Yelp API (display business info, website, ratings)
//Client ID: objJ14V-TennqCpTsG6Vzw; API Key: esTvMVrBjwqBOvzQeq_SwU_5rsXZSn_9ytXvaOj0uMh9Y37zjVvGSkopHyIy5pHGKaKz1zzpFrY_nN1duB5uWOVe-0C-oc4cBiNAtZBWWnMswRso96_q_hYSSG_gW3Yx
//Terms: Food (food, All); Internet Cafes (internetcafe, All)
//Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

//Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.yelp.com/v3/businesses/' true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(businesses => {
            console.log(businesses);
        });
    } else {
        console.log('error');
    }
}

//Send request
request.send{};

//[Drinking] = MAPQUEST API (display as map)
//Consumer key: NPB8TxyXvK30nM04PaixYbE4AoAnA1ma; Consumer secret: qAlnGOf2irIrc0cI
//Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var cityName = ;
var stateAbbr = ; //state name abbreviated
var milesRadius = ; //radius from origin in miles

//Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://www.mapquestapi.com/search/v2/radius?origin=' + cityName + ',+' + stateAbbr + '&radius=' + milesRadius + '&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=NPB8TxyXvK30nM04PaixYbE4AoAnA1ma', true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(businesses => {
            console.log(businesses);
        });
    } else {
        console.log('error');
    }
}

//Send request
request.send{};

//[Reading] = Google Books API
//API key: AIzaSyCfJC4DVJaXH1QV7tBi_cCy-0L_HM64o70
//Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var books = ;

//Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + books + '&key=AIzaSyCfJC4DVJaXH1QV7tBi_cCy-0L_HM64o70', true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(businesses => {
            console.log(businesses);
        });
    } else {
        console.log('error');
    }
}

//Send request
request.send{};

//[Movies] = OMDb API
//API key: 9addc862
var movie = ;
var year = ;

var searchMovies = function(movie) {
    var queryURL = "http://www.omdbapi.com/?apikey=9addc862&t=" + movie + "&y=" + year + "&plot=full";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

//[Working] = WorkFrom API
//Client ID: objJ14V-TennqCpTsG6Vzw; API Key: esTvMVrBjwqBOvzQeq_SwU_5rsXZSn_9ytXvaOj0uMh9Y37zjVvGSkopHyIy5pHGKaKz1zzpFrY_nN1duB5uWOVe-0C-oc4cBiNAtZBWWnMswRso96_q_hYSSG_gW3Yx
//Terms: Internet Cafes (internetcafe, All)
//Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

//Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.yelp.com/v3/businesses/' true);

request.onload = function () {
    //Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(businesses => {
            console.log(businesses);
        });
    } else {
        console.log('error');
    }
}

//Send request
request.send{};