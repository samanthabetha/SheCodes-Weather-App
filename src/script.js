let now = new Date();
let todaysdate = document.querySelector("#date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

todaysdate.innerHTML = `${day} ${month} ${date} ${hour}:${minutes}`;

function showCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  currentTemp.innerHTML = "18";
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

function showFarhenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  currentTemp.innerHTML = "66";
}

let farhenheit = document.querySelector("#farhenheit");
farhenheit.addEventListener("click", showFarhenheit);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", showCity);

function displayWeather(response) {
  console.log(response);

  let temp = Math.round(response.data.main.temp);
  let tempPlace = document.querySelector("#current-temp");
  tempPlace.innerHTML = `${temp}`;

  let tempMax = Math.round(response.data.main.temp_max);
  let tempHigh = document.querySelector("#today-high-temp");
  tempHigh.innerHTML = `${tempMax}°`;

  let tempMin = Math.round(response.data.main.temp_min);
  let tempLow = document.querySelector("#today-low-temp");
  tempLow.innerHTML = `${tempMin}°`;

  let realFeel = Math.round(response.data.main.feels_like);
  let outsideFeel = document.querySelector("#real-feel");
  outsideFeel.innerHTML = `${realFeel}°`;

  let humidity = Math.round(response.data.main.humidity);
  let humidFeel = document.querySelector("#humidity");
  humidFeel.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
}

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${citySearch.value}`;

  let apiKey = "d3ed35f8e3c5e8bda54aa029ee3425b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeatherHere(response) {
  let temp = Math.round(response.data.main.temp);
  let tempPlace = document.querySelector("#current-temp");
  tempPlace.innerHTML = `${temp}`;

  let tempMax = Math.round(response.data.main.temp_max);
  let tempHigh = document.querySelector("#today-high-temp");
  tempHigh.innerHTML = `${tempMax}°`;

  let tempMin = Math.round(response.data.main.temp_min);
  let tempLow = document.querySelector("#today-low-temp");
  tempLow.innerHTML = `${tempMin}°`;

  let realFeel = Math.round(response.data.main.feels_like);
  let outsideFeel = document.querySelector("#real-feel");
  outsideFeel.innerHTML = `${realFeel}°`;

  let humidity = Math.round(response.data.main.humidity);
  let humidFeel = document.querySelector("#humidity");
  humidFeel.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d3ed35f8e3c5e8bda54aa029ee3425b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherHere);
}

function findLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findLocation);
