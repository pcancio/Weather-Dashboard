var apiKey = "24ea2481120915a964d11bfbdcc72405";

var searchWeather = document.getElementById('searchBtn');
var cityCol = document.getElementById('city-col');
var cityInput = document.getElementById('city');
var currentWeather = document.getElementById('today-temp');
var fiveDayForecast = document.getElementById('five-day-forecast');
var cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
var btnContainer = document.getElementById('button-container');

// function to save to local storage and display previous searches on dashboard
var saveHistory = function(city) {
    if (cityHistory.indexOf(city) === -1) {
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }

}