const apiKey = "APIKeyHere";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const citySearchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

document.addEventListener("DOMContentLoaded", () => {
  updateGradient(new Date()).then(r => {
  });
});


async function checkWeather(city) {
  const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
  if (response.status === 404) {
    displayError("Invalid city name.", "../img/404.png");
  } else if (response.status === 401) {
    displayError("Something on our end went Wrong :(.", "../img/401.png");
  } else {
    const datetime = await getTimeFromAPI(city);
    await updateGradient(datetime);
    hideError();
    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/H";
    updateWeatherIcon(data.weather[0].main, datetime);
  }
}

async function displayError(errorMessage, iconPath) {
  weatherIcon.src = iconPath;
  document.querySelector('.error').innerHTML = errorMessage;
  document.querySelector('.error').style.visibility = "visible";
  document.querySelector('.error').style.display = "block";
  document.querySelector('.content').style.height = "auto";
  document.querySelector('.card').style.gridTemplateRows = "1fr";
  document.querySelector('.card').style.paddingTop = "30px";
  document.querySelector('.search').style.paddingBottom = "30px";
  document.querySelector('.weatherIcon').style.visibility = "visible";
  document.querySelector('.details').style.display = "none";
  document.querySelector('.city').style.display = "none";
  document.querySelector('.temp').style.display = "none";
}

function hideError() {
  document.querySelector('.error').style.display = "none";
  document.querySelector('.error').style.visibility = "hidden";
  document.querySelector('.content').style.height = "auto";
  document.querySelector('.content').style.visibility = "visible";
  document.querySelector('.card').style.gridTemplateRows = "1fr";
  document.querySelector('.card').style.paddingTop = "30px";
  document.querySelector('.search').style.paddingBottom = "30px";
  document.querySelector('.details').style.display = "flex";
  document.querySelector('.city').style.display = "block";
  document.querySelector('.temp').style.display = "block";
}

function updateWeatherIcon(weather, datetime) {
  const hour = datetime.getHours();
  if (weather === "Clouds") {
    weatherIcon.src = "../img/cloudy.png";
  } else if (weather === "Clear") {
    if (hour >= 18 || hour < 3) {
      weatherIcon.src = "../img/moon.png";
    } else {
      weatherIcon.src = "../img/clear.png";
    }
  } else if (weather === "Rain") {
    weatherIcon.src = "../img/rainy.png";
  } else if (weather === "Drizzle") {
    weatherIcon.src = "../img/drizzly.png";
  } else if (weather === "Mist") {
    weatherIcon.src = "../img/misty.png";
  } else {
    console.log("Here");
    weatherIcon.src = "../img/clear.png";
  }
}

searchBtn.addEventListener("click", () => {
  if (citySearchBox.value.length !== 0) {
    checkWeather(citySearchBox.value).then(r => {
    });
  }
});

citySearchBox.addEventListener("keydown", (event) => {
  if (citySearchBox.value.length !== 0) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWeather(citySearchBox.value).then(r => {
      });
    }
  }
});

async function getTimeFromAPI(place) {
  const options = {method: 'GET'};
  const apiKey = "APIKeyHere";
  const response = await fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${place}`, options)
    .then(response => response.json());

  return new Date(response.datetime);
}

async function updateGradient(datetime) {
  const hour = datetime.getHours();

  const card = document.querySelector('.card');
  const search = document.querySelector('.search')

  const morningStart = 3;
  const afternoonStart = 12;
  const nightStart = 18;

  if (hour >= morningStart && hour < afternoonStart) {
    card.style.background = 'linear-gradient(135deg, #1199b8, #1fffff)';
    search.style.background = 'linear-gradient(135deg, #1199b8, #1fffff)';
  } else if (hour >= afternoonStart && hour < nightStart) {
    card.style.background = 'linear-gradient(135deg, #f1707b, #fecf62)';
    search.style.background = 'linear-gradient(135deg, #f1707b, #fecf62)';
  } else {
    card.style.background = 'linear-gradient(135deg, #1B1F23, #251c7d)';
    search.style.background = 'linear-gradient(95deg, #1B1F23, #251c7d)';
  }
}
