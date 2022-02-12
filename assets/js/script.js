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

// 5-day forecast stuff
fiveDayForecast.innerHTML = '';
// do all this 5x
for (var i = 0; i < 5; i++) {
    parseInt(dd);
    dd++;
    today = mm + '/' + dd + '/' + yyyy;
    var dailyWeatherCard = document.createElement('div');
    dailyWeatherCard.classList.add('card', 'col-md', 'col-sm-12');
    var dailyWeatherCardImg = document.createElement('img');
    dailyWeatherCardImg.classList.add('card-image-top');
    dailyWeatherCardImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
    var dailyWeatherCardBody = document.createElement('div');
    dailyWeatherCardBody.classList.add('card-body');
    var dailyWeatherCardTitle = document.createElement('h5')
    dailyWeatherCardTitle.classList.add('card-title');
    dailyWeatherCardTitle.textContent = city + ' : ' + today;
    var dailyWeatherCardText = document.createElement('div');
    dailyWeatherCardText.classList.add('card-text');
    var dailyWeatherCardOL = document.createElement('ul');
    var dailyWeatherCardTemp = document.createElement('li');
    dailyWeatherCardTemp.textContent = 'Anticipated Temperature (f) = ' + data.daily[i].temp.day;
    var dailyWeatherHumidity = document.createElement('li');
    dailyWeatherHumidity.textContent = 'Anticipated Humidity = ' + data.daily[i].humidity;
    var dailyWeatherCardWind = document.createElement('li');
    dailyWeatherCardWind.textContent = 'Anticipated Wind Speed (mph) = ' + data.daily[i].wind_speed;
    var dailyWeatherCardUVI = document.createElement('li');
    dailyWeatherCardUVI.textContent = 'Anticipated UVI = ' + data.daily[i].uvi;

    if (data.daily[i].uvi < 3) {
        dailyWeatherCardUVI.classList.add('text-success');
    } else if (data.current.uvi < 6) {
        dailyWeatherCardUVI.classList.add('text-warning');
    } else {
        dailyWeatherCardUVI.classList.add('text-danger');
    }
    dailyWeatherCardBody.append(dailyWeatherCardImg);
    dailyWeatherCard.append(dailyWeatherCardBody);
    dailyWeatherCardBody.append(dailyWeatherCardTitle);
    dailyWeatherCardBody.append(dailyWeatherCardText);
    dailyWeatherCardText.append(dailyWeatherCardOL);
    dailyWeatherCardOL.append(dailyWeatherCardTemp);
    dailyWeatherCardOL.append(dailyWeatherHumidity);
    dailyWeatherCardOL.append(dailyWeatherCardWind);
    dailyWeatherCardOL.append(dailyWeatherCardUVI);
    fiveDayForecast.append(dailyWeatherCard);
};

var inputBtnValue = function(event) {
    getCurrentWeather(event.target.textContent);
}

var historyBtn = function() {
    btnContainer.innerHTML = '';

    for (var i = 0; i < cityHistory.length; i++) {
        var recentSearch = document.createElement('button');
        recentSearch.classList.add('btn-secondary');
        recentSearch.textContent = cityHistory[i];
        recentSearch.addEventListener('click', inputBtnValue);
        btnContainer.append(recentSearch);
    }
}

var getCityInput = function(event) {
    event.preventDefault();

    if (cityInput && cityInput.value) {
        var city = cityInput.value;
        getCurrentWeather(city);
        saveHistory(city);
        historyBtn();
    } else {
        alert('Please Enter a City Name');
    }

}


searchWeather.addEventListener("click", getCityInput)
historyBtn();