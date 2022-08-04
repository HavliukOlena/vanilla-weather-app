function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}   ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let realTemperature = document.querySelector("#temperature");
  realTemperature.innerHTML = Math.round(response.data.main.temp);

  let realCity = document.querySelector("#city");
  realCity.innerHTML = response.data.name;

  let realDescription = document.querySelector("#description");
  realDescription.innerHTML = response.data.weather[0].description;

  let realHumidity = document.querySelector("#humidity");
  realHumidity.innerHTML = response.data.main.humidity;

  let realWind = document.querySelector("#wind");
  realWind.innerHTML = Math.round(response.data.wind.speed);

  let realDate = document.querySelector("#date");
  realDate.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "13503136859e9dffd277dab65a0e3801";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
