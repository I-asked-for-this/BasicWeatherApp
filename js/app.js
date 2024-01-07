const apiKey = "APIKeyHere";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const citySearchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weatherIcon")

document.addEventListener("DOMContentLoaded", () => {
  updateGradient("Tunis").then(r => {
  })
})

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    // document.querySelector(".error").style.display = "block";
    // setTimeout(function () {
    //   document.querySelector(".error").style.display = "none";
    // }, 2000);

    weatherIcon.src = "../img/404.png";
    document.querySelector('.error').innerHTML = "Invalid city name."
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


  } else if (response.status === 401) {
    weatherIcon.src = "../img/401.png";
    document.querySelector('.error').innerHTML = "Something on our end went Wrong :(."
    document.querySelector('.error').style.display = "block";
    document.querySelector('.weatherIcon').style.visibility = "hidden";

  } else {
    await updateGradient(city);
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

  const datetime = new Date(response.datetime);
  const hour = datetime.getHours();

  console.log("hour " + hour)

  const card = document.querySelector('.card');
  const search = document.querySelector('.search')

  const morningStart = 3;
  const afternoonStart = 12;
  const nightStart = 18;

  if (hour >= morningStart && hour < afternoonStart) {
    card.style.backgroundImage = 'linear-gradient(135deg, #1199b8, #1fffff)';
    search.style.backgroundImage = 'linear-gradient(135deg, #1199b8, #1fffff)';
  } else if (hour >= afternoonStart && hour < nightStart) {
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

// setInterval(updateGradient, 30000);
