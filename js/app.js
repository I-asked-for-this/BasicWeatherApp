const apiKey = "APIKeyHere";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const citySearchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weatherIcon")

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    setTimeout(function () {
      document.querySelector(".error").style.display = "none";
    }, 2000);
    document.querySelector(".content").style.visibility = "hidden";
    document.querySelector('.card').style.gridTemplateRows = "0fr";
    document.querySelector('.card').style.paddingTop = "0px";
    document.querySelector('.search').style.paddingBottom = "0px";

  } else {
    document.querySelector('.error').style.display = "none";
    document.querySelector('.content').style.height = "auto";
    document.querySelector('.content').style.visibility = "visible";
    document.querySelector('.card').style.gridTemplateRows = "1fr";
    document.querySelector('.card').style.paddingTop = "30px";
    document.querySelector('.search').style.paddingBottom = "30px";

    var data = await response.json();
    // console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/H";
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "../img/cloudy.png";
    } else if (data.weather[0].main === "Clear") {
      var date = new Date();
      var hour = date.getHours();
      if (hour > 18 || hour < 3) {
        weatherIcon.src = "../img/moon.png"
      } else {
        weatherIcon.src = "../img/clear.png";
      }
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "../img/rainy.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "../img/drizzly.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "../img/misty.png"
    } else {
      weatherIcon.src = "../img/clear.png"
    }
  }
}

searchBtn.addEventListener("click", () => {
  if (citySearchBox.value.length !== 0) {
    checkWeather(citySearchBox.value).then(r => {
    })
  }
})

citySearchBox.addEventListener("keydown", (event) => {
  if (citySearchBox.value.length !== 0) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkWeather(citySearchBox.value).then(r => {
      })
    }
  }
})

async function updateGradient(place) {
  const options = {method: 'GET'};
  const apiKey = "APIKeyHere";
  const response = await fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${place}`, options)
    .then(response => response.json());

  var datetime = new Date(response.datetime);
  var hour = datetime.getHours();

  var card = document.querySelector('.card');
  var search = document.querySelector('.search')

  if (hour >= 3 && hour < 12) {
    card.style.backgroundImage = 'linear-gradient(135deg, #1199b8, #1fffff)';
    search.style.backgroundImage = 'linear-gradient(135deg, #1199b8, #1fffff)';
  } else if (hour >= 12 && hour < 18) {
    card.style.backgroundImage = 'linear-gradient(135deg, #f1707b, #fecf62)';
    search.style.backgroundImage = 'linear-gradient(135deg, #f1707b, #fecf62)';
  } else {
    card.style.backgroundImage = 'linear-gradient(135deg, #1B1F23, #251c7d)';
    search.style.backgroundImage = 'linear-gradient(135deg, #1B1F23, #251c7d)';
  }
}


// Function below made for testing:
// function updateGradient() {
//   var date = new Date();
//   var minute = date.getMinutes();
//   var card = document.querySelector('.card');
//
//   if (minute >= 0 && minute < 20) {
//     card.style.backgroundImage = 'linear-gradient(135deg, #1199b8, #1fffff)';
//   } else if (minute >= 20 && minute < 40) {
//     card.style.backgroundImage = 'linear-gradient(135deg, #f1707b, #fecf62)';
//   } else if (minute >= 40 && minute < 59) {
//         card.style.backgroundImage = 'linear-gradient(135deg, #1B1F23, #251c7d)';
//
//   }
// }

updateGradient();
setInterval(updateGradient, 30000);
