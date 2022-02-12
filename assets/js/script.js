var apiKey = "24ea2481120915a964d11bfbdcc72405";

var cityInput = document.getElementById('city');
// GET CURRENT WEATHER

var searchCity = function(event, city) {
    event.preventDefault();
    var apiURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        saveHistory(city);
                        displayWeather(data.coord.lon, data.coord.lat);
                        $('city').val('');
                    })
            } else {
                alert('Error:' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to API', error);
        })
};

var displayWeather = function(long, lat) {
    var apiURL = "api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

}



// var getCurrentWeather = function(city) {
//     cityInput.value="";
//     // get today's date
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2,'0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0');
//     var yyyy = today.getFullYear();
//     today = mm + '/' + dd + '/' + yyyy;


// }