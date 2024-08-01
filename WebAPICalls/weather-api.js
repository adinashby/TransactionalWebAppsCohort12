const axios = require('axios');

require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;
const CITY_NAME = 'Montreal';

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&Units=metric`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error making the GET request:', error);
  });
