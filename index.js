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
  celsiusTemperature = response.data.main.temp;

  let realTemperature = document.querySelector("#temperature");
  realTemperature.innerHTML = Math.round(celsiusTemperature);

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

  let realIcon = document.querySelector("#icon");
  realIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  realIcon.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "13503136859e9dffd277dab65a0e3801";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let realCityInput = document.querySelector("#city-input");
  search(realCityInput.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let realTemperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let realFahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  realTemperature.innerHTML = Math.round(realFahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let realTemperature = document.querySelector("#temperature");
  realTemperature.innerHTML = Math.round(celsiusTemperature);
}

let btn = document.querySelector("#btn");

btn.addEventListener("click", onClick);

function onClick() {
  btn.style.backgroundColor = "rgb(0, 9, 87)";
  btn.style.color = "rgb(242, 223, 58)";
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Kyiv");
