var apiKey = "24ea2481120915a964d11bfbdcc72405";

var searchWeather = document.getElementById('searchBtn');
var cityCol = document.getElementById('city-col');
var cityInput = document.getElementById('city');
var currentWeather = document.getElementById('today-temp');
var fiveDayForecast = document.getElementById('five-day-forecast');
var cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
var btnContainer = document.getElementById('button-container');

var lat;
var long;

// function to save to local storage and display previous searches on dashboard
var saveHistory = function(city) {
    if (cityHistory.indexOf(city) === -1) {
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }
};

var getCurrentWeather = function(city) {
    cityInput.value = '';
    // get today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

};

// call to get the city name from the api
var apiCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
fetch(apiCity).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            lat = data.results[0].locations[0].displayLatLng.lat;
            long = data.results[0].locations[0].displayLatLng.long;
        })
    }
});

//    call to get the long and lat from the api 
var apiLongLat = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
fetch(apiLongLat).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            currentWeather.innerHTML = "";
        })
    }
});
// create current weather card with required parameters
var currentWeatherCard = document.createElement('div');
currentWeatherCard.classList.add('card');
var currentWeatherCardImg = document.createElement('img');
currentWeatherCardImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
var currentWeatherCardBody = document.createElement('div');
currentWeatherCardBody.classList.add('card-body');
var currentWeatherCardTitle = document.createElement('h5')
currentWeatherCardTitle.classList.add('card-title');
currentWeatherCardTitle.textContent = city + ' : ' + today;
var currentWeatherCardText = document.createElement('div');
currentWeatherCardText.classList.add('card-text');
var currentWeatherCardOL = document.createElement('ul');
var currentWeatherCardTemp = document.createElement('li');
currentWeatherCardTemp.textContent = 'Current Temperature (f) = ' + data.current.temp;
var currentWeatherHumidity = document.createElement('li');
currentWeatherHumidity.textContent = 'Current Humidity = ' + data.current.humidity;
var currentWeatherCardWind = document.createElement('li');
currentWeatherCardWind.textContent = 'Current Wind Speed (mph) = ' + data.current.wind_speed;
var currentWeatherCardUVI = document.createElement('li');
currentWeatherCardUVI.textContent = 'Current UVI = ' + data.current.uvi;

//add class based on UVI
if (data.current.uvi < 3) {
    currentWeatherCardUVI.classList.add('text-success');
} else if (data.current.uvi < 6) {
    currentWeatherCardUVI.classList.add('text-warning');
} else {
    currentWeatherCardUVI.classList.add('text-danger');
};

//append items to card 
currentWeatherCardBody.append(currentWeatherCardImg);
currentWeatherCard.append(currentWeatherCardBody);
currentWeatherCardBody.append(currentWeatherCardTitle);
currentWeatherCardBody.append(currentWeatherCardText);
currentWeatherCardText.append(currentWeatherCardOL);
currentWeatherCardOL.append(currentWeatherCardTemp);
currentWeatherCardOL.append(currentWeatherHumidity);
currentWeatherCardOL.append(currentWeatherCardWind);
currentWeatherCardOL.append(currentWeatherCardUVI);
currentWeather.append(currentWeatherCard);