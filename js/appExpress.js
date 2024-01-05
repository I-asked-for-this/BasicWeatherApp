
const express = require('express');
const fs = require('fs');
const app = express();

let locationsChecked = {};

async function checkWeather(city) {
  const apiKey = "ad0406185938fcd0880fc170a4a0e78a";
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    return null;
  } else {
    return await response.json();
  }
}

app.get('/weather', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const city = req.query.city;
  const weatherData = await checkWeather(city);
  if (weatherData) {
    locationsChecked[ip] = weatherData;
    fs.writeFile('locationsChecked.json', JSON.stringify(locationsChecked), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    res.json(weatherData);
  } else {
    res.status(404).send('Invalid city.');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
