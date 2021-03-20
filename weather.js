const weather = document.querySelector(".js-weather");
const weatherIcon = document.querySelector(".weather-icon");

const API_KEY = "2952509bfcdaf6608e7fa1862bf0914c";
const GPS = 'gps';

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let temperature = json.main.temp;
        let location = json.name;
        let icon = json.weather[0].icon;

        weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`
        weather.innerText = `${temperature}ºC @ ${location}`;
    });
}

function submitGeoSuccess(position) {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const gpsObj = {
        latitude,
        longitude
    };
    localStorage.setItem(GPS, JSON.stringify(gpsObj));
    getWeather(latitude, longitude);
}

function submitGeoError() {
    console.log('Cant access geo location');
}

function askGps() {
    navigator.geolocation.getCurrentPosition(submitGeoSuccess, submitGeoError);
}

function loadGps() {
    const loadedGps = localStorage.getItem(GPS);
    if (loadedGps === null){
        askGps();
    } else {
        const parsedGps = JSON.parse(loadedGps);
        getWeather(parsedGps.latitude, parsedGps.longitude);
    }
}

function init() {
    loadGps();
}

init();